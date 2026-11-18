import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks, BODY_CLASS, H2_CLASS, Inline } from "@/components/blog/blocks";
import { BlogShell, formatDate } from "@/components/blog/blog-shell";
import { Button } from "@/components/ui-kit";
import { getAllPosts, getPost } from "@/content/blog";
import { DEMO_URL } from "@/lib/content";
import { buildArticleSchema, jsonLd } from "@/lib/structured-data";

// Every post is built at deploy time; an unknown slug is a 404, never an
// on-demand render.
export const dynamicParams = false;

// Typed by hand rather than with the generated PageProps helper:
// `npm run check` typechecks before `next build` has generated route types.
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const title = `${post.title} | ToolBocks`;
  const url = `/blog/${post.slug}`;
  return {
    title,
    description: post.description,
    alternates: {
      canonical: url,
      types: { "application/rss+xml": [{ url: "/blog/rss.xml", title: "ToolBocks Blog" }] },
    },
    openGraph: {
      type: "article",
      siteName: "ToolBocks",
      locale: "en_CA",
      url,
      title,
      description: post.description,
      publishedTime: post.published,
      modifiedTime: post.updated,
      images: [{ url: "/assets/og-image.png", width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: ["/assets/og-image.png"],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = (post.related ?? [])
    .map((s) => getPost(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 3);

  return (
    <BlogShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(buildArticleSchema(post)) }} />
      <article className="container-main">
        <div className="mx-auto max-w-[68ch]">
          <nav aria-label="Breadcrumb" className="text-small text-soft-400">
            <ol className="flex flex-wrap items-center gap-xs">
              <li>
                <Link href="/" className="transition-colors hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-ink">
                  Blog
                </Link>
              </li>
            </ol>
          </nav>

          <h1 className="heading-h2 mt-lg text-balance">{post.title}</h1>
          <p className="text-small mt-lg text-soft-400">
            By ToolBocks · <time dateTime={post.published}>{formatDate(post.published)}</time>
            {post.updated !== post.published ? (
              <>
                {" "}
                · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </>
            ) : null}{" "}
            · {post.readingMinutes} min read
          </p>

          <section aria-label="Short answer" className="mt-2xl rounded-large border border-white/[0.1] bg-white/[0.03] px-xl py-lg">
            <p className="text-eyebrow is-small">Short answer</p>
            <p className={`${BODY_CLASS} mt-md text-ink`}>
              <Inline text={post.answer} />
            </p>
          </section>

          <div className="mt-2xl">
            <Blocks blocks={post.sections} />
          </div>

          {post.faq?.length ? (
            <section aria-labelledby="faq" className="mt-4xl">
              <h2 id="faq" className={H2_CLASS}>
                Frequently asked questions
              </h2>
              <div className="mt-xl flex flex-col divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {post.faq.map((f) => (
                  <div key={f.q} className="py-lg">
                    <h3 className="font-heading text-[1.125rem] font-semibold leading-[1.35] text-ink">{f.q}</h3>
                    <p className={`${BODY_CLASS} mt-sm`}>
                      <Inline text={f.a} />
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <aside className="mt-4xl rounded-large border border-white/[0.1] bg-pressure px-xl py-2xl md:px-2xl">
            <p className="font-heading text-[1.5rem] font-semibold leading-[1.25] tracking-[-0.015em] text-ink">
              See ToolBocks on a live call
            </p>
            <p className={`${BODY_CLASS} mt-md`}>
              ToolBocks is an AI sales engagement platform and power dialer for GoHighLevel and Salesforce teams. Book a
              demo to see the dialer and live coaching on a real call.
            </p>
            <div className="mt-xl">
              <Button href={DEMO_URL}>Book a demo</Button>
            </div>
          </aside>

          {related.length ? (
            <section aria-labelledby="related" className="mt-4xl">
              <h2 id="related" className={H2_CLASS}>
                Keep reading
              </h2>
              <ul className="mt-xl flex flex-col gap-md">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/blog/${r.slug}`}
                      className="block rounded-large border border-white/[0.08] bg-white/[0.02] p-lg transition-colors duration-200 hover:border-primary-400/40 hover:bg-white/[0.04]"
                    >
                      <span className="font-heading text-[1.125rem] font-semibold text-ink">{r.title}</span>
                      <span className="mt-xs block text-small text-soft-400">{r.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </article>
    </BlogShell>
  );
}
