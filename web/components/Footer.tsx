import Link from "next/link";
import Logo from "./Logo";

const FOOTER_LINKS = [
  { label: "회사소개", href: "/about" },
  { label: "이용약관", href: "/terms" },
  { label: "개인정보처리방침", href: "/privacy", bold: true },
  { label: "입점안내", href: "/listing" },
  { label: "광고문의", href: "/consult" },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--line)" }}>
      {/* Desktop footer top */}
      <div
        className="container-mf hidden md:flex"
        style={{
          padding: "28px 24px",
          alignItems: "center",
          gap: 40,
        }}
      >
        <Logo iconSize={34} showSub={false} />
        <nav
          aria-label="하단 메뉴"
          style={{
            display: "flex",
            flexGrow: 1,
            font: "500 13px/18px var(--font-sans)",
          }}
        >
          {FOOTER_LINKS.map((link, i) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              style={{
                padding: "0 16px",
                color: "var(--ink)",
                textDecoration: "none",
                fontWeight: link.bold ? 700 : 500,
                borderLeft: i > 0 ? "1px solid var(--line)" : "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile footer nav */}
      <div className="md:hidden" style={{ padding: "24px 16px 0" }}>
        <nav
          aria-label="하단 메뉴"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 16px",
            font: "500 13px/18px var(--font-sans)",
          }}
        >
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              style={{
                color: "var(--ink)",
                textDecoration: "none",
                fontWeight: link.bold ? 700 : 500,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Legal bar */}
      <div style={{ background: "var(--surface-muted)" }}>
        <div
          className="container-mf"
          style={{
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            gap: 24,
            font: "400 12px/18px var(--font-sans)",
            color: "var(--ink-muted)",
            flexWrap: "wrap",
          }}
        >
          <span>
            마이프랜 | 대표 [대표자명] | 사업자등록번호 [000-00-00000] |
            가맹거래사 [등록번호]
            <br />
            서울특별시 마포구 동교로22길 19, 청송빌딩 4층 | E-mail.
            myfriend2026@naver.com
          </span>
          <span>Copyright &copy; MYFRAN. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
