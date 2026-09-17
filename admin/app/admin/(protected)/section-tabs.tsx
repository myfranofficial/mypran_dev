"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { findGroup, activeTabHref } from "./nav-config";

export function SectionTabs() {
  const pathname = usePathname();
  const group = findGroup(pathname);
  if (!group?.tabs) return null;
  const active = activeTabHref(pathname, group);

  return (
    <div className="mx-auto mb-6 max-w-[1280px]">
      <div className="flex gap-6 border-b border-[#E5E7EA]">
        {group.tabs.map((t) => {
          const on = t.href === active;
          return (
            <Link
              key={t.href}
              href={t.href}
              aria-current={on ? "page" : undefined}
              className={`-mb-px border-b-2 pb-2.5 pt-1 text-sm font-medium transition-colors ${
                on
                  ? "border-[#EF4023] font-bold text-[#EF4023]"
                  : "border-transparent text-[#9E9F9C] hover:text-[#231F20]"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
