import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWrite } from "@/lib/auth/user";
import { listBanners, setBannerActive, deleteBanner, moveBanner } from "@/lib/db/banners";
import { imageUrl } from "@/lib/storage";
import { CreateButton } from "../ui/create-button";
import { SearchBar } from "../ui/search-bar";
import { DataTable, type Column, type RowVM } from "../ui/data-table";
import * as s from "../ui/styles";

export default async function BannersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; msg?: string; error?: string }>;
}) {
  await requireWrite();
  const sp = await searchParams;
  const banners = listBanners({ q: sp.q });

  async function toggleAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    const active = Number(formData.get("active"));
    setBannerActive(id, active);
    revalidatePath("/admin/banners");
  }

  async function moveAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    const dir = String(formData.get("dir")) as "up" | "down";
    moveBanner(id, dir);
    revalidatePath("/admin/banners");
  }

  async function deleteAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    deleteBanner(id);
    revalidatePath("/admin/banners");
    redirect("/admin/banners?msg=deleted");
  }

  const columns: Column[] = [
    { key: "title", label: "제목" },
    { key: "image", label: "이미지" },
    { key: "period", label: "게시 기간" },
    { key: "status", label: "상태" },
    { key: "order", label: "순서" },
  ];

  const rows: RowVM[] = banners.map((b) => ({
    id: b.id,
    href: `/admin/banners/${b.id}/edit`,
    mobileTitle: b.title || `배너 #${b.id}`,
    mobileMeta: b.is_active ? "활성" : "비활성",
    cells: [
      b.title || `배너 #${b.id}`,
      b.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl(b.image_url)} alt="" className="h-10 w-20 rounded object-cover" />
      ) : "—",
      b.start_at || b.end_at ? `${b.start_at || "~"} ~ ${b.end_at || "~"}` : "상시",
      b.is_active ? <span className={s.badgeGreen}>활성</span> : <span className={s.badgeGray}>비활성</span>,
      b.sort_order,
    ],
    actions: (
      <div className="space-y-1">
        <form action={toggleAction}>
          <input type="hidden" name="id" value={b.id} />
          <input type="hidden" name="active" value={b.is_active ? 0 : 1} />
          <button type="submit" className={s.menuItem}>{b.is_active ? "비활성화" : "활성화"}</button>
        </form>
        <form action={moveAction}>
          <input type="hidden" name="id" value={b.id} />
          <input type="hidden" name="dir" value="up" />
          <button type="submit" className={s.menuItem}>↑ 위로</button>
        </form>
        <form action={moveAction}>
          <input type="hidden" name="id" value={b.id} />
          <input type="hidden" name="dir" value="down" />
          <button type="submit" className={s.menuItem}>↓ 아래로</button>
        </form>
        <form action={deleteAction}>
          <input type="hidden" name="id" value={b.id} />
          <button type="submit" className={s.menuItemDanger}>삭제</button>
        </form>
      </div>
    ),
  }));

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#231F20]">배너 관리</h1>
        <CreateButton href="/admin/banners/new">새 배너</CreateButton>
      </div>

      {sp.msg === "deleted" && <div className={`mt-4 ${s.okBox}`}>삭제되었습니다.</div>}
      {sp.msg === "saved" && <div className={`mt-4 ${s.okBox}`}>저장되었습니다.</div>}

      <SearchBar placeholder="배너 검색" />
      <DataTable columns={columns} rows={rows} total={banners.length} tableId="banners" />
    </div>
  );
}
