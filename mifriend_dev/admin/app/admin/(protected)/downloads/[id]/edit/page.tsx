import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { getDownload, updateDownload } from "@/lib/db/downloads";
import { exportDownloads } from "@/lib/db/json-export";
import { DownloadForm } from "../../download-form";

async function updateAction(id: number, _prev: any, formData: FormData) {
  "use server";
  await requireWrite();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "제목을 입력해 주세요." };
  const file_url = String(formData.get("file_url") ?? "").trim();
  if (!file_url) return { error: "파일 URL을 입력해 주세요." };

  updateDownload(id, {
    title,
    description: String(formData.get("description") ?? "").trim() || null,
    filename: String(formData.get("filename") ?? "").trim() || null,
    file_url,
    file_size: String(formData.get("file_size") ?? "").trim() || null,
  });

  exportDownloads();
  revalidatePath("/admin/downloads");
  redirect("/admin/downloads?msg=saved");
}

export default async function EditDownloadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireWrite();
  const { id: idStr } = await params;
  const id = Number(idStr);
  const item = getDownload(id);
  if (!item) notFound();

  const action = updateAction.bind(null, id);

  return (
    <div className="mx-auto max-w-[800px]">
      <h1 className="text-xl font-bold text-[#231F20]">자료 수정</h1>
      <div className="mt-6">
        <DownloadForm action={action} item={item} />
      </div>
    </div>
  );
}
