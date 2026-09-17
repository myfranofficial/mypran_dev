import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWrite } from "@/lib/auth/user";
import { getPageSection, setPageSection, listAllPages } from "@/lib/db/pages";
import { exportAll } from "@/lib/db/json-export";
import * as s from "../ui/styles";

const PAGE_CONFIGS: { slug: string; label: string; sections: { key: string; label: string; fields: { name: string; label: string; type: "text" | "textarea" }[] }[] }[] = [
  {
    slug: "stores",
    label: "매장안내",
    sections: [
      {
        key: "hero",
        label: "히어로",
        fields: [
          { name: "title", label: "제목", type: "text" },
          { name: "subtitle", label: "부제목", type: "text" },
        ],
      },
      {
        key: "intro",
        label: "소개",
        fields: [
          { name: "title", label: "제목", type: "text" },
          { name: "description", label: "설명", type: "textarea" },
        ],
      },
    ],
  },
  {
    slug: "gallery",
    label: "사진 갤러리",
    sections: [
      {
        key: "hero",
        label: "히어로",
        fields: [
          { name: "title", label: "제목", type: "text" },
          { name: "subtitle", label: "부제목", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "videos",
    label: "영상 갤러리",
    sections: [
      {
        key: "hero",
        label: "히어로",
        fields: [
          { name: "title", label: "제목", type: "text" },
          { name: "subtitle", label: "부제목", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "news",
    label: "뉴스/소식",
    sections: [
      {
        key: "hero",
        label: "히어로",
        fields: [
          { name: "title", label: "제목", type: "text" },
          { name: "subtitle", label: "부제목", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "events",
    label: "이벤트",
    sections: [
      {
        key: "hero",
        label: "히어로",
        fields: [
          { name: "title", label: "제목", type: "text" },
          { name: "subtitle", label: "부제목", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "faq",
    label: "FAQ",
    sections: [
      {
        key: "hero",
        label: "히어로",
        fields: [
          { name: "title", label: "제목", type: "text" },
          { name: "subtitle", label: "부제목", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "downloads",
    label: "자료실",
    sections: [
      {
        key: "hero",
        label: "히어로",
        fields: [
          { name: "title", label: "제목", type: "text" },
          { name: "subtitle", label: "부제목", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "franchise",
    label: "창업안내",
    sections: [
      {
        key: "hero",
        label: "히어로",
        fields: [
          { name: "title", label: "제목", type: "text" },
          { name: "subtitle", label: "부제목", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "benefits",
    label: "가맹 혜택",
    sections: [
      {
        key: "hero",
        label: "히어로",
        fields: [
          { name: "title", label: "제목", type: "text" },
          { name: "subtitle", label: "부제목", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "support",
    label: "창업 지원",
    sections: [
      {
        key: "hero",
        label: "히어로",
        fields: [
          { name: "title", label: "제목", type: "text" },
          { name: "subtitle", label: "부제목", type: "text" },
        ],
      },
    ],
  },
];

export default async function PagesEditorPage({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string }>;
}) {
  await requireWrite();
  const sp = await searchParams;

  // Load all current values
  const values: Record<string, Record<string, Record<string, string>>> = {};
  for (const page of PAGE_CONFIGS) {
    values[page.slug] = {};
    for (const sec of page.sections) {
      const row = getPageSection(page.slug, sec.key);
      try {
        values[page.slug][sec.key] = row?.content_json ? JSON.parse(row.content_json) : {};
      } catch {
        values[page.slug][sec.key] = {};
      }
    }
  }

  async function saveAction(formData: FormData) {
    "use server";
    await requireWrite();

    for (const page of PAGE_CONFIGS) {
      for (const sec of page.sections) {
        const data: Record<string, string> = {};
        for (const field of sec.fields) {
          const key = `${page.slug}__${sec.key}__${field.name}`;
          data[field.name] = String(formData.get(key) ?? "").trim();
        }
        setPageSection(page.slug, sec.key, JSON.stringify(data));
      }
    }

    try { exportAll(); } catch (e) { console.error("[pages] exportAll:", e); }
    revalidatePath("/admin/pages");
    redirect("/admin/pages?msg=saved");
  }

  return (
    <div className="mx-auto max-w-[800px]">
      <h1 className="text-xl font-bold text-[#231F20]">서브페이지 편집</h1>
      <p className="mt-1 text-sm text-[#9E9F9C]">각 페이지의 히어로 섹션 텍스트를 편집합니다. 저장 시 JSON이 자동 갱신됩니다.</p>

      {sp.msg === "saved" && <div className={`mt-4 ${s.okBox}`}>저장되었습니다.</div>}

      <form action={saveAction} className="mt-6 space-y-6">
        {PAGE_CONFIGS.map((page) => (
          <fieldset key={page.slug} className="space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-5">
            <legend className="text-sm font-bold text-[#231F20]">{page.label}</legend>
            {page.sections.map((sec) => (
              <div key={sec.key} className="space-y-3">
                {page.sections.length > 1 && (
                  <p className="text-xs font-medium text-[#9E9F9C] uppercase">{sec.label}</p>
                )}
                {sec.fields.map((field) => {
                  const key = `${page.slug}__${sec.key}__${field.name}`;
                  const val = values[page.slug]?.[sec.key]?.[field.name] ?? "";
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
              </div>
            ))}
          </fieldset>
        ))}

        <div className="flex justify-end">
          <button type="submit" className={s.btnPrimary}>전체 저장</button>
        </div>
      </form>
    </div>
  );
}
