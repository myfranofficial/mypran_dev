"use client";

import BrandForm from "../BrandForm";

export default function NewBrandPage() {
  return (
    <>
      <h1 style={{ margin: "0 0 24px", font: "700 24px/32px var(--font-sans)" }}>
        브랜드 추가
      </h1>
      <BrandForm isEdit={false} />
    </>
  );
}
