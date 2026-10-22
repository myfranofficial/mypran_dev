"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { dummyNotices } from "@/data/static-data";
import { ChevronRight, FileIcon, BookIcon } from "@/components/icons";

const TABS = ["공지사항", "창업 자료", "브랜드 소식"] as const;

/* 창업 자료 더미 */
const startupGuides = [
  { title: "2026 프랜차이즈 창업 트렌드 리포트", desc: "올해 주목할 업종별 트렌드와 투자 포인트를 정리했습니다.", date: "2026-10-12", tag: "리포트" },
  { title: "소자본 창업 가이드 — 3천만원 이하 브랜드", desc: "적은 자본으로 시작할 수 있는 프랜차이즈 브랜드와 창업 전략을 소개합니다.", date: "2026-10-08", tag: "가이드" },
  { title: "상권 분석 체크리스트", desc: "매장 입지를 선택하기 전 반드시 확인해야 할 상권 분석 항목을 정리했습니다.", date: "2026-09-25", tag: "체크리스트" },
  { title: "프랜차이즈 계약 전 필수 확인사항", desc: "가맹 계약서에서 반드시 확인해야 할 핵심 조항과 주의사항을 안내합니다.", date: "2026-09-15", tag: "가이드" },
];

/* 브랜드 소식 더미 */
const brandNews = [
  { title: "메가커피, 전국 3,500호점 돌파", desc: "메가커피가 빠른 성장세를 이어가며 전국 3,500호점을 돌파했습니다.", date: "2026-10-14", brand: "메가커피" },
  { title: "교촌치킨, 2026 하반기 신메뉴 출시", desc: "교촌치킨이 하반기 시즌 한정 신메뉴를 선보입니다.", date: "2026-10-10", brand: "교촌치킨" },
  { title: "GS25, 무인매장 확대 전략 발표", desc: "GS25가 2027년까지 무인매장 1,000개 확대 계획을 발표했습니다.", date: "2026-10-05", brand: "GS25" },
  { title: "빽다방, 가맹비 인하 프로모션", desc: "빽다방이 신규 가맹점주를 위한 가맹비 인하 프로모션을 진행합니다.", date: "2026-09-28", brand: "빽다방" },
];

export default function ConsultingClient() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("공지사항");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <>
      <PageHero
        title="창업정보"
        subtitle="프랜차이즈 창업에 필요한 최신 정보를 확인하세요"
      />

      <div className="container-mf section-py">
        {/* Tabs */}
        <nav
          style={{
            display: "flex",
            borderBottom: "1px solid var(--line)",
            marginBottom: 32,
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setExpandedId(null); }}
              className="touch-target"
              style={{
                flex: 1,
                maxWidth: 200,
                height: 48,
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

        {/* 공지사항 */}
        {activeTab === "공지사항" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {dummyNotices.map((notice) => (
              <div
                key={notice.id}
                style={{ borderBottom: "1px solid var(--line)" }}
              >
                <button
                  onClick={() => setExpandedId(expandedId === notice.id ? null : notice.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    padding: "18px 0",
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    gap: 12,
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      padding: "3px 10px",
                      background: notice.category === "이벤트" ? "var(--red-50)" : "var(--surface-muted)",
                      color: notice.category === "이벤트" ? "var(--red-500)" : "var(--ink-muted)",
                      borderRadius: "var(--radius-sm)",
                      font: "500 12px/18px var(--font-sans)",
                      flexShrink: 0,
                    }}
                  >
                    {notice.category}
                  </span>
                  <span style={{ flex: 1, font: "500 15px/22px var(--font-sans)", color: "var(--ink)" }}>
                    {notice.title}
                  </span>
                  <span className="hidden md:inline" style={{ font: "400 13px/1 var(--font-sans)", color: "var(--ink-muted)", flexShrink: 0 }}>
                    {notice.date}
                  </span>
                  <ChevronRight
                    size={16}
                    className={expandedId === notice.id ? "rotate-90" : ""}
                  />
                </button>
                {expandedId === notice.id && (
                  <div
                    style={{
                      padding: "0 0 20px 0",
                      font: "400 14px/24px var(--font-sans)",
                      color: "var(--ink-muted)",
                    }}
                  >
                    <span className="md:hidden" style={{ display: "block", font: "400 12px/1 var(--font-sans)", color: "var(--ink-muted)", marginBottom: 8 }}>
                      {notice.date}
                    </span>
                    {notice.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 창업 자료 */}
        {activeTab === "창업 자료" && (
          <div style={{ display: "grid", gap: 16 }}>
            {startupGuides.map((guide) => (
              <div
                key={guide.title}
                style={{
                  display: "flex",
                  gap: 16,
                  padding: "20px",
                  background: "var(--surface-muted)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "var(--radius-md)",
                    background: "var(--red-50)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {guide.tag === "리포트" ? (
                    <FileIcon size={22} fill="var(--red-500)" />
                  ) : (
                    <BookIcon size={22} fill="var(--red-500)" />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span
                      style={{
                        padding: "2px 8px",
                        background: "var(--red-500)",
                        color: "#fff",
                        borderRadius: "var(--radius-sm)",
                        font: "700 11px/16px var(--font-sans)",
                      }}
                    >
                      {guide.tag}
                    </span>
                    <span style={{ font: "400 12px/1 var(--font-sans)", color: "var(--ink-muted)" }}>
                      {guide.date}
                    </span>
                  </div>
                  <h3 style={{ margin: 0, font: "700 15px/22px var(--font-sans)" }}>
                    {guide.title}
                  </h3>
                  <p className="typo-caption" style={{ margin: "4px 0 0", color: "var(--ink-muted)" }}>
                    {guide.desc}
                  </p>
                </div>
              </div>
            ))}
            <p className="typo-caption" style={{ textAlign: "center", color: "var(--ink-muted)", marginTop: 16 }}>
              더 많은 창업 자료가 준비 중입니다.
            </p>
          </div>
        )}

        {/* 브랜드 소식 */}
        {activeTab === "브랜드 소식" && (
          <div style={{ display: "grid", gap: 16 }}>
            {brandNews.map((news) => (
              <div
                key={news.title}
                style={{
                  padding: "20px",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span
                    style={{
                      padding: "2px 10px",
                      background: "var(--surface-muted)",
                      borderRadius: "var(--radius-sm)",
                      font: "500 12px/18px var(--font-sans)",
                      color: "var(--ink-muted)",
                    }}
                  >
                    {news.brand}
                  </span>
                  <span style={{ font: "400 12px/1 var(--font-sans)", color: "var(--ink-muted)" }}>
                    {news.date}
                  </span>
                </div>
                <h3 style={{ margin: 0, font: "700 15px/22px var(--font-sans)" }}>
                  {news.title}
                </h3>
                <p className="typo-caption" style={{ margin: "4px 0 0", color: "var(--ink-muted)" }}>
                  {news.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div
          style={{
            textAlign: "center",
            padding: "48px 0 0",
          }}
        >
          <p className="typo-body" style={{ color: "var(--ink-muted)", marginBottom: 16 }}>
            창업에 대해 궁금한 점이 있으신가요?
          </p>
          <Link href="/consult" className="btn-primary">
            무료 상담 신청
          </Link>
        </div>
      </div>

      <style>{`
        .rotate-90 {
          transform: rotate(90deg);
          transition: transform 0.15s ease;
        }
      `}</style>
    </>
  );
}
