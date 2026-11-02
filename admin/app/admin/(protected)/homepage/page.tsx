import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWrite } from "@/lib/auth/user";
import { getHomepageSection, setHomepageSection } from "@/lib/db/homepage";
import { exportAll } from "@/lib/db/json-export";
import { PreviewLink } from "../ui/preview-link";
import { SavePreview } from "../ui/save-preview";
import * as s from "../ui/styles";

/**
 * 마이프랜 메인페이지 섹션 정의.
 * - "json" 타입: JSON 배열을 textarea로 편집
 * - "text"/"textarea" 타입: 단일 값 편집
 */
type SectionField =
  | { name: string; label: string; type: "text" | "textarea" }
  | { name: string; label: string; type: "json"; hint: string };

type Section = {
  key: string;
  label: string;
  desc?: string;
  fields: SectionField[];
};

const SECTIONS: Section[] = [
  {
    key: "stats",
    label: "핵심 통계",
    desc: "메인 페이지에 표시되는 통계 수치입니다. icon: trophy, people, chart, shield",
    fields: [
      {
        name: "_json",
        label: "통계 데이터 (JSON 배열)",
        type: "json" as const,
        hint: '[{ "icon": "trophy", "value": "100+", "label": "입점 브랜드" }, ...]',
      },
    ],
  },
  {
    key: "benefits",
    label: "입점 혜택 아이콘",
    desc: "메인 슬라이드 아래 표시되는 혜택 아이콘 목록",
    fields: [
      {
        name: "_json",
        label: "혜택 데이터 (JSON 배열)",
        type: "json" as const,
        hint: '[{ "icon": "speaker", "title": "자사 홈페이지 광고비", "accent": "매월 1억원 집행" }, ...]',
      },
    ],
  },
  {
    key: "plans",
    label: "입점 플랜 (가격표)",
    desc: "입점안내 페이지의 브랜드 플랜 카드",
    fields: [
      {
        name: "_json",
        label: "플랜 데이터 (JSON 배열)",
        type: "json" as const,
        hint: '[{ "tier": "best", "name": "베스트 브랜드", "price": "1,000", ... }, ...]',
      },
    ],
  },
  {
    key: "heroServices",
    label: "히어로 서비스 아이콘",
    desc: "메인 히어로 배너 하단의 서비스 아이콘 목록",
    fields: [
      {
        name: "_json",
        label: "서비스 데이터 (JSON 배열)",
        type: "json" as const,
        hint: '[{ "icon": "people", "label": "가맹영업대행" }, ...]',
      },
    ],
  },
  {
    key: "listingBenefits",
    label: "입점 혜택 상세",
    desc: "입점안내 페이지에 표시되는 상세 혜택 설명",
    fields: [
      {
        name: "_json",
        label: "혜택 상세 (JSON 배열)",
        type: "json" as const,
        hint: '[{ "title": "자사 홈페이지 광고비", "desc": "매월 1억원 규모의..." }, ...]',
      },
    ],
  },
];

/** DB에 저장된 JSON을 보기 좋게 포맷 */
function prettyJson(raw: string | null | undefined): string {
  if (!raw) return "";
  try {
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    return raw;
  }
}

export default async function HomepageEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string; error?: string }>;
}) {
  await requireWrite();
  const sp = await searchParams;

  // 각 섹션의 현재 값 로드
  const sectionData: Record<string, string> = {};
  for (const sec of SECTIONS) {
    const row = getHomepageSection(sec.key);
    sectionData[sec.key] = row?.content_json ?? "";
  }

  async function saveAction(formData: FormData) {
    "use server";
    await requireWrite();

    for (const sec of SECTIONS) {
      const field = sec.fields[0];
      if (field.type === "json") {
        const raw = String(formData.get(sec.key) ?? "").trim();
        if (raw) {
          // JSON 유효성 검증
          try {
            JSON.parse(raw);
          } catch {
            redirect(`/admin/homepage?error=${encodeURIComponent(`${sec.label}: 올바른 JSON 형식이 아닙니다.`)}`);
          }
          setHomepageSection(sec.key, raw);
        }
      } else {
        // 단일 필드들을 객체로 묶어 저장
        const data: Record<string, string> = {};
        for (const f of sec.fields) {
          const key = `${sec.key}__${f.name}`;
          data[f.name] = String(formData.get(key) ?? "").trim();
        }
        setHomepageSection(sec.key, JSON.stringify(data));
      }
    }

    exportAll();
    revalidatePath("/admin/homepage");
    redirect("/admin/homepage?msg=saved");
  }

  return (
    <div className="mx-auto max-w-[800px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#231F20]">메인페이지 편집</h1>
          <p className="mt-1 text-sm text-[#9E9F9C]">메인 페이지 각 섹션의 데이터를 편집합니다</p>
        </div>
        <PreviewLink path="/" label="메인 페이지 보기" />
      </div>

      {sp.msg === "saved" && <div className={`mt-4 ${s.okBox}`}>저장되었습니다.</div>}
      {sp.error && <div className={`mt-4 ${s.errorBox}`}>{sp.error}</div>}
      <SavePreview previewPath="/" saved={sp.msg === "saved"} />

      <form action={saveAction} className="mt-6 space-y-6">
        {SECTIONS.map((sec) => (
          <fieldset key={sec.key} className="space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5">
            <legend className="text-sm font-bold text-[#231F20]">{sec.label}</legend>
            {sec.desc && <p className="text-xs text-[#9E9F9C]">{sec.desc}</p>}

            {sec.fields.map((field) => {
              if (field.type === "json") {
                const val = prettyJson(sectionData[sec.key]);
                return (
                  <div key={field.name} className="space-y-1.5">
                    <label htmlFor={sec.key} className={s.label}>{field.label}</label>
                    <textarea
                      id={sec.key}
                      name={sec.key}
                      rows={10}
                      defaultValue={val}
                      className={`${s.textarea} font-mono text-xs`}
                      style={{ lineHeight: 1.6 }}
                    />
                    <p className="text-xs text-[#B0B0B0]">예시: {field.hint}</p>
                  </div>
                );
              }

              const key = `${sec.key}__${field.name}`;
              let val = "";
              try {
                const parsed = JSON.parse(sectionData[sec.key] || "{}");
                val = parsed[field.name] ?? "";
              } catch { /* skip */ }

              return (
                <div key={key} className="space-y-1.5">
                  <label htmlFor={key} className={s.label}>{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea id={key} name={key} rows={3} defaultValue={val} className={s.textarea} />
                  ) : (
                    <input id={key} name={key} defaultValue={val} className={s.input} />
                  )}
                </div>
              );
            })}
          </fieldset>
        ))}

        <div className="flex justify-end">
          <button type="submit" className={s.btnPrimary}>전체 저장</button>
        </div>
      </form>
    </div>
  );
}
