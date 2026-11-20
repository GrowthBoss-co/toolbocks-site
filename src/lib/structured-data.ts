import type { Post } from "@/content/blog";
import { plainText } from "@/content/blog/text";
import { AGENCY_URL, SITE_URL } from "@/lib/content";

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;
const OG_IMAGE = `${SITE_URL}/assets/og-image.png`;

/**
 * Serialises JSON-LD for a <script> tag. `<` is escaped so no string in the
 * payload can close the script element early (Next's JSON-LD guide).
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/**
 * /blog: the Blog node plus Home > Blog. The Organization it points at is the
 * one the root layout already emits on every page.
 */
export function buildBlogIndexSchema(posts: Post[]) {
  const url = `${SITE_URL}/blog`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${url}#blog`,
        url,
        name: "ToolBocks Blog",
        publisher: { "@id": ORG_ID },
        isPartOf: { "@id": SITE_ID },
        inLanguage: "en-CA",
        blogPost: posts.map((p) => ({ "@id": `${SITE_URL}/blog/${p.slug}#article` })),
      },
      breadcrumbs([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
    ],
  };
}

/**
 * One post: BlogPosting, Home > Blog > Post, and FAQPage / HowTo only when the
 * post carries that content, because both are rendered from the same fields
 * and are therefore always visible on the page.
 *
 * The author is the organisation, not an invented person. FAQ and HowTo rich
 * results are limited or retired in Google; they are here for Bing and AI
 * answer engines, which still read them.
 */
export function buildArticleSchema(post: Post) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.description,
      datePublished: post.published,
      dateModified: post.updated,
      image: OG_IMAGE,
      url,
      mainEntityOfPage: url,
      inLanguage: "en-CA",
      keywords: post.primaryKeyword,
      // Name and url are repeated inline, not only referenced by @id: Google's
      // Article guidelines ask for both on the author itself.
      author: { "@type": "Organization", "@id": ORG_ID, name: "ToolBocks", url: SITE_URL },
      publisher: { "@type": "Organization", "@id": ORG_ID, name: "ToolBocks", url: SITE_URL },
      isPartOf: { "@id": `${SITE_URL}/blog#blog` },
    },
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
  ];

  if (post.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: plainText(f.a) },
      })),
    });
  }

  if (post.howTo) {
    graph.push({
      "@type": "HowTo",
      "@id": `${url}#howto`,
      name: post.howTo.name,
      step: post.howTo.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: plainText(s.text),
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/**
 * JSON-LD for the landing page, as a single @graph so the nodes can reference
 * each other by @id instead of repeating themselves.
 *
 * Deliberately absent, and each for a reason:
 *
 * - **aggregateRating / Review.** The testimonial cards show five gold stars, but
 *   those stars are decoration: no one in them was asked for a numeric rating.
 *   Emitting a rating nobody gave would be fabricated data, and Google treats
 *   invented review markup as a manual-action offence, not a warning.
 *
 * - **FAQPage.** Google requires FAQ markup to describe an FAQ that is actually
 *   visible on the page. There is no FAQ section on the landing page, so marking
 *   one up would be a guideline violation. Adding a real FAQ section is the
 *   prerequisite, and it is a genuine rich-result opportunity once it exists.
 *
 * - **Offers on the SoftwareApplication.** Pricing reads "Custom" on purpose, so
 *   there is no price to state. An Offer with a made-up number is worse than no
 *   Offer at all.
 *
 * - **BreadcrumbList.** The homepage is the root, so it has no trail. Blog
 *   pages carry their own (see buildBlogIndexSchema / buildArticleSchema).
 */
export function buildStructuredData() {
  const org = ORG_ID;
  const site = SITE_ID;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: "ToolBocks",
        url: SITE_URL,
        description:
          "AI sales engagement platform: power dialer, multi-channel cadences, lead research, AI audits and pipeline reporting.",
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/assets/icon-512.png`,
          width: 512,
          height: 512,
        },
        // ToolBocks is a product of the agency, not a separate company, and the
        // legal entity on the privacy policy is Growth Boss Marketing Corp.
        parentOrganization: {
          "@type": "Organization",
          name: "Growth Boss Marketing Corp.",
          url: AGENCY_URL,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "2030 Bristol Circle, Suite 201",
          addressLocality: "Oakville",
          addressRegion: "ON",
          addressCountry: "CA",
        },
      },
      {
        "@type": "WebSite",
        "@id": site,
        url: SITE_URL,
        name: "ToolBocks",
        publisher: { "@id": org },
        inLanguage: "en-CA",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        name: "ToolBocks",
        url: SITE_URL,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "Outbound sales platform combining a power dialer, multi-channel cadences, AI lead research, AI-generated audits and proposals, and pipeline reporting in one login.",
        publisher: { "@id": org },
        featureList: [
          "Power dialer with live call coaching",
          "Multi-channel outbound cadences",
          "AI lead research and enrichment",
          "AI-generated sales audits and proposals",
          "Pipeline and rep performance reporting",
        ],
      },
    ],
  };
}
