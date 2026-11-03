import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { createBrand, listActiveCategories } from "@/lib/db/brands";
import { exportBrands } from "@/lib/db/json-export";
import { BrandForm } from "../brand-form";
import { parseBrandForm } from "../parse-brand-form";

async function createAction(_prev: any, formData: FormData) {
  "use server";
  await requireWrite();
  const input = parseBrandForm(formData);
  if (!input.name) return { error: "브랜드명을 입력해 주세요." };

  createBrand(input);
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
