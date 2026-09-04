import { cn } from "@/lib/utils";

/**
 * Splits a headline into per-character spans that fade, rise and unblur in a
 * left-to-right wave.
 *
 * This is a server component and the animation is pure CSS (see .char-in in
 * globals.css). That is the whole point: the hero headline is the largest thing
 * in the first viewport, and a JS-driven reveal would leave it invisible until
 * hydration — on a slow connection that is a blank hero for a second or more,
 * and it would fail entirely if the bundle never arrived.
 *
 * Three accessibility details that are easy to get wrong:
 *
 * - The heading carries the full string in aria-label and every visual span is
 *   aria-hidden, so a screen reader announces one sentence rather than spelling
 *   the headline out one letter at a time.
 * - Words, not characters, are the inline-block unit. If each character were
 *   inline-block the line could break mid-word.
 * - Words are separated by a real space text node, which keeps copy-paste
 *   intact and leaves a legitimate break opportunity for wrapping.
 */
const START_DELAY = 0.08;
const STAGGER = 0.022;

type CharRevealProps = {
  text: string;
  /** How many trailing words render in the accent colour. */
  accentWords?: number;
  className?: string;
};

export function CharReveal({
  text,
  accentWords = 0,
  className,
}: CharRevealProps) {
  const words = text.split(" ");
  const accentFrom = words.length - accentWords;

  let charIndex = 0;

  return (
    <h1 aria-label={text} className={cn("text-balance", className)}>
      {words.map((word, wordIndex) => {
        const accent = accentWords > 0 && wordIndex >= accentFrom;

        const chars = [...word].map((char) => {
          const delay = START_DELAY + charIndex * STAGGER;
          charIndex += 1;

          return (
            <span
              key={`${wordIndex}-${charIndex}`}
              className="char-in"
              style={{ "--char-delay": `${delay.toFixed(3)}s` } as React.CSSProperties}
            >
              {char}
            </span>
          );
        });

        return (
          <span key={wordIndex}>
            {wordIndex > 0 ? " " : null}
            <span
              aria-hidden="true"
              className={cn("inline-block", accent && "heading-accent")}
            >
              {chars}
            </span>
          </span>
        );
      })}
    </h1>
  );
}
