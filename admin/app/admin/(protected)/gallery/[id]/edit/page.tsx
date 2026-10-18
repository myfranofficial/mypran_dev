import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { getGalleryImage, updateGalleryImage } from "@/lib/db/gallery";
import { exportGallery } from "@/lib/db/json-export";
import { GalleryForm } from "../../gallery-form";

async function updateAction(id: number, _prev: any, formData: FormData) {
  "use server";
  await requireWrite();
  const image_url = String(formData.get("image_url") ?? "").trim();
  if (!image_url) return { error: "이미지를 업로드해 주세요." };

  updateGalleryImage(id, {
    title: String(formData.get("title") ?? "").trim() || null,
    category: String(formData.get("category") ?? "").trim() || null,
    branch: String(formData.get("branch") ?? "").trim() || null,
    image_url,
  });

  exportGallery();
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery?msg=saved");
}

export default async function EditGalleryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireWrite();
  const { id: idStr } = await params;
  const id = Number(idStr);
  const image = getGalleryImage(id);
  if (!image) notFound();

  const action = updateAction.bind(null, id);

  return (
    <div className="mx-auto max-w-[800px]">
      <h1 className="text-xl font-bold text-[#231F20]">사진 수정</h1>
      <div className="mt-6">
        <GalleryForm action={action} image={image} />
      </div>
    </div>
  );
}
