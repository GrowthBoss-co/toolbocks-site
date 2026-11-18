import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogShell, formatDate } from "@/components/blog/blog-shell";
import { getAllPosts } from "@/content/blog";
import { buildBlogIndexSchema, jsonLd } from "@/lib/structured-data";

const TITLE = "ToolBocks Blog | Outbound calling, coaching and cadences";
const DESCRIPTION =
  "Guides for outbound sales teams on GoHighLevel and Salesforce: power dialers, live call coaching, calling hours, cadences and cold calling.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: "ToolBocks Blog" }] },
  },
  openGraph: {
    type: "website",
    siteName: "ToolBocks",
    locale: "en_CA",
    url: "/blog",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: "ToolBocks Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/assets/og-image.png"],
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  // No thin, empty index: the section ships before its first post and stays a
  // 404 until there is something to list.
  if (posts.length === 0) notFound();

  return (
    <BlogShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(buildBlogIndexSchema(posts)) }} />
      <div className="container-main">
        <header className="mx-auto max-w-[68ch]">
          <p className="text-eyebrow">Blog</p>
          <h1 className="heading-h2 mt-lg text-balance">Outbound calling, coaching and cadences</h1>
          <p className="text-large mt-lg text-soft-400">{DESCRIPTION}</p>
        </header>

        <ul className="mx-auto mt-5xl flex max-w-[68ch] flex-col gap-lg">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="group block rounded-large border border-white/[0.08] bg-white/[0.02] p-xl transition-colors duration-200 hover:border-primary-400/40 hover:bg-white/[0.04]"
              >
                <p className="text-small text-soft-400">
                  <time dateTime={p.published}>{formatDate(p.published)}</time> · {p.readingMinutes} min read
                </p>
                <h2 className="mt-sm font-heading text-[1.375rem] font-semibold leading-[1.25] tracking-[-0.015em] text-ink">
                  {p.title}
                </h2>
                <p className="mt-sm text-soft-200">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </BlogShell>
  );
}
