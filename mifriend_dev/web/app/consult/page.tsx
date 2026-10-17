import PageHero from "@/components/PageHero";
import PhotoSlot from "@/components/PhotoSlot";
import ConsultForm from "@/components/ConsultForm";

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

      <style>{`
        .consult-layout {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        @media (min-width: 768px) {
          .consult-layout {
            flex-direction: row;
            gap: 64px;
            align-items: flex-start;
          }
          .consult-image { flex: 0 0 420px; }
          .consult-form-wrap { flex: 1; }
        }
      `}</style>
    </>
  );
}
