import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { createPopup } from "@/lib/db/popups";
import { exportPopups } from "@/lib/db/json-export";
import { PopupForm } from "../popup-form";

async function createAction(_prev: any, formData: FormData) {
  "use server";
  await requireWrite();
  const title = String(formData.get("title") ?? "").trim();
  const image_url = String(formData.get("image_url") ?? "").trim();
  if (!title) return { error: "제목을 입력해 주세요." };
  if (!image_url) return { error: "팝업 이미지를 업로드해 주세요." };

  createPopup({
    title,
    image_url,
    link_url: String(formData.get("link_url") ?? "").trim() || null,
    link_text: String(formData.get("link_text") ?? "").trim() || "자세히 보기",
    position: String(formData.get("position") ?? "center"),
    start_at: String(formData.get("start_at") ?? "").trim() || null,
    end_at: String(formData.get("end_at") ?? "").trim() || null,
    is_active: formData.get("is_active") ? 1 : 0,
  });

  exportPopups();
  revalidatePath("/admin/popups");
  redirect("/admin/popups?msg=saved");
}

export default async function NewPopupPage() {
  await requireWrite();
  return (
    <div className="mx-auto max-w-[800px]">
      <h1 className="text-xl font-bold text-[#231F20]">새 팝업</h1>
      <div className="mt-6">
        <PopupForm action={createAction} />
      </div>
    </div>
  );
}
