import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWrite } from "@/lib/auth/user";
import { getPageSection, setPageSection } from "@/lib/db/pages";
import { exportPageImages } from "@/lib/db/json-export";
import { imageUrl } from "@/lib/storage";
import { PageImagesForm } from "./form";

/** 페이지별 이미지 슬롯 정의 */
export type ImageSlot = {
  key: string;
  label: string;
  guide: string;
  aspect?: number;
};

export type PageImageGroup = {
  page: string;
  label: string;
  slots: ImageSlot[];
};

const PAGE_IMAGE_GROUPS: PageImageGroup[] = [
  {
    page: "index",
    label: "메인페이지",
    slots: [
      { key: "space_1", label: "공간 갤러리 1 (플레이 존)", guide: "가로형 사진 (권장 1280×720, 16:9)", aspect: 16 / 9 },
      { key: "space_2", label: "공간 갤러리 2 (라운지)", guide: "가로형 사진 (권장 1280×720, 16:9)", aspect: 16 / 9 },
      { key: "space_3", label: "공간 갤러리 3 (상담 공간)", guide: "가로형 사진 (권장 1280×720, 16:9)", aspect: 16 / 9 },
    ],
  },
  {
    page: "about",
    label: "브랜드소개",
    slots: [
      { key: "hero", label: "히어로 배경", guide: "페이지 상단 전체 배경 (권장 1920×800)", aspect: 1920 / 800 },
      { key: "photo_1", label: "매장 사진 1", guide: "본문 2열 좌측 (권장 800×500)", aspect: 8 / 5 },
      { key: "photo_2", label: "매장 사진 2", guide: "본문 2열 우측 (권장 800×500)", aspect: 8 / 5 },
      { key: "photo_3", label: "브랜드 스토리 이미지", guide: "본문 상세 블록 (권장 600×400)", aspect: 3 / 2 },
    ],
  },
  {
    page: "franchise",
    label: "창업안내",
    slots: [
      { key: "hero", label: "히어로 배경", guide: "페이지 상단 전체 배경 (권장 1920×800)", aspect: 1920 / 800 },
      { key: "carousel_1", label: "시공사례 1", guide: "하단 갤러리 그리드 (권장 400×300)" },
      { key: "carousel_2", label: "시공사례 2", guide: "하단 갤러리 그리드 (권장 400×300)" },
      { key: "carousel_3", label: "시공사례 3", guide: "하단 갤러리 그리드 (권장 400×300)" },
      { key: "carousel_4", label: "시공사례 4", guide: "하단 갤러리 그리드 (권장 400×300)" },
    ],
  },
  {
    page: "benefits",
    label: "가맹혜택",
    slots: [
      { key: "hero", label: "히어로 배경", guide: "페이지 상단 전체 배경 (권장 1920×800)", aspect: 1920 / 800 },
      { key: "photo_1", label: "PLAY 수익 배경", guide: "좌측 카드 배경 (권장 800×500)", aspect: 8 / 5 },
      { key: "photo_2", label: "FOOD 수익 배경", guide: "우측 카드 배경 (권장 800×500)", aspect: 8 / 5 },
    ],
  },
  {
    page: "news",
    label: "뉴스/소식",
    slots: [
      { key: "hero", label: "히어로 배경", guide: "페이지 상단 전체 배경 (권장 1920×800)", aspect: 1920 / 800 },
      { key: "feature", label: "피처 이미지", guide: "본문 상세 블록 (권장 600×400)", aspect: 3 / 2 },
    ],
  },
  {
    page: "stores",
    label: "매장안내",
    slots: [
      { key: "hero", label: "히어로 배경", guide: "페이지 상단 전체 배경 (권장 1920×800)", aspect: 1920 / 800 },
    ],
  },
  {
    page: "gallery",
    label: "사진 갤러리",
    slots: [
      { key: "hero", label: "히어로 배경", guide: "페이지 상단 전체 배경 (권장 1920×800)", aspect: 1920 / 800 },
    ],
  },
  {
    page: "videos",
    label: "영상 갤러리",
    slots: [
      { key: "hero", label: "히어로 배경", guide: "페이지 상단 전체 배경 (권장 1920×800)", aspect: 1920 / 800 },
    ],
  },
  {
    page: "community",
    label: "커뮤니티",
    slots: [
      { key: "hero", label: "히어로 배경", guide: "페이지 상단 전체 배경 (권장 1920×800)", aspect: 1920 / 800 },
    ],
  },
  {
    page: "consult",
    label: "상담 신청",
    slots: [
      { key: "hero", label: "히어로 배경", guide: "페이지 상단 전체 배경 (권장 1920×800)", aspect: 1920 / 800 },
    ],
  },
  {
    page: "contact",
    label: "고객센터",
    slots: [
      { key: "hero", label: "히어로 배경", guide: "페이지 상단 전체 배경 (권장 1920×800)", aspect: 1920 / 800 },
    ],
  },
  {
    page: "events",
    label: "이벤트",
    slots: [
      { key: "hero", label: "히어로 배경", guide: "페이지 상단 전체 배경 (권장 1920×800)", aspect: 1920 / 800 },
    ],
  },
  {
    page: "faq",
    label: "FAQ",
    slots: [
      { key: "hero", label: "히어로 배경", guide: "페이지 상단 전체 배경 (권장 1920×800)", aspect: 1920 / 800 },
    ],
  },
  {
    page: "downloads",
    label: "자료실",
    slots: [
      { key: "hero", label: "히어로 배경", guide: "페이지 상단 전체 배경 (권장 1920×800)", aspect: 1920 / 800 },
    ],
  },
  {
    page: "location",
    label: "오시는 길",
    slots: [
      { key: "hero", label: "히어로 배경", guide: "페이지 상단 전체 배경 (권장 1920×800)", aspect: 1920 / 800 },
    ],
  },
  {
    page: "support",
    label: "창업 지원",
    slots: [
      { key: "hero", label: "히어로 배경", guide: "페이지 상단 전체 배경 (권장 1920×800)", aspect: 1920 / 800 },
    ],
  },
];

