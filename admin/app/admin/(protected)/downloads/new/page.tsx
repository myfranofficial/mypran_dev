import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { createDownload } from "@/lib/db/downloads";
import { exportDownloads } from "@/lib/db/json-export";
import { DownloadForm } from "../download-form";

async function createAction(_prev: any, formData: FormData) {
  "use server";
  await requireWrite();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "제목을 입력해 주세요." };
  const file_url = String(formData.get("file_url") ?? "").trim();
  if (!file_url) return { error: "파일 URL을 입력해 주세요." };

  createDownload({
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

export default async function NewDownloadPage() {
  await requireWrite();
  return (
    <div className="mx-auto max-w-[800px]">
      <h1 className="text-xl font-bold text-[#231F20]">새 자료</h1>
      <div className="mt-6">
        <DownloadForm action={createAction} />
      </div>
    </div>
  );
}
