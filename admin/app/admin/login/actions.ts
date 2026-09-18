"use server";

import { redirect } from "next/navigation";
import { getUserByEmail, isStaff } from "@/lib/auth/user";
import { verifyPassword } from "@/lib/auth/password";
import { setSessionCookie } from "@/lib/auth/session";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  // 허니팟
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  // 레이트리밋 (IP당 10분에 5회)
  const ip = await getClientIp();
  const rl = checkRateLimit(`admin-login:${ip}`, 5, 10 * 60 * 1000);
  if (!rl.ok) {
    return { error: `요청이 많습니다. ${rl.retryAfter}초 후 다시 시도해 주세요.` };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "이메일과 비밀번호를 입력하세요." };
  }

  const user = getUserByEmail(email);

  if (!user || !isStaff(user) || !verifyPassword(password, user.password_hash)) {
    return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  await setSessionCookie(user.id);
  redirect("/admin");
}
