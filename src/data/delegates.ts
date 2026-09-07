/**
 * Delegate Registration Data Handler
 * Supports local SQLite database (better-sqlite3) with fallback for Vercel Serverless
 */

import path from "path";

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
  tshirt_size?: string;
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
  tshirt_size?: "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL";
}

// In-Memory Fallback Store (for Vercel Serverless environments if SQLite is read-only)
const memoryStore: Delegate[] = [];
let memoryIdCounter = 1;

let dbInstance: any = null;
let useMemoryStore = false;

function getDb() {
  if (dbInstance || useMemoryStore) return dbInstance;

  try {
    const Database = require("better-sqlite3");
    let targetPath = process.env.DATABASE_URL || "./delegates.db";

    // On Vercel serverless, filesystem outside /tmp is read-only
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
        tshirt_size TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    dbInstance = db;
    return dbInstance;
  } catch (error) {
    console.warn("SQLite initialization failed, falling back to in-memory store:", error);
    useMemoryStore = true;
    return null;
  }
}

export function registerDelegate(data: RegistrationFormData): Delegate {
  const db = getDb();

  if (db) {
    const stmt = db.prepare(`
      INSERT INTO delegates (full_name, email, organization, position, phone, dietary_restrictions, emergency_contact_name, emergency_contact_phone, tshirt_size)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `);

    const result = stmt.run(
      data.full_name,
      data.email,
      data.organization || null,
      data.position || null,
      data.phone || null,
      data.dietary_restrictions || null,
      data.emergency_contact_name || null,
      data.emergency_contact_phone || null,
      data.tshirt_size || null
    );

    const row = db.prepare("SELECT * FROM delegates WHERE id = ?").get(result.lastInsertRowid) as Delegate;
    return row;
  }

  // Memory Fallback
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
    tshirt_size: data.tshirt_size,
    created_at: new Date().toISOString(),
  };
  memoryStore.unshift(newDelegate);
  return newDelegate;
}

export function getDelegateByEmail(email: string): Delegate | null {
  const db = getDb();
  if (db) {
    const stmt = db.prepare("SELECT * FROM delegates WHERE email = ?");
    const row = stmt.get(email) as Delegate | undefined;
    return row || null;
  }

  const found = memoryStore.find((d) => d.email.toLowerCase() === email.toLowerCase());
  return found || null;
}

export function getAllDelegates(): Delegate[] {
  const db = getDb();
  if (db) {
    const stmt = db.prepare("SELECT * FROM delegates ORDER BY created_at DESC");
    return stmt.all() as Delegate[];
  }

  return [...memoryStore];
}

export function deleteDelegate(id: number): boolean {
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

export function getDelegatesByTshirtSize(size: "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL"): Delegate[] {
  const db = getDb();
  if (db) {
    const stmt = db.prepare("SELECT * FROM delegates WHERE tshirt_size = ? ORDER BY created_at DESC");
    return stmt.all(size) as Delegate[];
  }

  return memoryStore.filter((d) => d.tshirt_size === size);
}

export default getDb();
