/**
 * Agenda / Program Data Handler
 * Supports:
 * 1. Persistent Cloud KV Storage (Upstash Redis / Vercel KV) for Vercel Serverless deployments
 * 2. Local SQLite database (better-sqlite3) for local development
 * 3. In-memory fallback
 *
 * NOTE: Auto-seeding of static items has been disabled per user request.
 * The agenda is 100% dynamic and fully managed by the Admin.
 */

import path from "path";
import { getRedisClient, UnifiedRedis } from "@/lib/redis-client";
import { getPostgresPool } from "@/lib/postgres";

let pgAgendaSeeded = false;
async function ensurePgAgendaTable() {
  const pool = getPostgresPool();
  if (!pool || pgAgendaSeeded) return;
  pgAgendaSeeded = true;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS agenda_items (
        id SERIAL PRIMARY KEY,
        day_label VARCHAR(100) NOT NULL,
        day_date VARCHAR(100) NOT NULL,
        time VARCHAR(50) NOT NULL,
        activity VARCHAR(255) NOT NULL,
        description TEXT DEFAULT '',
        location VARCHAR(255) DEFAULT '',
        duration VARCHAR(100),
        speaker VARCHAR(255),
        sort_order BIGINT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await pool.query(`ALTER TABLE agenda_items ALTER COLUMN sort_order TYPE BIGINT;`).catch(() => {});
  } catch (err) {
    console.warn("[Agenda] Postgres table init error:", err);
  }
}

export interface AgendaItem {
  id: number;
  day_label: string; // e.g. "DAY 01"
  day_date: string;  // e.g. "October 2, 2026"
  time: string;      // e.g. "08:00"
  activity: string;
  description: string;
  location: string;
  duration?: string;
  speaker?: string;
  sort_order: number;
  created_at: string;
}

export interface AgendaItemInput {
  day_label: string;
  day_date: string;
  time: string;
  activity: string;
  description: string;
  location: string;
  duration?: string;
  speaker?: string;
  sort_order?: number;
}

// ─── Upstash Redis / Vercel KV Singleton ───────────────────────────────────
function getRedis(): UnifiedRedis | null {
  return getRedisClient();
}

// ─── In-memory fallback ────────────────────────────────────────────────────
let memoryIdCounter = 1;
let memoryItems: AgendaItem[] = [];

function getMemoryItems(): AgendaItem[] {
  return memoryItems;
}

// ─── SQLite singleton ──────────────────────────────────────────────────────
let agendaDb: any = null;
let useMemory = false;

