import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { readSiteData } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "마이프랜 개인정보처리방침입니다.",
};

/** 줄바꿈 텍스트를 <p> 블록으로 변환 */
function TextBlock({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((para, i) => (
        <p key={i} style={{ margin: "12px 0", whiteSpace: "pre-wrap" }}>
          {para}
        </p>
      ))}
    </>
  );
}

const DEFAULT_PRIVACY = `1. 개인정보의 처리 목적

주식회사 마이프랜(이하 "회사")은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.

- 창업 상담 서비스 제공 및 상담 이력 관리
- 프랜차이즈 브랜드 정보 제공
- 고객 문의 응대

2. 수집하는 개인정보 항목

회사는 상담 신청 시 다음의 개인정보를 수집합니다:
- 필수: 성함, 연락처(휴대전화번호)
- 선택: 창업 희망지역, 관심 업종, 창업 형태

3. 개인정보의 보유 및 이용기간

수집된 개인정보는 수집 목적 달성 후 지체 없이 파기합니다. 단, 관계 법령의 규정에 의하여 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보관합니다.

4. 개인정보 처리 위탁

회사는 서비스 이행을 위해 개인정보 처리 업무를 외부에 위탁하지 않습니다. 향후 위탁이 필요한 경우, 위탁 대상자 및 위탁 업무 내용을 본 방침에 공개하겠습니다.

5. 개인정보 보호 책임자

성명: (추후 기재)

* 본 개인정보처리방침은 예시이며, 실제 운영 시 법률 검토를 거쳐 확정됩니다.`;

export default function PrivacyPage() {
  const site = readSiteData();
  const content = site.privacyPolicy || DEFAULT_PRIVACY;

  return (
    <>
      <PageHero title="개인정보처리방침" />
      <div
        className="container-mf section-py"
        style={{ maxWidth: 800, margin: "0 auto" }}
      >
        <article className="typo-body" style={{ color: "var(--ink-muted)" }}>
          <TextBlock text={content} />

          <div style={{ marginTop: 32, padding: "16px 20px", background: "var(--surface-muted)", borderRadius: "var(--radius-md)" }}>
            <p style={{ margin: 0 }}>
              <strong style={{ color: "var(--ink)" }}>연락처:</strong> {site.phone}<br />
              <strong style={{ color: "var(--ink)" }}>이메일:</strong> {site.email}
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
