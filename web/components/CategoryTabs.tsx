"use client";

import type { BrandCategory } from "@/data/static-data";

export default function CategoryTabs({
  categories,
  activeId,
  onChange,
}: {
  categories: BrandCategory[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <nav
      className="hscroll"
      style={{
        display: "flex",
        gap: 8,
        paddingBottom: 4,
      }}
    >
      {categories.map((cat) => {
        const active = cat.id === activeId;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className="touch-target"
            style={{
              flex: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: 44,
              padding: "0 20px",
              border: `1px solid ${active ? "var(--ink)" : "var(--line-control)"}`,
              borderRadius: "var(--radius-pill)",
              background: active ? "var(--ink)" : "var(--surface)",
              color: active ? "var(--surface)" : "var(--ink)",
              font: `${active ? 700 : 500} 14px/1 var(--font-sans)`,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {cat.name}
          </button>
        );
      })}
    </nav>
  );
}
