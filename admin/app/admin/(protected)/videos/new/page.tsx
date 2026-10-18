import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { createVideo } from "@/lib/db/videos";
import { exportVideos } from "@/lib/db/json-export";
import { VideoForm } from "../video-form";

async function createAction(_prev: any, formData: FormData) {
  "use server";
  await requireWrite();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "제목을 입력해 주세요." };
  const youtube_id = String(formData.get("youtube_id") ?? "").trim();
  if (!youtube_id) return { error: "YouTube URL 또는 ID를 입력해 주세요." };

  createVideo({
    title,
    description: String(formData.get("description") ?? "").trim() || null,
    category: String(formData.get("category") ?? "").trim() || null,
    thumbnail_url: String(formData.get("thumbnail_url") ?? "").trim() || null,
    youtube_id,
    date: String(formData.get("date") ?? "").trim() || null,
  });

  exportVideos();
  revalidatePath("/admin/videos");
  redirect("/admin/videos?msg=saved");
}

export default async function NewVideoPage() {
  await requireWrite();
  return (
    <div className="mx-auto max-w-[800px]">
      <h1 className="text-xl font-bold text-[#231F20]">새 영상</h1>
      <div className="mt-6">
        <VideoForm action={createAction} />
      </div>
    </div>
  );
}