export default async function PageImagesPage({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string }>;
}) {
  await requireWrite();
  const sp = await searchParams;

  // Load current image keys per page
  const initialData: Record<string, Record<string, { key: string; url: string }>> = {};
  for (const group of PAGE_IMAGE_GROUPS) {
    const row = getPageSection("_images", group.page);
    const parsed: Record<string, string> = row?.content_json
      ? JSON.parse(row.content_json)
      : {};
    initialData[group.page] = {};
    for (const slot of group.slots) {
      const imgKey = parsed[slot.key] || "";
      initialData[group.page][slot.key] = {
        key: imgKey,
        url: imgKey ? imageUrl(imgKey) : "",
      };
    }
  }

  async function saveAction(formData: FormData) {
    "use server";
    await requireWrite();

    for (const group of PAGE_IMAGE_GROUPS) {
      const data: Record<string, string> = {};
      for (const slot of group.slots) {
        const fieldName = `${group.page}__${slot.key}`;
        data[slot.key] = String(formData.get(fieldName) ?? "").trim();
      }
      setPageSection("_images", group.page, JSON.stringify(data));
    }

    try {
      exportPageImages();
    } catch (e) {
      console.error("[page-images] export:", e);
    }
    revalidatePath("/admin/page-images");
    redirect("/admin/page-images?msg=saved");
  }

  return (
    <div className="mx-auto max-w-[800px]">
      <div>
        <h1 className="text-xl font-bold text-[#231F20]">페이지 이미지 관리</h1>
        <p className="mt-1 text-sm text-[#9E9F9C]">
          각 페이지의 히어로 배경, 본문 이미지를 교체합니다. 미등록 시 기본 이미지가 유지됩니다.
        </p>
      </div>

      {sp.msg === "saved" && (
        <div className="mt-4 rounded bg-[#E4F4EB] px-3 py-2 text-sm text-[#2E9E5B]">
          저장되었습니다. 프론트엔드에 즉시 반영됩니다.
        </div>
      )}

      <PageImagesForm
        groups={PAGE_IMAGE_GROUPS}
        initialData={initialData}
        saveAction={saveAction}
      />
    </div>
  );
}
