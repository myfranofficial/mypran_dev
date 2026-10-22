"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Brand, BrandTier } from "@/lib/brand-types";
import { categories } from "@/data/static-data";

const TIERS: { value: BrandTier; label: string }[] = [
  { value: "best", label: "베스트" },
  { value: "premium", label: "프리미엄" },
  { value: "special", label: "스페셜" },
];

const LISTING_FEES: Record<BrandTier, number> = {
  best: 1000,
  premium: 700,
  special: 500,
};

const DEFAULT_PROCESS = [
  "가맹 문의 및 상담",
  "사업 설명회 참석",
  "가맹 계약 체결",
  "상권 분석 및 입지 선정",
  "인테리어 설계·시공",
  "본사 교육 이수",
  "오픈 준비 및 시운영",
  "정식 오픈",
];

type FormBrand = Omit<Brand, "id">;

function defaultBrand(): FormBrand {
  return {
    name: "",
    tier: "best",
    order: 1,
    categoryId: "korean",
    categoryName: "한식",
    tagline: "",
    description: "",
    foundingCost: "",
    foundingCostMin: 0,
    listingFeePerMonth: 1000,
    storeCount: 0,
    storeType: "hall",
    features: [],
    phone: "010-4708-6091",
    mainImage: "",
    isFeatured: false,
    costBreakdown: [],
    franchiseFee: "",
    educationFee: "",
    royalty: "",
    standardArea: "",
    vatIncluded: false,
    depositIncluded: false,
    startupProcess: DEFAULT_PROCESS,
    headquarters: [],
  };
}

