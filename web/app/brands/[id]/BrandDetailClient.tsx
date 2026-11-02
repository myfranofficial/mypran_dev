"use client";

import { useState } from "react";
import Link from "next/link";
import PhotoSlot from "@/components/PhotoSlot";
import ConsultForm from "@/components/ConsultForm";
import type { Brand } from "@/lib/brand-types";
import { PhoneIcon, ChevronRight, CheckCircleIcon, ClockIcon, DownloadIcon } from "@/components/icons";

const TABS = ["소개", "창업비용", "창업절차", "본사지원", "갤러리"] as const;

export default function BrandDetailClient({ brand, phone = "010-4708-6091" }: { brand: Brand | null; phone?: string }) {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("소개");
  const phoneDigits = phone.replace(/-/g, "");

  if (!brand) {
    return (
      <div className="container-mf section-py" style={{ textAlign: "center" }}>
        <h1 className="typo-h1">브랜드를 찾을 수 없습니다</h1>
        <Link href="/brands" className="btn-primary" style={{ marginTop: 24 }}>
          브랜드 목록으로
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* ── 상단 영역: 이미지 + 정보 ── */}
      <section className="container-mf" style={{ paddingTop: 24, paddingBottom: 0 }}>
        <div className="brand-detail-top">
          {/* 이미지 */}
          <div className="brand-detail-image">
            <PhotoSlot
              id="P3"
              src={brand.mainImage}
              aspectRatio="16/10"
              alt={`${brand.name} 메인`}
              sizes="(max-width: 767px) 100vw, 580px"
              rounded="md"
            />
          </div>

          {/* 정보 */}
          <div className="brand-detail-info">
            <span
              style={{
                display: "inline-block",
                padding: "4px 12px",
                background: "var(--red-50)",
                color: "var(--red-500)",
                borderRadius: "var(--radius-sm)",
                font: "500 13px/18px var(--font-sans)",
                marginBottom: 12,
              }}
            >
              {brand.categoryName}
            </span>
            <h1
              className="typo-h1"
              style={{ margin: 0, letterSpacing: "-0.02em" }}
            >
              {brand.name}
            </h1>
            <p className="typo-body" style={{ margin: "8px 0 0", color: "var(--ink-muted)" }}>
              {brand.tagline}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginTop: 24,
                padding: "20px 0",
                borderTop: "1px solid var(--line)",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <div>
                <span className="typo-caption" style={{ color: "var(--ink-muted)" }}>
                  창업 비용
                </span>
                <strong style={{ display: "block", font: "700 18px/26px var(--font-sans)", color: "var(--red-500)", marginTop: 2 }}>
                  {brand.foundingCost}
                </strong>
              </div>
              <div>
                <span className="typo-caption" style={{ color: "var(--ink-muted)" }}>
                  매장 수
                </span>
                <strong style={{ display: "block", font: "700 18px/26px var(--font-sans)", marginTop: 2 }}>
                  {brand.storeCount.toLocaleString()}개
                </strong>
              </div>
              <div>
                <span className="typo-caption" style={{ color: "var(--ink-muted)" }}>
                  기준 면적
                </span>
                <strong style={{ display: "block", font: "700 15px/22px var(--font-sans)", marginTop: 2 }}>
                  {brand.standardArea}
                </strong>
              </div>
              <div>
                <span className="typo-caption" style={{ color: "var(--ink-muted)" }}>
                  로열티
                </span>
                <strong style={{ display: "block", font: "700 15px/22px var(--font-sans)", marginTop: 2 }}>
                  {brand.royalty}
                </strong>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 24 }}>
              <Link href={`/consult?brand=${brand.id}`} className="btn-primary" style={{ justifyContent: "center" }}>
                무료 상담 신청
              </Link>
              <a
                href={`tel:${phoneDigits}`}
                className="btn-outline"
                style={{ justifyContent: "center", gap: 6 }}
              >
                <PhoneIcon size={18} /> 전화 상담
              </a>
            </div>

            {/* Compare + Download */}
            <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
              <Link
                href={`/compare?add=${brand.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  font: "500 13px/1 var(--font-sans)",
                  color: "var(--ink-muted)",
                  textDecoration: "none",
                }}
              >
                비교함 담기
              </Link>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  font: "500 13px/1 var(--font-sans)",
                  color: "var(--ink-muted)",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <DownloadIcon size={14} fill="var(--ink-muted)" />
                카탈로그 다운로드
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 탭 영역 ── */}
      <section style={{ borderBottom: "1px solid var(--line)", marginTop: 32 }}>
        <div className="container-mf">
          <nav className="hscroll" style={{ display: "flex" }}>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="touch-target"
                style={{
                  flex: "none",
                  minWidth: 72,
                  height: 48,
                  padding: "0 16px",
                  border: "none",
                  borderBottom: `3px solid ${activeTab === tab ? "var(--red-500)" : "transparent"}`,
                  background: "transparent",
                  font: `${activeTab === tab ? 700 : 500} 15px/1 var(--font-sans)`,
                  color: activeTab === tab ? "var(--ink)" : "var(--ink-muted)",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* ── 탭 콘텐츠 ── */}
      <section className="container-mf section-py">
        {/* 소개 */}
        {activeTab === "소개" && (
          <div style={{ maxWidth: 720 }}>
            <h2 className="typo-h2" style={{ margin: "0 0 16px" }}>브랜드 소개</h2>
            <p className="typo-body" style={{ color: "var(--ink-muted)", lineHeight: "1.8" }}>
              {brand.description}
            </p>

            <h3 className="typo-h3" style={{ margin: "32px 0 12px" }}>브랜드 특징</h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
              {brand.features.map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 18px",
                    background: "var(--surface-muted)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <CheckCircleIcon size={18} fill="var(--red-500)" />
                  <span className="typo-body">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 창업비용 */}
        {activeTab === "창업비용" && (
          <div style={{ maxWidth: 720 }}>
            <h2 className="typo-h2" style={{ margin: "0 0 8px" }}>창업 비용 안내</h2>
            <p className="typo-caption" style={{ color: "var(--ink-muted)", margin: "0 0 24px" }}>
              기준 면적: {brand.standardArea} | VAT {brand.vatIncluded ? "포함" : "별도"} | 보증금 {brand.depositIncluded ? "포함" : "별도"}
            </p>

            {/* Cost breakdown table */}
            <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  padding: "14px 20px",
                  background: "var(--night)",
                  color: "var(--surface)",
                  font: "700 14px/20px var(--font-sans)",
                }}
              >
                <span>항목</span>
                <span style={{ textAlign: "right" }}>비용</span>
              </div>
              {brand.costBreakdown.map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    padding: "14px 20px",
                    borderTop: "1px solid var(--line)",
                    background: i % 2 === 0 ? "var(--surface)" : "var(--surface-muted)",
                    font: "400 14px/20px var(--font-sans)",
                  }}
                >
                  <span>{item.label}</span>
                  <span style={{ textAlign: "right", fontWeight: 600 }}>{item.value}</span>
                </div>
              ))}
              {/* Total row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  padding: "16px 20px",
                  borderTop: "2px solid var(--ink)",
                  background: "var(--surface-muted)",
                  font: "700 15px/22px var(--font-sans)",
                }}
              >
                <span>총 창업비용</span>
                <span style={{ textAlign: "right", color: "var(--red-500)" }}>{brand.foundingCost}</span>
              </div>
            </div>

            {/* Key fees summary */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: 12,
                marginTop: 24,
              }}
            >
              {[
                { label: "가맹비", value: brand.franchiseFee },
                { label: "교육비", value: brand.educationFee },
                { label: "로열티", value: brand.royalty },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    padding: "16px",
                    background: "var(--surface-muted)",
                    borderRadius: "var(--radius-md)",
                    textAlign: "center",
                  }}
                >
                  <span className="typo-caption" style={{ color: "var(--ink-muted)" }}>
                    {item.label}
                  </span>
                  <strong style={{ display: "block", font: "700 16px/24px var(--font-sans)", marginTop: 4 }}>
                    {item.value}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 창업절차 */}
        {activeTab === "창업절차" && (
          <div style={{ maxWidth: 720 }}>
            <h2 className="typo-h2" style={{ margin: "0 0 24px" }}>창업 절차</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {brand.startupProcess.map((step, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 16,
                    position: "relative",
                  }}
                >
                  {/* Timeline line */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 32,
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: i === 0 ? "var(--red-500)" : "var(--surface-muted)",
                        color: i === 0 ? "var(--on-brand)" : "var(--ink-muted)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        font: "700 13px/1 var(--font-sans)",
                        border: i === 0 ? "none" : "2px solid var(--line)",
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </div>
                    {i < brand.startupProcess.length - 1 && (
                      <div
                        style={{
                          width: 2,
                          flex: 1,
                          minHeight: 24,
                          background: "var(--line)",
                        }}
                      />
                    )}
                  </div>
                  {/* Step content */}
                  <div style={{ paddingBottom: i < brand.startupProcess.length - 1 ? 24 : 0, paddingTop: 4 }}>
                    <span className="typo-body" style={{ fontWeight: 600 }}>{step}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 본사지원 */}
        {activeTab === "본사지원" && (
          <div style={{ maxWidth: 720 }}>
            <h2 className="typo-h2" style={{ margin: "0 0 24px" }}>본사 지원 사항</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 12,
              }}
            >
              {brand.headquarters.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "18px 20px",
                    background: "var(--surface-muted)",
                    borderRadius: "var(--radius-md)",
                    borderLeft: "4px solid var(--red-500)",
                  }}
                >
                  <CheckCircleIcon size={20} fill="var(--red-500)" />
                  <span className="typo-body" style={{ fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 갤러리 */}
        {activeTab === "갤러리" && (
          <div>
            <h2 className="typo-h2" style={{ margin: "0 0 16px" }}>매장 갤러리</h2>
            <div className="brand-gallery-grid">
              {(brand.images && brand.images.length > 0 ? brand.images : [1, 2, 3, 4, 5, 6]).map((src, n) => (
                <PhotoSlot
                  key={n}
                  id={`P${n}`}
                  src={typeof src === "string" ? src : undefined}
                  aspectRatio="4/3"
                  rounded="md"
                  alt={`${brand.name} 갤러리 ${n + 1}`}
                  sizes="(max-width: 767px) 50vw, 33vw"
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ── 하단 상담폼 ── */}
      <section style={{ background: "var(--surface-muted)" }}>
        <div className="container-mf section-py" style={{ maxWidth: 640, margin: "0 auto" }}>
          <ConsultForm brandId={brand.id} brandName={brand.name} />
        </div>
      </section>

      <style>{`
        .brand-detail-top {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        @media (min-width: 768px) {
          .brand-detail-top {
            flex-direction: row;
            gap: 48px;
          }
          .brand-detail-image { flex: 1; }
          .brand-detail-info { flex: 1; }
        }
        .brand-gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        @media (min-width: 768px) {
          .brand-gallery-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 16px;
          }
        }
      `}</style>
    </>
  );
}
