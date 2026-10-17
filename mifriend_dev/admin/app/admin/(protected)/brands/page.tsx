import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWrite } from "@/lib/auth/user";
import { listBrands, deleteBrand, listActiveCategories } from "@/lib/db/brands";
import { exportBrands } from "@/lib/db/json-export";
import { CreateButton } from "../ui/create-button";
import { SearchBar } from "../ui/search-bar";
import { DataTable, type Column, type RowVM } from "../ui/data-table";
import * as s from "../ui/styles";

export default async function BrandsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category_id?: string; msg?: string }>;
}) {
  await requireWrite();
  const sp = await searchParams;
  const categoryId = sp.category_id ? Number(sp.category_id) : undefined;
  const brands = listBrands({ q: sp.q, category_id: categoryId });
  const categories = listActiveCategories();

  async function deleteAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    deleteBrand(id);
    exportBrands();
    revalidatePath("/admin/brands");
    redirect("/admin/brands?msg=deleted");
  }

  const columns: Column[] = [
    { key: "name", label: "브랜드명" },
    { key: "category", label: "업종" },
    { key: "cost", label: "창업비용" },
    { key: "stores", label: "가맹점" },
    { key: "status", label: "상태" },
  ];

  const rows: RowVM[] = brands.map((b) => ({
    id: b.id,
    href: `/admin/brands/${b.id}/edit`,
    mobileTitle: b.name,
    mobileMeta: b.category_name || "—",
    cells: [
      <span key="n" className="flex items-center gap-1.5">
        {b.is_featured ? (
          <span className="rounded bg-[#CC0000] px-1.5 py-0.5 text-[10px] font-bold text-white">추천</span>
        ) : null}
        {b.name}
      </span>,
      b.category_name || "—",
      b.founding_cost || "—",
      b.store_count ? `${b.store_count}개` : "—",
      b.is_active ? <span className={s.badgeGreen}>활성</span> : <span className={s.badgeGray}>비활성</span>,
    ],
    actions: (
      <div className="space-y-1">
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
        <div>
          <h1 className="text-xl font-bold text-[#231F20]">브랜드 관리</h1>
          <p className="mt-1 text-sm text-[#9E9F9C]">최대 100개 브랜드 등록 가능</p>
        </div>
        <CreateButton href="/admin/brands/new">새 브랜드</CreateButton>
      </div>

      {sp.msg === "deleted" && <div className={`mt-4 ${s.okBox}`}>삭제되었습니다.</div>}
      {sp.msg === "saved" && <div className={`mt-4 ${s.okBox}`}>저장되었습니다. 브랜드 목록에 즉시 반영됩니다.</div>}

      {/* 업종 필터 */}
      {categories.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <a href="/admin/brands"
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${!categoryId ? "bg-[#CC0000] text-white" : "bg-white text-[#585958] hover:bg-gray-100"}`}>
            전체
          </a>
          {categories.map((c) => (
            <a key={c.id} href={`/admin/brands?category_id=${c.id}`}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${categoryId === c.id ? "bg-[#CC0000] text-white" : "bg-white text-[#585958] hover:bg-gray-100"}`}>
              {c.name}
            </a>
          ))}
        </div>
      )}

      <SearchBar placeholder="브랜드명 검색" />
      <DataTable columns={columns} rows={rows} total={brands.length} tableId="brands" />
    </div>
  );
}
