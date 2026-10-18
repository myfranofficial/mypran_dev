import { NextResponse, type NextRequest } from "next/server";
import { createReview, listActiveReviews } from "@/lib/db/reviews";
import { exportNews } from "@/lib/db/json-export";

export const runtime = "nodejs";

// 레이트 리밋: IP당 3회/10분
const rateMap = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateMap.get(ip) || []).filter((t) => now - t < RATE_WINDOW);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  rateMap.set(ip, timestamps);
  return false;
}

export async function GET() {
  const reviews = listActiveReviews();
  return NextResponse.json({
    reviews: reviews.map((r) => ({
      id: r.id,
      author: r.author,
      rating: r.rating,
      content: r.content || "",
      date: r.created_at?.split(" ")[0] || "",
    })),
  });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "잠시 후 다시 시도해 주세요." }, { status: 429 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청" }, { status: 400 });
  }

  const author = String(body.author ?? "").trim();
  const content = String(body.content ?? "").trim();
  const rating = Number(body.rating) || 5;

  if (!author) {
    return NextResponse.json({ error: "작성자명을 입력해 주세요." }, { status: 400 });
  }
  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: "별점은 1~5 사이여야 합니다." }, { status: 400 });
  }

  const id = createReview({
    author,
    rating,
    content: content || null,
    source: "customer",
    is_active: 1,
  });

  exportNews();

  return NextResponse.json({ ok: true, id });
}
