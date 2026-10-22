import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* ── PC: sidebar layout ── */}
      <div className="hidden md:flex" style={{ minHeight: "100vh" }}>
        <aside
          style={{
            width: 220,
            flexShrink: 0,
            background: "var(--night)",
            color: "var(--surface)",
            padding: "24px 0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Link
            href="/admin"
            style={{
              padding: "0 20px 20px",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              font: "700 18px/24px var(--font-sans)",
              color: "var(--surface)",
              textDecoration: "none",
            }}
          >
            마이프랜 어드민
          </Link>
          <nav style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 2 }}>
            <Link
              href="/admin/brands"
              style={{
                padding: "12px 20px",
                font: "500 14px/20px var(--font-sans)",
                color: "var(--surface)",
                textDecoration: "none",
                borderLeft: "3px solid var(--red-500)",
              }}
            >
              브랜드 관리
            </Link>
          </nav>
          <div style={{ marginTop: "auto", padding: "16px 20px" }}>
            <Link
              href="/"
              style={{
                font: "400 13px/18px var(--font-sans)",
                color: "var(--smoke)",
                textDecoration: "none",
              }}
            >
              ← 사이트로 돌아가기
            </Link>
          </div>
        </aside>
        <main style={{ flex: 1, background: "var(--surface-muted)", minWidth: 0 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: 32 }}>
            {children}
          </div>
        </main>
      </div>

      {/* ── Mobile: top bar layout ── */}
      <div className="md:hidden" style={{ minHeight: "100vh", background: "var(--surface-muted)" }}>
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 56,
            padding: "0 16px",
            background: "var(--night)",
            color: "var(--surface)",
          }}
        >
          <Link
            href="/admin"
            style={{
              font: "700 16px/1 var(--font-sans)",
              color: "var(--surface)",
              textDecoration: "none",
            }}
          >
            마이프랜 어드민
          </Link>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <Link
              href="/admin/brands"
              style={{
                font: "500 13px/1 var(--font-sans)",
                color: "var(--surface)",
                textDecoration: "none",
              }}
            >
              브랜드
            </Link>
            <Link
              href="/"
              style={{
                font: "400 12px/1 var(--font-sans)",
                color: "var(--smoke)",
                textDecoration: "none",
              }}
            >
              사이트 →
            </Link>
          </div>
        </header>
        <main style={{ padding: 16 }}>
          {children}
        </main>
      </div>
    </>
  );
}
