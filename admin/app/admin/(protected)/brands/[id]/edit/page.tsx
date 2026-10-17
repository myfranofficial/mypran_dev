import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { getBrand, updateBrand, listActiveCategories } from "@/lib/db/brands";
import { exportBrands } from "@/lib/db/json-export";
import { BrandForm } from "../../brand-form";

export default async function EditBrandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireWrite();
  const { id } = await params;
  const brand = getBrand(Number(id));
  if (!brand) notFound();

  const categories = listActiveCategories();

  async function updateAction(_prev: any, formData: FormData) {
    "use server";
    await requireWrite();
    const name = String(formData.get("name") ?? "").trim();
    if (!name) return { error: "브랜드명을 입력해 주세요." };

    const catId = String(formData.get("category_id") ?? "").trim();
    const storeCount = String(formData.get("store_count") ?? "0").trim();

    const featuresRaw = String(formData.get("features") ?? "").trim();
    const features = JSON.stringify(
      featuresRaw.split("\n").map((l) => l.trim()).filter(Boolean)
    );

    const imagesRaw = String(formData.get("images_raw") ?? "").trim();
    const images = JSON.stringify(
      imagesRaw.split("\n").map((l) => l.trim()).filter(Boolean)
    );

    updateBrand(Number(id), {
      category_id: catId ? Number(catId) : null,
      name,
      tagline: String(formData.get("tagline") ?? "").trim() || null,
      description: String(formData.get("description") ?? "").trim() || null,
      founding_cost: String(formData.get("founding_cost") ?? "").trim() || null,
      store_count: storeCount ? Number(storeCount) : 0,
      logo_url: String(formData.get("logo_url") ?? "").trim() || null,
      main_image_url: String(formData.get("main_image_url") ?? "").trim() || null,
      images: images !== "[]" ? images : null,
      features: features !== "[]" ? features : null,
      phone: String(formData.get("phone") ?? "").trim() || null,
      kakao_url: String(formData.get("kakao_url") ?? "").trim() || null,
      is_featured: formData.get("is_featured") ? 1 : 0,
      is_active: formData.get("is_active") ? 1 : 0,
    });

    exportBrands();
    revalidatePath("/admin/brands");
    redirect("/admin/brands?msg=saved");
  }

  return (
    <div className="mx-auto max-w-[800px]">
      <h1 className="text-xl font-bold text-[#231F20]">브랜드 편집 — {brand.name}</h1>
      <div className="mt-6">
        <BrandForm
          action={updateAction}
          categories={categories}
          defaultValues={{
            category_id: brand.category_id,
            name: brand.name,
            tagline: brand.tagline ?? undefined,
            description: brand.description ?? undefined,
            founding_cost: brand.founding_cost ?? undefined,
            store_count: brand.store_count,
            logo_url: brand.logo_url ?? undefined,
            main_image_url: brand.main_image_url ?? undefined,
            images: brand.images ?? undefined,
            features: brand.features ?? undefined,
            phone: brand.phone ?? undefined,
            kakao_url: brand.kakao_url ?? undefined,
            is_featured: brand.is_featured,
            is_active: brand.is_active,
          }}
        />
      </div>
    </div>
  );
}
