/**
 * The inline markup posts use: `[label](href)` and `**bold**`. One tokenizer
 * feeds both the React renderer and the plain-text output used in JSON-LD and
 * RSS, so the two can never disagree about what the text says.
 */
export type InlineToken =
  | { kind: "text"; value: string }
  | { kind: "bold"; value: string }
  | { kind: "link"; value: string; href: string };

const INLINE = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

export function tokenize(input: string): InlineToken[] {
  const out: InlineToken[] = [];
  let last = 0;
  for (const m of input.matchAll(INLINE)) {
    const at = m.index ?? 0;
    if (at > last) out.push({ kind: "text", value: input.slice(last, at) });
    if (m[1] !== undefined && m[2] !== undefined) {
      out.push({ kind: "link", value: m[1], href: m[2] });
    } else if (m[3] !== undefined) {
      out.push({ kind: "bold", value: m[3] });
    }
    last = at + m[0].length;
  }
  if (last < input.length) out.push({ kind: "text", value: input.slice(last) });
  return out;
}

export function plainText(input: string): string {
  return tokenize(input)
    .map((t) => t.value)
    .join("");
}

/** Lowercase, hyphenated anchor id for an H2. */
export function slugify(input: string): string {
  return plainText(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
