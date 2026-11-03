import { readNotices } from "@/lib/site-data";

const BASE_URL = "https://xn--lj2b54b90v2gn.kr";

export async function GET() {
  const notices = readNotices();

  const items = notices
    .slice(0, 20)
    .map(
      (n) => `    <item>
      <title><![CDATA[${n.title}]]></title>
      <link>${BASE_URL}/notices</link>
      <description><![CDATA[${n.content?.slice(0, 200) || ""}]]></description>
      <pubDate>${new Date(n.date).toUTCString()}</pubDate>
      <category>${n.category || "공지"}</category>
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>마이프랜 — 프랜차이즈 비교 플랫폼</title>
    <link>${BASE_URL}</link>
    <description>마이프랜 공지사항 및 프랜차이즈 소식</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
