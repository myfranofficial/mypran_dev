"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#ECECE8] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="text-2xl font-extrabold tracking-[0.06em] text-[#231F20]">
            HiQ BILLIARD
          </span>
          <div className="mt-2 text-[11px] font-semibold tracking-[0.28em] text-[#9E9F9C]">
            ADMIN
          </div>
          <p className="mt-4 text-sm text-[#9E9F9C]">관리자 계정으로 로그인하세요.</p>
        </div>

        <form
          action={formAction}
          className="space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-6 shadow-sm"
        >
          {/* 허니팟 */}
          <div aria-hidden style={{ position: "absolute", left: "-9999px" }}>
            <label>
              웹사이트
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          {state.error && (
            <p
              role="alert"
              className="rounded bg-[#FCE4DF] px-3 py-2 text-sm text-[#E03A1E]"
            >
              {state.error}
            </p>
          )}

          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-[#585958]">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              className="min-h-11 w-full rounded border border-[#DCDCD7] bg-white px-3 text-base text-[#231F20] outline-none focus:border-[#EF4023] focus:ring-1 focus:ring-[#EF4023]"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-[#585958]">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="min-h-11 w-full rounded border border-[#DCDCD7] bg-white px-3 text-base text-[#231F20] outline-none focus:border-[#EF4023] focus:ring-1 focus:ring-[#EF4023]"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="min-h-11 w-full rounded-md bg-[#EF4023] px-4 font-bold text-white transition-colors hover:bg-[#D63418] disabled:opacity-60"
          >
            {pending ? "확인 중…" : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
