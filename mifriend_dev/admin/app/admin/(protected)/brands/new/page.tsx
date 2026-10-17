import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { createBrand, listActiveCategories } from "@/lib/db/brands";
import { exportBrands } from "@/lib/db/json-export";
import { BrandForm } from "../brand-form";

async function createAction(_prev: any, formData: FormData) {
  "use server";
  await requireWrite();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "브랜드명을 입력해 주세요." };

  const catId = String(formData.get("category_id") ?? "").trim();
  const storeCount = String(formData.get("store_count") ?? "0").trim();

  // features: 줄바꿈 → JSON array
  const featuresRaw = String(formData.get("features") ?? "").trim();
  const features = JSON.stringify(
    featuresRaw.split("\n").map((l) => l.trim()).filter(Boolean)
  );

  // images: 줄바꿈 → JSON array
  const imagesRaw = String(formData.get("images_raw") ?? "").trim();
  const images = JSON.stringify(
    imagesRaw.split("\n").map((l) => l.trim()).filter(Boolean)
  );

  createBrand({
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

export default async function NewBrandPage() {
  await requireWrite();
  const categories = listActiveCategories();

  return (
    <div className="mx-auto max-w-[800px]">
      <h1 className="text-xl font-bold text-[#231F20]">새 브랜드 등록</h1>
      <div className="mt-6">
        <BrandForm action={createAction} categories={categories} />
      </div>
    </div>
  );
}
