import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";

/**
 * Every indexable page on the site. Today that is only the landing page.
 *
 * Deliberately NOT listed:
 * - `/privacy` — reachable, but `noindex` (see public/privacy.html). A sitemap
 *   that lists a noindexed URL is reported by Search Console as an error.
 * - The five retired feature slugs in next.config.ts — they redirect to `/`,
 *   and redirecting URLs do not belong in a sitemap.
 *
 * `lastModified` is the date the page last changed in a way a visitor would
 * see. Bump it by hand when the landing page ships a real change. It is NOT
 * `new Date()`: a lastmod that moves on every deploy, content changed or not,
 * teaches Google to ignore the field.
 */
const PAGES: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`, lastModified: "2026-09-08" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES;
}
