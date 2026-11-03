import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { getBrand, updateBrand, listActiveCategories } from "@/lib/db/brands";
import { exportBrands } from "@/lib/db/json-export";
import { BrandForm } from "../../brand-form";
import { parseBrandForm } from "../../parse-brand-form";

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
    const input = parseBrandForm(formData);
    if (!input.name) return { error: "브랜드명을 입력해 주세요." };

    updateBrand(Number(id), input);
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
            tier: brand.tier,
            tagline: brand.tagline ?? undefined,
            description: brand.description ?? undefined,
            founding_cost: brand.founding_cost ?? undefined,
            founding_cost_min: brand.founding_cost_min,
            listing_fee: brand.listing_fee,
            store_count: brand.store_count,
            store_type: brand.store_type ?? undefined,
            logo_url: brand.logo_url ?? undefined,
            main_image_url: brand.main_image_url ?? undefined,
            images: brand.images ?? undefined,
            features: brand.features ?? undefined,
            cost_breakdown: brand.cost_breakdown ?? undefined,
            franchise_fee: brand.franchise_fee ?? undefined,
            education_fee: brand.education_fee ?? undefined,
            royalty: brand.royalty ?? undefined,
            standard_area: brand.standard_area ?? undefined,
            vat_included: brand.vat_included,
            deposit_included: brand.deposit_included,
            startup_process: brand.startup_process ?? undefined,
            headquarters: brand.headquarters ?? undefined,
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
