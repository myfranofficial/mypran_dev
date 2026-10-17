import PageHero from "@/components/PageHero";
import Link from "next/link";

export default function ListingPage() {
  return (
    <>
      <PageHero
        title="입점 안내"
        subtitle="마이프랜에 브랜드를 입점하고 창업 고객과 연결하세요"
      />
      <div className="container-mf section-py" style={{ textAlign: "center" }}>
        <p className="typo-body" style={{ color: "var(--ink-muted)", marginBottom: 32 }}>
          입점 안내 페이지가 준비 중입니다.
          <br />
          입점 문의는 아래 버튼을 통해 신청해 주세요.
        </p>
        <Link href="/consult" className="btn-primary">
          입점 문의
        </Link>
      </div>
    </>
  );
}
