import "server-only";
import { getDb } from "./index";

export function getSetting(key: string): string | null {
  const row = getDb().prepare("SELECT value FROM settings WHERE key = ?").get(key) as
    | { value: string | null }
    | undefined;
  return row?.value ?? null;
}

export function setSetting(key: string, value: string): void {
  getDb()
    .prepare(
      "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
    )
    .run(key, value);
}

export function getSettings(keys: string[]): Record<string, string> {
  const db = getDb();
  const result: Record<string, string> = {};
  for (const key of keys) {
    const row = db.prepare("SELECT value FROM settings WHERE key = ?").get(key) as
      | { value: string | null }
      | undefined;
    if (row?.value != null) result[key] = row.value;
  }
  return result;
}

export function setSettings(entries: Record<string, string>): void {
  const db = getDb();
  const stmt = db.prepare(
    "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
  );
  const tx = db.transaction(() => {
    for (const [k, v] of Object.entries(entries)) {
      stmt.run(k, v);
    }
  });
  tx();
}

export function getAllSettings(): Record<string, string> {
  const rows = getDb()
    .prepare("SELECT key, value FROM settings")
    .all() as { key: string; value: string | null }[];
  const result: Record<string, string> = {};
  for (const row of rows) {
    if (row.value != null) result[row.key] = row.value;
  }
  return result;
}
