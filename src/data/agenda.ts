/**
 * Agenda / Program Data Handler
 * Supports:
 * 1. Persistent Cloud KV Storage (Upstash Redis / Vercel KV) for Vercel Serverless deployments
 * 2. Local SQLite database (better-sqlite3) for local development
 * 3. In-memory fallback seeded from static program.ts data
 */

import path from "path";
import { getRedisClient, UnifiedRedis } from "@/lib/redis-client";
import { programSchedule } from "./program";

export interface AgendaItem {
  id: number;
  day_label: string; // e.g. "DAY 01"
  day_date: string;  // e.g. "March 15, 2026"
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

// ─── Seed Data Helper ──────────────────────────────────────────────────────
function buildSeedItems(): AgendaItem[] {
  const items: AgendaItem[] = [];
  let order = 0;
  programSchedule.forEach((day) => {
    day.events.forEach((ev) => {
      items.push({
        id: order + 1,
        day_label: day.day,
        day_date: day.date,
        time: ev.time,
        activity: ev.activity,
        description: ev.description,
        location: ev.location,
        duration: ev.duration,
        speaker: ev.speaker,
        sort_order: order,
        created_at: new Date().toISOString(),
      });
      order++;
    });
  });
  return items;
}

// ─── In-memory fallback ────────────────────────────────────────────────────
let memoryIdCounter = 1000;
let memoryItems: AgendaItem[] | null = null;

function getMemoryItems(): AgendaItem[] {
  if (!memoryItems) {
    memoryItems = buildSeedItems();
    memoryIdCounter = memoryItems.length + 100;
  }
  return memoryItems;
}

// ─── SQLite singleton ──────────────────────────────────────────────────────
let agendaDb: any = null;
let useMemory = false;
let seeded = false;

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

    // Seed from static data on first run (only if table is empty)
    if (!seeded) {
      seeded = true;
      const count = (db.prepare("SELECT COUNT(*) as c FROM agenda_items").get() as { c: number }).c;
      if (count === 0) {
        const insert = db.prepare(`
          INSERT INTO agenda_items (day_label, day_date, time, activity, description, location, duration, speaker, sort_order)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);
        let order = 0;
        const seedAll = db.transaction(() => {
          programSchedule.forEach((day) => {
            day.events.forEach((ev) => {
              insert.run(day.day, day.date, ev.time, ev.activity, ev.description, ev.location, ev.duration || null, ev.speaker || null, order++);
            });
          });
        });
        seedAll();
      }
    }

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

  const redis = getRedis();

  // 1. Upstash Redis / Vercel KV (Cloud Persistent)
  if (redis) {
    try {
      let items = await redis.get<AgendaItem[]>("lms_2026:agenda");
      if (!items || items.length === 0) {
        items = buildSeedItems();
        await redis.set("lms_2026:agenda", items);
      }
      const sorted = items.sort((a, b) => a.sort_order - b.sort_order);
      agendaCache = { items: sorted, timestamp: Date.now() };
      return sorted;
    } catch (err) {
      console.error("[Agenda] Redis getAllAgendaItems error, falling back:", err);
    }
  }

  // 2. SQLite (Local Dev)
  const db = getDb();
  if (db) {
    try {
      return db.prepare("SELECT * FROM agenda_items ORDER BY sort_order ASC, day_label ASC, time ASC").all() as AgendaItem[];
    } catch (err) {
      console.error("[Agenda] SQLite getAllAgendaItems error:", err);
    }
  }

  // 3. Memory Fallback
  return [...getMemoryItems()].sort((a, b) => a.sort_order - b.sort_order);
}

export async function getAgendaItem(id: number): Promise<AgendaItem | null> {
  const all = await getAllAgendaItems();
  return all.find((i) => i.id === id) || null;
}

export async function createAgendaItem(data: AgendaItemInput): Promise<AgendaItem> {
  const sortOrder = data.sort_order ?? Date.now();
  const redis = getRedis();

  if (redis) {
    try {
      let items = agendaCache?.items || (await redis.get<AgendaItem[]>("lms_2026:agenda")) || buildSeedItems();
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
  const redis = getRedis();

  if (redis) {
    try {
      let items = agendaCache?.items || (await redis.get<AgendaItem[]>("lms_2026:agenda")) || buildSeedItems();
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
  const redis = getRedis();

  if (redis) {
    try {
      let items = agendaCache?.items || (await redis.get<AgendaItem[]>("lms_2026:agenda")) || buildSeedItems();
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

export async function reorderAgendaItems(orderedIds: number[]): Promise<void> {
  const redis = getRedis();

  if (redis) {
    try {
      let items = agendaCache?.items || (await redis.get<AgendaItem[]>("lms_2026:agenda")) || buildSeedItems();
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
