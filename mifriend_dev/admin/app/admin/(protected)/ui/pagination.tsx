import Link from "next/link";
import { pageBtn, pageBtnActive, pageNav } from "./styles";

export function Pagination({
  page,
  pageCount,
  params,
  basePath,
}: {
  page: number;
  pageCount: number;
  params: Record<string, string | undefined>;
  basePath: string;
}) {
  if (pageCount <= 1) return null;

  const href = (p: number) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v && k !== "page" && k !== "msg" && k !== "error") sp.set(k, v);
    }
    if (p > 1) sp.set("page", String(p));
    const qs = sp.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const nums: number[] = [];
  const from = Math.max(1, page - 2);
  const to = Math.min(pageCount, from + 4);
  for (let i = Math.max(1, to - 4); i <= to; i++) nums.push(i);

  return (
    <nav className="mt-6 flex items-center justify-center gap-1" aria-label="페이지">
      {page > 1 ? (
        <Link href={href(page - 1)} className={pageNav} aria-label="이전">‹</Link>
      ) : (
        <span className={`${pageNav} opacity-30`} aria-hidden>‹</span>
      )}

      {nums[0] > 1 && (
        <>
          <Link href={href(1)} className={pageBtn}>1</Link>
          {nums[0] > 2 && <span className="px-1 text-[#9E9F9C]">…</span>}
        </>
      )}

      {nums.map((n) =>
        n === page ? (
          <span key={n} className={pageBtnActive} aria-current="page">{n}</span>
        ) : (
          <Link key={n} href={href(n)} className={pageBtn}>{n}</Link>
        )
      )}

      {nums[nums.length - 1] < pageCount && (
        <>
          {nums[nums.length - 1] < pageCount - 1 && <span className="px-1 text-[#9E9F9C]">…</span>}
          <Link href={href(pageCount)} className={pageBtn}>{pageCount}</Link>
        </>
      )}

      {page < pageCount ? (
        <Link href={href(page + 1)} className={pageNav} aria-label="다음">›</Link>
      ) : (
        <span className={`${pageNav} opacity-30`} aria-hidden>›</span>
      )}
    </nav>
  );
}
