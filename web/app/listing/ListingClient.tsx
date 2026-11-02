"use client";

import { useState, type FormEvent } from "react";
import PageHero from "@/components/PageHero";
import { CheckCircleIcon, ChevronRight } from "@/components/icons";
import type { HomePlan, ListingBenefit } from "@/lib/site-data";

const PRODUCT_OPTIONS = ["베스트 브랜드", "프리미엄 브랜드", "스페셜 브랜드", "기타 (상담 후 결정)"];

export default function ListingClient({
  plans,
  listingBenefits,
}: {
  plans: HomePlan[];
  listingBenefits: ListingBenefit[];
}) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    // For now, just simulate success (admin API not yet connected)
    await new Promise((r) => setTimeout(r, 800));
    setDone(true);
    setSubmitting(false);
  }

  return (
    <>
      <PageHero
        title="브랜드 입점"
        subtitle="마이프랜에 브랜드를 입점하고 창업 고객과 연결하세요"
      />

      {/* ── 입점 혜택 ── */}
      <section className="container-mf section-py" style={{ paddingBottom: 0 }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto" }}>
          <h2 className="typo-h2" style={{ margin: "0 0 8px" }}>
            왜 <span style={{ color: "var(--red-500)" }}>마이프랜</span>인가요?
          </h2>
          <p className="typo-body" style={{ color: "var(--ink-muted)", margin: 0 }}>
            온라인 창업박람회 플랫폼을 통해 검증된 창업 고객과 브랜드를 연결합니다
          </p>
        </div>

        <div
          className="listing-benefits-grid"
          style={{
            display: "grid",
            gap: 16,
            marginTop: 32,
            maxWidth: 960,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {listingBenefits.map((item) => (
            <div
              key={item.title}
              style={{
                display: "flex",
                gap: 14,
                padding: "20px",
                background: "var(--surface-muted)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <CheckCircleIcon size={22} fill="var(--red-500)" />
              <div>
                <strong className="typo-body" style={{ fontWeight: 700 }}>{item.title}</strong>
                <p className="typo-caption" style={{ margin: "4px 0 0", color: "var(--ink-muted)" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 입점 상품(요금표) ── */}
      <section className="container-mf section-py">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 className="typo-h2" style={{ margin: 0 }}>
            입점 <span style={{ color: "var(--red-500)" }}>상품 안내</span>
          </h2>
          <p className="typo-caption" style={{ margin: "8px 0 0", color: "var(--ink-muted)" }}>
            브랜드에 맞는 최적의 상품을 선택하세요 (VAT 별도)
          </p>
        </div>

        <div className="listing-plans-grid">
          {plans.map((plan) => (
            <article
              key={plan.tier}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "28px 24px",
                background: plan.featured ? "var(--night)" : "var(--surface)",
                color: plan.featured ? "var(--surface)" : "var(--ink)",
                border: plan.featured ? "2px solid var(--red-500)" : "1px solid var(--line)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <span
                style={{
                  font: "700 11px/16px var(--font-sans)",
                  letterSpacing: "0.18em",
                  color: plan.featured ? "var(--red-on-dark)" : "var(--ink-muted)",
                }}
              >
                {plan.eyebrow}
              </span>
              <h3 style={{ margin: "12px 0 4px", font: "700 22px/30px var(--font-sans)" }}>
                {plan.name}
              </h3>
              <p
                style={{
                  margin: "0 0 20px",
                  font: "400 13px/18px var(--font-sans)",
                  color: plan.featured ? "var(--smoke)" : "var(--ink-muted)",
                }}
              >
                {plan.desc}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 20 }}>
                <b style={{ font: "700 40px/44px var(--font-sans)", letterSpacing: "-0.03em" }}>
                  {plan.price}
                </b>
                <span style={{ font: "500 16px/1 var(--font-sans)" }}>만원/월</span>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: "16px 0 0",
                  borderTop: `1px solid ${plan.featured ? "var(--line-dark)" : "var(--line)"}`,
                  display: "grid",
                  gap: 10,
                  flex: 1,
                }}
              >
                {plan.specs.map((spec) => (
                  <li key={spec.label} style={{ display: "flex", justifyContent: "space-between", font: "400 14px/20px var(--font-sans)" }}>
                    <span style={{ color: plan.featured ? "var(--smoke)" : "var(--ink-muted)" }}>{spec.label}</span>
                    <b>{spec.value}</b>
                  </li>
                ))}
              </ul>
              <a
                href="#listing-form"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 44,
                  marginTop: 20,
                  borderRadius: "var(--radius-md)",
                  font: "700 15px/1 var(--font-sans)",
                  textDecoration: "none",
                  gap: 4,
                  ...(plan.featured
                    ? { background: "var(--red-500)", color: "var(--on-brand)", border: "1px solid transparent" }
                    : { background: "transparent", color: "var(--ink)", border: "1px solid var(--ink)" }),
                }}
              >
                입점 신청 <ChevronRight size={14} />
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ── 입점 신청 폼 ── */}
      <section id="listing-form" style={{ background: "var(--surface-muted)" }}>
        <div className="container-mf section-py" style={{ maxWidth: 640, margin: "0 auto" }}>
          {done ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <h3 className="typo-h2" style={{ margin: 0 }}>입점 신청이 완료되었습니다</h3>
              <p className="typo-body" style={{ margin: "12px 0 0", color: "var(--ink-muted)" }}>
                담당자가 영업일 기준 48시간 안에 연락드리겠습니다.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <span
                  style={{
                    font: "700 12px/16px var(--font-sans)",
                    letterSpacing: "0.18em",
                    color: "var(--ink-muted)",
                  }}
                >
                  BRAND LISTING
                </span>
                <h2 className="typo-h2" style={{ margin: "8px 0 0" }}>
                  브랜드 <span style={{ color: "var(--red-500)" }}>입점 신청</span>
                </h2>
                <p className="typo-caption" style={{ margin: "8px 0 0", color: "var(--ink-muted)" }}>
                  프랜차이즈 본사 담당자가 직접 작성해 주세요
                </p>
              </div>

              <div className="listing-form-grid">
                <label style={{ display: "flex", flexDirection: "column", gap: 4, font: "700 15px/21px var(--font-sans)" }}>
                  회사명 (브랜드명) <span style={{ color: "var(--red-500)", fontSize: 12 }}>*</span>
                  <input className="uline" type="text" name="company" placeholder="(주)마이프랜 / 마이프랜" required />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 4, font: "700 15px/21px var(--font-sans)" }}>
                  담당자명 <span style={{ color: "var(--red-500)", fontSize: 12 }}>*</span>
                  <input className="uline" type="text" name="contact_name" placeholder="홍길동" required />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 4, font: "700 15px/21px var(--font-sans)" }}>
                  연락처 <span style={{ color: "var(--red-500)", fontSize: 12 }}>*</span>
                  <input className="uline" type="tel" name="contact_phone" placeholder="010-0000-0000" required />
                </label>
                <label style={{ display: "flex", flexDirection: "column", gap: 4, font: "700 15px/21px var(--font-sans)" }}>
                  이메일 <span style={{ color: "var(--red-500)", fontSize: 12 }}>*</span>
                  <input className="uline" type="email" name="contact_email" placeholder="example@company.com" required />
                </label>
              </div>

              <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
                <legend style={{ padding: 0, marginBottom: 10, font: "700 15px/21px var(--font-sans)" }}>
                  희망 상품
                </legend>
                <div className="chip-grid">
                  {PRODUCT_OPTIONS.map((label, i) => (
                    <label key={label} className="chip">
                      <input type="radio" name="product" value={label} defaultChecked={i === 0} />
                      <span style={{ width: "100%", justifyContent: "center" }}>{label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label style={{ display: "flex", flexDirection: "column", gap: 4, font: "700 15px/21px var(--font-sans)" }}>
                추가 문의사항
                <textarea
                  name="message"
                  className="uline"
                  rows={4}
                  placeholder="브랜드 소개, 매장 수, 기타 문의사항을 적어주세요"
                  style={{ resize: "vertical", font: "400 15px/24px var(--font-sans)", color: "var(--ink)" }}
                />
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  font: "400 13px/18px var(--font-sans)",
                  color: "var(--ink-muted)",
                }}
              >
                <input type="checkbox" required style={{ width: 20, height: 20, accentColor: "#111111" }} />
                개인정보 수집·이용에 동의합니다{" "}
                <a href="/privacy" style={{ color: "var(--ink)" }}>[보기]</a>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary"
                style={{ width: "100%", height: 52, fontSize: 16, opacity: submitting ? 0.6 : 1 }}
              >
                {submitting ? "신청 중..." : "입점 신청하기"}
              </button>
            </form>
          )}
        </div>
      </section>

      <style>{`
        .listing-benefits-grid {
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .listing-benefits-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .listing-plans-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          max-width: 960px;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .listing-plans-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        .listing-form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .listing-form-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 32px; }
        }
        .chip-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }
        @media (min-width: 768px) {
          .chip-grid { display: flex; flex-wrap: wrap; }
          .chip-grid .chip span { width: auto; }
        }
      `}</style>
    </>
  );
}
