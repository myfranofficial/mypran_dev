import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWrite } from "@/lib/auth/user";
import { getHomepageSection, setHomepageSection } from "@/lib/db/homepage";
import { PreviewLink } from "../ui/preview-link";
import { SavePreview } from "../ui/save-preview";
import * as s from "../ui/styles";

const SECTIONS = [
  {
    key: "hero",
    label: "히어로 슬라이더",
    fields: [
      { name: "title", label: "메인 타이틀", type: "text" as const },
      { name: "subtitle", label: "서브 타이틀", type: "text" as const },
    ],
  },
  {
    key: "stats",
    label: "통계 섹션",
    fields: [
      { name: "title", label: "섹션 제목", type: "text" as const },
      { name: "stat1_label", label: "통계1 라벨", type: "text" as const },
      { name: "stat1_value", label: "통계1 값", type: "text" as const },
      { name: "stat2_label", label: "통계2 라벨", type: "text" as const },
      { name: "stat2_value", label: "통계2 값", type: "text" as const },
      { name: "stat3_label", label: "통계3 라벨", type: "text" as const },
      { name: "stat3_value", label: "통계3 값", type: "text" as const },
    ],
  },
  {
    key: "benefits_bar",
    label: "혜택 바",
    fields: [
      { name: "text", label: "혜택 텍스트", type: "text" as const },
    ],
  },
  {
    key: "club_intro",
    label: "클럽 소개",
    fields: [
      { name: "title", label: "제목", type: "text" as const },
      { name: "description", label: "설명", type: "textarea" as const },
    ],
  },
  {
    key: "membership",
    label: "멤버십",
    fields: [
      { name: "title", label: "제목", type: "text" as const },
      { name: "description", label: "설명", type: "textarea" as const },
    ],
  },
];

export default async function HomepageEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string }>;
}) {
  await requireWrite();
  const sp = await searchParams;

  const values: Record<string, Record<string, string>> = {};
  for (const sec of SECTIONS) {
    const row = getHomepageSection(sec.key);
    try {
      values[sec.key] = row?.content_json ? JSON.parse(row.content_json) : {};
    } catch {
      values[sec.key] = {};
    }
  }

  async function saveAction(formData: FormData) {
    "use server";
    await requireWrite();

    for (const sec of SECTIONS) {
      const data: Record<string, string> = {};
      for (const field of sec.fields) {
        const key = `${sec.key}__${field.name}`;
        data[field.name] = String(formData.get(key) ?? "").trim();
      }
      setHomepageSection(sec.key, JSON.stringify(data));
    }

    revalidatePath("/admin/homepage");
    redirect("/admin/homepage?msg=saved");
  }

  return (
    <div className="mx-auto max-w-[800px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#231F20]">메인페이지 편집</h1>
          <p className="mt-1 text-sm text-[#9E9F9C]">메인 페이지 각 섹션의 텍스트를 편집합니다</p>
        </div>
        <PreviewLink path="/" label="메인 페이지 보기" />
      </div>

      {sp.msg === "saved" && <div className={`mt-4 ${s.okBox}`}>저장되었습니다.</div>}
      <SavePreview previewPath="/" saved={sp.msg === "saved"} />

      <form action={saveAction} className="mt-6 space-y-6">
        {SECTIONS.map((sec) => (
          <fieldset key={sec.key} className="space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5">
            <legend className="text-sm font-bold text-[#231F20]">{sec.label}</legend>
            {sec.fields.map((field) => {
              const key = `${sec.key}__${field.name}`;
              const val = values[sec.key]?.[field.name] ?? "";
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
