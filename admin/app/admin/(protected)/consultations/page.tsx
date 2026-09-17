import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWrite } from "@/lib/auth/user";
import { listConsultations, markRead, markHandled, deleteConsultation } from "@/lib/db/consultations";
import { SearchBar } from "../ui/search-bar";
import { DataTable, type Column, type RowVM } from "../ui/data-table";
import * as s from "../ui/styles";

export default async function ConsultationsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; msg?: string }>;
}) {
  await requireWrite();
  const sp = await searchParams;
  const items = listConsultations({ q: sp.q, status: sp.status });

  async function readAction(formData: FormData) {
    "use server";
    await requireWrite();
    markRead(Number(formData.get("id")));
    revalidatePath("/admin/consultations");
  }

  async function handleAction(formData: FormData) {
    "use server";
    await requireWrite();
    markHandled(Number(formData.get("id")));
    revalidatePath("/admin/consultations");
  }

  async function deleteAction(formData: FormData) {
    "use server";
    await requireWrite();
    deleteConsultation(Number(formData.get("id")));
    revalidatePath("/admin/consultations");
    redirect("/admin/consultations?msg=deleted");
  }

  const columns: Column[] = [
    { key: "name", label: "이름" },
    { key: "phone", label: "연락처" },
    { key: "location", label: "희망 지역" },
    { key: "date", label: "접수일" },
    { key: "status", label: "상태" },
  ];

  const rows: RowVM[] = items.map((c) => ({
    id: c.id,
    href: `/admin/consultations/${c.id}`,
    mobileTitle: c.name || "이름 없음",
    mobileMeta: c.is_handled ? "처리완료" : c.is_read ? "읽음" : "미읽음",
    cells: [
      <span key="n" className={!c.is_read ? "font-bold" : ""}>
        {c.name || "이름 없음"}
      </span>,
      c.phone || "—",
      c.location || "—",
      c.created_at?.split("T")[0] || c.created_at?.split(" ")[0] || "—",
      c.is_handled ? (
        <span className={s.badgeGray}>처리완료</span>
      ) : c.is_read ? (
        <span className="rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-700">읽음</span>
      ) : (
        <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-bold text-red-700">미읽음</span>
      ),
    ],
    actions: (
      <div className="space-y-1">
        {!c.is_read && (
          <form action={readAction}>
            <input type="hidden" name="id" value={c.id} />
            <button type="submit" className={s.menuItem}>읽음 처리</button>
          </form>
        )}
        {!c.is_handled && (
          <form action={handleAction}>
            <input type="hidden" name="id" value={c.id} />
            <button type="submit" className={s.menuItem}>처리 완료</button>
          </form>
        )}
        <form action={deleteAction}>
          <input type="hidden" name="id" value={c.id} />
          <button type="submit" className={s.menuItemDanger}>삭제</button>
        </form>
      </div>
    ),
  }));

  const statusFilter = sp.status || "all";

  return (
    <div className="mx-auto max-w-[1280px]">
      <h1 className="text-xl font-bold text-[#231F20]">상담 문의</h1>

      {sp.msg === "deleted" && <div className={`mt-4 ${s.okBox}`}>삭제되었습니다.</div>}

      <div className="mt-4 flex gap-2">
        {[
          { key: "all", label: "전체" },
          { key: "unread", label: "미읽음" },
          { key: "read", label: "읽음" },
          { key: "handled", label: "처리완료" },
        ].map((tab) => (
          <a
            key={tab.key}
            href={`/admin/consultations${tab.key === "all" ? "" : `?status=${tab.key}`}`}
            className={`rounded-full px-3 py-1 text-sm ${
              statusFilter === tab.key
                ? "bg-[#231F20] text-white"
                : "bg-[#F5F5F5] text-[#585958] hover:bg-[#E5E7EA]"
            }`}
          >
            {tab.label}
          </a>
        ))}
      </div>

      <SearchBar placeholder="이름, 연락처 검색" />
      <DataTable columns={columns} rows={rows} total={items.length} tableId="consultations" />
    </div>
  );
}
