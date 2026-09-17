import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { createBanner } from "@/lib/db/banners";
import { BannerForm } from "../banner-form";

async function createAction(_prev: any, formData: FormData) {
  "use server";
  await requireWrite();
  const image_url = String(formData.get("image_url") ?? "").trim();
  if (!image_url) return { error: "PC 배너 이미지를 업로드해 주세요." };

  createBanner({
    image_url,
    image_url_mobile: String(formData.get("image_url_mobile") ?? "").trim() || null,
    link_url: String(formData.get("link_url") ?? "").trim() || null,
    title: String(formData.get("title") ?? "").trim() || null,
    subtitle: String(formData.get("subtitle") ?? "").trim() || null,
    start_at: String(formData.get("start_at") ?? "").trim() || null,
    end_at: String(formData.get("end_at") ?? "").trim() || null,
    is_active: formData.get("is_active") ? 1 : 0,
  });

  revalidatePath("/admin/banners");
  redirect("/admin/banners?msg=saved");
}

export default async function NewBannerPage() {
  await requireWrite();
  return (
    <div className="mx-auto max-w-[800px]">
      <h1 className="text-xl font-bold text-[#231F20]">새 배너</h1>
      <div className="mt-6">
        <BannerForm action={createAction} />
      </div>
    </div>
  );
}
