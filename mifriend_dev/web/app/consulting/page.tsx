import PageHero from "@/components/PageHero";
import Link from "next/link";

export default function ConsultingPage() {
  return (
    <>
      <PageHero
        title="창업 컨설팅"
        subtitle="전문 컨설턴트가 창업의 모든 과정을 함께합니다"
      />
      <div className="container-mf section-py" style={{ textAlign: "center" }}>
        <p className="typo-body" style={{ color: "var(--ink-muted)", marginBottom: 32 }}>
          창업 컨설팅 페이지가 준비 중입니다.
          <br />
          무료 상담을 통해 먼저 문의해 보세요.
        </p>
        <Link href="/consult" className="btn-primary">
          무료 상담 신청
        </Link>
      </div>
    </>
  );
}
