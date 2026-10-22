"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHero from "@/components/PageHero";
import CategoryTabs from "@/components/CategoryTabs";
import BrandCard from "@/components/BrandCard";
import { SearchIcon } from "@/components/icons";
import { categories, budgetRanges, storeTypes } from "@/data/static-data";
import type { Brand } from "@/lib/brand-types";

export default function BrandsClient({ initialBrands }: { initialBrands: Brand[] }) {
  return (
    <Suspense>
      <BrandsContent allBrands={initialBrands} />
    </Suspense>
  );
}

function BrandsContent({ allBrands }: { allBrands: Brand[] }) {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const initialCat = searchParams.get("cat") ?? "all";
  const initialBudget = searchParams.get("budget") ?? "all";

  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [activeBudget, setActiveBudget] = useState(initialBudget);
  const [activeStoreType, setActiveStoreType] = useState("all");
  const [searchQuery, setSearchQuery] = useState(initialQ);

  const filtered = useMemo(() => {
    let result = allBrands;

    if (activeCategory !== "all") {
      result = result.filter((b) => b.categoryId === activeCategory);
    }
    if (activeBudget !== "all") {
      const range = budgetRanges.find((r) => r.id === activeBudget);
      if (range) {
        result = result.filter(
          (b) => b.foundingCostMin >= range.min && b.foundingCostMin < range.max
        );
      }
    }
    if (activeStoreType !== "all") {
      result = result.filter((b) => b.storeType === activeStoreType);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.tagline.toLowerCase().includes(q) ||
          b.categoryName.includes(q)
      );
    }

    return result;
  }, [activeCategory, activeBudget, activeStoreType, searchQuery]);

  return (
    <>
      <PageHero
        title="브랜드 찾기"
        subtitle="업종·예산·매장형태로 나에게 맞는 브랜드를 찾아보세요"
      />

      <div className="container-mf section-py">
        {/* Search bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 14px",
            height: 48,
            background: "var(--surface-muted)",
            borderRadius: "var(--radius-md)",
            marginBottom: 20,
          }}
        >
          <SearchIcon size={18} fill="var(--ink-muted)" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="브랜드명으로 검색"
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              font: "400 15px/20px var(--font-sans)",
              color: "var(--ink)",
              outline: "none",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                font: "400 13px/1 var(--font-sans)",
                color: "var(--ink-muted)",
              }}
            >
              초기화
            </button>
          )}
        </div>

        {/* Category tabs */}
        <CategoryTabs
          categories={categories}
          activeId={activeCategory}
          onChange={setActiveCategory}
        />

        {/* Budget + Store type filters */}
        <div
          className="filter-row"
          style={{
            display: "flex",
            gap: 8,
            marginTop: 12,
            flexWrap: "wrap",
          }}
        >
          <select
            value={activeBudget}
            onChange={(e) => setActiveBudget(e.target.value)}
            className="touch-target"
            style={{
              height: 40,
              padding: "0 12px",
              border: "1px solid var(--line-control)",
              borderRadius: "var(--radius-md)",
              font: "500 14px/1 var(--font-sans)",
              color: activeBudget === "all" ? "var(--ink-muted)" : "var(--ink)",
              background: "var(--surface)",
              cursor: "pointer",
            }}
          >
            <option value="all">예산 전체</option>
            {budgetRanges.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>

          <select
            value={activeStoreType}
            onChange={(e) => setActiveStoreType(e.target.value)}
            className="touch-target"
            style={{
              height: 40,
              padding: "0 12px",
              border: "1px solid var(--line-control)",
              borderRadius: "var(--radius-md)",
              font: "500 14px/1 var(--font-sans)",
              color: activeStoreType === "all" ? "var(--ink-muted)" : "var(--ink)",
              background: "var(--surface)",
              cursor: "pointer",
            }}
          >
            <option value="all">매장형태 전체</option>
            {storeTypes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <span
            style={{
              display: "flex",
              alignItems: "center",
              font: "500 13px/1 var(--font-sans)",
              color: "var(--ink-muted)",
              marginLeft: "auto",
            }}
          >
            {filtered.length}개 브랜드
          </span>
        </div>

        {/* Brand grid — grouped by tier */}
        {(() => {
          const tiers = [
            { key: "best", label: "베스트 브랜드", color: "#E53E3E" },
            { key: "premium", label: "프리미엄 브랜드", color: "#2B6CB0" },
            { key: "special", label: "스페셜 브랜드", color: "#38A169" },
          ] as const;

          const grouped = tiers
            .map((t) => ({
              ...t,
              brands: filtered.filter((b) => b.tier === t.key),
            }))
            .filter((g) => g.brands.length > 0);

          if (grouped.length === 0) {
            return (
              <p
                style={{
                  textAlign: "center",
                  padding: "64px 0",
                  color: "var(--ink-muted)",
                }}
                className="typo-body"
              >
                조건에 맞는 브랜드가 없습니다. 필터를 조정해 보세요.
              </p>
            );
          }

          return grouped.map((group) => (
            <section key={group.key} style={{ marginTop: 32 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: 4,
                    height: 22,
                    borderRadius: 2,
                    background: group.color,
                  }}
                />
                <h2
                  style={{
                    margin: 0,
                    font: "700 20px/1.3 var(--font-sans)",
                    color: "var(--ink)",
                  }}
                >
                  {group.label}
                </h2>
                <span
                  style={{
                    font: "500 13px/1 var(--font-sans)",
                    color: "var(--ink-muted)",
                  }}
                >
                  {group.brands.length}개
                </span>
              </div>
              <div className="grid-brands">
                {group.brands.map((brand) => (
                  <BrandCard key={brand.id} brand={brand} />
                ))}
              </div>
            </section>
          ));
        })()}
      </div>
    </>
  );
}
