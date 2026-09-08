import { Redis } from "@upstash/redis";

let redisInstance: Redis | null | undefined = undefined;

/**
 * Universal Redis Client Initializer
 * Supports:
 * - UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
 * - KV_REST_API_URL + KV_REST_API_TOKEN (Vercel KV)
 * - REDIS_URL (auto-parses Upstash TCP & REST connection strings like redis://default:token@host:6379 or https://...)
 */
export function getRedisClient(): Redis | null {
  if (redisInstance !== undefined) return redisInstance;

  let url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_URL;
  let token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_TOKEN || process.env.REDIS_TOKEN;

  const redisUrl = process.env.REDIS_URL;

  // Auto-parse REDIS_URL if set in Vercel/Render environment variables
  if (redisUrl) {
    try {
      if (redisUrl.startsWith("http://") || redisUrl.startsWith("https://")) {
        url = url || redisUrl;
        const parsed = new URL(redisUrl);
        if (parsed.searchParams.has("token")) {
          token = token || parsed.searchParams.get("token") || undefined;
        }
      } else if (redisUrl.startsWith("redis://") || redisUrl.startsWith("rediss://")) {
        const parsed = new URL(redisUrl);
        const host = parsed.hostname;
        const pass = parsed.password || (parsed.username !== "default" ? parsed.username : undefined);

        if (host && pass) {
          url = url || `https://${host}`;
          token = token || decodeURIComponent(pass);
        }
      }
    } catch (e) {
      console.warn("[RedisClient] Failed to parse REDIS_URL:", e);
    }
  }

  if (url && token) {
    try {
      redisInstance = new Redis({ url, token });
      return redisInstance;
    } catch (e) {
      console.warn("[RedisClient] Upstash Redis initialization error:", e);
    }
  }

  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    console.warn(
      "[RedisClient] ⚠️ Cloud DB connection details missing or invalid. Check REDIS_URL or UPSTASH_REDIS_REST_URL in environment variables."
    );
  }

  redisInstance = null;
  return null;
}
