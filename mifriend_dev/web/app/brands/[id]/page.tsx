"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import PhotoSlot from "@/components/PhotoSlot";
import ConsultForm from "@/components/ConsultForm";
import { dummyBrands } from "@/data/dummy-brands";
import { PhoneIcon, ChevronRight } from "@/components/icons";

const TABS = ["소개", "특징", "갤러리"] as const;

export default function BrandDetailPage() {
  const { id } = useParams<{ id: string }>();
  const brand = dummyBrands.find((b) => b.id === id);
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("소개");

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
                  {brand.storeCount}개
                </strong>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 24 }}>
              <Link href="/consult" className="btn-primary" style={{ justifyContent: "center" }}>
                무료 상담 신청
              </Link>
              <a
                href="tel:01047086091"
                className="btn-outline"
                style={{ justifyContent: "center", gap: 6 }}
              >
                <PhoneIcon size={18} /> 전화 상담
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 탭 영역 ── */}
      <section style={{ borderBottom: "1px solid var(--line)", marginTop: 32 }}>
        <div className="container-mf">
          <nav style={{ display: "flex" }}>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="touch-target"
                style={{
                  flex: 1,
                  height: 48,
                  border: "none",
                  borderBottom: `3px solid ${activeTab === tab ? "var(--red-500)" : "transparent"}`,
                  background: "transparent",
                  font: `${activeTab === tab ? 700 : 500} 15px/1 var(--font-sans)`,
                  color: activeTab === tab ? "var(--ink)" : "var(--ink-muted)",
                  cursor: "pointer",
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
        {activeTab === "소개" && (
          <div style={{ maxWidth: 720 }}>
            <h2 className="typo-h2" style={{ margin: "0 0 16px" }}>브랜드 소개</h2>
            <p className="typo-body" style={{ color: "var(--ink-muted)" }}>
              {brand.description}
            </p>
          </div>
        )}

        {activeTab === "특징" && (
          <div style={{ maxWidth: 720 }}>
            <h2 className="typo-h2" style={{ margin: "0 0 16px" }}>브랜드 특징</h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 12 }}>
              {brand.features.map((f) => (
                <li
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "16px 20px",
                    background: "var(--surface-muted)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <ChevronRight size={16} fill="var(--red-500)" />
                  <span className="typo-body">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "갤러리" && (
          <div>
            <h2 className="typo-h2" style={{ margin: "0 0 16px" }}>매장 갤러리</h2>
            <div className="brand-gallery-grid">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <PhotoSlot
                  key={n}
                  id={`P${n}`}
                  aspectRatio="4/3"
                  rounded="md"
                  alt={`${brand.name} 갤러리 ${n}`}
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
