import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWrite } from "@/lib/auth/user";
import { listReviews, setReviewActive, deleteReview } from "@/lib/db/reviews";
import { exportNews } from "@/lib/db/json-export";
import { CreateButton } from "../ui/create-button";
import { SearchBar } from "../ui/search-bar";
import { DataTable, type Column, type RowVM } from "../ui/data-table";
import * as s from "../ui/styles";

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; source?: string; msg?: string }>;
}) {
  await requireWrite();
  const sp = await searchParams;
  const reviews = listReviews({ q: sp.q, source: sp.source });

  async function toggleAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    const active = Number(formData.get("active"));
    setReviewActive(id, active);
    exportNews();
    revalidatePath("/admin/reviews");
  }

  async function deleteAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    deleteReview(id);
    exportNews();
    revalidatePath("/admin/reviews");
    redirect("/admin/reviews?msg=deleted");
  }

  const columns: Column[] = [
    { key: "author", label: "작성자" },
    { key: "rating", label: "별점" },
    { key: "content", label: "내용" },
    { key: "source", label: "출처" },
    { key: "date", label: "작성일" },
    { key: "status", label: "상태" },
  ];

  const rows: RowVM[] = reviews.map((r) => ({
    id: r.id,
    href: `/admin/reviews/${r.id}/edit`,
    mobileTitle: r.author,
    mobileMeta: `${"★".repeat(r.rating)} ${r.source === "admin" ? "어드민" : "고객"}`,
    cells: [
      r.author,
      <span key="r" className="text-[#EF4023]">{"★".repeat(r.rating)}<span className="text-[#DCDCD7]">{"★".repeat(5 - r.rating)}</span></span>,
      <span key="c" className="line-clamp-1 max-w-[300px]">{r.content || "—"}</span>,
      r.source === "admin" ? (
        <span className={s.badgeGreen}>어드민</span>
      ) : (
        <span className={s.badgeAmber}>고객</span>
      ),
      r.created_at?.split(" ")[0] || "—",
      r.is_active ? <span className={s.badgeGreen}>노출</span> : <span className={s.badgeGray}>숨김</span>,
    ],
    actions: (
      <div className="space-y-1">
        <form action={toggleAction}>
          <input type="hidden" name="id" value={r.id} />
          <input type="hidden" name="active" value={r.is_active ? 0 : 1} />
          <button type="submit" className={s.menuItem}>{r.is_active ? "숨기기" : "노출"}</button>
        </form>
        <form action={deleteAction}>
          <input type="hidden" name="id" value={r.id} />
          <button type="submit" className={s.menuItemDanger}>삭제</button>
        </form>
      </div>
    ),
  }));

  const sourceFilter = sp.source || "all";

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#231F20]">리뷰/후기 관리</h1>
        <CreateButton href="/admin/reviews/new">새 리뷰</CreateButton>
      </div>

      {sp.msg === "deleted" && <div className={`mt-4 ${s.okBox}`}>삭제되었습니다.</div>}
      {sp.msg === "saved" && <div className={`mt-4 ${s.okBox}`}>저장되었습니다.</div>}

      <div className="mt-4 flex gap-2">
        {[
          { key: "all", label: "전체" },
          { key: "admin", label: "어드민" },
          { key: "customer", label: "고객" },
        ].map((tab) => (
          <a
            key={tab.key}
            href={`/admin/reviews${tab.key === "all" ? "" : `?source=${tab.key}`}`}
            className={`rounded-full px-3 py-1 text-sm ${
              sourceFilter === tab.key
                ? "bg-[#231F20] text-white"
                : "bg-[#F5F5F5] text-[#585958] hover:bg-[#E5E7EA]"
            }`}
          >
            {tab.label}
          </a>
        ))}
      </div>

      <SearchBar placeholder="작성자, 내용 검색" />
      <DataTable columns={columns} rows={rows} total={reviews.length} tableId="reviews" />
    </div>
  );
}
