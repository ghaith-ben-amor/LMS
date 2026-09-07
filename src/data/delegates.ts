/**
 * Delegate Registration Data
 * Handles registration of delegates for the conference
 */

import Database from "better-sqlite3";

// Database file path
const dbPath = process.env.DATABASE_URL || "./delegates.db";
const db = new Database(dbPath);

// Initialize the database table
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

export function registerDelegate(data: RegistrationFormData): Delegate {
  const stmt = db.prepare(`
    INSERT INTO delegates (full_name, email, organization, position, phone, dietary_restrictions, emergency_contact_name, emergency_contact_phone, tshirt_size)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `);

  const result = stmt.run(
    data.full_name,
    data.email,
    data.organization,
    data.position,
    data.phone,
    data.dietary_restrictions,
    data.emergency_contact_name,
    data.emergency_contact_phone,
    data.tshirt_size
  );

  const row = db.prepare("SELECT * FROM delegates WHERE id = ?").get(result.lastInsertRowid) as Delegate;
  return row;
}

export function getDelegateByEmail(email: string): Delegate | null {
  const stmt = db.prepare("SELECT * FROM delegates WHERE email = ?");
  const row = stmt.get(email) as Delegate | undefined;
  return row || null;
}

export function getAllDelegates(): Delegate[] {
  const stmt = db.prepare("SELECT * FROM delegates ORDER BY created_at DESC");
  return stmt.all() as Delegate[];
}

export function deleteDelegate(id: number): boolean {
  const result = db.prepare("DELETE FROM delegates WHERE id = ?").run(id);
  return result.changes > 0;
}

export function getDelegatesByTshirtSize(size: "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL"): Delegate[] {
  const stmt = db.prepare("SELECT * FROM delegates WHERE tshirt_size = ? ORDER BY created_at DESC");
  return stmt.all(size) as Delegate[];
}

// Close the database when the application shuts down
process.on("beforeExit", () => {
  db.close();
});

export default db;
