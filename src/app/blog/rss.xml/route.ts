import { getAllPosts, latestUpdate } from "@/content/blog";
import { plainText } from "@/content/blog/text";
import { SITE_URL } from "@/lib/content";

// Built once per deploy, like the posts it lists.
export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rfc822(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toUTCString();
}

/**
 * RSS 2.0 feed of every post, linked from the blog pages via
 * `alternates.types`. Bing and several AI crawlers discover new URLs from
 * feeds. A 404 while there are no posts, same as /blog.
 */
export function GET() {
  const posts = getAllPosts();
  if (posts.length === 0) return new Response("Not found", { status: 404 });

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(p.published)}</pubDate>
      <description>${esc(plainText(p.answer))}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ToolBocks Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Guides for outbound sales teams on GoHighLevel and Salesforce.</description>
    <language>en-ca</language>
    <lastBuildDate>${rfc822(latestUpdate() ?? posts[0].updated)}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
