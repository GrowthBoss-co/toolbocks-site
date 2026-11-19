/**
 * Blog posts are typed data, not markdown. The page, the FAQ and HowTo
 * structured data, the RSS feed and the sitemap are all generated from the same
 * object, so the markup can never describe something the page does not show
 * (Google's rule for FAQ and HowTo markup).
 *
 * Inline text in paragraphs, list items, table cells and callouts supports two
 * pieces of markup and nothing else: `[label](href)` for links and `**bold**`.
 */
export type Block =
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; caption?: string; head: string[]; rows: string[][] }
  | { type: "callout"; title?: string; text: string };

export type FaqItem = { q: string; a: string };

export type HowTo = {
  name: string;
  steps: { name: string; text: string }[];
};

export type Post = {
  slug: string;
  /** The H1 and the basis of the <title>. */
  title: string;
  /**
   * A shorter <title> for when `title` plus " | ToolBocks" would pass about 60
   * characters and get cut off in search results. The H1 still uses `title`.
   */
  metaTitle?: string;
  /** Meta description, 155 characters or fewer. */
  description: string;
  /** Tracked in the rank log from the day the post goes live. */
  primaryKeyword: string;
  /** ISO dates (YYYY-MM-DD). `updated` moves only when the content really changes. */
  published: string;
  updated: string;
  readingMinutes: number;
  /** The 40 to 60 word "Short answer" shown under the H1. */
  answer: string;
  sections: Block[];
  faq?: FaqItem[];
  howTo?: HowTo;
  /** Slugs of 2 or 3 sibling posts to show under the article. */
  related?: string[];
};
