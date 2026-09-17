import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { getFaqItem, updateFaqItem } from "@/lib/db/faq";
import { exportFaq } from "@/lib/db/json-export";
import { FaqForm } from "../../faq-form";

async function updateAction(id: number, _prev: any, formData: FormData) {
  "use server";
  await requireWrite();
  const question = String(formData.get("question") ?? "").trim();
  if (!question) return { error: "질문을 입력해 주세요." };

  updateFaqItem(id, {
    category: String(formData.get("category") ?? "").trim() || null,
    question,
    answer: String(formData.get("answer") ?? "").trim() || null,
  });

  exportFaq();
  revalidatePath("/admin/faq");
  redirect("/admin/faq?msg=saved");
}

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireWrite();
  const { id: idStr } = await params;
  const id = Number(idStr);
  const item = getFaqItem(id);
  if (!item) notFound();

  const action = updateAction.bind(null, id);

  return (
    <div className="mx-auto max-w-[800px]">
      <h1 className="text-xl font-bold text-[#231F20]">FAQ 수정</h1>
      <div className="mt-6">
        <FaqForm action={action} item={item} />
      </div>
    </div>
  );
}
