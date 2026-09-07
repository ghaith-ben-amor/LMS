/**
 * Program Schedule Data & Dynamic Store
 * Handles static fallback and dynamic database schedule management for LMS 2K26
 */

import path from "path";

export interface ScheduleItem {
  id: string;
  time: string;
  activity: string;
  description: string;
  location: string;
  duration?: string;
  speaker?: string;
  day_number?: number;
}

export interface DaySchedule {
  day: string;
  date: string;
  events: ScheduleItem[];
}

export const initialProgramSchedule: DaySchedule[] = [
  {
    day: "DAY 01",
    date: "March 15, 2026",
    events: [
      {
        id: "d1-1",
        time: "08:00",
        activity: "Registration & Welcome",
        description: "Welcome delegates and registration badge retrieval at main hall.",
        location: "Main Hall",
        duration: "2 hours",
      },
      {
        id: "d1-2",
        time: "10:00",
        activity: "Opening Ceremony",
        description: "Inaugural address and official launch of LMS 2K26 experience.",
        location: "Grand Ballroom",
        duration: "1 hour",
      },
      {
        id: "d1-3",
        time: "11:00",
        activity: "Ice Breaking Activities",
        description: "Engaging icebreaker sessions to connect with fellow delegates.",
        location: "Ballroom & Terraces",
        duration: "1.5 hours",
      },
      {
        id: "d1-4",
        time: "12:30",
        activity: "Networking Lunch",
        description: "Gourmet buffet meal in a relaxed atmospheric lounge.",
        location: "Dining Hall",
        duration: "1.5 hours",
      },
      {
        id: "d1-5",
        time: "14:00",
        activity: "Leadership Workshop",
        description: "Discover the fundamentals of authentic leadership behind the mask.",
        location: "Workshop Rooms",
        duration: "2 hours",
        speaker: "Dr. Sarah M. Johnson",
      },
      {
        id: "d1-6",
        time: "16:00",
        activity: "Coffee & Connection",
        description: "Informal networking break with refreshments and tea.",
        location: "Lounge Area",
        duration: "30 minutes",
      },
      {
        id: "d1-7",
        time: "16:30",
        activity: "Masquerade Gala Night",
        description: "An elegant evening of celebration, connection, and music.",
        location: "Grand Ballroom",
        duration: "3 hours",
      },
    ],
  },
  {
    day: "DAY 02",
    date: "March 16, 2026",
    events: [
      {
        id: "d2-1",
        time: "09:00",
        activity: "Keynote Address",
        description: "Inspiring insights on youth entrepreneurship and innovation.",
        location: "Grand Ballroom",
        duration: "1 hour",
        speaker: "Ahmed Ben Salah",
      },
      {
        id: "d2-2",
        time: "10:00",
        activity: "Self-Discovery Session",
        description: "Deep dive into personal values, identity, and internal reflections.",
        location: "Mirror Room",
        duration: "1.5 hours",
        speaker: "Emma Laurent",
      },
      {
        id: "d2-3",
        time: "11:30",
        activity: "Breakout Track Sessions",
        description: "Specialized tracks aligned with corporate and startup leadership.",
        location: "Multiple Rooms",
        duration: "1.5 hours",
      },
      {
        id: "d2-4",
        time: "13:00",
        activity: "Lunch & Networking",
        description: "Enjoy a gourmet meal while building meaningful relationships.",
        location: "Dining Hall",
        duration: "1.5 hours",
      },
      {
        id: "d2-5",
        time: "14:30",
        activity: "Communication & Stage Presence",
        description: "Develop authentic public speaking and strategic presence.",
        location: "Workshop Rooms",
        duration: "2 hours",
        speaker: "Lisa Chen",
      },
      {
        id: "d2-[#01]",
        time: "16:30",
        activity: "Secret Room Challenges",
        description: "Participate in surprise experiential leadership challenges.",
        location: "Secret Room",
        duration: "1.5 hours",
      },
      {
        id: "d2-7",
        time: "18:00",
        activity: "Evening Reception",
        description: "Celebration dinner and live entertainment.",
        location: "Terrace & Ballroom",
        duration: "2.5 hours",
      },
    ],
  },
  {
    day: "DAY 03",
    date: "March 17, 2026",
    events: [
      {
        id: "d3-1",
        time: "09:00",
        activity: "Reflection & Integration",
        description: "Process and synthesize your key takeaways from LMS 2K26.",
        location: "Auditorium",
        duration: "1.5 hours",
      },
      {
        id: "d3-2",
        time: "10:30",
        activity: "Leadership Panel Discussion",
        description: "Panel with global speakers on future leadership trends.",
        location: "Grand Ballroom",
        duration: "1.5 hours",
      },
      {
        id: "d3-3",
        time: "12:00",
        activity: "Final Networking Lunch",
        description: "Final dining session with fellow delegates and mentors.",
        location: "Dining Hall",
        duration: "1.5 hours",
      },
      {
        id: "d3-4",
        time: "13:30",
        activity: "Speed Connections",
        description: "One-on-one rapid networking with speakers and organizers.",
        location: "Various Rooms",
        duration: "1.5 hours",
      },
      {
        id: "d3-5",
        time: "15:00",
        activity: "The Reveal Ceremony",
        description: "The grand finale celebrating delegate transformation.",
        location: "Grand Ballroom",
        duration: "1.5 hours",
      },
      {
        id: "d3-6",
        time: "16:30",
        activity: "Closing Remarks",
        description: "Official closing ceremony and farewell.",
        location: "Grand Ballroom",
        duration: "1 hour",
      },
    ],
  },
];

