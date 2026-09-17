import "server-only";
import { getDb } from "./index";

export interface PageContent {
  id: number;
  page_slug: string;
  section: string;
  content_json: string | null;
  updated_at: string;
}

export function getPageSection(slug: string, section: string): PageContent | undefined {
  return getDb()
    .prepare("SELECT * FROM page_content WHERE page_slug = ? AND section = ?")
    .get(slug, section) as PageContent | undefined;
}

export function setPageSection(slug: string, section: string, contentJson: string): void {
  getDb()
    .prepare(
      "INSERT INTO page_content (page_slug, section, content_json, updated_at) VALUES (?, ?, ?, datetime('now','localtime')) ON CONFLICT(page_slug, section) DO UPDATE SET content_json = excluded.content_json, updated_at = excluded.updated_at"
    )
    .run(slug, section, contentJson);
}

export function listPageSections(slug: string): PageContent[] {
  return getDb()
    .prepare("SELECT * FROM page_content WHERE page_slug = ? ORDER BY section ASC")
    .all(slug) as PageContent[];
}

export function listAllPages(): { page_slug: string }[] {
  return getDb()
    .prepare("SELECT DISTINCT page_slug FROM page_content ORDER BY page_slug ASC")
    .all() as { page_slug: string }[];
}
