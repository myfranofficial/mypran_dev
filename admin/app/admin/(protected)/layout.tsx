import type { ReactNode } from "react";
import { requireAdmin } from "@/lib/auth/user";
import { countUnread } from "@/lib/db/consultations";
import { logoutAction } from "./actions";
import { MobileNav } from "./mobile-nav";
import { SidebarNav } from "./sidebar-nav";
import { SectionTabs } from "./section-tabs";

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireAdmin();
  const unreadCount = countUnread();

  return (
    <div className="min-h-dvh bg-[#ECECE8] text-[#231F20] lg:flex">
      <MobileNav email={user.email} unreadCount={unreadCount} />

      <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-60 lg:shrink-0 lg:flex-col lg:border-r lg:border-[#E5E7EA] lg:bg-[#FAFAF9]">
        <div className="flex shrink-0 items-center gap-2.5 border-b border-[#E5E7EA] px-5 py-5">
          <span className="flex flex-col leading-none">
            <span className="text-[15px] font-extrabold tracking-[0.06em] text-[#231F20]">
              HiQ BILLIARD
            </span>
            <span className="mt-1 text-[10px] font-semibold tracking-[0.22em] text-[#9E9F9C]">
              ADMIN
            </span>
          </span>
        </div>

        <SidebarNav unreadCount={unreadCount} />

        <div className="shrink-0 border-t border-[#E5E7EA] p-4">
          <p className="mb-2 truncate text-xs text-[#9E9F9C]">{user.email}</p>
          <form action={logoutAction}>
            <button
              type="submit"
              className="min-h-11 w-full rounded border border-[#DCDCD7] bg-white px-4 text-sm font-medium text-[#585958] transition-colors hover:border-[#EF4023] hover:text-[#EF4023]"
            >
              로그아웃
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-4 lg:p-8">
        <SectionTabs />
        {children}
      </main>
    </div>
  );
}
