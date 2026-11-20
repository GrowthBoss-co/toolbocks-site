import { getAllPosts, type Block, type Post } from "@/content/blog";
import {
  AGENCY_URL,
  DEMO_URL,
  SITE_URL,
  featureCatalog,
  footer,
  hero,
  pricing,
  stats,
} from "@/lib/content";

/**
 * /llms.txt and /llms-full.txt, built from the same copy and the same post
 * objects the pages render, so neither file can say something the site does
 * not.
 *
 * Google Search ignores these files; some other AI tools read them. They are
 * plain markdown in the llmstxt.org shape: an H1, a one-line summary in a
 * blockquote, then H2 sections of links.
 */

/** The one sentence used everywhere the product is introduced. */
const ENTITY =
  "ToolBocks is an AI sales engagement platform and power dialer for GoHighLevel and Salesforce teams, built by Growth Boss in Oakville, Ontario.";

/** Site-relative markdown links become absolute, since the file is read off-site. */
function absolute(text: string): string {
  return text.replace(/\]\(\/(?!\/)/g, `](${SITE_URL}/`);
}

function cell(text: string): string {
  return absolute(text).replace(/\|/g, "\\|");
}

function blockToMarkdown(block: Block): string {
  switch (block.type) {
    case "h2":
      return `### ${block.text}`;
    case "h3":
      return `#### ${block.text}`;
    case "p":
      return absolute(block.text);
    case "ul":
      return block.items.map((i) => `- ${absolute(i)}`).join("\n");
    case "ol":
      return block.items.map((i, n) => `${n + 1}. ${absolute(i)}`).join("\n");
    case "table":
      return [
        `| ${block.head.map(cell).join(" | ")} |`,
        `| ${block.head.map(() => "---").join(" | ")} |`,
        ...block.rows.map((r) => `| ${r.map(cell).join(" | ")} |`),
      ].join("\n");
    case "callout":
      return `> ${block.title ? `**${block.title}** ` : ""}${absolute(block.text)}`;
  }
}

function postToMarkdown(post: Post): string {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const parts = [
    `## ${post.title}`,
    `URL: ${url}\nPublished: ${post.published}\nUpdated: ${post.updated}`,
    `**Short answer:** ${absolute(post.answer)}`,
    ...post.sections.map(blockToMarkdown),
  ];
  if (post.faq?.length) {
    parts.push("### Frequently asked questions");
    for (const f of post.faq) parts.push(`**${f.q}**\n${absolute(f.a)}`);
  }
  return parts.join("\n\n");
}

function header(): string {
  return [
    "# ToolBocks",
    `> ${ENTITY}`,
    hero.subtitle,
    [
      "- CRM integrations: works natively with GoHighLevel and Salesforce.",
      `- Pricing: custom, quoted on a call. Plans: ${pricing.plans.map((p) => `${p.name} (${p.blurb.replace(/\.$/, "")})`).join(", ")}.`,
      `- Company: ToolBocks is a product of Growth Boss Marketing Corp. (${AGENCY_URL}), ${footer.legal.address}, Canada.`,
      ...stats.map((s) => `- ${s.label.charAt(0).toUpperCase()}${s.label.slice(1)}: ${s.value.toLowerCase()}.`),
    ].join("\n"),
  ].join("\n\n");
}

function features(): string {
  return ["## Product features", featureCatalog.items.map((f) => `- **${f.title}:** ${f.body}`).join("\n")].join(
    "\n\n",
  );
}

export function buildLlmsTxt(): string {
  const posts = getAllPosts();
  const sections = [
    header(),
    [
      "## Pages",
      [
        `- [ToolBocks home](${SITE_URL}/): What the platform does, a step-by-step product walkthrough, integrations and plans.`,
        ...(posts.length
          ? [`- [Blog](${SITE_URL}/blog): Guides for outbound sales teams on GoHighLevel and Salesforce.`]
          : []),
        `- [Privacy policy](${SITE_URL}/privacy)`,
      ].join("\n"),
    ].join("\n\n"),
  ];

  if (posts.length) {
    sections.push(
      ["## Blog posts", posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`).join("\n")].join(
        "\n\n",
      ),
    );
  }

  sections.push(
    features(),
    ["## Contact", `- [Book a live demo](${DEMO_URL}): A live walkthrough on real data.`].join("\n\n"),
    [
      "## Optional",
      [
        `- [llms-full.txt](${SITE_URL}/llms-full.txt): This file plus the full text of every blog post.`,
        ...(posts.length ? [`- [RSS feed](${SITE_URL}/blog/rss.xml)`] : []),
      ].join("\n"),
    ].join("\n\n"),
  );

  return `${sections.join("\n\n")}\n`;
}

export function buildLlmsFullTxt(): string {
  const posts = getAllPosts();
  const sections = [
    header(),
    features(),
    ["## Contact", `- [Book a live demo](${DEMO_URL}): A live walkthrough on real data.`].join("\n\n"),
  ];
  if (posts.length) {
    sections.push("# Blog posts", ...posts.map(postToMarkdown));
  }
  return `${sections.join("\n\n")}\n`;
}

/**
 * Plain text, and `noindex` so the raw file never competes in search results
 * with the page it summarises. The header only governs indexing; crawlers and
 * AI tools can still fetch and read the file.
 */
export function llmsResponse(body: string): Response {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  });
}
