"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "./Logo";
import { PhoneIcon, SearchIcon, CloseIcon } from "./icons";

const NAV_ITEMS = [
  { label: "마이프랜소개", href: "/about" },
  { label: "브랜드찾기", href: "/brands" },
  { label: "브랜드비교", href: "/compare" },
  { label: "창업상담", href: "/consult" },
  { label: "브랜드입점", href: "/listing" },
  { label: "창업정보", href: "/consulting" },
];

export default function Header() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/brands?q=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setQuery("");
  }

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
      {/* Row 1 — Logo / Search / Phone / CTA */}
      <div
        className="container-mf"
        style={{
          height: 80,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <Link
          href="/"
          aria-label="마이프랜 홈"
          style={{ textDecoration: "none", color: "var(--ink)", flexShrink: 0 }}
        >
          <Logo iconSize={40} />
        </Link>

        {/* Search bar (PC) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex"
          style={{
            flex: 1,
            maxWidth: 400,
            marginLeft: 24,
            height: 42,
            alignItems: "center",
            background: "var(--surface-muted)",
            borderRadius: "var(--radius-md)",
            padding: "0 12px",
            gap: 8,
          }}
        >
          <SearchIcon size={18} fill="var(--ink-muted)" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="브랜드명을 검색하세요"
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              font: "400 14px/20px var(--font-sans)",
              color: "var(--ink)",
              outline: "none",
            }}
          />
        </form>

        <div style={{ flexGrow: 1 }} className="md:hidden" />

        {/* Mobile search toggle */}
        <button
          className="md:hidden touch-target"
          onClick={() => setSearchOpen(!searchOpen)}
          aria-label="검색"
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: 8,
          }}
        >
          {searchOpen ? (
            <CloseIcon size={22} fill="var(--ink)" />
          ) : (
            <SearchIcon size={22} fill="var(--ink)" />
          )}
        </button>

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
            marginLeft: "auto",
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

      {/* Mobile search bar (expandable) */}
      {searchOpen && (
        <form
          onSubmit={handleSearch}
          className="md:hidden"
          style={{
            display: "flex",
            alignItems: "center",
            height: 48,
            padding: "0 16px",
            gap: 8,
            borderTop: "1px solid var(--line)",
            background: "var(--surface-muted)",
          }}
        >
          <SearchIcon size={18} fill="var(--ink-muted)" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="브랜드명을 검색하세요"
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              font: "400 15px/20px var(--font-sans)",
              color: "var(--ink)",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              border: "none",
              background: "var(--red-500)",
              color: "var(--on-brand)",
              borderRadius: "var(--radius-sm)",
              padding: "6px 14px",
              font: "700 13px/1 var(--font-sans)",
              cursor: "pointer",
            }}
          >
            검색
          </button>
        </form>
      )}

      {/* Row 2 — Navigation tabs */}
      <nav
        aria-label="주 메뉴"
        className="container-mf hscroll"
        style={{
          display: "flex",
          gap: 32,
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
              height: 48,
              font: "500 15px/20px var(--font-sans)",
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
