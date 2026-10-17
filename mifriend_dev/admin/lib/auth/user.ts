import "server-only";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { getSessionUserId } from "./session";
import { verifyPassword } from "./password";

export type UserRole = "admin" | "super_admin";

const STAFF_ROLES: UserRole[] = ["admin", "super_admin"];
const SUPER_ROLES: UserRole[] = ["super_admin"];

export const ROLE_LABEL: Record<string, string> = {
  super_admin: "슈퍼 어드민",
  admin: "관리자",
};

export interface User {
  id: number;
  email: string;
  name: string | null;
  role: UserRole;
  created_at: string;
}

interface UserWithHash extends User {
  password_hash: string;
}

export function isStaff(u: User): boolean {
  return STAFF_ROLES.includes(u.role);
}

export function canWrite(u: User): boolean {
  return STAFF_ROLES.includes(u.role);
}

export function canManageStaff(u: User): boolean {
  return SUPER_ROLES.includes(u.role);
}

export function getUserByEmail(email: string): UserWithHash | undefined {
  return getDb()
    .prepare(
      "SELECT id, email, name, role, created_at, password_hash FROM users WHERE email = ?"
    )
    .get(email) as UserWithHash | undefined;
}

export function getUserById(id: number): User | undefined {
  return getDb()
    .prepare(
      "SELECT id, email, name, role, created_at FROM users WHERE id = ?"
    )
    .get(id) as User | undefined;
}

export async function getCurrentUser(): Promise<User | null> {
  const uid = await getSessionUserId();
  if (uid === null) return null;
  return getUserById(uid) ?? null;
}

export async function requireAdmin(): Promise<User> {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) {
    redirect("/admin/login");
  }
  return user;
}

export async function requireWrite(): Promise<User> {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) {
    redirect("/admin/login");
  }
  return user;
}

export async function requireSuperAdmin(): Promise<User> {
  const user = await getCurrentUser();
  if (!user || !isStaff(user)) {
    redirect("/admin/login");
  }
  if (!canManageStaff(user)) {
    redirect("/admin?error=forbidden");
  }
  return user;
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  if (!password) return false;
  const user = await getCurrentUser();
  if (!user || !canWrite(user)) return false;
  const withHash = getUserByEmail(user.email);
  if (!withHash) return false;
  return verifyPassword(password, withHash.password_hash);
}
