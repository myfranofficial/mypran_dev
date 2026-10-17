import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { getPopup, updatePopup } from "@/lib/db/popups";
import { exportPopups } from "@/lib/db/json-export";
import { PopupForm } from "../../popup-form";

async function updateAction(id: number, _prev: any, formData: FormData) {
  "use server";
  await requireWrite();
  const title = String(formData.get("title") ?? "").trim();
  const image_url = String(formData.get("image_url") ?? "").trim();
  if (!title) return { error: "제목을 입력해 주세요." };
  if (!image_url) return { error: "팝업 이미지를 업로드해 주세요." };

  updatePopup(id, {
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

export default async function EditPopupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireWrite();
  const { id: idStr } = await params;
  const id = Number(idStr);
  const popup = getPopup(id);
  if (!popup) notFound();

  const action = updateAction.bind(null, id);

  return (
    <div className="mx-auto max-w-[800px]">
      <h1 className="text-xl font-bold text-[#231F20]">팝업 수정</h1>
      <div className="mt-6">
        <PopupForm action={action} popup={popup} />
      </div>
    </div>
  );
}
