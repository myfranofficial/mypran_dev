import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWrite } from "@/lib/auth/user";
import { listFaqItems, deleteFaqItem } from "@/lib/db/faq";
import { exportFaq } from "@/lib/db/json-export";
import { CreateButton } from "../ui/create-button";
import { SearchBar } from "../ui/search-bar";
import { DataTable, type Column, type RowVM } from "../ui/data-table";
import * as s from "../ui/styles";

export default async function FaqPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; msg?: string }>;
}) {
  await requireWrite();
  const sp = await searchParams;
  const items = listFaqItems({ q: sp.q });

  async function deleteAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    deleteFaqItem(id);
    exportFaq();
    revalidatePath("/admin/faq");
    redirect("/admin/faq?msg=deleted");
  }

  const columns: Column[] = [
    { key: "category", label: "카테고리" },
    { key: "question", label: "질문" },
    { key: "answer", label: "답변 미리보기" },
  ];

  const rows: RowVM[] = items.map((f) => ({
    id: f.id,
    href: `/admin/faq/${f.id}/edit`,
    mobileTitle: f.question,
    mobileMeta: f.category || "",
    cells: [
      f.category || "—",
      f.question,
      f.answer ? (f.answer.length > 50 ? f.answer.slice(0, 50) + "…" : f.answer) : "—",
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
        <h1 className="text-xl font-bold text-[#231F20]">FAQ 관리</h1>
        <CreateButton href="/admin/faq/new">새 FAQ</CreateButton>
      </div>

      {sp.msg === "deleted" && <div className={`mt-4 ${s.okBox}`}>삭제되었습니다.</div>}
      {sp.msg === "saved" && <div className={`mt-4 ${s.okBox}`}>저장되었습니다.</div>}

      <SearchBar placeholder="FAQ 검색" />
      <DataTable columns={columns} rows={rows} total={items.length} tableId="faq" />
    </div>
  );
}
