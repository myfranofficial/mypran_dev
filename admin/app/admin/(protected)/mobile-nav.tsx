"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "./actions";
import { ADMIN_GROUPS, isPathInGroup } from "./nav-config";
import { NAV_ICONS } from "./ui/icons";

export function MobileNav({
  email,
  unreadCount,
}: {
  email: string;
  unreadCount: number;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <header className="flex items-center justify-between border-b border-[#E5E7EA] bg-[#FAFAF9] px-4 py-3">
        <span className="flex items-center gap-2">
          <span className="text-[15px] font-extrabold tracking-[0.06em] text-[#231F20]">
            HiQ BILLIARD{" "}
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#9E9F9C]">
              ADMIN
            </span>
          </span>
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="메뉴 열기"
          aria-expanded={open}
          className="inline-flex h-11 w-11 items-center justify-center rounded text-[#585958] hover:bg-[#F1F1EF]"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="관리자 메뉴">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[80%] flex-col bg-[#FAFAF9] shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E5E7EA] px-4 py-3">
              <span className="text-base font-extrabold tracking-[0.08em] text-[#231F20]">
                MENU
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="메뉴 닫기"
                className="inline-flex h-11 w-11 items-center justify-center rounded text-[#585958] hover:bg-[#F1F1EF]"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
              {ADMIN_GROUPS.map((g) => {
                const Icon = NAV_ICONS[g.icon];
                const active = isPathInGroup(pathname, g);
                return (
                  <Link
                    key={g.href}
                    href={g.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-11 items-center gap-2.5 border-l-[3px] px-3 text-sm transition-colors ${
                      active
                        ? "border-[#EF4023] bg-[#FCE4DF] font-bold text-[#EF4023]"
                        : "border-transparent font-medium text-[#585958] hover:bg-[#F1F1EF] hover:text-[#231F20]"
                    }`}
                  >
                    {Icon && <Icon size={18} />}
                    <span className="flex-1">{g.label}</span>
                    {g.badge && unreadCount > 0 && (
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#EF4023] px-1.5 text-[11px] font-bold text-white">
                        {unreadCount > 99 ? "99+" : unreadCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-[#E5E7EA] p-4">
              <p className="mb-2 truncate text-xs text-[#9E9F9C]">{email}</p>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="min-h-11 w-full rounded border border-[#DCDCD7] bg-white px-4 text-sm font-medium text-[#585958] transition-colors hover:border-[#EF4023] hover:text-[#EF4023]"
                >
                  로그아웃
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
