"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_GROUPS, isPathInGroup } from "./nav-config";
import { NAV_ICONS } from "./ui/icons";

export function SidebarNav({ unreadCount }: { unreadCount: number }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
      {ADMIN_GROUPS.map((g) => {
        const Icon = NAV_ICONS[g.icon];
        const active = isPathInGroup(pathname, g);
        return (
          <Link
            key={g.href}
            href={g.href}
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
  );
}
