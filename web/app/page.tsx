import type { Metadata } from "next";
import Link from "next/link";
import PhotoSlot from "@/components/PhotoSlot";

export const metadata: Metadata = {
  title: "마이프랜 — 프랜차이즈 비교는 필수입니다",
  description:
    "100+ 프랜차이즈 브랜드를 한눈에 비교! 업종별·예산별 브랜드 찾기, 창업비용 비교, 무료 창업 상담까지. 마이프랜 온라인 창업박람회.",
  openGraph: {
    title: "마이프랜 — 프랜차이즈 비교는 필수입니다",
    description:
      "100+ 프랜차이즈 브랜드를 한눈에 비교하고, 무료 창업 상담을 신청하세요.",
    type: "website",
  },
};
import ConsultForm from "@/components/ConsultForm";
import {
  PhoneIcon,
  ChatIcon,
  ChevronRight,
  CrownIcon,
  StarIcon,
  PeopleIcon,
  ChartIcon,
  HomeIcon,
  MonitorIcon,
  ShieldIcon,
  TrophyIcon,
  SpeakerIcon,
  BookIcon,
  FileIcon,
  MailIcon,
} from "@/components/icons";
import { AnimatedStatBar } from "@/components/AnimatedStatBar";
import {
  ownedBrands,
  stats,
  benefits,
  plans,
  heroServices,
} from "@/data/brands";
import { categories, budgetRanges } from "@/data/static-data";
import { readBrands } from "@/lib/brands-store";
import type { Brand, BrandTier } from "@/lib/brand-types";

/* ── Icon lookup helper ── */
const ICON_MAP: Record<string, typeof PeopleIcon> = {
  people: PeopleIcon,
  chart: ChartIcon,
  home: HomeIcon,
  monitor: MonitorIcon,
  shield: ShieldIcon,
  trophy: TrophyIcon,
  speaker: SpeakerIcon,
  book: BookIcon,
  file: FileIcon,
};

function StatIcon({ name, ...props }: { name: string } & { size?: number; fill?: string }) {
  const Icon = ICON_MAP[name] ?? ShieldIcon;
  return <Icon {...props} />;
}

/* ── Tier section config ── */
const TIER_CONFIG: { tier: BrandTier; label: string; accent: string; icon: typeof CrownIcon; desc: string }[] = [
  { tier: "best", label: "베스트", accent: "var(--red-500)", icon: CrownIcon, desc: "업종별 대표 프랜차이즈 브랜드입니다." },
  { tier: "premium", label: "프리미엄", accent: "#2B6CB0", icon: StarIcon, desc: "검증된 프랜차이즈 브랜드입니다." },
  { tier: "special", label: "스페셜", accent: "#38A169", icon: StarIcon, desc: "성장 가능성이 높은 브랜드입니다." },
];

