import "server-only";
import { getDb } from "./index";

export interface HomepageSection {
  id: number;
  section_key: string;
  content_json: string | null;
  updated_at: string;
}

export function getHomepageSection(key: string): HomepageSection | undefined {
  return getDb()
    .prepare("SELECT * FROM homepage_sections WHERE section_key = ?")
    .get(key) as HomepageSection | undefined;
}

export function setHomepageSection(key: string, contentJson: string): void {
  getDb()
    .prepare(
      "INSERT INTO homepage_sections (section_key, content_json, updated_at) VALUES (?, ?, datetime('now','localtime')) ON CONFLICT(section_key) DO UPDATE SET content_json = excluded.content_json, updated_at = excluded.updated_at"
    )
    .run(key, contentJson);
}

export function listHomepageSections(): HomepageSection[] {
  return getDb()
    .prepare("SELECT * FROM homepage_sections ORDER BY section_key ASC")
    .all() as HomepageSection[];
}
