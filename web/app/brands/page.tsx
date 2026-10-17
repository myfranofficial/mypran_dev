"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import CategoryTabs from "@/components/CategoryTabs";
import BrandCard from "@/components/BrandCard";
import { categories, dummyBrands } from "@/data/dummy-brands";

export default function BrandsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? dummyBrands
      : dummyBrands.filter((b) => b.categoryId === activeCategory);

  return (
    <>
      <PageHero
        title="입점 브랜드"
        subtitle="업종별 대표 프랜차이즈 브랜드를 비교해 보세요"
      />

      <div className="container-mf section-py">
        <CategoryTabs
          categories={categories}
          activeId={activeCategory}
          onChange={setActiveCategory}
        />

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
            해당 업종의 브랜드가 아직 없습니다.
          </p>
        )}
      </div>
    </>
  );
}