export default function HomePage() {
  const allBrands = readBrands();
  const brandsByTier = (tier: BrandTier) => allBrands.filter((b) => b.tier === tier);

  return (
    <>
      {/* ════ HERO ════ */}
      <section
        style={{
          position: "relative",
          background: "var(--night)",
          overflow: "hidden",
        }}
      >
        {/* PC: 640px, Mobile: 520px */}
        <div
          className="hidden md:block"
          style={{ height: 640 }}
        >
          <PhotoSlot
            id="P1"
            aspectRatio="9/4"
            fill
            dark
            priority
            sizes="100vw"
          />
        </div>
        <div
          className="md:hidden"
          style={{ height: 520 }}
        >
          <PhotoSlot
            id="P1-M"
            aspectRatio="3/4"
            fill
            dark
            priority
            sizes="100vw"
          />
        </div>

        {/* Gradient overlay */}
        <div
          className="hidden md:block"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(10,18,32,0.94) 0%, rgba(10,18,32,0.78) 42%, rgba(10,18,32,0.05) 75%)",
          }}
        />
        <div
          className="md:hidden"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,18,32,0.05) 25%, rgba(10,18,32,0.85) 55%, rgba(10,18,32,0.96) 100%)",
          }}
        />

        {/* PC hero content */}
        <div
          className="container-mf hidden md:flex"
          style={{
            position: "absolute",
            inset: 0,
            flexDirection: "column",
            justifyContent: "center",
            color: "var(--surface)",
          }}
        >
          <span
            style={{
              font: "700 12px/16px var(--font-sans)",
              letterSpacing: "0.18em",
              color: "var(--night-muted)",
            }}
          >
            FRANCHISE CONSULTING GROUP
          </span>
          <h1
            style={{
              margin: "16px 0 0",
              font: "900 56px/68px var(--font-sans)",
              letterSpacing: "-0.02em",
            }}
          >
            프랜차이즈 비교는
            <br />
            <span style={{ color: "var(--red-500)" }}>필수</span>입니다
          </h1>
          <p
            style={{
              margin: "20px 0 0",
              font: "500 18px/28px var(--font-sans)",
              color: "var(--night-muted)",
            }}
          >
            100+ 브랜드를 한눈에 비교하고
            <br />
            나에게 맞는 프랜차이즈를 찾으세요
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
            <Link
              href="/consult"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 52,
                padding: "0 32px",
                background: "var(--red-500)",
                color: "var(--on-brand)",
                borderRadius: "var(--radius-md)",
                border: "1px solid transparent",
                font: "700 16px/1 var(--font-sans)",
                textDecoration: "none",
              }}
            >
              무료 창업 상담 신청
            </Link>
            <Link
              href="/brands"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 52,
                padding: "0 28px",
                background: "transparent",
                color: "var(--surface)",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(255,255,255,0.6)",
                font: "700 16px/1 var(--font-sans)",
                textDecoration: "none",
              }}
            >
              입점 브랜드 보기
            </Link>
          </div>
          {/* Services row */}
          <ul
            style={{
              display: "flex",
              gap: 40,
              margin: "56px 0 0",
              padding: "24px 0 0",
              listStyle: "none",
              borderTop: "1px solid rgba(255,255,255,0.2)",
              width: 600,
            }}
          >
            {heroServices.map((svc) => (
              <li
                key={svc.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  font: "500 13px/18px var(--font-sans)",
                }}
              >
                <StatIcon name={svc.icon} size={28} fill="#ffffff" />
                {svc.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile hero content */}
        <div
          className="md:hidden"
          style={{
            position: "absolute",
            left: 16,
            right: 16,
            bottom: 28,
            color: "var(--surface)",
          }}
        >
          <span
            style={{
              font: "700 11px/16px var(--font-sans)",
              letterSpacing: "0.18em",
              color: "var(--night-muted)",
            }}
          >
            FRANCHISE CONSULTING
          </span>
          <h1
            style={{
              margin: "8px 0 0",
              font: "900 34px/42px var(--font-sans)",
              letterSpacing: "-0.02em",
            }}
          >
            프랜차이즈 비교는
            <br />
            <span style={{ color: "var(--red-500)" }}>필수</span>입니다
          </h1>
          <p
            style={{
              margin: "12px 0 0",
              font: "500 15px/23px var(--font-sans)",
              color: "var(--night-muted)",
            }}
          >
            100+ 브랜드를 한눈에 비교하고
            <br />
            나에게 맞는 프랜차이즈를 찾으세요
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 8,
              marginTop: 20,
            }}
          >
            <Link
              href="/consult"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 48,
                padding: "0 8px",
                background: "var(--red-500)",
                color: "var(--on-brand)",
                borderRadius: "var(--radius-md)",
                border: "1px solid transparent",
                font: "700 15px/1 var(--font-sans)",
                textDecoration: "none",
              }}
            >
              무료 상담 신청
            </Link>
            <Link
              href="/brands"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 48,
                padding: "0 8px",
                background: "transparent",
                color: "var(--surface)",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(255,255,255,0.6)",
                font: "700 15px/1 var(--font-sans)",
                textDecoration: "none",
              }}
            >
              입점 브랜드
            </Link>
          </div>
        </div>
      </section>

      {/* ════ STAT BAR (animated) ════ */}
      <AnimatedStatBar stats={stats} />

      {/* ════ BRAND TIER SECTIONS (Best → Premium → Special) ════ */}
      {TIER_CONFIG.map((cfg) => {
        const tierBrands = brandsByTier(cfg.tier);
        if (tierBrands.length === 0) return null;
        const TierIcon = cfg.icon;
        return (
          <section key={cfg.tier}>
            {/* PC */}
            <div
              className="container-mf hidden md:block"
              style={{ paddingTop: 64 }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  paddingBottom: 16,
                }}
              >
                <h2
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    margin: 0,
                    font: "900 28px/36px var(--font-sans)",
                  }}
                >
                  <TierIcon size={30} fill={cfg.accent} />
                  <span>
                    <span style={{ color: cfg.accent }}>{cfg.label}</span>{" "}
                    브랜드
                  </span>
                </h2>
                <p
                  style={{
                    margin: 0,
                    font: "400 14px/20px var(--font-sans)",
                    color: "var(--ink-muted)",
                  }}
                >
                  {cfg.desc}
                </p>
                <Link
                  href="/brands"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    height: 36,
                    padding: "0 12px",
                    marginTop: 4,
                    background: "var(--surface)",
                    color: "var(--ink)",
                    border: "1px solid var(--line-control)",
                    borderRadius: "var(--radius-md)",
                    font: "500 13px/1 var(--font-sans)",
                    textDecoration: "none",
                    gap: 4,
                  }}
                >
                  전체 브랜드 보기 <ChevronRight size={12} />
                </Link>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                  gap: "20px 12px",
                  marginTop: 32,
                }}
              >
                {tierBrands.map((b) => (
                  <Link
                    key={b.id}
                    href={`/brands/${b.id}`}
                    style={{
                      display: "block",
                      textDecoration: "none",
                      color: "var(--ink)",
                    }}
                  >
                    <PhotoSlot
                      id="P3"
                      src={b.mainImage}
                      aspectRatio="4/3"
                      rounded="sm"
                      alt={`${b.name} 매장`}
                      sizes="(max-width: 767px) 50vw, 190px"
                    />
                    <span
                      style={{
                        display: "block",
                        marginTop: 8,
                        textAlign: "center",
                        font: "500 14px/20px var(--font-sans)",
                      }}
                    >
                      {b.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile */}
            <div className="md:hidden" style={{ padding: "40px 16px 0" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  paddingBottom: 12,
                }}
              >
                <h2
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    margin: 0,
                    font: "900 22px/30px var(--font-sans)",
                  }}
                >
                  <TierIcon size={24} fill={cfg.accent} />
                  <span>
                    <span style={{ color: cfg.accent }}>{cfg.label}</span>{" "}
                    브랜드
                  </span>
                </h2>
                <p
                  style={{
                    margin: 0,
                    font: "400 13px/18px var(--font-sans)",
                    color: "var(--ink-muted)",
                  }}
                >
                  {cfg.desc}
                </p>
                <Link
                  href="/brands"
                  style={{
                    font: "500 13px/18px var(--font-sans)",
                    color: "var(--ink)",
                    textDecoration: "none",
                    marginTop: 4,
                  }}
                >
                  전체보기 ›
                </Link>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "16px 12px",
                  marginTop: 20,
                }}
              >
                {tierBrands.slice(0, 6).map((b) => (
                  <Link
                    key={b.id}
                    href={`/brands/${b.id}`}
                    style={{
                      display: "block",
                      textDecoration: "none",
                      color: "var(--ink)",
                    }}
                  >
                    <PhotoSlot
                      id="P3"
                      src={b.mainImage}
                      aspectRatio="4/3"
                      rounded="sm"
                      alt={`${b.name} 매장`}
                      sizes="50vw"
                    />
                    <span
                      style={{
                        display: "block",
                        marginTop: 8,
                        textAlign: "center",
                        font: "500 13px/18px var(--font-sans)",
                      }}
                    >
                      {b.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ════ CATEGORY BRANDS (업종별 브랜드 찾기) ════ */}
      <section style={{ background: "var(--surface-muted)" }}>
        <div className="container-mf section-py">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 className="typo-h2" style={{ margin: 0 }}>
              <span style={{ color: "var(--red-500)" }}>업종별</span> 브랜드 찾기
            </h2>
            <p className="typo-caption" style={{ margin: "8px 0 0", color: "var(--ink-muted)" }}>
              관심있는 업종의 프랜차이즈 브랜드를 확인하세요
            </p>
          </div>
          <div className="category-chips-grid" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
            {categories.filter((c) => c.id !== "all").map((cat) => {
              const count = allBrands.filter((b) => b.categoryId === cat.id).length;
              return (
                <Link
                  key={cat.id}
                  href={`/brands?cat=${cat.id}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 120,
                    height: 80,
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--radius-md)",
                    textDecoration: "none",
                    color: "var(--ink)",
                    gap: 4,
                  }}
                >
                  <strong style={{ font: "700 15px/20px var(--font-sans)" }}>{cat.name}</strong>
                  <span style={{ font: "400 12px/16px var(--font-sans)", color: "var(--ink-muted)" }}>
                    {count}개 브랜드
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════ BUDGET BRANDS (예산별 브랜드 찾기) ════ */}
      <section>
        <div className="container-mf section-py">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 className="typo-h2" style={{ margin: 0 }}>
              <span style={{ color: "var(--red-500)" }}>예산별</span> 브랜드 찾기
            </h2>
            <p className="typo-caption" style={{ margin: "8px 0 0", color: "var(--ink-muted)" }}>
              나의 투자 예산에 맞는 브랜드를 찾아보세요
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {budgetRanges.map((range) => {
              const brands = allBrands.filter(
                (b) => b.foundingCostMin >= range.min && b.foundingCostMin < range.max
              );
              return (
                <Link
                  key={range.id}
                  href={`/brands?budget=${range.id}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "24px",
                    background: "var(--surface-muted)",
                    borderRadius: "var(--radius-md)",
                    textDecoration: "none",
                    color: "var(--ink)",
                    border: "1px solid var(--line)",
                  }}
                >
                  <strong style={{ font: "700 18px/24px var(--font-sans)", color: "var(--red-500)" }}>
                    {range.label}
                  </strong>
                  <span style={{ font: "400 13px/18px var(--font-sans)", color: "var(--ink-muted)", marginTop: 4 }}>
                    {brands.length}개 브랜드
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                    {brands.slice(0, 3).map((b) => (
                      <span
                        key={b.id}
                        style={{
                          padding: "3px 10px",
                          background: "var(--surface)",
                          borderRadius: "var(--radius-sm)",
                          font: "500 12px/16px var(--font-sans)",
                        }}
                      >
                        {b.name}
                      </span>
                    ))}
                    {brands.length > 3 && (
                      <span style={{ font: "400 12px/16px var(--font-sans)", color: "var(--ink-muted)", alignSelf: "center" }}>
                        +{brands.length - 3}개
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════ ALL BRANDS (전체 입점 브랜드) ════ */}
      <section style={{ background: "var(--night)", color: "var(--surface)" }}>
        <div className="container-mf section-py">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ margin: 0, font: "900 28px/36px var(--font-sans)" }}>
              전체 <span style={{ color: "var(--red-500)" }}>입점 브랜드</span>
            </h2>
            <p style={{ margin: "8px 0 0", font: "400 14px/20px var(--font-sans)", color: "var(--night-muted)" }}>
              마이프랜에 입점한 {allBrands.length}개의 프랜차이즈 브랜드
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {allBrands.map((b) => (
              <Link
                key={b.id}
                href={`/brands/${b.id}`}
                style={{
                  padding: "8px 18px",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "var(--radius-md)",
                  font: "500 13px/1 var(--font-sans)",
                  color: "var(--surface)",
                  textDecoration: "none",
                }}
              >
                {b.name}
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Link
              href="/brands"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                height: 44,
                padding: "0 24px",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: "var(--radius-md)",
                font: "700 14px/1 var(--font-sans)",
                color: "var(--surface)",
                textDecoration: "none",
              }}
            >
              전체 브랜드 보기 <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════ PRICING PLANS ════ */}
      <section>
        {/* PC */}
        <div
          className="container-mf hidden md:block"
          style={{ padding: "96px 24px 64px" }}
        >
          <h2
            style={{
              margin: 0,
              textAlign: "center",
              font: "900 40px/48px var(--font-sans)",
              letterSpacing: "-0.02em",
            }}
          >
            프랜차이즈{" "}
            <span style={{ color: "var(--red-500)" }}>
              브랜드 입점 안내
            </span>
          </h2>
          <p
            style={{
              margin: "12px 0 0",
              textAlign: "center",
              font: "500 18px/28px var(--font-sans)",
              color: "var(--ink-muted)",
            }}
          >
            브랜드를 알리고, 창업 고객과 연결하세요
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              marginTop: 40,
              border: "1px solid var(--ink)",
            }}
          >
            {plans.map((plan, i) => (
              <article
                key={plan.tier}
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  padding: 32,
                  background: plan.featured
                    ? "var(--black)"
                    : "var(--surface)",
                  color: plan.featured ? "var(--surface)" : "var(--ink)",
                  borderLeft: i > 0 ? "1px solid var(--ink)" : "none",
                  borderTop: `${plan.featured ? 4 : 4}px solid ${plan.featured ? "var(--red-500)" : "var(--ink)"}`,
                  borderRadius: "var(--radius-none)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    font: "700 12px/16px var(--font-sans)",
                    letterSpacing: "0.18em",
                    color: plan.featured
                      ? "var(--smoke)"
                      : "var(--ink-muted)",
                  }}
                >
                  <span
                    style={{
                      color:
                        plan.featured && plan.eyebrow === "RECOMMENDED"
                          ? "var(--red-on-dark)"
                          : undefined,
                    }}
                  >
                    {plan.eyebrow}
                  </span>
                  <span>{plan.no}</span>
                </div>
                <h3
                  style={{
                    margin: "24px 0 4px",
                    font: "700 26px/34px var(--font-sans)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {plan.name}
                </h3>
                <p
                  style={{
                    margin: 0,
                    font: "400 14px/22px var(--font-sans)",
                    color: plan.featured
                      ? "var(--smoke)"
                      : "var(--ink-muted)",
                  }}
                >
                  {plan.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 4,
                    margin: "32px 0 24px",
                    paddingBottom: 24,
                    borderBottom: `1px solid ${plan.featured ? "var(--line-dark)" : "var(--line)"}`,
                  }}
                >
                  <b
                    style={{
                      font: "700 64px/64px var(--font-sans)",
                      letterSpacing: "-0.04em",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {plan.price}
                  </b>
                  <span style={{ font: "500 20px/28px var(--font-sans)" }}>
                    만원
                  </span>
                  <span
                    style={{
                      font: "400 16px/28px var(--font-sans)",
                      color: plan.featured
                        ? "var(--smoke)"
                        : "var(--ink-muted)",
                      marginLeft: 4,
                    }}
                  >
                    / 월
                  </span>
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    margin: "0 0 32px",
                    padding: 0,
                    display: "grid",
                    gap: 12,
                    font: "400 14px/20px var(--font-sans)",
                    flex: 1,
                  }}
                >
                  {plan.specs.map((spec) => (
                    <li
                      key={spec.label}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          color: plan.featured
                            ? "var(--smoke)"
                            : "var(--ink-muted)",
                        }}
                      >
                        {spec.label}
                      </span>
                      <b>{spec.value}</b>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/consult"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 44,
                    padding: "0 24px",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid transparent",
                    font: "700 15px/1 var(--font-sans)",
                    textDecoration: "none",
                    marginTop: "auto",
                    ...(plan.featured
                      ? {
                          background: "var(--red-500)",
                          color: "var(--on-brand)",
                        }
                      : {
                          background: "transparent",
                          color: "var(--ink)",
                          borderColor: "var(--ink)",
                        }),
                  }}
                >
                  입점 문의
                </Link>
              </article>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden" style={{ padding: "56px 16px 40px" }}>
          <h2
            style={{
              margin: 0,
              textAlign: "center",
              font: "900 26px/34px var(--font-sans)",
              letterSpacing: "-0.02em",
            }}
          >
            프랜차이즈
            <br />
            <span style={{ color: "var(--red-500)" }}>
              브랜드 입점 안내
            </span>
          </h2>
          <p
            style={{
              margin: "8px 0 0",
              textAlign: "center",
              font: "500 15px/23px var(--font-sans)",
              color: "var(--ink-muted)",
            }}
          >
            브랜드를 알리고, 창업 고객과 연결하세요
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 24,
              border: "1px solid var(--ink)",
            }}
          >
            {plans.map((plan, i) => (
              <article
                key={plan.tier}
                style={{
                  padding: "24px 20px",
                  background: plan.featured
                    ? "var(--black)"
                    : "var(--surface)",
                  color: plan.featured ? "var(--surface)" : "var(--ink)",
                  borderTop:
                    i === 0
                      ? `4px solid ${plan.featured ? "var(--red-500)" : "var(--ink)"}`
                      : "1px solid var(--ink)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    font: "700 11px/16px var(--font-sans)",
                    letterSpacing: "0.18em",
                    color: plan.featured
                      ? "var(--smoke)"
                      : "var(--ink-muted)",
                  }}
                >
                  <span
                    style={{
                      color:
                        plan.featured && plan.eyebrow === "RECOMMENDED"
                          ? "var(--red-on-dark)"
                          : undefined,
                    }}
                  >
                    {plan.eyebrow}
                  </span>
                  <span>{plan.no}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginTop: 12,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        font: "700 22px/30px var(--font-sans)",
                      }}
                    >
                      {plan.name}
                    </h3>
                    <p
                      style={{
                        margin: "2px 0 0",
                        font: "400 13px/18px var(--font-sans)",
                        color: plan.featured
                          ? "var(--smoke)"
                          : "var(--ink-muted)",
                      }}
                    >
                      {plan.desc.split(",")[0]}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 2,
                    }}
                  >
                    <b
                      style={{
                        font: "700 40px/44px var(--font-sans)",
                        letterSpacing: "-0.04em",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {plan.price}
                    </b>
                    <span
                      style={{ font: "500 15px/20px var(--font-sans)" }}
                    >
                      만원/월
                    </span>
                  </div>
                </div>
                {plan.featured && (
                  <Link
                    href="/consult"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: 44,
                      marginTop: 20,
                      background: "var(--red-500)",
                      color: "var(--on-brand)",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid transparent",
                      font: "700 15px/1 var(--font-sans)",
                      textDecoration: "none",
                    }}
                  >
                    입점 문의
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════ BENEFITS BAND (red-700) ════ */}
      <section
        style={{
          background: "var(--red-700)",
          color: "var(--on-brand)",
        }}
      >
        {/* PC */}
        <div
          className="container-mf hidden md:block"
          style={{ padding: "48px 24px" }}
        >
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              margin: "0 0 24px",
              font: "700 26px/34px var(--font-sans)",
            }}
          >
            <span
              style={{
                width: 120,
                height: 1,
                background: "rgba(255,255,255,0.6)",
              }}
            />
            입점 브랜드 혜택
            <span
              style={{
                width: 120,
                height: 1,
                background: "rgba(255,255,255,0.6)",
              }}
            />
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            {benefits.map((b) => {
              const Icon = ICON_MAP[b.icon] ?? ShieldIcon;
              return (
                <div
                  key={b.title}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    minHeight: 140,
                    padding: "16px 8px",
                    background: "var(--surface)",
                    color: "var(--ink)",
                    borderRadius: "var(--radius-md)",
                    textAlign: "center",
                    font: "700 15px/21px var(--font-sans)",
                  }}
                >
                  <Icon size={36} fill="var(--red-500)" />
                  <span>
                    {b.title}
                    {b.subtitle && (
                      <>
                        <br />
                        {b.subtitle}
                      </>
                    )}
                    {b.accent && (
                      <>
                        <br />
                        <span style={{ color: "var(--red-500)" }}>
                          {b.accent}
                        </span>
                      </>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden" style={{ padding: "40px 16px" }}>
          <h2
            style={{
              margin: "0 0 20px",
              textAlign: "center",
              font: "700 22px/30px var(--font-sans)",
            }}
          >
            입점 브랜드 혜택
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 8,
            }}
          >
            {benefits.map((b) => {
              const Icon = ICON_MAP[b.icon] ?? ShieldIcon;
              return (
                <div
                  key={b.title}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    minHeight: 116,
                    padding: "12px 6px",
                    background: "var(--surface)",
                    color: "var(--ink)",
                    borderRadius: "var(--radius-md)",
                    textAlign: "center",
                    font: "700 14px/20px var(--font-sans)",
                  }}
                >
                  <Icon size={30} fill="var(--red-500)" />
                  <span>
                    {b.title}
                    {b.subtitle && (
                      <>
                        <br />
                        {b.subtitle}
                      </>
                    )}
                    {b.accent && (
                      <>
                        <br />
                        <span style={{ color: "var(--red-500)" }}>
                          {b.accent}
                        </span>
                      </>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════ OWNED BRANDS ════ */}
      {ownedBrands.length > 0 && (
        <section>
          {/* PC */}
          <div
            className="container-mf hidden md:block"
            style={{ padding: "64px 24px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                paddingBottom: 16,
              }}
            >
              <h2
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  margin: 0,
                  font: "900 28px/36px var(--font-sans)",
                }}
              >
                <StarIcon size={28} fill="var(--red-500)" />
                <span>
                  마이프랜{" "}
                  <span style={{ color: "var(--red-500)" }}>보유</span> 브랜드
                </span>
              </h2>
              <p
                style={{
                  margin: 0,
                  font: "400 14px/20px var(--font-sans)",
                  color: "var(--ink-muted)",
                }}
              >
                마이프랜이 직접 운영하며 함께 성장하는 브랜드입니다.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: 16,
                marginTop: 32,
              }}
            >
              {ownedBrands.map((ob) => (
                <Link
                  key={ob.no}
                  href="/brands"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "var(--black)",
                    color: "var(--surface)",
                    textDecoration: "none",
                    borderRadius: "var(--radius-none)",
                  }}
                >
                  <PhotoSlot
                    id="P6"
                    src={ob.interior}
                    aspectRatio="16/9"
                    dark
                    alt={`${ob.name} 인테리어`}
                    sizes="288px"
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 16,
                    }}
                  >
                    <span>
                      <small
                        style={{
                          display: "block",
                          font: "700 11px/14px var(--font-sans)",
                          letterSpacing: "0.18em",
                          color: "var(--smoke)",
                        }}
                      >
                        OWNED {ob.no}
                      </small>
                      <strong
                        style={{
                          display: "block",
                          marginTop: 4,
                          font: "700 18px/24px var(--font-sans)",
                        }}
                      >
                        {ob.name}
                      </strong>
                    </span>
                    <ChevronRight size={16} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile — horizontal scroll */}
          <div className="md:hidden" style={{ padding: "40px 0 40px 16px" }}>
            <div
              style={{
                paddingRight: 16,
                paddingBottom: 12,
                marginRight: 16,
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  margin: 0,
                  font: "900 22px/30px var(--font-sans)",
                }}
              >
                <StarIcon size={22} fill="var(--red-500)" />
                <span>
                  마이프랜{" "}
                  <span style={{ color: "var(--red-500)" }}>보유</span> 브랜드
                </span>
              </h2>
            </div>
            <div
              className="hscroll"
              style={{
                display: "flex",
                gap: 12,
                marginTop: 20,
                paddingRight: 16,
              }}
            >
              {ownedBrands.map((ob) => (
                <Link
                  key={ob.no}
                  href="#"
                  style={{
                    flex: "none",
                    width: 280,
                    display: "flex",
                    flexDirection: "column",
                    background: "var(--black)",
                    color: "var(--surface)",
                    textDecoration: "none",
                  }}
                >
                  <PhotoSlot
                    id="P6"
                    src={ob.interior}
                    dark
                    width={280}
                    height={158}
                    alt={`${ob.name} 인테리어`}
                    sizes="280px"
                  />
                  <div style={{ padding: "14px 16px" }}>
                    <small
                      style={{
                        display: "block",
                        font: "700 10px/14px var(--font-sans)",
                        letterSpacing: "0.18em",
                        color: "var(--smoke)",
                      }}
                    >
                      OWNED {ob.no}
                    </small>
                    <strong
                      style={{
                        display: "block",
                        marginTop: 2,
                        font: "700 17px/24px var(--font-sans)",
                      }}
                    >
                      {ob.name}
                    </strong>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════ CONSULT FORM ════ */}
      <section style={{ background: "var(--surface-muted)" }}>
        {/* PC: photo + form side by side */}
        <div
          className="container-mf hidden md:grid"
          style={{
            padding: "64px 24px",
            gridTemplateColumns: "480px minmax(0, 1fr)",
            gap: 64,
            alignItems: "center",
          }}
        >
          <PhotoSlot
            id="P7"
            aspectRatio="4/5"
            width={480}
            height={600}
            alt="상담 장면"
            sizes="480px"
          />
          <ConsultForm />
        </div>

        {/* Mobile: form only */}
        <div className="md:hidden" style={{ padding: "40px 16px" }}>
          <ConsultForm />
        </div>
      </section>

      {/* ════ CONTACT BAR (red-700) ════ */}
      <section
        style={{
          background: "var(--red-700)",
          color: "var(--on-brand)",
        }}
      >
        {/* PC */}
        <div
          className="container-mf hidden md:flex"
          style={{
            padding: "20px 24px",
            alignItems: "center",
            justifyContent: "center",
            gap: 64,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              font: "500 18px/24px var(--font-sans)",
            }}
          >
            <PhoneIcon size={30} fill="#ffffff" />
            입점 상담문의{" "}
            <strong
              style={{ font: "900 26px/32px var(--font-sans)" }}
            >
              010-4708-6091
            </strong>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              font: "500 18px/24px var(--font-sans)",
            }}
          >
            <MailIcon size={28} fill="#ffffff" />
            이메일 상담{" "}
            <strong
              style={{ font: "700 18px/24px var(--font-sans)" }}
            >
              myfriend2026@naver.com
            </strong>
          </div>
        </div>

        {/* Mobile */}
        <div
          className="md:hidden"
          style={{
            padding: "20px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <a
            href="tel:01047086091"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "var(--on-brand)",
              textDecoration: "none",
            }}
          >
            <PhoneIcon size={24} fill="#ffffff" />
            <span style={{ font: "500 14px/20px var(--font-sans)" }}>
              입점 상담문의
            </span>
            <strong
              style={{ font: "900 22px/28px var(--font-sans)" }}
            >
              010-4708-6091
            </strong>
          </a>
          <span
            style={{
              font: "500 13px/18px var(--font-sans)",
              paddingLeft: 34,
            }}
          >
            myfriend2026@naver.com
          </span>
        </div>
      </section>
    </>
  );
}
