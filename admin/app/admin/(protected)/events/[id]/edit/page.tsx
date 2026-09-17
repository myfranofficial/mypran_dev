import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { getEvent, updateEvent } from "@/lib/db/events";
import { exportEvents } from "@/lib/db/json-export";
import { EventForm } from "../../event-form";

async function updateAction(id: number, _prev: any, formData: FormData) {
  "use server";
  await requireWrite();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "제목을 입력해 주세요." };

  updateEvent(id, {
    title,
    description: String(formData.get("description") ?? "").trim() || null,
    image_url: String(formData.get("image_url") ?? "").trim() || null,
    start_date: String(formData.get("start_date") ?? "").trim() || null,
    end_date: String(formData.get("end_date") ?? "").trim() || null,
    status: String(formData.get("status") ?? "active").trim(),
    is_active: formData.get("is_active") ? 1 : 0,
  });

  exportEvents();
  revalidatePath("/admin/events");
  redirect("/admin/events?msg=saved");
}

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireWrite();
  const { id: idStr } = await params;
  const id = Number(idStr);
  const event = getEvent(id);
  if (!event) notFound();

  const action = updateAction.bind(null, id);

  return (
    <div className="mx-auto max-w-[800px]">
      <h1 className="text-xl font-bold text-[#231F20]">이벤트 수정</h1>
      <div className="mt-6">
        <EventForm action={action} event={event} />
      </div>
    </div>
  );
}
