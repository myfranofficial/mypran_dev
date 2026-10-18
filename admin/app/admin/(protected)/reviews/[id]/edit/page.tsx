import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { getReview, updateReview } from "@/lib/db/reviews";
import { exportNews } from "@/lib/db/json-export";
import { ReviewForm } from "../../review-form";

async function updateAction(id: number, _prev: any, formData: FormData) {
  "use server";
  await requireWrite();
  const author = String(formData.get("author") ?? "").trim();
  if (!author) return { error: "작성자명을 입력해 주세요." };

  updateReview(id, {
    author,
    rating: Number(formData.get("rating")) || 5,
    content: String(formData.get("content") ?? "").trim() || null,
    is_active: formData.get("is_active") ? 1 : 0,
  });

  exportNews();
  revalidatePath("/admin/reviews");
  redirect("/admin/reviews?msg=saved");
}

export default async function EditReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireWrite();
  const { id: idStr } = await params;
  const id = Number(idStr);
  const review = getReview(id);
  if (!review) notFound();

  const action = updateAction.bind(null, id);

  return (
    <div className="mx-auto max-w-[800px]">
      <h1 className="text-xl font-bold text-[#231F20]">리뷰 수정</h1>
      <div className="mt-6">
        <ReviewForm action={action} review={review} />
      </div>
    </div>
  );
}
