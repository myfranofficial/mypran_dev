"use client";

import Link from "next/link";

/** Sticky bottom bar for mobile: phone + consult CTA */
export default function MobileBottomBar() {
  return (
    <div
      className="md:hidden"
      style={{
        position: "sticky",
        bottom: 0,
        display: "grid",
        gridTemplateColumns: "112px minmax(0, 1fr)",
        gap: 8,
        padding: "10px 16px calc(14px + env(safe-area-inset-bottom, 0px))",
        background: "var(--surface)",
        borderTop: "1px solid var(--line)",
        zIndex: 90,
      }}
    >
      <a
        href="tel:01047086091"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: 52,
          padding: 0,
          background: "transparent",
          color: "var(--ink)",
          border: "1px solid var(--ink)",
          borderRadius: "var(--radius-md)",
          font: "700 15px/1 var(--font-sans)",
          textDecoration: "none",
        }}
      >
        전화 상담
      </a>
      <Link
        href="/consult"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: 52,
          background: "var(--red-500)",
          color: "var(--on-brand)",
          borderRadius: "var(--radius-md)",
          border: "1px solid transparent",
          font: "700 16px/1 var(--font-sans)",
          textDecoration: "none",
        }}
      >
        무료 상담 신청
      </Link>
    </div>
  );
}
