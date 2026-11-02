import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { SCHEMA_SQL } from "./schema";

export function resolveDbPath(): string {
  return (
    process.env.DATABASE_PATH ?? path.join(process.cwd(), "data", "myfran.db")
  );
}

export function openDb(dbPath = resolveDbPath()): Database.Database {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });

  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.exec(SCHEMA_SQL);

  // 마이그레이션: notices 테이블에 첨부파일 + 조회수 컬럼 추가
  const noticeColumns = db.pragma("table_info(notices)") as { name: string }[];
  const noticeColNames = new Set(noticeColumns.map((c) => c.name));
  if (!noticeColNames.has("attachment_url")) {
    db.exec("ALTER TABLE notices ADD COLUMN attachment_url TEXT");
  }
  if (!noticeColNames.has("attachment_name")) {
    db.exec("ALTER TABLE notices ADD COLUMN attachment_name TEXT");
  }
  if (!noticeColNames.has("view_count")) {
    db.exec("ALTER TABLE notices ADD COLUMN view_count INTEGER DEFAULT 0");
  }

  return db;
}
