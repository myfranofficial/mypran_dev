import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
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
              borderLeft: "3px solid transparent",
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
            사이트로 돌아가기
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, background: "var(--surface-muted)", minWidth: 0 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: 32 }}>
          {children}
        </div>
      </main>
    </div>
  );
}
