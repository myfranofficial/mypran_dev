import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import PhotoSlot from "@/components/PhotoSlot";
import ConsultForm from "@/components/ConsultForm";

export const metadata: Metadata = {
  title: "무료 창업 상담 신청",
  description: "프랜차이즈 창업 전문 컨설턴트가 1:1 무료 상담을 제공합니다. 업종 선정부터 상권 분석, 브랜드 비교까지 창업의 모든 과정을 도와드립니다.",
};

export default function ConsultPage() {
  return (
    <>
      <PageHero
        title="무료 창업 상담 신청"
        subtitle="전문 컨설턴트가 영업일 기준 24시간 안에 연락드립니다"
      />

      <section className="container-mf section-py">
        <div className="consult-layout">
          {/* PC: 왼쪽 이미지 */}
          <div className="consult-image hidden md:block">
            <PhotoSlot
              id="P7"
              aspectRatio="4/5"
              alt="상담 이미지"
              sizes="480px"
              rounded="md"
            />
          </div>

          {/* 폼 */}
          <div className="consult-form-wrap">
            <ConsultForm />
          </div>
        </div>
      </section>

    </>
  );
}
