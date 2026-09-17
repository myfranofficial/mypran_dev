import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { createStore } from "@/lib/db/stores";
import { exportStores } from "@/lib/db/json-export";
import { StoreForm } from "../store-form";

async function createAction(_prev: any, formData: FormData) {
  "use server";
  await requireWrite();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "매장명을 입력해 주세요." };

  const tc = String(formData.get("tables_count") ?? "").trim();

  createStore({
    name,
    address: String(formData.get("address") ?? "").trim() || null,
    size: String(formData.get("size") ?? "").trim() || null,
    tables_count: tc ? Number(tc) : null,
    phone: String(formData.get("phone") ?? "").trim() || null,
    hours: String(formData.get("hours") ?? "").trim() || null,
    features: String(formData.get("features") ?? "").trim() || null,
    image_url: String(formData.get("image_url") ?? "").trim() || null,
    is_new: formData.get("is_new") ? 1 : 0,
    is_active: formData.get("is_active") ? 1 : 0,
  });

  exportStores();
  revalidatePath("/admin/stores");
  redirect("/admin/stores?msg=saved");
}

export default async function NewStorePage() {
  await requireWrite();
  return (
    <div className="mx-auto max-w-[800px]">
      <h1 className="text-xl font-bold text-[#231F20]">새 매장</h1>
      <div className="mt-6">
        <StoreForm action={createAction} />
      </div>
    </div>
  );
}
