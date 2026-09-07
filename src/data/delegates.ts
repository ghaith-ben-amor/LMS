/**
 * Delegate Registration Data Handler
 * Supports:
 * 1. Persistent Cloud KV Storage (Upstash Redis / Vercel KV) for Vercel Serverless deployments
 * 2. Local SQLite database (better-sqlite3) for local development
 * 3. In-memory fallback
 */

import path from "path";
import { Redis } from "@upstash/redis";

export interface Delegate {
  id: number;
  full_name: string;
  email: string;
  organization?: string;
  position?: string;
  phone?: string;
  dietary_restrictions?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  created_at: string;
}

export interface RegistrationFormData {
  full_name: string;
  email: string;
  organization?: string;
  position?: string;
  phone?: string;
  dietary_restrictions?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
}

// ─── Upstash Redis / Vercel KV Singleton ───────────────────────────────────
function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (url && token) {
    try {
      return new Redis({ url, token });
    } catch (e) {
      console.warn("[Delegates] Upstash Redis client init error:", e);
    }
  }
  return null;
}

// ─── In-Memory Fallback Store ──────────────────────────────────────────────
const memoryStore: Delegate[] = [];
let memoryIdCounter = 1;

let dbInstance: any = null;
let useMemoryStore = false;

function getDb() {
  if (dbInstance || useMemoryStore) return dbInstance;

  try {
    const Database = require("better-sqlite3");
    let targetPath = process.env.DATABASE_URL || "./delegates.db";

    if (process.env.VERCEL || process.env.NODE_ENV === "production") {
      targetPath = path.join("/tmp", "delegates.db");
    }

    const db = new Database(targetPath);
    db.exec(`
      CREATE TABLE IF NOT EXISTS delegates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        organization TEXT,
        position TEXT,
        phone TEXT,
        dietary_restrictions TEXT,
        emergency_contact_name TEXT,
        emergency_contact_phone TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    dbInstance = db;
    return dbInstance;
  } catch (error) {
    console.warn("[Delegates] SQLite initialization failed, falling back to memory/cloud:", error);
    useMemoryStore = true;
    return null;
  }
}

// ─── Public API ────────────────────────────────────────────────────────────

export async function registerDelegate(data: RegistrationFormData): Promise<Delegate> {
  const redis = getRedis();

  // 1. Upstash Redis / Vercel KV (Cloud Persistent)
  if (redis) {
    let items = (await redis.get<Delegate[]>("lms_2026:delegates")) || [];
    const newId = await redis.incr("lms_2026:delegate_id_counter");
    
    const newDelegate: Delegate = {
      id: newId,
      full_name: data.full_name,
      email: data.email,
      organization: data.organization,
      position: data.position,
      phone: data.phone,
      dietary_restrictions: data.dietary_restrictions,
      emergency_contact_name: data.emergency_contact_name,
      emergency_contact_phone: data.emergency_contact_phone,
      created_at: new Date().toISOString(),
    };

    items.unshift(newDelegate);
    await redis.set("lms_2026:delegates", items);
    return newDelegate;
  }

  // 2. SQLite (Local Dev)
  const db = getDb();
  if (db) {
    const stmt = db.prepare(`
      INSERT INTO delegates (full_name, email, organization, position, phone, dietary_restrictions, emergency_contact_name, emergency_contact_phone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `);

    const result = stmt.run(
      data.full_name,
      data.email,
      data.organization || null,
      data.position || null,
      data.phone || null,
      data.dietary_restrictions || null,
      data.emergency_contact_name || null,
      data.emergency_contact_phone || null
    );

    const row = db.prepare("SELECT * FROM delegates WHERE id = ?").get(result.lastInsertRowid) as Delegate;
    return row;
  }

  // 3. Memory Fallback
  const newDelegate: Delegate = {
    id: memoryIdCounter++,
    full_name: data.full_name,
    email: data.email,
    organization: data.organization,
    position: data.position,
    phone: data.phone,
    dietary_restrictions: data.dietary_restrictions,
    emergency_contact_name: data.emergency_contact_name,
    emergency_contact_phone: data.emergency_contact_phone,
    created_at: new Date().toISOString(),
  };
  memoryStore.unshift(newDelegate);
  return newDelegate;
}

export async function getDelegateByEmail(email: string): Promise<Delegate | null> {
  const redis = getRedis();

  if (redis) {
    const items = (await redis.get<Delegate[]>("lms_2026:delegates")) || [];
    const found = items.find((d) => d.email.toLowerCase() === email.toLowerCase());
    return found || null;
  }

  const db = getDb();
  if (db) {
    const stmt = db.prepare("SELECT * FROM delegates WHERE email = ?");
    const row = stmt.get(email) as Delegate | undefined;
    return row || null;
  }

  const found = memoryStore.find((d) => d.email.toLowerCase() === email.toLowerCase());
  return found || null;
}

export async function getAllDelegates(): Promise<Delegate[]> {
  const redis = getRedis();

  if (redis) {
    const items = (await redis.get<Delegate[]>("lms_2026:delegates")) || [];
    return items;
  }

  const db = getDb();
  if (db) {
    const stmt = db.prepare("SELECT * FROM delegates ORDER BY created_at DESC");
    return stmt.all() as Delegate[];
  }

  return [...memoryStore];
}

export async function deleteDelegate(id: number): Promise<boolean> {
  const redis = getRedis();

  if (redis) {
    let items = (await redis.get<Delegate[]>("lms_2026:delegates")) || [];
    const filtered = items.filter((d) => d.id !== id);
    if (filtered.length !== items.length) {
      await redis.set("lms_2026:delegates", filtered);
      return true;
    }
    return false;
  }

  const db = getDb();
  if (db) {
    const result = db.prepare("DELETE FROM delegates WHERE id = ?").run(id);
    return result.changes > 0;
  }

  const index = memoryStore.findIndex((d) => d.id === id);
  if (index !== -1) {
    memoryStore.splice(index, 1);
    return true;
  }
  return false;
}

export default getDb();
