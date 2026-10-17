import type { Metadata } from "next";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "마이프랜 개인정보처리방침입니다.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="개인정보처리방침" />
      <div
        className="container-mf section-py"
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <article className="typo-body" style={{ color: "var(--ink-muted)" }}>
          <h2 className="typo-h2" style={{ color: "var(--ink)", marginBottom: 16 }}>
            1. 개인정보의 처리 목적
          </h2>
          <p>
            주식회사 마이프랜(이하 &quot;회사&quot;)은 다음의 목적을 위하여 개인정보를 처리합니다.
            처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는
            별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <ul style={{ paddingLeft: 20, margin: "12px 0" }}>
            <li>창업 상담 서비스 제공 및 상담 이력 관리</li>
            <li>프랜차이즈 브랜드 정보 제공</li>
            <li>고객 문의 응대</li>
          </ul>

          <h2 className="typo-h2" style={{ color: "var(--ink)", margin: "32px 0 16px" }}>
            2. 수집하는 개인정보 항목
          </h2>
          <p>
            회사는 상담 신청 시 다음의 개인정보를 수집합니다:
          </p>
          <ul style={{ paddingLeft: 20, margin: "12px 0" }}>
            <li>필수: 성함, 연락처(휴대전화번호)</li>
            <li>선택: 창업 희망지역, 관심 업종, 창업 형태</li>
          </ul>

          <h2 className="typo-h2" style={{ color: "var(--ink)", margin: "32px 0 16px" }}>
            3. 개인정보의 보유 및 이용기간
          </h2>
          <p>
            수집된 개인정보는 수집 목적 달성 후 지체 없이 파기합니다.
            단, 관계 법령의 규정에 의하여 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보관합니다.
          </p>

          <h2 className="typo-h2" style={{ color: "var(--ink)", margin: "32px 0 16px" }}>
            4. 개인정보 처리 위탁
          </h2>
          <p>
            회사는 서비스 이행을 위해 개인정보 처리 업무를 외부에 위탁하지 않습니다.
            향후 위탁이 필요한 경우, 위탁 대상자 및 위탁 업무 내용을 본 방침에 공개하겠습니다.
          </p>

          <h2 className="typo-h2" style={{ color: "var(--ink)", margin: "32px 0 16px" }}>
            5. 개인정보 보호 책임자
          </h2>
          <p>
            성명: (추후 기재)<br />
            연락처: 010-4708-6091<br />
            이메일: myfriend2026@naver.com
          </p>

          <p style={{ marginTop: 48, color: "var(--smoke)" }}>
            * 본 개인정보처리방침은 예시이며, 실제 운영 시 법률 검토를 거쳐 확정됩니다.
          </p>
        </article>
      </div>
    </>
  );
}
