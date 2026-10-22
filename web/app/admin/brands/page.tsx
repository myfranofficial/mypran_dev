"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Brand, BrandTier } from "@/lib/brand-types";

const TIER_LABELS: Record<BrandTier, { label: string; color: string }> = {
  best: { label: "베스트", color: "#E53E3E" },
  premium: { label: "프리미엄", color: "#2B6CB0" },
  special: { label: "스페셜", color: "#38A169" },
};

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/brands")
      .then((r) => r.json())
      .then((data) => {
        setBrands(data);
        setLoading(false);
      });
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`"${name}" 브랜드를 삭제하시겠습니까?`)) return;
    const res = await fetch(`/api/brands/${id}`, { method: "DELETE" });
    if (res.ok) {
      setBrands((prev) => prev.filter((b) => b.id !== id));
    }
  }

  const grouped: { tier: BrandTier; brands: Brand[] }[] = (["best", "premium", "special"] as BrandTier[]).map(
    (tier) => ({ tier, brands: brands.filter((b) => b.tier === tier) })
  );

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ margin: 0, font: "700 24px/32px var(--font-sans)" }}>브랜드 관리</h1>
        <Link
          href="/admin/brands/new"
          style={{
            display: "inline-flex",
            alignItems: "center",
            height: 40,
            padding: "0 20px",
            background: "var(--red-500)",
            color: "#fff",
            borderRadius: "var(--radius-md)",
            font: "700 14px/1 var(--font-sans)",
            textDecoration: "none",
          }}
        >
          + 브랜드 추가
        </Link>
      </div>

      {loading ? (
        <p style={{ color: "var(--ink-muted)" }}>로딩 중...</p>
      ) : (
        grouped.map((group) => (
          <section key={group.tier} style={{ marginBottom: 32 }}>
            <h2
              style={{
                margin: "0 0 12px",
                font: "700 18px/24px var(--font-sans)",
                color: TIER_LABELS[group.tier].color,
              }}
            >
              {TIER_LABELS[group.tier].label} ({group.brands.length}개)
            </h2>
            <div
              style={{
                background: "var(--surface)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--line)",
                overflow: "hidden",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "var(--surface-muted)" }}>
                    <th style={thStyle}>순서</th>
                    <th style={{ ...thStyle, textAlign: "left" }}>브랜드명</th>
                    <th style={thStyle}>업종</th>
                    <th style={thStyle}>입점비(만원/월)</th>
                    <th style={thStyle}>창업비용</th>
                    <th style={thStyle}>매장수</th>
                    <th style={thStyle}>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {group.brands.map((b, i) => (
                    <tr key={b.id} style={{ borderTop: i > 0 ? "1px solid var(--line)" : undefined }}>
                      <td style={tdStyle}>{b.order}</td>
                      <td style={{ ...tdStyle, textAlign: "left", fontWeight: 600 }}>{b.name}</td>
                      <td style={tdStyle}>{b.categoryName}</td>
                      <td style={tdStyle}>{b.listingFeePerMonth.toLocaleString()}</td>
                      <td style={tdStyle}>{b.foundingCost}</td>
                      <td style={tdStyle}>{b.storeCount}</td>
                      <td style={tdStyle}>
                        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                          <Link
                            href={`/admin/brands/${b.id}`}
                            style={{
                              padding: "4px 12px",
                              border: "1px solid var(--line-control)",
                              borderRadius: "var(--radius-sm)",
                              font: "500 12px/1 var(--font-sans)",
                              color: "var(--ink)",
                              textDecoration: "none",
                              background: "var(--surface)",
                            }}
                          >
                            편집
                          </Link>
                          <button
                            onClick={() => handleDelete(b.id, b.name)}
                            style={{
                              padding: "4px 12px",
                              border: "1px solid var(--red-500)",
                              borderRadius: "var(--radius-sm)",
                              font: "500 12px/1 var(--font-sans)",
                              color: "var(--red-500)",
                              background: "transparent",
                              cursor: "pointer",
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))
      )}
    </>
  );
}

const thStyle: React.CSSProperties = {
  padding: "10px 12px",
  font: "600 12px/16px var(--font-sans)",
  color: "var(--ink-muted)",
  textAlign: "center",
  whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  padding: "10px 12px",
  font: "400 13px/18px var(--font-sans)",
  textAlign: "center",
  whiteSpace: "nowrap",
};
