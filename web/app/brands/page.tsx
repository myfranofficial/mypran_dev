"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHero from "@/components/PageHero";
import CategoryTabs from "@/components/CategoryTabs";
import BrandCard from "@/components/BrandCard";
import { SearchIcon } from "@/components/icons";
import { categories, budgetRanges, storeTypes, dummyBrands } from "@/data/dummy-brands";

export default function BrandsPage() {
  return (
    <Suspense>
      <BrandsContent />
    </Suspense>
  );
}

function BrandsContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";

  const [activeCategory, setActiveCategory] = useState("all");
  const [activeBudget, setActiveBudget] = useState("all");
  const [activeStoreType, setActiveStoreType] = useState("all");
  const [searchQuery, setSearchQuery] = useState(initialQ);

  const filtered = useMemo(() => {
    let result = dummyBrands;

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

        {/* Brand grid */}
        <div className="grid-brands" style={{ marginTop: 24 }}>
          {filtered.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>

        {filtered.length === 0 && (
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
        )}
      </div>
    </>
  );
}
