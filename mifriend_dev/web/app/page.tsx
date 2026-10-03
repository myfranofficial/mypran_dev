import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import PhotoSlot from "@/components/PhotoSlot";
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
import {
  bestBrands,
  ownedBrands,
  stats,
  benefits,
  plans,
  heroServices,
} from "@/data/brands";

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

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
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
              당신의 성공 창업
              <br />
              <span style={{ color: "var(--red-500)" }}>마이프랜</span>이
              함께합니다
            </h1>
            <p
              style={{
                margin: "20px 0 0",
                font: "500 18px/28px var(--font-sans)",
                color: "var(--night-muted)",
              }}
            >
              좋은 브랜드와 좋은 사람을 연결하는
              <br />
              프랜차이즈 창업 컨설팅 그룹
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
              당신의 성공 창업
              <br />
              <span style={{ color: "var(--red-500)" }}>마이프랜</span>이
              <br />
              함께합니다
            </h1>
            <p
              style={{
                margin: "12px 0 0",
                font: "500 15px/23px var(--font-sans)",
                color: "var(--night-muted)",
              }}
            >
              좋은 브랜드와 좋은 사람을 연결하는
              <br />
              프랜차이즈 창업 컨설팅 그룹
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

        {/* ════ STAT BAR ════ */}
        {/* PC: horizontal row */}
        <section
          className="hidden md:block"
          style={{ borderBottom: "1px solid var(--line)" }}
        >
          <div
            className="container-mf"
            style={{
              padding: "24px",
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  paddingRight: i < stats.length - 1 ? 24 : 0,
                  borderRight:
                    i < stats.length - 1 ? "1px solid var(--line)" : "none",
                }}
              >
                <StatIcon name={s.icon} size={36} fill="var(--red-500)" />
                <div>
                  <b
                    style={{
                      display: "block",
                      font: "900 32px/36px var(--font-sans)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.value}
                  </b>
                  <span
                    style={{
                      font: "500 13px/18px var(--font-sans)",
                      color: "var(--ink-muted)",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
            <Link
              href="/consult"
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                gap: 12,
                background: "var(--red-500)",
                color: "var(--on-brand)",
                borderRadius: "var(--radius-lg)",
                padding: "14px 24px",
                font: "700 15px/21px var(--font-sans)",
                textDecoration: "none",
              }}
            >
              <ChatIcon size={30} fill="#ffffff" />
              <span>
                지금 바로
                <br />
                입점 상담을 받아보세요
              </span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </section>

        {/* Mobile: 2×2 grid */}
        <section
          className="md:hidden"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            borderBottom: "1px solid var(--line)",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: "18px 16px",
                borderRight: i % 2 === 0 ? "1px solid var(--line)" : "none",
                borderBottom: i < 2 ? "1px solid var(--line)" : "none",
              }}
            >
              <b
                style={{
                  display: "block",
                  font: "900 26px/30px var(--font-sans)",
                  letterSpacing: "-0.02em",
                }}
              >
                {s.value}
              </b>
              <span
                style={{
                  font: "500 13px/18px var(--font-sans)",
                  color: "var(--ink-muted)",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </section>

        {/* ════ BEST BRANDS ════ */}
        <section>
          {/* PC */}
          <div
            className="container-mf hidden md:block"
            style={{ paddingTop: 64 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                paddingBottom: 12,
                borderBottom: "2px solid var(--ink)",
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
                <CrownIcon size={30} fill="var(--red-500)" />
                <span>
                  <span style={{ color: "var(--red-500)" }}>베스트</span>{" "}
                  브랜드
                </span>
              </h2>
              <p
                style={{
                  margin: 0,
                  flexGrow: 1,
                  paddingLeft: 12,
                  borderLeft: "1px solid var(--line)",
                  font: "400 14px/20px var(--font-sans)",
                  color: "var(--ink-muted)",
                }}
              >
                업종별 대표 프랜차이즈 브랜드입니다.
              </p>
              <Link
                href="/brands"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  height: 36,
                  padding: "0 12px",
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
              {bestBrands.map((b) => (
                <Link
                  key={b.id}
                  href="/brands"
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "var(--ink)",
                  }}
                >
                  <PhotoSlot
                    id="P3"
                    src={b.storefront}
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
                alignItems: "flex-end",
                justifyContent: "space-between",
                paddingBottom: 10,
                borderBottom: "2px solid var(--ink)",
              }}
            >
              <div>
                <h2
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    margin: 0,
                    font: "900 22px/30px var(--font-sans)",
                  }}
                >
                  <CrownIcon size={24} fill="var(--red-500)" />
                  <span>
                    <span style={{ color: "var(--red-500)" }}>베스트</span>{" "}
                    브랜드
                  </span>
                </h2>
                <p
                  style={{
                    margin: "2px 0 0",
                    font: "400 13px/18px var(--font-sans)",
                    color: "var(--ink-muted)",
                  }}
                >
                  업종별 대표 프랜차이즈 브랜드입니다.
                </p>
              </div>
              <Link
                href="/brands"
                style={{
                  font: "500 13px/18px var(--font-sans)",
                  color: "var(--ink)",
                  textDecoration: "none",
                  padding: "12px 0 2px",
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
              {bestBrands.slice(0, 6).map((b) => (
                <Link
                  key={b.id}
                  href="/brands"
                  style={{
                    display: "block",
                    textDecoration: "none",
                    color: "var(--ink)",
                  }}
                >
                  <PhotoSlot
                    id="P3"
                    src={b.storefront}
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
        <section>
          {/* PC */}
          <div
            className="container-mf hidden md:block"
            style={{ padding: "64px 24px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                paddingBottom: 12,
                borderBottom: "2px solid var(--ink)",
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
                  flexGrow: 1,
                  paddingLeft: 12,
                  borderLeft: "1px solid var(--line)",
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
                  href="#"
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
                paddingBottom: 10,
                borderBottom: "2px solid var(--ink)",
                marginRight: 16,
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
            <ConsultForm mobile />
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
      </main>

      <Footer />
      <MobileBottomBar />
    </>
  );
}

/* ── Inline Consult Form component ── */
function ConsultForm({ mobile = false }: { mobile?: boolean }) {
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: mobile ? 20 : 24,
      }}
    >
      <div>
        <span
          style={{
            font: "700 12px/16px var(--font-sans)",
            letterSpacing: "0.18em",
            color: "var(--ink-muted)",
          }}
        >
          FREE CONSULTING
        </span>
        <h2
          style={{
            margin: `${mobile ? 6 : 8}px 0 0`,
            font: `900 ${mobile ? 26 : 40}px/${mobile ? 34 : 48}px var(--font-sans)`,
            letterSpacing: "-0.02em",
          }}
        >
          창업,{" "}
          <span style={{ color: "var(--red-500)" }}>무료 상담</span>부터
          <br />
          시작하세요
        </h2>
        <p
          style={{
            margin: `${mobile ? 8 : 12}px 0 0`,
            font: `400 ${mobile ? 14 : 15}px/${mobile ? 22 : 24}px var(--font-sans)`,
            color: "var(--ink-muted)",
          }}
        >
          담당 컨설턴트가 영업일 기준 24시간 안에 연락드립니다.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: mobile
            ? "1fr"
            : "repeat(2, minmax(0, 1fr))",
          gap: mobile ? "20px" : "24px 32px",
        }}
      >
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: mobile ? 2 : 4,
            font: "700 15px/21px var(--font-sans)",
          }}
        >
          성함 <input className="uline" type="text" placeholder="홍길동" />
        </label>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: mobile ? 2 : 4,
            font: "700 15px/21px var(--font-sans)",
          }}
        >
          연락처{" "}
          <input className="uline" type="tel" placeholder="010-0000-0000" />
        </label>
        <label
          style={{
            display: "flex",
            flexDirection: "column",
            gap: mobile ? 2 : 4,
            font: "700 15px/21px var(--font-sans)",
          }}
        >
          창업 희망지역
          <select className="uline">
            <option>시/도 선택</option>
            <option>서울</option>
            <option>경기</option>
            <option>인천</option>
            <option>부산</option>
          </select>
        </label>
        {!mobile && (
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              font: "700 15px/21px var(--font-sans)",
            }}
          >
            관심 업종
            <select className="uline">
              <option>업종 선택</option>
              <option>카페·디저트</option>
              <option>치킨·피자</option>
              <option>외식</option>
              <option>주점</option>
              <option>편의·리테일</option>
            </select>
          </label>
        )}
      </div>

      <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
        <legend
          style={{
            padding: 0,
            marginBottom: mobile ? 8 : 10,
            font: "700 15px/21px var(--font-sans)",
          }}
        >
          창업 형태
        </legend>
        <div
          style={{
            display: mobile ? "grid" : "flex",
            ...(mobile
              ? { gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }
              : { flexWrap: "wrap" as const, gap: 8 }),
          }}
        >
          {["신규 창업", "업종 전환", "브랜드 입점 문의", "투자·기타"].map(
            (label, i) => (
              <label key={label} className="chip">
                <input
                  type="radio"
                  name="startup_type"
                  defaultChecked={i === 0}
                />
                <span
                  style={
                    mobile
                      ? { width: "100%", justifyContent: "center" }
                      : undefined
                  }
                >
                  {mobile && label === "브랜드 입점 문의"
                    ? "브랜드 입점"
                    : label}
                </span>
              </label>
            )
          )}
        </div>
      </fieldset>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          font: `400 ${mobile ? 13 : 14}px/${mobile ? 18 : 20}px var(--font-sans)`,
          color: "var(--ink-muted)",
        }}
      >
        <input
          type="checkbox"
          style={{
            width: mobile ? 20 : 18,
            height: mobile ? 20 : 18,
            accentColor: "#111111",
          }}
        />
        개인정보 수집·이용에 동의합니다{" "}
        <a href="#" style={{ color: "var(--ink)" }}>
          [보기]
        </a>
      </label>

      <button
        type="button"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: mobile ? 52 : 56,
          width: "100%",
          background: "var(--red-500)",
          color: "var(--on-brand)",
          borderRadius: "var(--radius-md)",
          border: "1px solid transparent",
          font: `700 ${mobile ? 16 : 17}px/1 var(--font-sans)`,
          cursor: "pointer",
        }}
      >
        무료 상담 신청하기
      </button>
    </form>
  );
}
