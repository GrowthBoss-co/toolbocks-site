import type { Post } from "./types";

/**
 * Every published post. A post goes live by being imported and added here;
 * there is no draft flag, so nothing unpublished can leak into the sitemap,
 * the feed or the index.
 *
 * While this list is empty, /blog and /blog/rss.xml return 404 and the footer
 * shows no Blog link, so the section can ship before its first post without
 * leaving a thin page live.
 */
const POSTS: Post[] = [];

/** Newest first. */
export function getAllPosts(): Post[] {
  return [...POSTS].sort((a, b) => b.published.localeCompare(a.published));
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** The newest `updated` date across all posts, for the index's lastmod. */
export function latestUpdate(): string | undefined {
  return POSTS.map((p) => p.updated).sort().at(-1);
}

export type { Block, FaqItem, HowTo, Post } from "./types";
