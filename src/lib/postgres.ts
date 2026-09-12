import { Pool } from "pg";

let poolInstance: Pool | null | undefined = undefined;

/**
 * PostgreSQL Connection Pool Initializer
 * Supports:
 * - Supabase PostgreSQL (postgresql://postgres:...@db.xxx.supabase.co:5432/postgres)
 * - Neon PostgreSQL (postgresql://...@ep-xxx.neon.tech/neondb)
 * - Render / Railway / Aiven / Heroku PostgreSQL
 * - POSTGRES_URL or DATABASE_URL
 */
export function getPostgresPool(): Pool | null {
  if (poolInstance !== undefined) return poolInstance;

  const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

  if (connectionString && (connectionString.startsWith("postgres://") || connectionString.startsWith("postgresql://"))) {
    try {
      poolInstance = new Pool({
        connectionString,
        ssl: connectionString.includes("localhost") ? false : { rejectUnauthorized: false },
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      });
      console.log("[PostgreSQL] Connected to Cloud PostgreSQL Pool");
      return poolInstance;
    } catch (e) {
      console.warn("[PostgreSQL] Client initialization failed:", e);
    }
  }

  poolInstance = null;
  return null;
}