export const programSchedule = initialProgramSchedule;

// Dynamic In-Memory Store for Vercel/SQLite Fallback
let dynamicSchedule: DaySchedule[] = JSON.parse(JSON.stringify(initialProgramSchedule));

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
      CREATE TABLE IF NOT EXISTS program_events (
        id TEXT PRIMARY KEY,
        day_number INTEGER NOT NULL,
        day_title TEXT NOT NULL,
        date_str TEXT NOT NULL,
        time TEXT NOT NULL,
        activity TEXT NOT NULL,
        description TEXT,
        location TEXT NOT NULL,
        duration TEXT,
        speaker TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    dbInstance = db;
    return dbInstance;
  } catch (error) {
    console.warn("SQLite init for program failed, using dynamic memory store:", error);
    useMemoryStore = true;
    return null;
  }
}

export function getDynamicProgramSchedule(): DaySchedule[] {
  const db = getDb();
  if (!db) {
    return dynamicSchedule;
  }

  try {
    const rows = db.prepare("SELECT * FROM program_events ORDER BY day_number ASC, time ASC").all() as any[];
    if (rows.length === 0) {
      return dynamicSchedule;
    }

    const result: DaySchedule[] = [
      { day: "DAY 01", date: "March 15, 2026", events: [] },
      { day: "DAY 02", date: "March 16, 2026", events: [] },
      { day: "DAY 03", date: "March 17, 2026", events: [] },
    ];

    rows.forEach((row) => {
      const dayIndex = Math.max(0, Math.min(2, (row.day_number || 1) - 1));
      result[dayIndex].events.push({
        id: row.id,
        time: row.time,
        activity: row.activity,
        description: row.description || "",
        location: row.location,
        duration: row.duration || undefined,
        speaker: row.speaker || undefined,
        day_number: row.day_number,
      });
    });

    return result;
  } catch (e) {
    return dynamicSchedule;
  }
}

export function saveProgramEvent(eventData: {
  id?: string;
  day_number: number;
  time: string;
  activity: string;
  description: string;
  location: string;
  duration?: string;
  speaker?: string;
}): ScheduleItem {
  const id = eventData.id || `event-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const dayNumber = Math.max(1, Math.min(3, eventData.day_number));
  const dayTitles = ["DAY 01", "DAY 02", "DAY 03"];
  const dateStrs = ["March 15, 2026", "March 16, 2026", "March 17, 2026"];

  const newItem: ScheduleItem = {
    id,
    time: eventData.time,
    activity: eventData.activity,
    description: eventData.description,
    location: eventData.location,
    duration: eventData.duration,
    speaker: eventData.speaker,
    day_number: dayNumber,
  };

  const db = getDb();
  if (db) {
    const stmt = db.prepare(`
      INSERT INTO program_events (id, day_number, day_title, date_str, time, activity, description, location, duration, speaker)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        day_number=excluded.day_number,
        time=excluded.time,
        activity=excluded.activity,
        description=excluded.description,
        location=excluded.location,
        duration=excluded.duration,
        speaker=excluded.speaker;
    `);

    stmt.run(
      id,
      dayNumber,
      dayTitles[dayNumber - 1],
      dateStrs[dayNumber - 1],
      eventData.time,
      eventData.activity,
      eventData.description || "",
      eventData.location,
      eventData.duration || null,
      eventData.speaker || null
    );
  }

  // Also update dynamic memory store
  const targetDay = dynamicSchedule[dayNumber - 1];
  const existingIdx = targetDay.events.findIndex((e) => e.id === id);
  if (existingIdx !== -1) {
    targetDay.events[existingIdx] = newItem;
  } else {
    targetDay.events.push(newItem);
    targetDay.events.sort((a, b) => a.time.localeCompare(b.time));
  }

  return newItem;
}

export function deleteProgramEvent(id: string): boolean {
  const db = getDb();
  if (db) {
    try {
      db.prepare("DELETE FROM program_events WHERE id = ?").run(id);
    } catch (e) {
      console.warn("Error deleting event from SQLite:", e);
    }
  }

  let deleted = false;
  dynamicSchedule.forEach((day) => {
    const idx = day.events.findIndex((e) => e.id === id);
    if (idx !== -1) {
      day.events.splice(idx, 1);
      deleted = true;
    }
  });

  return deleted;
}

export function resetProgramScheduleToDefault(): DaySchedule[] {
  const db = getDb();
  if (db) {
    try {
      db.prepare("DELETE FROM program_events").run();
      const stmt = db.prepare(`
        INSERT INTO program_events (id, day_number, day_title, date_str, time, activity, description, location, duration, speaker)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `);

      initialProgramSchedule.forEach((day, dayIdx) => {
        day.events.forEach((evt) => {
          stmt.run(
            evt.id,
            dayIdx + 1,
            day.day,
            day.date,
            evt.time,
            evt.activity,
            evt.description,
            evt.location,
            evt.duration || null,
            evt.speaker || null
          );
        });
      });
    } catch (e) {
      console.warn("Reset program SQLite error:", e);
    }
  }

  dynamicSchedule = JSON.parse(JSON.stringify(initialProgramSchedule));
  return dynamicSchedule;
}
