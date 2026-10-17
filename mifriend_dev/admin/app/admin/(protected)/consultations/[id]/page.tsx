import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { getConsultation, markRead, markHandled, deleteConsultation } from "@/lib/db/consultations";
import * as s from "../../ui/styles";

export default async function ConsultationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireWrite();
  const { id: idStr } = await params;
  const id = Number(idStr);
  const c = getConsultation(id);
  if (!c) notFound();

  // Auto mark as read on view
  if (!c.is_read) {
    markRead(id);
    c.is_read = 1;
  }

  async function handleAction() {
    "use server";
    await requireWrite();
    markHandled(id);
    revalidatePath(`/admin/consultations/${id}`);
    revalidatePath("/admin/consultations");
  }

  async function deleteAction() {
    "use server";
    await requireWrite();
    deleteConsultation(id);
    revalidatePath("/admin/consultations");
    redirect("/admin/consultations?msg=deleted");
  }

  return (
    <div className="mx-auto max-w-[800px]">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#231F20]">상담 문의 상세</h1>
        <a href="/admin/consultations" className={s.btnGhost}>← 목록</a>
      </div>

      <div className="mt-6 space-y-4 rounded-lg border border-[#E5E7EA] bg-white p-6">
        <div className="flex items-center gap-3">
          {c.is_handled ? (
            <span className={s.badgeGray}>처리완료</span>
          ) : c.is_read ? (
            <span className="rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-700">읽음</span>
          ) : (
            <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-bold text-red-700">미읽음</span>
          )}
          <span className="text-sm text-[#9E9F9C]">{c.created_at}</span>
        </div>

        <dl className="grid grid-cols-[120px_1fr] gap-y-3 gap-x-4 text-sm">
          <dt className="font-medium text-[#585958]">이름</dt>
          <dd className="text-[#231F20]">{c.name || "—"}</dd>

          <dt className="font-medium text-[#585958]">연락처</dt>
          <dd className="text-[#231F20]">
            {c.phone ? <a href={`tel:${c.phone}`} className="text-[#EF4023] underline">{c.phone}</a> : "—"}
          </dd>

          <dt className="font-medium text-[#585958]">이메일</dt>
          <dd className="text-[#231F20]">
            {c.email ? <a href={`mailto:${c.email}`} className="text-[#EF4023] underline">{c.email}</a> : "—"}
          </dd>

          <dt className="font-medium text-[#585958]">관심 브랜드</dt>
          <dd className="text-[#231F20]">
            {c.brand_name ? (
              <span className="rounded bg-red-100 px-2 py-0.5 text-sm text-red-700">{c.brand_name}</span>
            ) : "—"}
          </dd>

          <dt className="font-medium text-[#585958]">희망 지역</dt>
          <dd className="text-[#231F20]">{c.region || "—"}</dd>
        </dl>

        <div className="border-t border-[#E5E7EA] pt-4">
          <h3 className="mb-2 text-sm font-medium text-[#585958]">문의 내용</h3>
          <p className="whitespace-pre-wrap text-sm text-[#231F20]">{c.message || "내용 없음"}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-3">
        {!c.is_handled && (
          <form action={handleAction}>
            <button type="submit" className={s.btnPrimary}>처리 완료</button>
          </form>
        )}
        <form action={deleteAction}>
          <button type="submit" className={`${s.btnGhost} !text-red-600 hover:!bg-red-50`}>삭제</button>
        </form>
      </div>
    </div>
  );
}
