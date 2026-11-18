import type { MetadataRoute } from "next";
import { getAllPosts, latestUpdate } from "@/content/blog";
import { SITE_URL } from "@/lib/content";

/**
 * Every indexable page on the site: the landing page, plus the blog index and
 * each post once at least one post is published (both are 404s before that).
 *
 * Deliberately NOT listed:
 * - `/privacy` — reachable, but `noindex` (see public/privacy.html). A sitemap
 *   that lists a noindexed URL is reported by Search Console as an error.
 * - The five retired feature slugs in next.config.ts — they redirect to `/`,
 *   and redirecting URLs do not belong in a sitemap.
 * - `/blog/rss.xml` — a feed, not a page.
 *
 * `lastModified` is the date the page last changed in a way a visitor would
 * see. Bump the landing page's by hand when it ships a real change; posts use
 * their own `updated` date and the index uses the newest of those. It is NOT
 * `new Date()`: a lastmod that moves on every deploy, content changed or not,
 * teaches Google to ignore the field.
 */
const PAGES: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`, lastModified: "2026-09-08" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  if (posts.length === 0) return PAGES;
  return [
    ...PAGES,
    { url: `${SITE_URL}/blog`, lastModified: latestUpdate() },
    ...posts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.updated })),
  ];
}