export default function BrandForm({
  brand,
  isEdit,
}: {
  brand?: Brand;
  isEdit: boolean;
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormBrand>(
    brand ? { ...brand } : defaultBrand()
  );
  const [saving, setSaving] = useState(false);
  const [featuresText, setFeaturesText] = useState(
    (brand?.features ?? []).join("\n")
  );
  const [hqText, setHqText] = useState(
    (brand?.headquarters ?? []).join("\n")
  );
  const [uploading, setUploading] = useState(false);

  function set<K extends keyof FormBrand>(key: K, value: FormBrand[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleTierChange(tier: BrandTier) {
    set("tier", tier);
    set("listingFeePerMonth", LISTING_FEES[tier]);
    set("isFeatured", tier === "best");
  }

  function handleCategoryChange(catId: string) {
    const cat = categories.find((c) => c.id === catId);
    set("categoryId", catId);
    set("categoryName", cat?.name ?? catId);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) set("mainImage", data.url);
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      features: featuresText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      headquarters: hqText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const url = isEdit ? `/api/brands/${brand!.id}` : "/api/brands";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/brands");
      router.refresh();
    } else {
      alert("저장에 실패했습니다.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 720 }}>
      <div style={{ display: "grid", gap: 20 }}>
        {/* 브랜드명 */}
        <Field label="브랜드명 *">
          <input
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            style={inputStyle}
          />
        </Field>

        {/* 티어 + 입점비 + 순서 */}
        <Row cols={3}>
          <Field label="등급 *">
            <select
              value={form.tier}
              onChange={(e) =>
                handleTierChange(e.target.value as BrandTier)
              }
              style={inputStyle}
            >
              {TIERS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="입점비(만원/월)">
            <input
              type="number"
              value={form.listingFeePerMonth}
              onChange={(e) =>
                set("listingFeePerMonth", Number(e.target.value))
              }
              style={inputStyle}
            />
          </Field>
          <Field label="노출순서">
            <input
              type="number"
              value={form.order}
              onChange={(e) => set("order", Number(e.target.value))}
              style={inputStyle}
            />
          </Field>
        </Row>

        {/* 업종 */}
        <Field label="업종 *">
          <select
            value={form.categoryId}
            onChange={(e) => handleCategoryChange(e.target.value)}
            style={inputStyle}
          >
            {categories
              .filter((c) => c.id !== "all")
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>
        </Field>

        {/* 태그라인 + 설명 */}
        <Field label="태그라인">
          <input
            value={form.tagline}
            onChange={(e) => set("tagline", e.target.value)}
            style={inputStyle}
          />
        </Field>
        <Field label="설명">
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </Field>

        {/* 이미지 */}
        <Field label="대표 이미지">
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <input
              value={form.mainImage ?? ""}
              onChange={(e) => set("mainImage", e.target.value)}
              placeholder="/brands/xxx.jpg"
              style={{ ...inputStyle, flex: "1 1 200px" }}
            />
            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 40,
                padding: "0 16px",
                border: "1px solid var(--line-control)",
                borderRadius: "var(--radius-md)",
                font: "500 13px/1 var(--font-sans)",
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {uploading ? "업로드 중..." : "파일 선택"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
            </label>
          </div>
        </Field>

        {/* 비용 */}
        <Row cols={2}>
          <Field label="창업비용 (텍스트)">
            <input
              value={form.foundingCost}
              onChange={(e) => set("foundingCost", e.target.value)}
              placeholder="3,000만원~5,000만원"
              style={inputStyle}
            />
          </Field>
          <Field label="최소 창업비용 (만원)">
            <input
              type="number"
              value={form.foundingCostMin}
              onChange={(e) =>
                set("foundingCostMin", Number(e.target.value))
              }
              style={inputStyle}
            />
          </Field>
        </Row>

        <Row cols={3}>
          <Field label="가맹비">
            <input
              value={form.franchiseFee}
              onChange={(e) => set("franchiseFee", e.target.value)}
              style={inputStyle}
            />
          </Field>
          <Field label="교육비">
            <input
              value={form.educationFee}
              onChange={(e) => set("educationFee", e.target.value)}
              style={inputStyle}
            />
          </Field>
          <Field label="로열티">
            <input
              value={form.royalty}
              onChange={(e) => set("royalty", e.target.value)}
              style={inputStyle}
            />
          </Field>
        </Row>

        <Row cols={3}>
          <Field label="기준면적">
            <input
              value={form.standardArea}
              onChange={(e) => set("standardArea", e.target.value)}
              placeholder="10~15평"
              style={inputStyle}
            />
          </Field>
          <Field label="매장수">
            <input
              type="number"
              value={form.storeCount}
              onChange={(e) => set("storeCount", Number(e.target.value))}
              style={inputStyle}
            />
          </Field>
          <Field label="매장형태">
            <select
              value={form.storeType}
              onChange={(e) => set("storeType", e.target.value)}
              style={inputStyle}
            >
              <option value="hall">홀 매장</option>
              <option value="delivery">배달 전문</option>
              <option value="unmanned">무인 매장</option>
              <option value="shopinshop">샵인샵</option>
              <option value="convert">업종 변경</option>
            </select>
          </Field>
        </Row>

        {/* 특징 */}
        <Field label="특징 (줄바꿈 구분)">
          <textarea
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            rows={4}
            placeholder={"고기덮밥 전문\n합리적 가격\n간편 조리 시스템"}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </Field>

        {/* 본사지원 */}
        <Field label="본사 지원 (줄바꿈 구분)">
          <textarea
            value={hqText}
            onChange={(e) => setHqText(e.target.value)}
            rows={4}
            placeholder={"식재료 공급\n레시피 교육\n매장 운영 컨설팅"}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </Field>

        {/* 전화번호 */}
        <Field label="전화번호">
          <input
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            style={inputStyle}
          />
        </Field>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
        <button
          type="submit"
          disabled={saving}
          style={{
            flex: 1,
            height: 48,
            padding: "0 32px",
            background: "var(--red-500)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius-md)",
            font: "700 15px/1 var(--font-sans)",
            cursor: saving ? "not-allowed" : "pointer",
            opacity: saving ? 0.6 : 1,
          }}
        >
          {saving ? "저장 중..." : isEdit ? "수정" : "등록"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/brands")}
          style={{
            height: 48,
            padding: "0 24px",
            background: "transparent",
            color: "var(--ink)",
            border: "1px solid var(--line-control)",
            borderRadius: "var(--radius-md)",
            font: "500 14px/1 var(--font-sans)",
            cursor: "pointer",
          }}
        >
          취소
        </button>
      </div>

      {/* Responsive grid styles */}
      <style>{`
        .admin-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .admin-row-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
        @media (max-width: 767px) {
          .admin-row-2 { grid-template-columns: 1fr; }
          .admin-row-3 { grid-template-columns: 1fr; }
        }
      `}</style>
    </form>
  );
}

function Row({
  cols,
  children,
}: {
  cols: 2 | 3;
  children: React.ReactNode;
}) {
  return <div className={`admin-row-${cols}`}>{children}</div>;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span
        style={{
          font: "600 13px/18px var(--font-sans)",
          color: "var(--ink-muted)",
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  height: 40,
  padding: "0 12px",
  border: "1px solid var(--line-control)",
  borderRadius: "var(--radius-md)",
  font: "400 14px/1 var(--font-sans)",
  color: "var(--ink)",
  background: "var(--surface)",
  width: "100%",
  boxSizing: "border-box",
};
