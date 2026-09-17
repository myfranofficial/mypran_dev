import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWrite } from "@/lib/auth/user";
import { listStores, deleteStore } from "@/lib/db/stores";
import { exportStores } from "@/lib/db/json-export";
import { CreateButton } from "../ui/create-button";
import { SearchBar } from "../ui/search-bar";
import { DataTable, type Column, type RowVM } from "../ui/data-table";
import * as s from "../ui/styles";

export default async function StoresPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; msg?: string }>;
}) {
  await requireWrite();
  const sp = await searchParams;
  const stores = listStores({ q: sp.q });

  async function deleteAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    deleteStore(id);
    exportStores();
    revalidatePath("/admin/stores");
    redirect("/admin/stores?msg=deleted");
  }

  const columns: Column[] = [
    { key: "name", label: "매장명" },
    { key: "address", label: "주소" },
    { key: "tables", label: "테이블" },
    { key: "status", label: "상태" },
  ];

  const rows: RowVM[] = stores.map((st) => ({
    id: st.id,
    href: `/admin/stores/${st.id}/edit`,
    mobileTitle: st.name,
    mobileMeta: st.is_active ? "활성" : "비활성",
    cells: [
      <span key="n">
        {st.is_new ? <span className="mr-1 rounded bg-[#EF4023] px-1.5 py-0.5 text-[10px] font-bold text-white">NEW</span> : null}
        {st.name}
      </span>,
      st.address || "—",
      st.tables_count != null ? `${st.tables_count}대` : "—",
      st.is_active ? <span className={s.badgeGreen}>활성</span> : <span className={s.badgeGray}>비활성</span>,
    ],
    actions: (
      <div className="space-y-1">
        <form action={deleteAction}>
          <input type="hidden" name="id" value={st.id} />
          <button type="submit" className={s.menuItemDanger}>삭제</button>
        </form>
      </div>
    ),
  }));

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#231F20]">매장 관리</h1>
        <CreateButton href="/admin/stores/new">새 매장</CreateButton>
      </div>

      {sp.msg === "deleted" && <div className={`mt-4 ${s.okBox}`}>삭제되었습니다.</div>}
      {sp.msg === "saved" && <div className={`mt-4 ${s.okBox}`}>저장되었습니다.</div>}

      <SearchBar placeholder="매장 검색" />
      <DataTable columns={columns} rows={rows} total={stores.length} tableId="stores" />
    </div>
  );
}
