import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireWrite } from "@/lib/auth/user";
import { createReview } from "@/lib/db/reviews";
import { exportNews } from "@/lib/db/json-export";
import { ReviewForm } from "../review-form";

async function createAction(_prev: any, formData: FormData) {
  "use server";
  await requireWrite();
  const author = String(formData.get("author") ?? "").trim();
  if (!author) return { error: "작성자명을 입력해 주세요." };

  createReview({
    author,
    rating: Number(formData.get("rating")) || 5,
    content: String(formData.get("content") ?? "").trim() || null,
    source: "admin",
    is_active: formData.get("is_active") ? 1 : 0,
  });

  exportNews();
  revalidatePath("/admin/reviews");
  redirect("/admin/reviews?msg=saved");
}

export default async function NewReviewPage() {
  await requireWrite();
  return (
    <div className="mx-auto max-w-[800px]">
      <h1 className="text-xl font-bold text-[#231F20]">새 리뷰</h1>
      <div className="mt-6">
        <ReviewForm action={createAction} />
      </div>
    </div>
  );
}
