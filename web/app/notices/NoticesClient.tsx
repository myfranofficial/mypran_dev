"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import { dummyNotices } from "@/data/static-data";

export default function NoticesClient() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <>
      <PageHero title="공지사항" subtitle="마이프랜의 새로운 소식을 알려드립니다" />

      <div className="container-mf section-py" style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* PC: 테이블 스타일 헤더 */}
        <div
          className="hidden md:flex"
          style={{
            padding: "12px 20px",
            borderBottom: "2px solid var(--ink)",
            font: "700 14px/20px var(--font-sans)",
            color: "var(--ink-muted)",
          }}
        >
          <span style={{ flex: 1 }}>제목</span>
          <span style={{ width: 100, textAlign: "center" }}>분류</span>
          <span style={{ width: 120, textAlign: "right" }}>날짜</span>
        </div>

        {dummyNotices.map((notice) => {
          const isOpen = openId === notice.id;
          return (
            <article key={notice.id}>
              <button
                onClick={() => setOpenId(isOpen ? null : notice.id)}
                className="touch-target"
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  padding: "16px 4px",
                  border: "none",
                  borderBottom: "1px solid var(--line)",
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: 8,
                }}
              >
                {/* 모바일: 스택 */}
                <div className="md:hidden" style={{ flex: 1 }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 8px",
                      background: "var(--red-50)",
                      color: "var(--red-500)",
                      borderRadius: "var(--radius-sm)",
                      font: "500 11px/16px var(--font-sans)",
                      marginBottom: 4,
                    }}
                  >
                    {notice.category}
                  </span>
                  <span
                    style={{
                      display: "block",
                      font: `${isOpen ? 700 : 500} 15px/22px var(--font-sans)`,
                    }}
                  >
                    {notice.title}
                  </span>
                  <span className="typo-caption" style={{ color: "var(--ink-muted)", marginTop: 2 }}>
                    {notice.date}
                  </span>
                </div>

                {/* PC: 가로 배치 */}
                <span
                  className="hidden md:block"
                  style={{
                    flex: 1,
                    font: `${isOpen ? 700 : 500} 15px/22px var(--font-sans)`,
                    paddingLeft: 16,
                  }}
                >
                  {notice.title}
                </span>
                <span
                  className="hidden md:block"
                  style={{
                    width: 100,
                    textAlign: "center",
                    font: "500 13px/18px var(--font-sans)",
                    color: "var(--ink-muted)",
                  }}
                >
                  {notice.category}
                </span>
                <span
                  className="hidden md:block"
                  style={{
                    width: 120,
                    textAlign: "right",
                    font: "400 14px/20px var(--font-sans)",
                    color: "var(--ink-muted)",
                  }}
                >
                  {notice.date}
                </span>

                <span
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.2s",
                    font: "400 18px/1 var(--font-sans)",
                    color: "var(--ink-muted)",
                  }}
                >
                  ▾
                </span>
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: "16px 20px 24px",
                    borderBottom: "1px solid var(--line)",
                    background: "var(--surface-muted)",
                  }}
                >
                  <p className="typo-body" style={{ margin: 0, color: "var(--ink-muted)" }}>
                    {notice.content}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}
