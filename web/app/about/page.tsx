import type { Metadata } from "next";
import Link from "next/link";
import PhotoSlot from "@/components/PhotoSlot";
import {
  PeopleIcon,
  ChartIcon,
  HomeIcon,
  MonitorIcon,
  ShieldIcon,
  TrophyIcon,
  PhoneIcon,
  MailIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "회사소개 — 마이프랜",
  description:
    "마이프랜은 예비 창업자와 프랜차이즈 본사를 연결하는 창업 컨설팅 전문 기업입니다. 온라인 창업박람회, 가맹영업대행, 본사 설립 컨설팅, 상권분석을 제공합니다.",
};

/* ── 사업분야 데이터 ── */
const BUSINESSES = [
  {
    no: "01",
    icon: MonitorIcon,
    title: "온라인 창업박람회",
    desc: "국내 100개 프랜차이즈 브랜드를 한곳에서 비교하고 실시간으로 상담 신청할 수 있는 온라인 창업박람회를 운영합니다.",
  },
  {
    no: "02",
    icon: PeopleIcon,
    title: "가맹영업 대행",
    desc: "검증된 프랜차이즈 브랜드의 가맹영업을 대행하며, 예비 창업자에게 최적의 브랜드를 추천하여 가맹 성과를 극대화합니다.",
  },
  {
    no: "03",
    icon: ShieldIcon,
    title: "본사 설립 컨설팅",
    desc: "가맹거래사 자격을 보유한 전문 컨설턴트가 브랜드 개발, 가맹본부 설립, 가맹사업 등록까지 전 과정을 지원합니다.",
  },
  {
    no: "04",
    icon: ChartIcon,
    title: "상권분석 및 입지 개발",
    desc: "예비 창업자의 업종과 예산에 맞는 최적의 상권을 분석하고, 전국 네트워크를 통해 매장 위치를 제안합니다.",
  },
];

/* ── 통계 데이터 ── */
const STATS = [
  { icon: TrophyIcon, value: "100+", label: "입점 브랜드" },
  { icon: PeopleIcon, value: "1,000+", label: "상담 진행" },
  { icon: ShieldIcon, value: "98%", label: "고객 만족도" },
  { icon: ChartIcon, value: "전국", label: "네트워크" },
];

