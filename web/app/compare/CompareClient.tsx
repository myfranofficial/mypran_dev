"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import PhotoSlot from "@/components/PhotoSlot";
import type { Brand } from "@/lib/brand-types";
import { CloseIcon, SearchIcon } from "@/components/icons";

const MAX_COMPARE = 3;

export default function CompareClient({ initialBrands }: { initialBrands: Brand[] }) {
  return (
    <Suspense>
      <CompareContent allBrands={initialBrands} />
    </Suspense>
  );
}

function CompareContent({ allBrands }: { allBrands: Brand[] }) {
  const searchParams = useSearchParams();
  const addId = searchParams.get("add");

  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (addId && allBrands.some((b) => b.id === addId)) return [addId];
    return [];
  });
  const [searchQuery, setSearchQuery] = useState("");

  const selected = useMemo(
    () => selectedIds.map((id) => allBrands.find((b) => b.id === id)).filter(Boolean) as Brand[],
    [selectedIds]
  );

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.trim().toLowerCase();
    return allBrands
      .filter(
        (b) =>
          !selectedIds.includes(b.id) &&
          (b.name.toLowerCase().includes(q) || b.categoryName.includes(q))
      )
      .slice(0, 5);
  }, [searchQuery, selectedIds]);

  function addBrand(id: string) {
    if (selectedIds.length >= MAX_COMPARE) return;
    if (!selectedIds.includes(id)) {
      setSelectedIds((prev) => [...prev, id]);
    }
    setSearchQuery("");
  }

  function removeBrand(id: string) {
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  }

  const COMPARE_ROWS: { label: string; render: (b: Brand) => string }[] = [
    { label: "업종", render: (b) => b.categoryName },
    { label: "창업 비용", render: (b) => b.foundingCost },
    { label: "가맹비", render: (b) => b.franchiseFee },
    { label: "교육비", render: (b) => b.educationFee },
    { label: "로열티", render: (b) => b.royalty },
    { label: "기준 면적", render: (b) => b.standardArea },
    { label: "매장 수", render: (b) => `${b.storeCount.toLocaleString()}개` },
    { label: "매장 형태", render: (b) => {
      const map: Record<string, string> = { hall: "홀 매장", delivery: "배달 전문", unmanned: "무인 매장", shopinshop: "샵인샵", convert: "업종 변경" };
      return map[b.storeType] ?? b.storeType;
    }},
  ];

  return (
    <>
      <PageHero
        title="브랜드 비교"
        subtitle="최대 3개 브랜드를 선택하여 한눈에 비교하세요"
      />

      <div className="container-mf section-py">
        {/* Brand search/add */}
        {selectedIds.length < MAX_COMPARE && (
          <div style={{ maxWidth: 400, marginBottom: 32, position: "relative" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "0 14px",
                height: 48,
                background: "var(--surface-muted)",
                borderRadius: "var(--radius-md)",
              }}
            >
              <SearchIcon size={18} fill="var(--ink-muted)" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`브랜드 추가 (${selectedIds.length}/${MAX_COMPARE})`}
                style={{
                  flex: 1,
                  border: "none",
                  background: "transparent",
                  font: "400 15px/20px var(--font-sans)",
                  color: "var(--ink)",
                  outline: "none",
                }}
              />
            </div>
            {searchResults.length > 0 && (
              <ul
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  zIndex: 20,
                  listStyle: "none",
                  margin: "4px 0 0",
                  padding: 0,
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius-md)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  overflow: "hidden",
                }}
              >
                {searchResults.map((b) => (
                  <li key={b.id}>
                    <button
                      onClick={() => addBrand(b.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        width: "100%",
                        padding: "12px 16px",
                        border: "none",
                        borderBottom: "1px solid var(--line)",
                        background: "transparent",
                        cursor: "pointer",
                        font: "500 14px/20px var(--font-sans)",
                        color: "var(--ink)",
                        textAlign: "left",
                      }}
                    >
                      <span style={{ font: "400 12px/1 var(--font-sans)", color: "var(--ink-muted)" }}>
                        {b.categoryName}
                      </span>
                      {b.name}
                      <span style={{ marginLeft: "auto", font: "400 12px/1 var(--font-sans)", color: "var(--ink-muted)" }}>
                        {b.foundingCost}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Quick add buttons */}
        {selectedIds.length === 0 && (
          <div style={{ marginBottom: 32 }}>
            <p className="typo-caption" style={{ color: "var(--ink-muted)", marginBottom: 12 }}>
              인기 브랜드 빠른 추가
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {allBrands.filter((b) => b.isFeatured).slice(0, 6).map((b) => (
                <button
                  key={b.id}
                  onClick={() => addBrand(b.id)}
                  style={{
                    padding: "8px 16px",
                    border: "1px solid var(--line-control)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--surface)",
                    cursor: "pointer",
                    font: "500 13px/1 var(--font-sans)",
                    color: "var(--ink)",
                  }}
                >
                  + {b.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Comparison table */}
        {selected.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table className="compare-table">
              <thead>
                <tr>
                  <th style={{ width: 120 }}></th>
                  {selected.map((b) => (
                    <th key={b.id}>
                      <div style={{ position: "relative" }}>
                        <button
                          onClick={() => removeBrand(b.id)}
                          aria-label={`${b.name} 제거`}
                          style={{
                            position: "absolute",
                            top: -4,
                            right: -4,
                            width: 24,
                            height: 24,
                            border: "none",
                            borderRadius: "50%",
                            background: "var(--ink-muted)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CloseIcon size={14} fill="#fff" />
                        </button>
                        <PhotoSlot
                          id={`cmp-${b.id}`}
                          src={b.mainImage}
                          aspectRatio="4/3"
                          rounded="md"
                          alt={b.name}
                          sizes="200px"
                        />
                        <span
                          style={{
                            display: "block",
                            marginTop: 8,
                            font: "700 15px/20px var(--font-sans)",
                            textAlign: "center",
                          }}
                        >
                          {b.name}
                        </span>
                        <span
                          style={{
                            display: "block",
                            font: "400 12px/16px var(--font-sans)",
                            color: "var(--ink-muted)",
                            textAlign: "center",
                          }}
                        >
                          {b.tagline}
                        </span>
                      </div>
                    </th>
                  ))}
                  {selected.length < MAX_COMPARE && (
                    <th>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: 120,
                          border: "2px dashed var(--line)",
                          borderRadius: "var(--radius-md)",
                          color: "var(--ink-muted)",
                          font: "500 13px/1 var(--font-sans)",
                        }}
                      >
                        + 브랜드 추가
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr key={row.label} style={{ background: i % 2 === 0 ? "var(--surface)" : "var(--surface-muted)" }}>
                    <td
                      style={{
                        font: "700 13px/18px var(--font-sans)",
                        color: "var(--ink-muted)",
                        padding: "14px 16px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.label}
                    </td>
                    {selected.map((b) => (
                      <td
                        key={b.id}
                        style={{
                          font: "600 14px/20px var(--font-sans)",
                          padding: "14px 16px",
                          textAlign: "center",
                        }}
                      >
                        {row.render(b)}
                      </td>
                    ))}
                    {selected.length < MAX_COMPARE && <td />}
                  </tr>
                ))}
                {/* CTA row */}
                <tr>
                  <td style={{ padding: "16px" }}></td>
                  {selected.map((b) => (
                    <td key={b.id} style={{ padding: "16px", textAlign: "center" }}>
                      <Link
                        href={`/consult?brand=${b.id}`}
                        className="btn-primary"
                        style={{ fontSize: 13, height: 40, padding: "0 16px" }}
                      >
                        상담 신청
                      </Link>
                    </td>
                  ))}
                  {selected.length < MAX_COMPARE && <td />}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "64px 0", color: "var(--ink-muted)" }}>
            <p className="typo-h3">비교할 브랜드를 선택하세요</p>
            <p className="typo-body" style={{ marginTop: 8 }}>
              위에서 브랜드를 검색하거나 빠른 추가 버튼을 눌러 비교를 시작하세요
            </p>
            <Link href="/brands" className="btn-outline" style={{ marginTop: 24 }}>
              브랜드 목록 보기
            </Link>
          </div>
        )}
      </div>

      <style>{`
        .compare-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 480px;
        }
        .compare-table th,
        .compare-table td {
          border-bottom: 1px solid var(--line);
          vertical-align: top;
        }
        .compare-table th {
          padding: 16px;
          min-width: 180px;
          font-weight: normal;
        }
        @media (max-width: 767px) {
          .compare-table th { min-width: 140px; }
        }
      `}</style>
    </>
  );
}
