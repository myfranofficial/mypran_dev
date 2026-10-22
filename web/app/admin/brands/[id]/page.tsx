"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import BrandForm from "../BrandForm";
import type { Brand } from "@/lib/brand-types";

export default function EditBrandPage() {
  const { id } = useParams<{ id: string }>();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/brands/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => {
        setBrand(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p style={{ color: "var(--ink-muted)" }}>로딩 중...</p>;
  }

  if (!brand) {
    return <p style={{ color: "var(--red-500)" }}>브랜드를 찾을 수 없습니다.</p>;
  }

  return (
    <>
      <h1 style={{ margin: "0 0 24px", font: "700 24px/32px var(--font-sans)" }}>
        브랜드 편집 — {brand.name}
      </h1>
      <BrandForm brand={brand} isEdit />
    </>
  );
}