export default function AboutPage() {
  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <section className="about-hero">
        <div className="about-hero-overlay" />
        <div className="container-mf about-hero-content">
          <span className="about-eyebrow">ABOUT MYFRAN</span>
          <h1 className="about-hero-title">
            좋은 상권에
            <br />
            좋은 <span className="about-accent">브랜드</span>를{" "}
            <span className="about-accent">연결</span>합니다.
          </h1>
          <p className="about-hero-sub">
            프랜차이즈 창업의 모든 것,
            <br />
            마이프랜과 함께!
          </p>
        </div>
      </section>

      {/* ═══════ 회사소개 ═══════ */}
      <section className="section-py" style={{ background: "var(--surface)" }}>
        <div className="container-mf">
          <span className="about-eyebrow" style={{ color: "var(--ink-muted)" }}>
            ABOUT MYFRAN
          </span>
          <h2 className="typo-h1" style={{ margin: "8px 0 0", letterSpacing: "-0.02em" }}>
            회사소개
          </h2>
          <p
            className="typo-h3"
            style={{ margin: "8px 0 0", color: "var(--red-500)", fontWeight: 700 }}
          >
            프랜차이즈 창업의 새로운 기준, 마이프랜이 전합니다.
          </p>

          <div className="about-intro-grid">
            <div className="about-intro-text">
              <p className="typo-body" style={{ color: "var(--ink-muted)", margin: "24px 0 0" }}>
                <strong style={{ color: "var(--ink)" }}>마이프랜(MYFRAN)</strong>은 예비 창업자와
                프랜차이즈 본사를 연결하는{" "}
                <strong style={{ color: "var(--ink)" }}>프랜차이즈 창업 컨설팅 전문 기업</strong>
                입니다.
              </p>
              <p className="typo-body" style={{ color: "var(--ink-muted)", margin: "16px 0 0" }}>
                치킨, 카페, 베이커리, 한식·외식, 호프·주점 등 다양한 업종의 프랜차이즈 브랜드를 한눈에
                비교하고, 사업 목적과 예산에 맞는 브랜드를 선택할 수 있도록 지원합니다.
              </p>
              <p className="typo-body" style={{ color: "var(--ink-muted)", margin: "16px 0 0" }}>
                신중한 상권분석, 입지 제안, 가맹계약, 인테리어, 매장 오픈에 이르기까지{" "}
                <strong style={{ color: "var(--ink)" }}>
                  창업의 전 과정을 원스톱 컨설팅
                </strong>
                으로 함께합니다.
              </p>
            </div>
            <div className="about-intro-image">
              <PhotoSlot
                id="P8"
                src="/about-office.png"
                aspectRatio="4/3"
                alt="마이프랜 오피스"
                sizes="(max-width: 767px) 100vw, 480px"
                rounded="md"
                dark
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 비전 ═══════ */}
      <section
        className="section-py"
        style={{ background: "var(--night)", color: "var(--on-brand)" }}
      >
        <div className="container-mf" style={{ textAlign: "center" }}>
          <span
            className="about-eyebrow"
            style={{ color: "var(--night-muted)" }}
          >
            OUR VISION
          </span>
          <h2
            className="typo-hero"
            style={{
              margin: "12px 0 0",
              letterSpacing: "-0.02em",
            }}
          >
            마이프랜의 비전
          </h2>
          <p
            style={{
              margin: "16px 0 0",
              font: "700 20px/30px var(--font-sans)",
              color: "var(--red-500)",
            }}
          >
            대한민국 대표
            <br className="md:hidden" />{" "}
            프랜차이즈 창업 플랫폼
          </p>
          <p
            className="typo-body"
            style={{ margin: "16px auto 0", maxWidth: 560, color: "var(--night-muted)" }}
          >
            좋은 브랜드와 좋은 사람을 연결하여, 모든 예비 창업자가 신뢰할 수 있는 창업 정보를 만나는
            플랫폼을 만들어 갑니다.
          </p>
        </div>
      </section>

      {/* ═══════ 사업분야 ═══════ */}
      <section
        className="section-py"
        style={{ background: "var(--surface-muted)" }}
      >
        <div className="container-mf">
          <span className="about-eyebrow" style={{ color: "var(--ink-muted)" }}>
            BUSINESS
          </span>
          <h2 className="typo-h1" style={{ margin: "8px 0 0", letterSpacing: "-0.02em" }}>
            주요 사업분야
          </h2>
          <p className="typo-body" style={{ margin: "8px 0 0", color: "var(--ink-muted)" }}>
            프랜차이즈 창업의 모든 과정을 마이프랜이 함께합니다.
          </p>

          <div className="biz-grid">
            {BUSINESSES.map((biz) => (
              <article key={biz.no} className="biz-card">
                <div className="biz-card-head">
                  <span className="biz-no">{biz.no}</span>
                  <biz.icon size={32} fill="var(--red-500)" />
                </div>
                <h3 className="typo-h3" style={{ margin: "16px 0 8px" }}>
                  {biz.title}
                </h3>
                <p className="typo-body" style={{ margin: 0, color: "var(--ink-muted)" }}>
                  {biz.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 대표 인사말 ═══════ */}
      <section className="section-py" style={{ background: "var(--surface)" }}>
        <div className="container-mf">
          <div className="chairman-grid">
            <div className="chairman-photo">
              <PhotoSlot
                id="P-CEO"
                aspectRatio="3/4"
                alt="회장 윤두기"
                sizes="(max-width: 767px) 100vw, 400px"
                rounded="md"
                dark
              />
            </div>
            <div className="chairman-text">
              <span className="about-eyebrow" style={{ color: "var(--ink-muted)" }}>
                CHAIRMAN MESSAGE
              </span>
              <h2 className="typo-h1" style={{ margin: "8px 0 0", letterSpacing: "-0.02em" }}>
                대표이사 윤두기
              </h2>
              <blockquote className="chairman-quote">
                &ldquo;좋은 상권에 좋은 브랜드를 연결합니다.&rdquo;
              </blockquote>
              <p className="typo-body" style={{ color: "var(--ink-muted)", margin: "24px 0 0" }}>
                마이프랜은 단순히 브랜드를 소개하는 것이 아니라, 예비 창업자의 성공을 함께 설계하는
                파트너입니다.
              </p>
              <p className="typo-body" style={{ color: "var(--ink-muted)", margin: "16px 0 0" }}>
                사람을 잇고, 브랜드를 잇고, 성공을 잇는 플랫폼.
                <br />
                마이프랜이 대한민국 프랜차이즈 창업 시장의 새로운 기준이 되겠습니다.
              </p>
              <p
                style={{
                  margin: "32px 0 0",
                  font: "700 18px/26px var(--font-sans)",
                  color: "var(--ink)",
                }}
              >
                — 윤두기
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 통계 ═══════ */}
      <section style={{ background: "var(--surface-muted)" }}>
        <div className="container-mf" style={{ padding: "40px 24px" }}>
          <div className="about-stats">
            {STATS.map((s) => (
              <div key={s.label} className="about-stat-item">
                <s.icon size={28} fill="var(--red-500)" />
                <strong className="about-stat-value">{s.value}</strong>
                <span className="about-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ 오시는 길 + 연락처 ═══════ */}
      <section className="section-py" style={{ background: "var(--surface)" }}>
        <div className="container-mf">
          <span className="about-eyebrow" style={{ color: "var(--ink-muted)" }}>
            CONTACT
          </span>
          <h2 className="typo-h1" style={{ margin: "8px 0 24px", letterSpacing: "-0.02em" }}>
            오시는 길
          </h2>

          <div className="contact-grid">
            <div className="contact-info">
              <dl className="contact-dl">
                <div className="contact-row">
                  <dt>주소</dt>
                  <dd>서울특별시 마포구 동교로22길 19, 청송빌딩 4층</dd>
                </div>
                <div className="contact-row">
                  <dt>대표전화</dt>
                  <dd>
                    <a href="tel:0226056091" style={{ color: "var(--ink)", textDecoration: "none" }}>
                      02-2605-6091
                    </a>
                  </dd>
                </div>
                <div className="contact-row">
                  <dt>휴대전화</dt>
                  <dd>
                    <a href="tel:01047086091" style={{ color: "var(--ink)", textDecoration: "none" }}>
                      010-4708-6091
                    </a>
                  </dd>
                </div>
                <div className="contact-row">
                  <dt>팩스</dt>
                  <dd>02-2605-6092</dd>
                </div>
                <div className="contact-row">
                  <dt>이메일</dt>
                  <dd>
                    <a href="mailto:myfriend2026@naver.com" style={{ color: "var(--ink)", textDecoration: "none" }}>
                      myfriend2026@naver.com
                    </a>
                  </dd>
                </div>
              </dl>

              <div style={{ marginTop: 24, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Link href="/consult" className="btn-primary">
                  무료 상담 신청
                </Link>
                <a href="tel:01047086091" className="btn-outline" style={{ gap: 6 }}>
                  <PhoneIcon size={18} /> 전화 상담
                </a>
              </div>
            </div>
            <div className="contact-map">
              <div
                style={{
                  background: "var(--surface-muted)",
                  borderRadius: "var(--radius-md)",
                  aspectRatio: "16/9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--ink-muted)",
                  font: "500 14px/20px var(--font-sans)",
                }}
              >
                <HomeIcon size={20} fill="var(--ink-muted)" />
                &nbsp;홍대입구역 3번 출구 도보 5분
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ 하단 CTA 밴드 ═══════ */}
      <section style={{ background: "var(--red-700)", color: "var(--on-brand)" }}>
        <div
          className="container-mf"
          style={{
            padding: "32px 24px",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0, font: "700 18px/28px var(--font-sans)" }}>
            프랜차이즈 창업의 모든 것, 마이프랜
          </p>
          <p
            style={{
              margin: "4px 0 0",
              font: "400 14px/20px var(--font-sans)",
              opacity: 0.8,
            }}
          >
            당신의 성공 창업, 마이프랜이 함께합니다.
          </p>
          <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="tel:01047086091"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                height: 48,
                padding: "0 24px",
                background: "rgba(255,255,255,0.15)",
                color: "var(--on-brand)",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: "var(--radius-md)",
                font: "700 15px/1 var(--font-sans)",
                textDecoration: "none",
              }}
            >
              <PhoneIcon size={18} fill="#ffffff" /> 010-4708-6091
            </a>
            <a
              href="mailto:myfriend2026@naver.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                height: 48,
                padding: "0 24px",
                background: "rgba(255,255,255,0.15)",
                color: "var(--on-brand)",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: "var(--radius-md)",
                font: "700 15px/1 var(--font-sans)",
                textDecoration: "none",
              }}
            >
              <MailIcon size={18} fill="#ffffff" /> 이메일 상담
            </a>
          </div>
        </div>
      </section>

      {/* ═══════ STYLES ═══════ */}
      <style>{`
        /* ── Hero ── */
        .about-hero {
          position: relative;
          background: var(--night);
          min-height: 320px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .about-hero { min-height: 400px; }
        }
        .about-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--night) 40%, rgba(10,18,32,0.7));
        }
        .about-hero-content {
          position: relative;
          z-index: 1;
          color: var(--on-brand);
          padding-top: 48px;
          padding-bottom: 48px;
        }
        @media (min-width: 768px) {
          .about-hero-content { padding-top: 72px; padding-bottom: 72px; }
        }
        .about-hero-title {
          margin: 12px 0 0;
          font: 900 34px/42px var(--font-sans);
          letter-spacing: -0.02em;
        }
        @media (min-width: 768px) {
          .about-hero-title { font: 900 48px/60px var(--font-sans); }
        }
        .about-accent { color: var(--red-500); }
        .about-hero-sub {
          margin: 16px 0 0;
          font: 500 16px/26px var(--font-sans);
          color: var(--night-muted);
        }
        @media (min-width: 768px) {
          .about-hero-sub { font: 500 20px/30px var(--font-sans); }
        }

        /* ── Eyebrow ── */
        .about-eyebrow {
          display: block;
          font: 700 12px/16px var(--font-sans);
          letter-spacing: 0.18em;
          color: var(--night-muted);
        }

        /* ── 회사소개 그리드 ── */
        .about-intro-grid {
          display: flex;
          flex-direction: column;
          gap: 32px;
          margin-top: 24px;
        }
        @media (min-width: 768px) {
          .about-intro-grid {
            flex-direction: row;
            gap: 48px;
            align-items: flex-start;
          }
          .about-intro-text { flex: 1; }
          .about-intro-image { flex: 0 0 420px; }
        }

        /* ── 사업분야 그리드 ── */
        .biz-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-top: 32px;
        }
        @media (min-width: 768px) {
          .biz-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 20px;
          }
        }
        @media (min-width: 1200px) {
          .biz-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        .biz-card {
          padding: 24px;
          background: var(--surface);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-card);
          border-top: 3px solid var(--red-500);
        }
        .biz-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .biz-no {
          font: 900 28px/32px var(--font-sans);
          color: var(--red-500);
          letter-spacing: -0.02em;
        }

        /* ── 대표 인사말 ── */
        .chairman-grid {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        @media (min-width: 768px) {
          .chairman-grid {
            flex-direction: row;
            gap: 56px;
            align-items: flex-start;
          }
          .chairman-photo { flex: 0 0 340px; }
          .chairman-text { flex: 1; }
        }
        .chairman-quote {
          margin: 24px 0 0;
          padding: 0;
          border: 0;
          font: 900 24px/34px var(--font-sans);
          color: var(--ink);
          letter-spacing: -0.02em;
        }
        @media (min-width: 768px) {
          .chairman-quote { font: 900 30px/42px var(--font-sans); }
        }

        /* ── 통계 ── */
        .about-stats {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 24px;
        }
        @media (min-width: 768px) {
          .about-stats { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
        .about-stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          text-align: center;
        }
        .about-stat-value {
          font: 900 32px/38px var(--font-sans);
          letter-spacing: -0.02em;
          color: var(--ink);
        }
        @media (min-width: 768px) {
          .about-stat-value { font: 900 40px/48px var(--font-sans); }
        }
        .about-stat-label {
          font: 500 13px/18px var(--font-sans);
          color: var(--ink-muted);
        }

        /* ── 연락처 ── */
        .contact-grid {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        @media (min-width: 768px) {
          .contact-grid {
            flex-direction: row;
            gap: 48px;
          }
          .contact-info { flex: 1; }
          .contact-map { flex: 1; }
        }
        .contact-dl {
          margin: 0;
          display: grid;
          gap: 12px;
        }
        .contact-row {
          display: flex;
          gap: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--line);
        }
        .contact-row dt {
          flex: 0 0 80px;
          font: 700 14px/22px var(--font-sans);
          color: var(--ink-muted);
        }
        .contact-row dd {
          margin: 0;
          font: 500 15px/22px var(--font-sans);
          color: var(--ink);
        }
      `}</style>
    </>
  );
}
