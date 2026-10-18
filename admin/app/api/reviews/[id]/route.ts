import { NextResponse } from "next/server";
import { getReview, deleteReview } from "@/lib/db/reviews";
import { exportNews } from "@/lib/db/json-export";

export const runtime = "nodejs";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idStr } = await params;
  const id = Number(idStr);
  if (!id || isNaN(id)) {
    return NextResponse.json({ error: "잘못된 ID" }, { status: 400 });
  }

  const review = getReview(id);
  if (!review) {
    return NextResponse.json({ error: "리뷰를 찾을 수 없습니다." }, { status: 404 });
  }

  // 고객 리뷰만 공개 API로 삭제 가능
  if (review.source !== "customer") {
    return NextResponse.json({ error: "삭제 권한이 없습니다." }, { status: 403 });
  }

  deleteReview(id);
  exportNews();

  return NextResponse.json({ ok: true });
}
