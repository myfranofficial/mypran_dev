import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWrite } from "@/lib/auth/user";
import { listNotices, setNoticeActive, setNoticePinned, deleteNotice } from "@/lib/db/notices";
import { exportNews } from "@/lib/db/json-export";
import { CreateButton } from "../ui/create-button";
import { SearchBar } from "../ui/search-bar";
import { DataTable, type Column, type RowVM } from "../ui/data-table";
import * as s from "../ui/styles";

export default async function NoticesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; msg?: string }>;
}) {
  await requireWrite();
  const sp = await searchParams;
  const notices = listNotices({ q: sp.q });

  async function toggleAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    const active = Number(formData.get("active"));
    setNoticeActive(id, active);
    exportNews();
    revalidatePath("/admin/notices");
  }

  async function pinAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    const pinned = Number(formData.get("pinned"));
    setNoticePinned(id, pinned);
    exportNews();
    revalidatePath("/admin/notices");
  }

  async function deleteAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    deleteNotice(id);
    exportNews();
    revalidatePath("/admin/notices");
    redirect("/admin/notices?msg=deleted");
  }

  const columns: Column[] = [
    { key: "category", label: "카테고리" },
    { key: "title", label: "제목" },
    { key: "date", label: "날짜" },
    { key: "status", label: "상태" },
  ];

  const rows: RowVM[] = notices.map((n) => ({
    id: n.id,
    href: `/admin/notices/${n.id}/edit`,
    mobileTitle: n.title,
    mobileMeta: n.category || "일반",
    cells: [
      n.category || "—",
      <span key="t">
        {n.is_pinned ? <span className="mr-1 text-[#EF4023]">📌</span> : null}
        {n.title}
      </span>,
      n.date || "—",
      n.is_active ? <span className={s.badgeGreen}>활성</span> : <span className={s.badgeGray}>비활성</span>,
    ],
    actions: (
      <div className="space-y-1">
        <form action={toggleAction}>
          <input type="hidden" name="id" value={n.id} />
          <input type="hidden" name="active" value={n.is_active ? 0 : 1} />
          <button type="submit" className={s.menuItem}>{n.is_active ? "비활성화" : "활성화"}</button>
        </form>
        <form action={pinAction}>
          <input type="hidden" name="id" value={n.id} />
          <input type="hidden" name="pinned" value={n.is_pinned ? 0 : 1} />
          <button type="submit" className={s.menuItem}>{n.is_pinned ? "고정 해제" : "상단 고정"}</button>
        </form>
        <form action={deleteAction}>
          <input type="hidden" name="id" value={n.id} />
          <button type="submit" className={s.menuItemDanger}>삭제</button>
        </form>
      </div>
    ),
  }));

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#231F20]">공지사항 관리</h1>
        <CreateButton href="/admin/notices/new">새 공지</CreateButton>
      </div>

      {sp.msg === "deleted" && <div className={`mt-4 ${s.okBox}`}>삭제되었습니다.</div>}
      {sp.msg === "saved" && <div className={`mt-4 ${s.okBox}`}>저장되었습니다.</div>}

      <SearchBar placeholder="공지 검색" />
      <DataTable columns={columns} rows={rows} total={notices.length} tableId="notices" />
    </div>
  );
}
