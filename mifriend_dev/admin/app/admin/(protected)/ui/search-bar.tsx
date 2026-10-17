"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

export type FilterDef = {
  name: string;
  allLabel: string;
  options: { value: string; label: string }[];
};

export function SearchBar({
  placeholder = "검색",
  filters = [],
}: {
  placeholder?: string;
  filters?: FilterDef[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [, startTransition] = useTransition();

  const [q, setQ] = useState(sp.get("q") ?? "");
  const firstRun = useRef(true);

  function apply(patch: Record<string, string>) {
    const params = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v) params.set(k, v);
      else params.delete(k);
    }
    params.delete("msg");
    params.delete("error");
    params.delete("page");
    const query = params.toString();
    startTransition(() => {
      router.replace(query ? `${pathname}?${query}` : pathname);
    });
  }

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const t = setTimeout(() => {
      if ((sp.get("q") ?? "") !== q) apply({ q });
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9F9C]">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden>
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
            <line x1="12.5" y1="12.5" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="min-h-11 w-full rounded border border-[#DCDCD7] bg-white pl-9 pr-3 text-base text-[#231F20] outline-none focus:border-[#EF4023] focus:ring-1 focus:ring-[#EF4023]"
        />
      </div>

      {filters.map((f) => (
        <select
          key={f.name}
          value={sp.get(f.name) ?? ""}
          onChange={(e) => apply({ [f.name]: e.target.value })}
          className="min-h-11 rounded border border-[#DCDCD7] bg-white px-3 text-sm text-[#231F20] outline-none focus:border-[#EF4023] focus:ring-1 focus:ring-[#EF4023]"
        >
          <option value="">{f.allLabel}</option>
          {f.options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ))}
    </div>
  );
}
