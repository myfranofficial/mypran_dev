"use client";

import Link from "next/link";
import Logo from "./Logo";
import { PhoneIcon } from "./icons";

const NAV_ITEMS = [
  { label: "브랜드", href: "/brands" },
  { label: "창업 컨설팅", href: "/consulting" },
  { label: "입점 안내", href: "/listing" },
  { label: "성공 사례", href: "/cases" },
  { label: "회사소개", href: "/about" },
  { label: "상담 신청", href: "/consult" },
];

export default function Header() {
  return (
    <header
      style={{
        background: "var(--surface)",
        borderBottom: "1px solid var(--line)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Row 1 — Logo / Phone / CTA */}
      <div
        className="container-mf"
        style={{
          height: 80,
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <Link
          href="/"
          aria-label="마이프랜 홈"
          style={{ textDecoration: "none", color: "var(--ink)" }}
        >
          <Logo iconSize={40} />
        </Link>
        <div style={{ flexGrow: 1 }} />
        {/* Phone — hidden on mobile */}
        <a
          href="tel:01047086091"
          className="hidden md:flex"
          style={{
            alignItems: "center",
            gap: 8,
            font: "700 16px/20px var(--font-sans)",
            color: "var(--ink)",
            textDecoration: "none",
          }}
        >
          <PhoneIcon size={20} fill="var(--red-500)" />
          010-4708-6091
        </a>
        {/* Desktop CTA */}
        <Link
          href="/consult"
          className="hidden md:inline-flex"
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 48,
            padding: "0 28px",
            background: "var(--red-500)",
            color: "var(--on-brand)",
            borderRadius: "var(--radius-md)",
            border: "1px solid transparent",
            font: "700 16px/1 var(--font-sans)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          무료 상담신청
        </Link>
        {/* Mobile CTA */}
        <Link
          href="/consult"
          className="md:hidden"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: 40,
            padding: "0 16px",
            background: "var(--red-500)",
            color: "var(--on-brand)",
            borderRadius: "var(--radius-md)",
            border: "1px solid transparent",
            font: "700 14px/1 var(--font-sans)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          상담신청
        </Link>
      </div>

      {/* Row 2 — Navigation tabs */}
      <nav
        aria-label="주 메뉴"
        className="container-mf hscroll"
        style={{
          display: "flex",
          gap: 48,
          whiteSpace: "nowrap",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: "flex",
              alignItems: "center",
              height: 56,
              font: "500 16px/20px var(--font-sans)",
              color: "var(--ink)",
              textDecoration: "none",
              borderBottom: "3px solid transparent",
              boxSizing: "border-box",
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
