import "server-only";
import type Database from "better-sqlite3";
import { openDb } from "./connect";
import { hashPassword } from "@/lib/auth/password";

type DbInstance = Database.Database;

const globalForDb = globalThis as unknown as { __hiqDb?: DbInstance };

function ensureAdminUser(db: DbInstance): void {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;

  const staffExists = db
    .prepare("SELECT 1 FROM users WHERE role IN ('super_admin','admin') LIMIT 1")
    .get();
  if (staffExists) return;

  db.prepare(
    "INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, 'super_admin')"
  ).run(email, hashPassword(password), process.env.ADMIN_NAME ?? "관리자");

  console.log(`[db] 슈퍼 어드민 계정 생성됨: ${email}`);
}

export function getDb(): DbInstance {
  if (!globalForDb.__hiqDb) {
    const db = openDb();
    ensureAdminUser(db);
    globalForDb.__hiqDb = db;
  }
  return globalForDb.__hiqDb;
}
