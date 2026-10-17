import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWrite } from "@/lib/auth/user";
import { listVideos, deleteVideo } from "@/lib/db/videos";
import { exportVideos } from "@/lib/db/json-export";
import { imageUrl } from "@/lib/storage";
import { CreateButton } from "../ui/create-button";
import { SearchBar } from "../ui/search-bar";
import { DataTable, type Column, type RowVM } from "../ui/data-table";
import { PreviewLink } from "../ui/preview-link";
import { SavePreview } from "../ui/save-preview";
import * as s from "../ui/styles";

export default async function VideosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; msg?: string }>;
}) {
  await requireWrite();
  const sp = await searchParams;
  const videos = listVideos({ q: sp.q });

  async function deleteAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    deleteVideo(id);
    exportVideos();
    revalidatePath("/admin/videos");
    redirect("/admin/videos?msg=deleted");
  }

  const columns: Column[] = [
    { key: "thumb", label: "썸네일" },
    { key: "title", label: "제목" },
    { key: "category", label: "카테고리" },
    { key: "date", label: "날짜" },
  ];

  const rows: RowVM[] = videos.map((v) => {
    const thumb = v.thumbnail_url
      ? imageUrl(v.thumbnail_url)
      : v.youtube_id
        ? `https://img.youtube.com/vi/${v.youtube_id}/mqdefault.jpg`
        : null;
    return {
      id: v.id,
      href: `/admin/videos/${v.id}/edit`,
      mobileTitle: v.title,
      mobileMeta: v.category || "",
      cells: [
        thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumb} alt="" className="h-10 w-16 rounded object-cover" />
        ) : "—",
        v.title,
        v.category || "—",
        v.date || "—",
      ],
      actions: (
        <div className="space-y-1">
          <form action={deleteAction}>
            <input type="hidden" name="id" value={v.id} />
            <button type="submit" className={s.menuItemDanger}>삭제</button>
          </form>
        </div>
      ),
    };
  });

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#231F20]">영상 갤러리</h1>
          <p className="mt-1 text-sm text-[#9E9F9C]">영상 페이지에 썸네일 그리드로 표시됩니다</p>
        </div>
        <div className="flex items-center gap-2">
          <PreviewLink path="/videos" label="영상 페이지 보기" />
          <CreateButton href="/admin/videos/new">새 영상</CreateButton>
        </div>
      </div>

      {sp.msg === "deleted" && <div className={`mt-4 ${s.okBox}`}>삭제되었습니다.</div>}
      {sp.msg === "saved" && <div className={`mt-4 ${s.okBox}`}>저장되었습니다. 영상 페이지에 즉시 반영됩니다.</div>}
      <SavePreview previewPath="/videos" saved={sp.msg === "saved"} />

      <SearchBar placeholder="영상 검색" />
      <DataTable columns={columns} rows={rows} total={videos.length} tableId="videos" />
    </div>
  );
}
