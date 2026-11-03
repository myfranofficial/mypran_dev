import "server-only";
import type Database from "better-sqlite3";

/**
 * 필터 옵션에서 WHERE clause를 빌드하는 유틸
 * @param q - 검색 키워드 (LIKE 검색)
 * @param likeColumns - LIKE 검색 대상 컬럼 배열
 * @param extras - 추가 exact match 조건들
 */
export function buildFilterWhere(
  q: string | undefined,
  likeColumns: string[],
  extras: { column: string; value: string | number | undefined }[] = [],
): { clause: string; params: (string | number)[] } {
  const where: string[] = [];
  const params: (string | number)[] = [];

  if (q) {
    const like = `%${q}%`;
    where.push(`(${likeColumns.map((c) => `${c} LIKE ?`).join(" OR ")})`);
    for (let i = 0; i < likeColumns.length; i++) params.push(like);
  }

  for (const ex of extras) {
    if (ex.value !== undefined) {
      where.push(`${ex.column} = ?`);
      params.push(ex.value);
    }
  }

  const clause = where.length ? `WHERE ${where.join(" AND ")}` : "";
  return { clause, params };
}

/** 테이블의 다음 sort_order 값을 계산 */
export function getNextSortOrder(db: Database.Database, table: string): number {
  return (
    db.prepare(`SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM ${table}`).get() as {
      next: number;
    }
  ).next;
}

/** sort_order 기반 인접 항목 swap (위/아래 이동) */
export function moveSortOrder<T extends { id: number; sort_order: number }>(
  db: Database.Database,
  table: string,
  rows: T[],
  id: number,
  dir: "up" | "down",
): void {
  const idx = rows.findIndex((r) => r.id === id);
  const swapIdx = dir === "up" ? idx - 1 : idx + 1;
  if (idx < 0 || swapIdx < 0 || swapIdx >= rows.length) return;
  const a = rows[idx];
  const b = rows[swapIdx];
  const tx = db.transaction(() => {
    const stmt = db.prepare(`UPDATE ${table} SET sort_order = ? WHERE id = ?`);
    stmt.run(
      b.sort_order === a.sort_order ? a.sort_order + (dir === "up" ? -1 : 1) : b.sort_order,
      a.id,
    );
    stmt.run(a.sort_order, b.id);
  });
  tx();
}
