import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { getBanner, updateBanner } from "@/lib/db/banners";
import { BannerForm } from "../../banner-form";

async function updateAction(id: number, _prev: any, formData: FormData) {
  "use server";
  await requireWrite();
  const image_url = String(formData.get("image_url") ?? "").trim();
  if (!image_url) return { error: "PC 배너 이미지를 업로드해 주세요." };

  updateBanner(id, {
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

export default async function EditBannerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireWrite();
  const { id: idStr } = await params;
  const id = Number(idStr);
  const banner = getBanner(id);
  if (!banner) notFound();

  const action = updateAction.bind(null, id);

  return (
    <div className="mx-auto max-w-[800px]">
      <h1 className="text-xl font-bold text-[#231F20]">배너 수정</h1>
      <div className="mt-6">
        <BannerForm action={action} banner={banner} />
      </div>
    </div>
  );
}
