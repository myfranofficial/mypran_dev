"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { RowMenu } from "./row-menu";
import * as s from "./styles";

type SelectionCtx = { ids: (string | number)[]; clear: () => void };
const SelectionContext = createContext<SelectionCtx>({ ids: [], clear: () => {} });
export function useSelection(): SelectionCtx {
  return useContext(SelectionContext);
}

export type Column = {
  key?: string;
  label: ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
  headerClassName?: string;
  sortKey?: string;
};

export type RowVM = {
  id: string | number;
  href: string;
  cells: ReactNode[];
  actions?: ReactNode;
  mobileTitle: ReactNode;
  mobileMeta?: ReactNode;
};

const alignClass = (a?: Column["align"]) =>
  a === "right" ? "text-right" : a === "center" ? "text-center" : "text-left";

function useRowNav(href: string) {
  const router = useRouter();
  const guard = (t: EventTarget | null) =>
    (t as HTMLElement | null)?.closest("a,button,input,select,textarea,label,[data-no-rownav]");
  return {
    onClick: (e: React.MouseEvent) => { if (!guard(e.target)) router.push(href); },
    onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter" && !guard(e.target)) router.push(href); },
  };
}

export function DataTable({
  columns,
  rows,
  total,
  tableId,
  selectable = false,
  bulkBar,
}: {
  columns: Column[];
  rows: RowVM[];
  total?: number;
  tableId?: string;
  selectable?: boolean;
  bulkBar?: ReactNode;
}) {
  const hasActions = rows.some((r) => r.actions);
  const keys = columns.map((c, i) => c.key ?? String(i));
  const origIndex = new Map(keys.map((k, i) => [k, i]));

  const [order, setOrder] = useState<string[]>(keys);
  const [widths, setWidths] = useState<Record<string, number>>({});
  const dragKey = useRef<string | null>(null);
  const resizing = useRef(false);

  const [selected, setSelected] = useState<Set<string | number>>(new Set());
  const rowIdsKey = rows.map((r) => r.id).join(",");
  useEffect(() => {
    if (!selectable) return;
    setSelected((prev) => {
      if (prev.size === 0) return prev;
      const ids = new Set(rows.map((r) => r.id));
      const next = new Set([...prev].filter((id) => ids.has(id)));
      return next.size === prev.size ? prev : next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowIdsKey, selectable]);

  const toggleOne = (id: string | number) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const allChecked = selectable && rows.length > 0 && rows.every((r) => selected.has(r.id));
  const toggleAll = () =>
    setSelected((prev) => (rows.every((r) => prev.has(r.id)) ? new Set() : new Set(rows.map((r) => r.id))));
  const clearSelection = () => setSelected(new Set());

  const storeKey = tableId ? `hiq_grid_${tableId}` : "";

  useEffect(() => {
    if (!storeKey) return;
    try {
      const raw = localStorage.getItem(storeKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { order?: string[]; widths?: Record<string, number> };
      if (Array.isArray(parsed.order)) {
        const kept = parsed.order.filter((k) => keys.includes(k));
        const added = keys.filter((k) => !kept.includes(k));
        setOrder([...kept, ...added]);
      }
      if (parsed.widths) setWidths(parsed.widths);
    } catch { /* noop */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeKey, keys.join(",")]);

  const persist = (o: string[], w: Record<string, number>) => {
    if (storeKey) {
      try { localStorage.setItem(storeKey, JSON.stringify({ order: o, widths: w })); } catch { /* noop */ }
    }
  };

  const reset = () => {
    setOrder(keys);
    setWidths({});
    if (storeKey) try { localStorage.removeItem(storeKey); } catch { /* noop */ }
  };

  const startResize = (key: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resizing.current = true;
    const th = (e.currentTarget as HTMLElement).closest("th") as HTMLElement | null;
    const startX = e.clientX;
    const startW = th?.offsetWidth ?? widths[key] ?? 120;
    const onMove = (ev: MouseEvent) => {
      const w = Math.max(60, startW + (ev.clientX - startX));
      setWidths((prev) => ({ ...prev, [key]: w }));
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      setWidths((prev) => { persist(order, prev); return prev; });
      setTimeout(() => { resizing.current = false; }, 0);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const onDrop = (targetKey: string) => {
    const from = dragKey.current;
    dragKey.current = null;
    if (!from || from === targetKey) return;
    const next = [...order];
    const fi = next.indexOf(from);
    const ti = next.indexOf(targetKey);
    if (fi < 0 || ti < 0) return;
    next.splice(fi, 1);
    next.splice(ti, 0, from);
    setOrder(next);
    persist(next, widths);
  };

  const displayKeys = order.filter((k) => origIndex.has(k));

  return (
    <div className="mt-5">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-3">
          {total != null ? (
            <p className="text-sm text-[#9E9F9C]">
              총 <span className="font-semibold text-[#231F20]">{total.toLocaleString("ko-KR")}</span>개
            </p>
          ) : <span />}
        </div>
        {tableId && (
          <button type="button" onClick={reset} className="text-xs text-[#9E9F9C] underline-offset-2 hover:text-[#585958] hover:underline">
            열 초기화
          </button>
        )}
      </div>

      {selectable && selected.size > 0 && (
        <SelectionContext.Provider value={{ ids: [...selected], clear: clearSelection }}>
          <div className="mb-3 rounded border border-[#EF4023] bg-[#FCE4DF] p-3">
            <div className="mb-2.5 flex items-center justify-between gap-2 border-b border-[#EF4023] pb-2">
              <span className="text-sm text-[#585958]">
                <span className="font-bold text-[#231F20]">{selected.size}개</span> 선택됨
              </span>
              <button type="button" onClick={clearSelection} className="text-xs text-[#9E9F9C] underline-offset-2 hover:text-[#EF4023] hover:underline">
                선택 해제
              </button>
            </div>
            {bulkBar}
          </div>
        </SelectionContext.Provider>
      )}

      <div className="hidden overflow-x-auto rounded border border-[#DCDCD7] bg-white shadow-sm md:block">
        <table className={s.table} style={{ tableLayout: "auto" }}>
          <colgroup>
            {selectable && <col style={{ width: "40px" }} />}
            {displayKeys.map((k) => (
              <col key={k} style={widths[k] ? { width: `${widths[k]}px` } : undefined} />
            ))}
            {hasActions && <col style={{ width: "48px" }} />}
          </colgroup>
          <thead className={s.thead}>
            <tr>
              {selectable && (
                <th className={`${s.th} text-center`}>
                  <input type="checkbox" aria-label="전체 선택" checked={allChecked} onChange={toggleAll} className="h-4 w-4 cursor-pointer accent-[#EF4023]" />
                </th>
              )}
              {displayKeys.map((k) => {
                const c = columns[origIndex.get(k)!];
                return (
                  <th
                    key={k}
                    draggable={!!tableId}
                    onDragStart={(e) => {
                      if (resizing.current) { e.preventDefault(); return; }
                      dragKey.current = k;
                      e.dataTransfer.effectAllowed = "move";
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => onDrop(k)}
                    className={`relative ${s.th} ${alignClass(c.align)} ${c.headerClassName ?? ""} ${tableId ? "cursor-move select-none" : ""}`}
                  >
                    {c.sortKey ? <SortHeader sortKey={c.sortKey}>{c.label}</SortHeader> : c.label}
                    {tableId && (
                      <span
                        onMouseDown={(e) => startResize(k, e)}
                        onDragStart={(e) => e.preventDefault()}
                        className="absolute right-0 top-0 z-10 h-full w-1.5 cursor-col-resize hover:bg-[#EF4023]"
                        aria-hidden
                      />
                    )}
                  </th>
                );
              })}
              {hasActions && <th className={`${s.th} text-center`}>관리</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <TableRow key={r.id} row={r} displayKeys={displayKeys} origIndex={origIndex} columns={columns} hasActions={hasActions} even={ri % 2 === 1} selectable={selectable} checked={selected.has(r.id)} onToggle={() => toggleOne(r.id)} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 space-y-2.5 md:hidden">
        {rows.map((r) => (
          <CardRow key={r.id} row={r} selectable={selectable} checked={selected.has(r.id)} onToggle={() => toggleOne(r.id)} />
        ))}
      </div>
    </div>
  );
}

function SortHeader({ sortKey, children }: { sortKey: string; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const active = sp.get("sort") === sortKey;
  const dir = sp.get("dir") === "desc" ? "desc" : "asc";
  const nextDir = active && dir === "asc" ? "desc" : "asc";
  const onClick = () => {
    const params = new URLSearchParams(sp.toString());
    params.set("sort", sortKey);
    params.set("dir", nextDir);
    params.delete("page");
    params.delete("msg");
    params.delete("error");
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-1 font-bold text-[#585958] hover:text-[#EF4023]">
      {children}
      <span className={`text-[10px] ${active ? "text-[#EF4023]" : "text-[#9E9F9C]"}`}>{active ? (dir === "asc" ? "▲" : "▼") : "↕"}</span>
    </button>
  );
}

function TableRow({ row, displayKeys, origIndex, columns, hasActions, even, selectable, checked, onToggle }: {
  row: RowVM; displayKeys: string[]; origIndex: Map<string, number>; columns: Column[]; hasActions: boolean; even: boolean; selectable?: boolean; checked?: boolean; onToggle?: () => void;
}) {
  const nav = useRowNav(row.href);
  return (
    <tr className={`cursor-pointer transition-colors hover:bg-[#F7F7F5] [&:last-child>td]:border-0 ${checked ? "bg-[#FCE4DF]" : even ? "bg-[#F7F7F5]" : "bg-white"}`} tabIndex={0} {...nav}>
      {selectable && (
        <td className={`${s.td} text-center`}>
          <input type="checkbox" aria-label="행 선택" checked={!!checked} onChange={onToggle} onClick={(e) => e.stopPropagation()} className="h-4 w-4 cursor-pointer accent-[#EF4023]" />
        </td>
      )}
      {displayKeys.map((k, di) => {
        const oi = origIndex.get(k)!;
        const c = columns[oi];
        const cell = row.cells[oi];
        return (
          <td key={k} className={`${s.td} ${alignClass(c.align)} ${c.className ?? ""}`}>
            {di === 0 ? (
              <Link href={row.href} className="block truncate font-bold text-[#231F20] underline-offset-2 hover:underline">{cell}</Link>
            ) : cell}
          </td>
        );
      })}
      {hasActions && (
        <td className={`${s.td} text-center`}>{row.actions && <RowMenu>{row.actions}</RowMenu>}</td>
      )}
    </tr>
  );
}

function CardRow({ row, selectable, checked, onToggle }: { row: RowVM; selectable?: boolean; checked?: boolean; onToggle?: () => void }) {
  const nav = useRowNav(row.href);
  return (
    <div className={`relative cursor-pointer rounded border p-4 shadow-sm transition-colors ${checked ? "border-[#EF4023] bg-[#FCE4DF]" : "border-[#DCDCD7] bg-white hover:bg-[#F7F7F5]"}`} role="link" tabIndex={0} {...nav}>
      {row.actions && <div className="absolute right-1.5 top-2"><RowMenu>{row.actions}</RowMenu></div>}
      <div className={`flex items-start gap-2.5 ${row.actions ? "pr-10" : ""}`}>
        {selectable && <input type="checkbox" aria-label="행 선택" checked={!!checked} onChange={onToggle} onClick={(e) => e.stopPropagation()} className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#EF4023]" />}
        <Link href={row.href} className="block font-medium text-[#231F20]">{row.mobileTitle}</Link>
      </div>
      {row.mobileMeta && <div className="mt-1.5 text-sm text-[#9E9F9C]">{row.mobileMeta}</div>}
    </div>
  );
}
