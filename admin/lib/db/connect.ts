import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { SCHEMA_SQL } from "./schema";

export function resolveDbPath(): string {
  return (
    process.env.DATABASE_PATH ?? path.join(process.cwd(), "data", "hiq.db")
  );
}

export function openDb(dbPath = resolveDbPath()): Database.Database {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.exec(SCHEMA_SQL);

  return db;
}
