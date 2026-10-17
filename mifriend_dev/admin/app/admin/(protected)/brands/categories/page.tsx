import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWrite } from "@/lib/auth/user";
import { listCategories, createCategory, updateCategory, deleteCategory } from "@/lib/db/brands";
import { exportBrands } from "@/lib/db/json-export";
import * as s from "../../ui/styles";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ msg?: string }>;
}) {
  await requireWrite();
  const sp = await searchParams;
  const categories = listCategories();

  async function createAction(formData: FormData) {
    "use server";
    await requireWrite();
    const name = String(formData.get("name") ?? "").trim();
    if (!name) return;
    createCategory(name);
    exportBrands();
    revalidatePath("/admin/brands/categories");
    redirect("/admin/brands/categories?msg=saved");
  }

  async function toggleAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    const name = String(formData.get("name") ?? "");
    const isActive = Number(formData.get("is_active"));
    updateCategory(id, name, isActive ? 0 : 1);
    exportBrands();
    revalidatePath("/admin/brands/categories");
    redirect("/admin/brands/categories");
  }

  async function deleteAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    deleteCategory(id);
    exportBrands();
    revalidatePath("/admin/brands/categories");
    redirect("/admin/brands/categories?msg=deleted");
  }

  return (
    <div className="mx-auto max-w-[800px]">
      <div>
        <h1 className="text-xl font-bold text-[#231F20]">업종 카테고리</h1>
        <p className="mt-1 text-sm text-[#9E9F9C]">브랜드를 분류할 업종을 관리합니다</p>
      </div>

      {sp.msg === "saved" && <div className={`mt-4 ${s.okBox}`}>저장되었습니다.</div>}
      {sp.msg === "deleted" && <div className={`mt-4 ${s.okBox}`}>삭제되었습니다.</div>}

      {/* 새 카테고리 추가 */}
      <div className={`mt-6 ${s.card}`}>
        <h2 className={s.cardTitle}>새 업종 추가</h2>
        <form action={createAction} className="flex gap-2">
          <input name="name" required className={`${s.input} flex-1`} placeholder="예: 한식, 치킨, 커피" />
          <button type="submit" className={s.btnPrimary}>추가</button>
        </form>
      </div>

      {/* 카테고리 목록 */}
      <div className="mt-4 space-y-2">
        {categories.length === 0 ? (
          <div className={s.emptyBox}>등록된 업종 카테고리가 없습니다.</div>
        ) : (
          categories.map((c) => (
            <div key={c.id} className={`${s.card} flex items-center justify-between gap-3`}>
              <div className="flex items-center gap-2">
                <span className={c.is_active ? "text-[#231F20] font-medium" : "text-[#9E9F9C] line-through"}>
                  {c.name}
                </span>
                {!c.is_active && <span className={s.badgeGray}>비활성</span>}
              </div>
              <div className="flex items-center gap-1">
                <form action={toggleAction}>
                  <input type="hidden" name="id" value={c.id} />
                  <input type="hidden" name="name" value={c.name} />
                  <input type="hidden" name="is_active" value={c.is_active} />
                  <button type="submit" className={s.btnSecondary}>
                    {c.is_active ? "비활성화" : "활성화"}
                  </button>
                </form>
                <form action={deleteAction}>
                  <input type="hidden" name="id" value={c.id} />
                  <button type="submit" className={s.menuItemDanger}
                    onClick={(e) => { if (!confirm(`"${c.name}" 카테고리를 삭제하시겠습니까?`)) e.preventDefault(); }}>
                    삭제
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
