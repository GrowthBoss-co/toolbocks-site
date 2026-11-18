import Link from "next/link";
import type { Block } from "@/content/blog";
import { slugify, tokenize } from "@/content/blog/text";

/**
 * Renders post content on the dark ground. Plain server components: no motion,
 * no scroll reveals, nothing that needs JavaScript to become visible, so a
 * crawler and a reader see the same page on first paint.
 */

const LINK = "text-primary-200 underline decoration-primary-400/50 underline-offset-[3px] transition-colors hover:text-ink hover:decoration-ink";

export function Inline({ text }: { text: string }) {
  return (
    <>
      {tokenize(text).map((t, i) => {
        if (t.kind === "bold") {
          return (
            <strong key={i} className="font-semibold text-ink">
              {t.value}
            </strong>
          );
        }
        if (t.kind === "link") {
          return t.href.startsWith("http") ? (
            <a key={i} href={t.href} target="_blank" rel="noopener noreferrer" className={LINK}>
              {t.value}
            </a>
          ) : (
            <Link key={i} href={t.href} className={LINK}>
              {t.value}
            </Link>
          );
        }
        return <span key={i}>{t.value}</span>;
      })}
    </>
  );
}

export const H2_CLASS =
  "scroll-mt-28 font-heading text-[1.625rem] font-semibold leading-[1.2] tracking-[-0.02em] text-ink md:text-[1.875rem]";
export const BODY_CLASS = "text-[1.0625rem] leading-[1.75] text-soft-200";

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-lg">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} id={b.id ?? slugify(b.text)} className={`${H2_CLASS} mt-3xl`}>
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-lg font-heading text-[1.25rem] font-semibold leading-[1.3] tracking-[-0.015em] text-ink">
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className={BODY_CLASS}>
                <Inline text={b.text} />
              </p>
            );
          case "ul":
          case "ol": {
            const List = b.type;
            return (
              <List
                key={i}
                className={`${BODY_CLASS} flex flex-col gap-sm pl-xl ${b.type === "ul" ? "list-disc" : "list-decimal"} marker:text-primary-300`}
              >
                {b.items.map((item, j) => (
                  <li key={j} className="pl-xs">
                    <Inline text={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "table":
            return (
              <div key={i} className="my-sm overflow-x-auto rounded-medium border border-white/[0.08]">
                <table className="w-full border-collapse text-left text-[0.9375rem] leading-[1.6]">
                  {b.caption ? (
                    <caption className="px-lg pt-md text-left text-[0.875rem] text-soft-400">{b.caption}</caption>
                  ) : null}
                  <thead>
                    <tr className="border-b border-white/[0.08]">
                      {b.head.map((h, j) => (
                        <th key={j} scope="col" className="px-lg py-md font-semibold text-ink">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, j) => (
                      <tr key={j} className="border-b border-white/[0.06] last:border-b-0">
                        {row.map((cell, k) => (
                          <td key={k} className="px-lg py-md align-top text-soft-200">
                            <Inline text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "callout":
            return (
              <aside key={i} className="my-sm rounded-medium border border-primary-400/25 bg-primary-500/[0.06] px-xl py-lg">
                {b.title ? <p className="mb-xs font-semibold text-ink">{b.title}</p> : null}
                <p className={BODY_CLASS}>
                  <Inline text={b.text} />
                </p>
              </aside>
            );
        }
      })}
    </div>
  );
}
