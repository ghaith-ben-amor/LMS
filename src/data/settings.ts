/**
 * Site Visibility & Settings Data Handler
 * Controls visibility of Speakers and Partners sections on the public site.
 * Default: show_speakers = false, show_partners = false (hidden unless admin toggles to appear).
 */

import path from "path";
import { getRedisClient } from "@/lib/redis-client";
import { getPostgresPool } from "@/lib/postgres";

export interface SiteSettings {
  show_countdown: boolean;
  show_about: boolean;
  show_pillars: boolean;
  show_program: boolean;
  show_speakers: boolean;
  show_venue: boolean;
  show_partners: boolean;
  show_gallery: boolean;
}

const DEFAULT_SETTINGS: SiteSettings = {
  show_countdown: false,
  show_about: false,
  show_pillars: false,
  show_program: false,
  show_speakers: false,
  show_venue: false,
  show_partners: false,
  show_gallery: false,
};

let memorySettings: SiteSettings = { ...DEFAULT_SETTINGS };

let pgSettingsSeeded = false;
async function ensurePgSettingsTable() {
  const pool = getPostgresPool();
  if (!pool || pgSettingsSeeded) return;
  pgSettingsSeeded = true;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        key VARCHAR(100) PRIMARY KEY,
        value VARCHAR(255) NOT NULL
      );
    `);
  } catch (err) {
    console.warn("[Settings] Postgres table init error:", err);
  }
}

let sqliteDb: any = null;
let useMemorySettings = false;

function getDb() {
  if (sqliteDb || useMemorySettings) return sqliteDb;

  try {
    const Database = require("better-sqlite3");
    let dbPath = process.env.DATABASE_URL
      ? process.env.DATABASE_URL.replace("delegates.db", "settings.db")
      : "./settings.db";

    if (process.env.VERCEL || process.env.NODE_ENV === "production") {
      dbPath = path.join("/tmp", "settings.db");
    }

    const db = new Database(dbPath);
    db.exec(`
      CREATE TABLE IF NOT EXISTS site_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );
    `);
    sqliteDb = db;
    return sqliteDb;
  } catch (err) {
    console.warn("[Settings] SQLite init failed, using memory/cloud:", err);
    useMemorySettings = true;
    return null;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  // 1. PostgreSQL
  const pg = getPostgresPool();
  if (pg) {
    try {
      await ensurePgSettingsTable();
      const res = await pg.query("SELECT key, value FROM site_settings");
      if (res.rows.length > 0) {
        const settings = { ...DEFAULT_SETTINGS };
        for (const row of res.rows) {
          if (row.key in settings) {
            (settings as any)[row.key] = row.value === "true";
          }
        }
        return settings;
      }
    } catch (err) {
      console.error("[Settings] Postgres get error:", err);
    }
  }

  // 2. Redis
  const redis = getRedisClient();
  if (redis) {
    try {
      const data = await redis.get<SiteSettings>("lms_2026:settings");
      if (data) return { ...DEFAULT_SETTINGS, ...data };
    } catch (err) {
      console.error("[Settings] Redis get error:", err);
    }
  }

  // 3. SQLite
  const db = getDb();
  if (db) {
    try {
      const rows = db.prepare("SELECT key, value FROM site_settings").all() as { key: string; value: string }[];
      if (rows.length > 0) {
        const settings = { ...DEFAULT_SETTINGS };
        for (const row of rows) {
          if (row.key in settings) {
            (settings as any)[row.key] = row.value === "true";
          }
        }
        return settings;
      }
    } catch (err) {
      console.error("[Settings] SQLite get error:", err);
    }
  }

  return memorySettings;
}

export async function updateSiteSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const updated: SiteSettings = {
    show_countdown: data.show_countdown !== undefined ? Boolean(data.show_countdown) : current.show_countdown,
    show_about: data.show_about !== undefined ? Boolean(data.show_about) : current.show_about,
    show_pillars: data.show_pillars !== undefined ? Boolean(data.show_pillars) : current.show_pillars,
    show_program: data.show_program !== undefined ? Boolean(data.show_program) : current.show_program,
    show_speakers: data.show_speakers !== undefined ? Boolean(data.show_speakers) : current.show_speakers,
    show_venue: data.show_venue !== undefined ? Boolean(data.show_venue) : current.show_venue,
    show_partners: data.show_partners !== undefined ? Boolean(data.show_partners) : current.show_partners,
    show_gallery: data.show_gallery !== undefined ? Boolean(data.show_gallery) : current.show_gallery,
  };

  // 1. PostgreSQL
  const pg = getPostgresPool();
  if (pg) {
    try {
      await ensurePgSettingsTable();
      for (const [key, value] of Object.entries(updated)) {
        await pg.query(
          `INSERT INTO site_settings (key, value) VALUES ($1, $2)
           ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`,
          [key, String(value)]
        );
      }
    } catch (err) {
      console.error("[Settings] Postgres update error:", err);
    }
  }

  // 2. Redis
  const redis = getRedisClient();
  if (redis) {
    try {
      await redis.set("lms_2026:settings", updated);
    } catch (err) {
      console.error("[Settings] Redis update error:", err);
    }
  }

  // 3. SQLite
  const db = getDb();
  if (db) {
    try {
      const stmt = db.prepare(
        "INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
      );
      for (const [key, value] of Object.entries(updated)) {
        stmt.run(key, String(value));
      }
    } catch (err) {
      console.error("[Settings] SQLite update error:", err);
    }
  }

  memorySettings = updated;
  return updated;
}
