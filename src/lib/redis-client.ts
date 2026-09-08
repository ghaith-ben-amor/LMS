import { Redis as UpstashRedis } from "@upstash/redis";
import IoRedis from "ioredis";

export interface UnifiedRedis {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  del(key: string): Promise<void>;
}

let redisInstance: UnifiedRedis | null | undefined = undefined;

/**
 * Universal Redis Client Initializer
 * Supports:
 * 1. UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (Upstash HTTP REST)
 * 2. KV_REST_API_URL + KV_REST_API_TOKEN (Vercel KV REST)
 * 3. REDIS_URL starting with redis:// or rediss:// (ioredis TCP Driver for Vercel/Upstash/Render/RedisLabs)
 */
export function getRedisClient(): UnifiedRedis | null {
  if (redisInstance !== undefined) return redisInstance;

  const redisUrl = process.env.REDIS_URL;
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_TOKEN || process.env.REDIS_TOKEN;

  // 1. Upstash REST Client (if REST URL & Token exist)
  if (upstashUrl && upstashToken) {
    try {
      const upstash = new UpstashRedis({ url: upstashUrl, token: upstashToken });
      redisInstance = {
        async get<T>(key: string): Promise<T | null> {
          const val = await upstash.get<T>(key);
          return val ?? null;
        },
        async set<T>(key: string, value: T): Promise<void> {
          await upstash.set(key, value);
        },
        async del(key: string): Promise<void> {
          await upstash.del(key);
        },
      };
      console.log("[RedisClient] Connected via Upstash REST SDK");
      return redisInstance;
    } catch (e) {
      console.warn("[RedisClient] Upstash REST SDK init error:", e);
    }
  }

  // 2. REDIS_URL Support (TCP or REST)
  if (redisUrl) {
    // If REDIS_URL is HTTP/HTTPS REST endpoint
    if (redisUrl.startsWith("http://") || redisUrl.startsWith("https://")) {
      try {
        const upstash = new UpstashRedis({ url: redisUrl, token: upstashToken || "" });
        redisInstance = {
          async get<T>(key: string): Promise<T | null> {
            const val = await upstash.get<T>(key);
            return val ?? null;
          },
          async set<T>(key: string, value: T): Promise<void> {
            await upstash.set(key, value);
          },
          async del(key: string): Promise<void> {
            await upstash.del(key);
          },
        };
        console.log("[RedisClient] Connected via Upstash REST URL");
        return redisInstance;
      } catch (e) {
        console.warn("[RedisClient] Upstash HTTP init error:", e);
      }
    }

    // If REDIS_URL is a standard TCP connection string (redis:// or rediss://) -> Use ioredis
    if (redisUrl.startsWith("redis://") || redisUrl.startsWith("rediss://")) {
      try {
        const io = new IoRedis(redisUrl, {
          maxRetriesPerRequest: 3,
          enableReadyCheck: false,
          connectTimeout: 5000,
          tls: redisUrl.startsWith("rediss://") ? { rejectUnauthorized: false } : undefined,
        });

        redisInstance = {
          async get<T>(key: string): Promise<T | null> {
            const raw = await io.get(key);
            if (!raw) return null;
            try {
              return JSON.parse(raw) as T;
            } catch {
              return raw as unknown as T;
            }
          },
          async set<T>(key: string, value: T): Promise<void> {
            const str = typeof value === "string" ? value : JSON.stringify(value);
            await io.set(key, str);
          },
          async del(key: string): Promise<void> {
            await io.del(key);
          },
        };
        console.log("[RedisClient] Connected via ioredis TCP Driver");
        return redisInstance;
      } catch (e) {
        console.warn("[RedisClient] ioredis TCP Driver init error:", e);
      }
    }
  }

  if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
    console.warn(
      "[RedisClient] ⚠️ NO VALID CLOUD REDIS CONNECTED! Environment variables REDIS_URL or UPSTASH_REDIS_REST_URL are missing/invalid."
    );
  }

  redisInstance = null;
  return null;
}
