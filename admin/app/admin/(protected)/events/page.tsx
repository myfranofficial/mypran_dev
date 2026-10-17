import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireWrite } from "@/lib/auth/user";
import { listEvents, setEventActive, deleteEvent } from "@/lib/db/events";
import { exportEvents } from "@/lib/db/json-export";
import { CreateButton } from "../ui/create-button";
import { SearchBar } from "../ui/search-bar";
import { DataTable, type Column, type RowVM } from "../ui/data-table";
import { PreviewLink } from "../ui/preview-link";
import { SavePreview } from "../ui/save-preview";
import * as s from "../ui/styles";

const STATUS_MAP: Record<string, string> = {
  upcoming: "예정",
  active: "진행중",
  ended: "종료",
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; msg?: string }>;
}) {
  await requireWrite();
  const sp = await searchParams;
  const events = listEvents({ q: sp.q });

  async function toggleAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    const active = Number(formData.get("active"));
    setEventActive(id, active);
    exportEvents();
    revalidatePath("/admin/events");
  }

  async function deleteAction(formData: FormData) {
    "use server";
    await requireWrite();
    const id = Number(formData.get("id"));
    deleteEvent(id);
    exportEvents();
    revalidatePath("/admin/events");
    redirect("/admin/events?msg=deleted");
  }

  const columns: Column[] = [
    { key: "title", label: "제목" },
    { key: "period", label: "기간" },
    { key: "status", label: "상태" },
    { key: "active", label: "활성" },
  ];

  const rows: RowVM[] = events.map((ev) => ({
    id: ev.id,
    href: `/admin/events/${ev.id}/edit`,
    mobileTitle: ev.title,
    mobileMeta: STATUS_MAP[ev.status] || ev.status,
    cells: [
      ev.title,
      ev.start_date || ev.end_date ? `${ev.start_date || "~"} ~ ${ev.end_date || "~"}` : "상시",
      <span key="s" className={ev.status === "active" ? s.badgeGreen : ev.status === "ended" ? s.badgeGray : "rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"}>
        {STATUS_MAP[ev.status] || ev.status}
      </span>,
      ev.is_active ? <span className={s.badgeGreen}>활성</span> : <span className={s.badgeGray}>비활성</span>,
    ],
    actions: (
      <div className="space-y-1">
        <form action={toggleAction}>
          <input type="hidden" name="id" value={ev.id} />
          <input type="hidden" name="active" value={ev.is_active ? 0 : 1} />
          <button type="submit" className={s.menuItem}>{ev.is_active ? "비활성화" : "활성화"}</button>
        </form>
        <form action={deleteAction}>
          <input type="hidden" name="id" value={ev.id} />
          <button type="submit" className={s.menuItemDanger}>삭제</button>
        </form>
      </div>
    ),
  }));

  return (
    <div className="mx-auto max-w-[1280px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#231F20]">이벤트 관리</h1>
          <p className="mt-1 text-sm text-[#9E9F9C]">이벤트 페이지에 카드형으로 표시됩니다</p>
        </div>
        <div className="flex items-center gap-2">
          <PreviewLink path="/events" label="이벤트 보기" />
          <CreateButton href="/admin/events/new">새 이벤트</CreateButton>
        </div>
      </div>

      {sp.msg === "deleted" && <div className={`mt-4 ${s.okBox}`}>삭제되었습니다.</div>}
      {sp.msg === "saved" && <div className={`mt-4 ${s.okBox}`}>저장되었습니다. 이벤트 페이지에 즉시 반영됩니다.</div>}
      <SavePreview previewPath="/events" saved={sp.msg === "saved"} />

      <SearchBar placeholder="이벤트 검색" />
      <DataTable columns={columns} rows={rows} total={events.length} tableId="events" />
    </div>
  );
}
