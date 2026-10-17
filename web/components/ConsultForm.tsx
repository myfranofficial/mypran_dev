"use client";

import { useState, type FormEvent } from "react";

const REGIONS = ["서울", "경기", "인천", "부산", "대구", "대전", "광주", "울산", "세종", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"];
const CATEGORIES = ["카페·디저트", "치킨·피자", "외식·한식", "주점·술집", "편의·리테일", "서비스·교육"];
const STARTUP_TYPES = ["신규 창업", "업종 전환", "브랜드 입점 문의", "투자·기타"];

export default function ConsultForm({
  brandId,
  brandName,
}: {
  brandId?: string;
  brandName?: string;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const body = {
      name: fd.get("name"),
      phone: fd.get("phone"),
      region: fd.get("region"),
      category: fd.get("category"),
      startup_type: fd.get("startup_type"),
      brand_id: brandId ?? null,
      brand_name: brandName ?? null,
    };

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setDone(true);
      } else {
        alert("상담 신청에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch {
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <h3 className="typo-h2" style={{ margin: 0 }}>
          상담 신청이 완료되었습니다
        </h3>
        <p className="typo-body" style={{ margin: "12px 0 0", color: "var(--ink-muted)" }}>
          담당 컨설턴트가 영업일 기준 24시간 안에 연락드리겠습니다.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <span
          style={{
            font: "700 12px/16px var(--font-sans)",
            letterSpacing: "0.18em",
            color: "var(--ink-muted)",
          }}
        >
          FREE CONSULTING
        </span>
        <h2
          className="typo-h2"
          style={{ margin: "8px 0 0", letterSpacing: "-0.02em" }}
        >
          창업, <span style={{ color: "var(--red-500)" }}>무료 상담</span>부터 시작하세요
        </h2>
        <p className="typo-caption" style={{ margin: "8px 0 0", color: "var(--ink-muted)" }}>
          담당 컨설턴트가 영업일 기준 24시간 안에 연락드립니다.
        </p>
      </div>

      {brandName && (
        <div
          style={{
            padding: "12px 16px",
            background: "var(--red-50)",
            borderRadius: "var(--radius-md)",
            font: "500 14px/20px var(--font-sans)",
          }}
        >
          관심 브랜드: <strong style={{ color: "var(--red-500)" }}>{brandName}</strong>
        </div>
      )}

      <div className="consult-grid">
        <label style={{ display: "flex", flexDirection: "column", gap: 4, font: "700 15px/21px var(--font-sans)" }}>
          성함 <input className="uline" type="text" name="name" placeholder="홍길동" required />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 4, font: "700 15px/21px var(--font-sans)" }}>
          연락처 <input className="uline" type="tel" name="phone" placeholder="010-0000-0000" required />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 4, font: "700 15px/21px var(--font-sans)" }}>
          창업 희망지역
          <select className="uline" name="region">
            <option value="">시/도 선택</option>
            {REGIONS.map((r) => <option key={r}>{r}</option>)}
          </select>
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 4, font: "700 15px/21px var(--font-sans)" }}>
          관심 업종
          <select className="uline" name="category">
            <option value="">업종 선택</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
      </div>

      <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
        <legend style={{ padding: 0, marginBottom: 10, font: "700 15px/21px var(--font-sans)" }}>
          창업 형태
        </legend>
        <div className="chip-grid">
          {STARTUP_TYPES.map((label, i) => (
            <label key={label} className="chip">
              <input type="radio" name="startup_type" value={label} defaultChecked={i === 0} />
              <span style={{ width: "100%", justifyContent: "center" }}>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          font: "400 13px/18px var(--font-sans)",
          color: "var(--ink-muted)",
        }}
      >
        <input type="checkbox" required style={{ width: 20, height: 20, accentColor: "#111111" }} />
        개인정보 수집·이용에 동의합니다{" "}
        <a href="/privacy" style={{ color: "var(--ink)" }}>[보기]</a>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary"
        style={{ width: "100%", height: 52, fontSize: 16, opacity: submitting ? 0.6 : 1 }}
      >
        {submitting ? "신청 중..." : "무료 상담 신청하기"}
      </button>

      <style>{`
        .consult-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .consult-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 32px; }
        }
        .chip-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }
        @media (min-width: 768px) {
          .chip-grid { display: flex; flex-wrap: wrap; }
          .chip-grid .chip span { width: auto; }
        }
      `}</style>
    </form>
  );
}
