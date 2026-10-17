import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { createFaqItem } from "@/lib/db/faq";
import { exportFaq } from "@/lib/db/json-export";
import { FaqForm } from "../faq-form";

async function createAction(_prev: any, formData: FormData) {
  "use server";
  await requireWrite();
  const question = String(formData.get("question") ?? "").trim();
  if (!question) return { error: "질문을 입력해 주세요." };

  createFaqItem({
    category: String(formData.get("category") ?? "").trim() || null,
    question,
    answer: String(formData.get("answer") ?? "").trim() || null,
  });

  exportFaq();
  revalidatePath("/admin/faq");
  redirect("/admin/faq?msg=saved");
}

export default async function NewFaqPage() {
  await requireWrite();
  return (
    <div className="mx-auto max-w-[800px]">
      <h1 className="text-xl font-bold text-[#231F20]">새 FAQ</h1>
      <div className="mt-6">
        <FaqForm action={createAction} />
      </div>
    </div>
  );
}
