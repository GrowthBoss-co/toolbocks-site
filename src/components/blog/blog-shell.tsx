import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";

/**
 * Chrome for blog pages: the same header and footer as the homepage, without
 * the homepage's heavy pieces (demo iframes, grain veil, scroll scrubs). The
 * header's section links point back to `/#...`, and the footer drops the 12rem
 * overhang that only exists to make room for the homepage's closing card.
 */
export function BlogShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-small focus:bg-surface-800 focus:px-lg focus:py-sm focus:text-ink"
      >
        Skip to content
      </a>
      <SiteNav basePath="/" />
      <main id="content" className="flex-1 overflow-x-clip pb-section-main pt-section-hero">
        {children}
      </main>
      <SiteFooter overhang={false} />
    </>
  );
}

export function formatDate(iso: string): string {
  // Parsed as UTC and printed in UTC so the build machine's time zone can never
  // shift a date by a day.
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
