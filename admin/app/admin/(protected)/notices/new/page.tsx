import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { createNotice } from "@/lib/db/notices";
import { exportNews } from "@/lib/db/json-export";
import { NoticeForm } from "../notice-form";

async function createAction(_prev: any, formData: FormData) {
  "use server";
  await requireWrite();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "제목을 입력해 주세요." };

  createNotice({
    category: String(formData.get("category") ?? "").trim() || null,
    title,
    content: String(formData.get("content") ?? "").trim() || null,
    date: String(formData.get("date") ?? "").trim() || null,
    is_pinned: formData.get("is_pinned") ? 1 : 0,
    is_active: formData.get("is_active") ? 1 : 0,
  });

  exportNews();
  revalidatePath("/admin/notices");
  redirect("/admin/notices?msg=saved");
}

export default async function NewNoticePage() {
  await requireWrite();
  return (
    <div className="mx-auto max-w-[800px]">
      <h1 className="text-xl font-bold text-[#231F20]">새 공지</h1>
      <div className="mt-6">
        <NoticeForm action={createAction} />
      </div>
    </div>
  );
}
