import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWrite } from "@/lib/auth/user";
import { listDownloads, deleteDownload } from "@/lib/db/downloads";
import { exportDownloads } from "@/lib/db/json-export";
import { CreateButton } from "../ui/create-button";
import { SearchBar } from "../ui/search-bar";
import { DataTable, type Column, type RowVM } from "../ui/data-table";
import * as s from "../ui/styles";

export default async function DownloadsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; msg?: string }>;
}) {
  await requireWrite();
  const sp = await searchParams;
  const files = listDownloads({ q: sp.q });

  async function deleteAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    deleteDownload(id);
    exportDownloads();
    revalidatePath("/admin/downloads");
    redirect("/admin/downloads?msg=deleted");
  }

  const columns: Column[] = [
    { key: "title", label: "제목" },
    { key: "filename", label: "파일명" },
    { key: "size", label: "크기" },
    { key: "downloads", label: "다운로드" },
  ];

  const rows: RowVM[] = files.map((f) => ({
    id: f.id,
    href: `/admin/downloads/${f.id}/edit`,
    mobileTitle: f.title,
    mobileMeta: f.filename || "",
    cells: [
      f.title,
      f.filename || "—",
      f.file_size || "—",
      f.download_count,
    ],
    actions: (
      <div className="space-y-1">
        <form action={deleteAction}>
          <input type="hidden" name="id" value={f.id} />
          <button type="submit" className={s.menuItemDanger}>삭제</button>
        </form>
      </div>
    ),
  }));

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#231F20]">자료실</h1>
        <CreateButton href="/admin/downloads/new">새 자료</CreateButton>
      </div>

      {sp.msg === "deleted" && <div className={`mt-4 ${s.okBox}`}>삭제되었습니다.</div>}
      {sp.msg === "saved" && <div className={`mt-4 ${s.okBox}`}>저장되었습니다.</div>}

      <SearchBar placeholder="자료 검색" />
      <DataTable columns={columns} rows={rows} total={files.length} tableId="downloads" />
    </div>
  );
}
