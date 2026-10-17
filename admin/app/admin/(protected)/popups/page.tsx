import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWrite } from "@/lib/auth/user";
import { listPopups, setPopupActive, deletePopup, movePopup } from "@/lib/db/popups";
import { exportPopups } from "@/lib/db/json-export";
import { imageUrl } from "@/lib/storage";
import { CreateButton } from "../ui/create-button";
import { SearchBar } from "../ui/search-bar";
import { DataTable, type Column, type RowVM } from "../ui/data-table";
import { PreviewLink } from "../ui/preview-link";
import * as s from "../ui/styles";

export default async function PopupsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; msg?: string; error?: string }>;
}) {
  await requireWrite();
  const sp = await searchParams;
  const popups = listPopups({ q: sp.q });

  async function toggleAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    const active = Number(formData.get("active"));
    setPopupActive(id, active);
    exportPopups();
    revalidatePath("/admin/popups");
  }

  async function moveAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    const dir = String(formData.get("dir")) as "up" | "down";
    movePopup(id, dir);
    exportPopups();
    revalidatePath("/admin/popups");
  }

  async function deleteAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    deletePopup(id);
    exportPopups();
    revalidatePath("/admin/popups");
    redirect("/admin/popups?msg=deleted");
  }

  const columns: Column[] = [
    { key: "title", label: "제목" },
    { key: "image", label: "이미지" },
    { key: "period", label: "게시 기간" },
    { key: "status", label: "상태" },
    { key: "order", label: "순서" },
  ];

  const rows: RowVM[] = popups.map((p) => ({
    id: p.id,
    href: `/admin/popups/${p.id}/edit`,
    mobileTitle: p.title,
    mobileMeta: p.is_active ? "활성" : "비활성",
    cells: [
      p.title,
      p.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl(p.image_url)} alt="" className="h-14 w-8 rounded object-cover" />
      ) : "—",
      p.start_at || p.end_at ? `${p.start_at || "~"} ~ ${p.end_at || "~"}` : "상시",
      p.is_active ? <span className={s.badgeGreen}>활성</span> : <span className={s.badgeGray}>비활성</span>,
      p.sort_order,
    ],
    actions: (
      <div className="space-y-1">
        <form action={toggleAction}>
          <input type="hidden" name="id" value={p.id} />
          <input type="hidden" name="active" value={p.is_active ? 0 : 1} />
          <button type="submit" className={s.menuItem}>{p.is_active ? "비활성화" : "활성화"}</button>
        </form>
        <form action={moveAction}>
          <input type="hidden" name="id" value={p.id} />
          <input type="hidden" name="dir" value="up" />
          <button type="submit" className={s.menuItem}>↑ 위로</button>
        </form>
        <form action={moveAction}>
          <input type="hidden" name="id" value={p.id} />
          <input type="hidden" name="dir" value="down" />
          <button type="submit" className={s.menuItem}>↓ 아래로</button>
        </form>
        <form action={deleteAction}>
          <input type="hidden" name="id" value={p.id} />
          <button type="submit" className={s.menuItemDanger}>삭제</button>
        </form>
      </div>
    ),
  }));

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#231F20]">팝업 관리</h1>
          <p className="mt-1 text-sm text-[#9E9F9C]">메인 페이지 접속 시 표시되는 팝업을 관리합니다</p>
        </div>
        <div className="flex items-center gap-2">
          <PreviewLink path="/" label="메인 페이지 보기" />
          <CreateButton href="/admin/popups/new">새 팝업</CreateButton>
        </div>
      </div>

      {sp.msg === "deleted" && <div className={`mt-4 ${s.okBox}`}>삭제되었습니다.</div>}
      {sp.msg === "saved" && <div className={`mt-4 ${s.okBox}`}>저장되었습니다.</div>}

      <SearchBar placeholder="팝업 검색" />
      <DataTable columns={columns} rows={rows} total={popups.length} tableId="popups" />
    </div>
  );
}
