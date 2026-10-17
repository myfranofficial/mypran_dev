import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import PhotoSlot from "@/components/PhotoSlot";
import { ShieldIcon, PeopleIcon, ChartIcon, HomeIcon } from "@/components/icons";

const VALUES = [
  { icon: ShieldIcon, title: "신뢰와 투명성", desc: "정확한 정보와 투명한 비교로 예비 창업자의 올바른 선택을 돕습니다." },
  { icon: PeopleIcon, title: "맞춤 컨설팅", desc: "개인의 상황과 목표에 맞는 1:1 맞춤 창업 컨설팅을 제공합니다." },
  { icon: ChartIcon, title: "데이터 기반 분석", desc: "상권 분석, 매출 예측 등 데이터 기반의 과학적 접근으로 성공률을 높입니다." },
];

const STATS = [
  { value: "100+", label: "입점 브랜드" },
  { value: "1,000+", label: "상담 진행" },
  { value: "500+", label: "성공 사례" },
  { value: "98%", label: "만족도" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="회사소개"
        subtitle="좋은 브랜드와 좋은 사람을 연결하는 프랜차이즈 창업 컨설팅 그룹"
      />

      {/* ── 소개 ── */}
      <section className="container-mf section-py">
        <div className="about-intro">
          <div className="about-intro-image">
            <PhotoSlot
              id="P8"
              aspectRatio="4/3"
              alt="마이프랜 사무실"
              sizes="(max-width: 767px) 100vw, 540px"
              rounded="md"
            />
          </div>
          <div className="about-intro-text">
            <SectionHeader
              eyebrow="ABOUT MYFRAN"
              title="마이프랜을 소개합니다"
              align="left"
            />
            <p className="typo-body" style={{ color: "var(--ink-muted)" }}>
              마이프랜은 예비 창업자와 우수 프랜차이즈 브랜드를 연결하는 온라인 창업박람회 플랫폼입니다.
              업종별 대표 브랜드를 한눈에 비교하고, 전문 컨설턴트의 무료 상담을 통해 나에게 맞는 창업을 시작할 수 있습니다.
            </p>
            <p className="typo-body" style={{ color: "var(--ink-muted)", marginTop: 16 }}>
              가맹영업대행, 상권분석, 가맹본부 구축, 마케팅 지원 등 창업의 전 과정을 함께합니다.
              매월 1억원 이상의 자사 홈페이지 광고비를 집행하여 입점 브랜드의 노출을 극대화하고 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* ── 핵심 가치 ── */}
      <section style={{ background: "var(--surface-muted)" }}>
        <div className="container-mf section-py">
          <SectionHeader title="핵심 가치" description="마이프랜이 지키는 세 가지 원칙" />
          <div className="about-values">
            {VALUES.map((v) => (
              <article
                key={v.title}
                style={{
                  padding: 24,
                  background: "var(--surface)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <v.icon size={36} fill="var(--red-500)" />
                <h3 className="typo-h3" style={{ margin: "16px 0 8px" }}>{v.title}</h3>
                <p className="typo-body" style={{ margin: 0, color: "var(--ink-muted)" }}>{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 통계 ── */}
      <section style={{ background: "var(--night)", color: "var(--on-brand)" }}>
        <div className="container-mf section-py">
          <div className="about-stats">
            {STATS.map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <strong style={{ display: "block", font: "900 40px/48px var(--font-sans)", letterSpacing: "-0.02em" }}>
                  {s.value}
                </strong>
                <span style={{ font: "500 14px/20px var(--font-sans)", color: "var(--night-muted)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 오시는 길 ── */}
      <section className="container-mf section-py">
        <SectionHeader title="오시는 길" />
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <address
            className="typo-body"
            style={{
              fontStyle: "normal",
              color: "var(--ink-muted)",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            서울 마포구 동교로22길 19, 청송빌딩 4층
          </address>
          <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
            <span className="typo-caption" style={{ color: "var(--ink-muted)" }}>
              <HomeIcon size={16} fill="var(--ink-muted)" /> 홍대입구역 3번 출구 도보 5분
            </span>
          </div>
        </div>
      </section>

      <style>{`
        .about-intro {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        @media (min-width: 768px) {
          .about-intro { flex-direction: row; gap: 48px; align-items: flex-start; }
          .about-intro-image { flex: 0 0 480px; }
          .about-intro-text { flex: 1; }
        }
        .about-values {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 768px) {
          .about-values { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
        }
        .about-stats {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 32px;
        }
        @media (min-width: 768px) {
          .about-stats { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
      `}</style>
    </>
  );
}