function getDb() {
  if (agendaDb || useMemory) return agendaDb;

  try {
    const Database = require("better-sqlite3");
    let dbPath = process.env.DATABASE_URL
      ? process.env.DATABASE_URL.replace("delegates.db", "agenda.db")
      : "./agenda.db";

    if (process.env.VERCEL || process.env.NODE_ENV === "production") {
      dbPath = path.join("/tmp", "agenda.db");
    }

    const db = new Database(dbPath);
    db.exec(`
      CREATE TABLE IF NOT EXISTS agenda_items (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        day_label   TEXT NOT NULL,
        day_date    TEXT NOT NULL,
        time        TEXT NOT NULL,
        activity    TEXT NOT NULL,
        description TEXT NOT NULL DEFAULT '',
        location    TEXT NOT NULL DEFAULT '',
        duration    TEXT,
        speaker     TEXT,
        sort_order  INTEGER NOT NULL DEFAULT 0,
        created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    agendaDb = db;
    return agendaDb;
  } catch (err) {
    console.warn("[Agenda] SQLite init failed, using memory/cloud:", err);
    useMemory = true;
    return null;
  }
}

// ─── Fast In-Memory Cache ──────────────────────────────────────────────────
let agendaCache: { items: AgendaItem[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 10000;

export function invalidateAgendaCache() {
  agendaCache = null;
}

// ─── Public API ────────────────────────────────────────────────────────────

export async function getAllAgendaItems(): Promise<AgendaItem[]> {
  if (agendaCache && Date.now() - agendaCache.timestamp < CACHE_TTL_MS) {
    return agendaCache.items;
  }

  // 1. PostgreSQL (Cloud Permanent DB - Supabase / Neon / Render Postgres)
  const pg = getPostgresPool();
  if (pg) {
    try {
      await ensurePgAgendaTable();
      const res = await pg.query("SELECT * FROM agenda_items ORDER BY sort_order ASC, day_label ASC, time ASC");
      const sorted = res.rows as AgendaItem[];
      agendaCache = { items: sorted, timestamp: Date.now() };
      return sorted;
    } catch (err) {
      console.error("[Agenda] PostgreSQL getAllAgendaItems error, falling back:", err);
    }
  }

  // 2. Upstash Redis / Vercel KV
  const redis = getRedis();
  if (redis) {
    try {
      let items = await redis.get<AgendaItem[]>("lms_2026:agenda");
      if (items === null || items === undefined) {
        items = [];
        await redis.set("lms_2026:agenda", items);
      }
      const sorted = items.sort((a, b) => a.sort_order - b.sort_order);
      agendaCache = { items: sorted, timestamp: Date.now() };
      return sorted;
    } catch (err) {
      console.error("[Agenda] Redis getAllAgendaItems error, falling back:", err);
    }
  }

  // 3. SQLite (Local Dev)
  const db = getDb();
  if (db) {
    try {
      return db.prepare("SELECT * FROM agenda_items ORDER BY sort_order ASC, day_label ASC, time ASC").all() as AgendaItem[];
    } catch (err) {
      console.error("[Agenda] SQLite getAllAgendaItems error:", err);
    }
  }

  // 4. Memory Fallback
  return [...getMemoryItems()].sort((a, b) => a.sort_order - b.sort_order);
}

export async function getAgendaItem(id: number): Promise<AgendaItem | null> {
  const all = await getAllAgendaItems();
  return all.find((i) => i.id === id) || null;
}

export async function createAgendaItem(data: AgendaItemInput): Promise<AgendaItem> {
  // 1. PostgreSQL
  const pg = getPostgresPool();
  if (pg) {
    try {
      await ensurePgAgendaTable();
      let sortOrder = data.sort_order;
      if (sortOrder === undefined) {
        const maxRes = await pg.query("SELECT COALESCE(MAX(sort_order), 0) + 1 as next_order FROM agenda_items");
        sortOrder = parseInt(maxRes.rows[0].next_order, 10);
      }

      const res = await pg.query(
        `INSERT INTO agenda_items (day_label, day_date, time, activity, description, location, duration, speaker, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [
          data.day_label, data.day_date, data.time, data.activity,
          data.description, data.location,
          data.duration || null, data.speaker || null, sortOrder
        ]
      );
      invalidateAgendaCache();
      return res.rows[0] as AgendaItem;
    } catch (err) {
      console.error("[Agenda] PostgreSQL createAgendaItem error, falling back:", err);
    }
  }

  const sortOrder = data.sort_order ?? Date.now();

  // 2. Redis
  const redis = getRedis();
  if (redis) {
    try {
      let items = agendaCache?.items || (await redis.get<AgendaItem[]>("lms_2026:agenda")) || [];
      const maxId = items.length > 0 ? Math.max(...items.map((i) => i.id)) : 0;
      const newId = maxId + 1;

      const newItem: AgendaItem = {
        id: newId,
        day_label: data.day_label,
        day_date: data.day_date,
        time: data.time,
        activity: data.activity,
        description: data.description,
        location: data.location,
        duration: data.duration,
        speaker: data.speaker,
        sort_order: sortOrder,
        created_at: new Date().toISOString(),
      };

      const updated = [...items, newItem].sort((a, b) => a.sort_order - b.sort_order);
      agendaCache = { items: updated, timestamp: Date.now() };
      await redis.set("lms_2026:agenda", updated);
      return newItem;
    } catch (err) {
      console.error("[Agenda] Redis createAgendaItem error, falling back:", err);
    }
  }

  // 3. SQLite
  const db = getDb();
  if (db) {
    try {
      const stmt = db.prepare(`
        INSERT INTO agenda_items (day_label, day_date, time, activity, description, location, duration, speaker, sort_order)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const result = stmt.run(
        data.day_label, data.day_date, data.time, data.activity,
        data.description, data.location,
        data.duration || null, data.speaker || null, sortOrder
      );
      return db.prepare("SELECT * FROM agenda_items WHERE id = ?").get(result.lastInsertRowid) as AgendaItem;
    } catch (err) {
      console.error("[Agenda] SQLite createAgendaItem error:", err);
    }
  }

  const newItem: AgendaItem = {
    id: memoryIdCounter++,
    ...data,
    duration: data.duration,
    speaker: data.speaker,
    sort_order: sortOrder,
    created_at: new Date().toISOString(),
  };
  getMemoryItems().push(newItem);
  return newItem;
}

export async function updateAgendaItem(id: number, data: Partial<AgendaItemInput>): Promise<AgendaItem | null> {
  // 1. PostgreSQL
  const pg = getPostgresPool();
  if (pg) {
    try {
      await ensurePgAgendaTable();
      const fields: string[] = [];
      const values: any[] = [];
      let idx = 1;
      if (data.day_label !== undefined) { fields.push(`day_label = $${idx++}`); values.push(data.day_label); }
      if (data.day_date !== undefined) { fields.push(`day_date = $${idx++}`); values.push(data.day_date); }
      if (data.time !== undefined) { fields.push(`time = $${idx++}`); values.push(data.time); }
      if (data.activity !== undefined) { fields.push(`activity = $${idx++}`); values.push(data.activity); }
      if (data.description !== undefined) { fields.push(`description = $${idx++}`); values.push(data.description); }
      if (data.location !== undefined) { fields.push(`location = $${idx++}`); values.push(data.location); }
      if (data.duration !== undefined) { fields.push(`duration = $${idx++}`); values.push(data.duration || null); }
      if (data.speaker !== undefined) { fields.push(`speaker = $${idx++}`); values.push(data.speaker || null); }
      if (data.sort_order !== undefined) { fields.push(`sort_order = $${idx++}`); values.push(data.sort_order); }

      if (fields.length > 0) {
        values.push(id);
        const res = await pg.query(
          `UPDATE agenda_items SET ${fields.join(", ")} WHERE id = $${idx} RETURNING *`,
          values
        );
        invalidateAgendaCache();
        return res.rows[0] as AgendaItem;
      }
    } catch (err) {
      console.error("[Agenda] PostgreSQL updateAgendaItem error, falling back:", err);
    }
  }

  // 2. Redis
  const redis = getRedis();
  if (redis) {
    try {
      let items = agendaCache?.items || (await redis.get<AgendaItem[]>("lms_2026:agenda")) || [];
      const idx = items.findIndex((i) => i.id === id);
      if (idx === -1) return null;

      items[idx] = { ...items[idx], ...data };
      const updated = [...items].sort((a, b) => a.sort_order - b.sort_order);
      agendaCache = { items: updated, timestamp: Date.now() };
      await redis.set("lms_2026:agenda", updated);
      return items[idx];
    } catch (err) {
      console.error("[Agenda] Redis updateAgendaItem error, falling back:", err);
    }
  }

  // 3. SQLite
  const db = getDb();
  if (db) {
    try {
      const existing = db.prepare("SELECT * FROM agenda_items WHERE id = ?").get(id) as AgendaItem | undefined;
      if (!existing) return null;

      const merged = { ...existing, ...data };
      db.prepare(`
        UPDATE agenda_items
        SET day_label=?, day_date=?, time=?, activity=?, description=?, location=?, duration=?, speaker=?, sort_order=?
        WHERE id=?
      `).run(
        merged.day_label, merged.day_date, merged.time, merged.activity,
        merged.description, merged.location,
        merged.duration || null, merged.speaker || null, merged.sort_order, id
      );
      return db.prepare("SELECT * FROM agenda_items WHERE id = ?").get(id) as AgendaItem;
    } catch (err) {
      console.error("[Agenda] SQLite updateAgendaItem error:", err);
    }
  }

  const mem = getMemoryItems();
  const idx = mem.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  mem[idx] = { ...mem[idx], ...data } as AgendaItem;
  return mem[idx];
}

export async function deleteAgendaItem(id: number): Promise<boolean> {
  // 1. PostgreSQL
  const pg = getPostgresPool();
  if (pg) {
    try {
      await ensurePgAgendaTable();
      const res = await pg.query("DELETE FROM agenda_items WHERE id = $1", [id]);
      invalidateAgendaCache();
      return (res.rowCount ?? 0) > 0;
    } catch (err) {
      console.error("[Agenda] PostgreSQL deleteAgendaItem error, falling back:", err);
    }
  }

  // 2. Redis
  const redis = getRedis();
  if (redis) {
    try {
      let items = agendaCache?.items || (await redis.get<AgendaItem[]>("lms_2026:agenda")) || [];
      const idx = items.findIndex((i) => i.id === id);
      if (idx === -1) return false;

      items.splice(idx, 1);
      const updated = [...items].sort((a, b) => a.sort_order - b.sort_order);
      agendaCache = { items: updated, timestamp: Date.now() };
      await redis.set("lms_2026:agenda", updated);
      return true;
    } catch (err) {
      console.error("[Agenda] Redis deleteAgendaItem error, falling back:", err);
    }
  }

  // 3. SQLite
  const db = getDb();
  if (db) {
    try {
      const result = db.prepare("DELETE FROM agenda_items WHERE id = ?").run(id);
      return result.changes > 0;
    } catch (err) {
      console.error("[Agenda] SQLite deleteAgendaItem error:", err);
    }
  }

  const mem = getMemoryItems();
  const idx = mem.findIndex((i) => i.id === id);
  if (idx !== -1) {
    mem.splice(idx, 1);
    return true;
  }
  return false;
}

export async function clearAllAgendaItems(): Promise<void> {
  // 1. PostgreSQL
  const pg = getPostgresPool();
  if (pg) {
    try {
      await ensurePgAgendaTable();
      await pg.query("TRUNCATE TABLE agenda_items RESTART IDENTITY");
    } catch (err) {
      console.error("[Agenda] PostgreSQL clear error:", err);
    }
  }

  // 2. Redis
  const redis = getRedis();
  if (redis) {
    try {
      await redis.set("lms_2026:agenda", []);
    } catch (err) {
      console.error("[Agenda] Redis clear error:", err);
    }
  }

  // 3. SQLite
  const db = getDb();
  if (db) {
    try {
      db.exec("DELETE FROM agenda_items");
    } catch (err) {
      console.error("[Agenda] SQLite clear error:", err);
    }
  }

  memoryItems = [];
  invalidateAgendaCache();
}

export async function reorderAgendaItems(orderedIds: number[]): Promise<void> {
  // 1. PostgreSQL
  const pg = getPostgresPool();
  if (pg) {
    try {
      await ensurePgAgendaTable();
      for (let index = 0; index < orderedIds.length; index++) {
        await pg.query("UPDATE agenda_items SET sort_order = $1 WHERE id = $2", [index, orderedIds[index]]);
      }
      invalidateAgendaCache();
      return;
    } catch (err) {
      console.error("[Agenda] PostgreSQL reorderAgendaItems error, falling back:", err);
    }
  }

  // 2. Redis
  const redis = getRedis();
  if (redis) {
    try {
      let items = agendaCache?.items || (await redis.get<AgendaItem[]>("lms_2026:agenda")) || [];
      orderedIds.forEach((id, index) => {
        const item = items.find((i) => i.id === id);
        if (item) item.sort_order = index;
      });
      const sorted = [...items].sort((a, b) => a.sort_order - b.sort_order);
      agendaCache = { items: sorted, timestamp: Date.now() };
      await redis.set("lms_2026:agenda", sorted);
      return;
    } catch (err) {
      console.error("[Agenda] Redis reorderAgendaItems error, falling back:", err);
    }
  }

  // 3. SQLite
  const db = getDb();
  if (db) {
    try {
      const update = db.prepare("UPDATE agenda_items SET sort_order=? WHERE id=?");
      const tx = db.transaction(() => {
        orderedIds.forEach((id, index) => update.run(index, id));
      });
      tx();
      return;
    } catch (err) {
      console.error("[Agenda] SQLite reorderAgendaItems error:", err);
    }
  }

  const mem = getMemoryItems();
  orderedIds.forEach((id, index) => {
    const item = mem.find((i) => i.id === id);
    if (item) item.sort_order = index;
  });
}
