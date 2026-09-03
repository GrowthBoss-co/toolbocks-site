"use client";

import { useInView } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered heading reveal: each word sits in its own clipped mask and
 * slides up into view with a short stagger.
 *
 * Per word, not per line, on purpose. A per-line reveal has to know where the
 * browser broke the lines, which means measuring line boxes after layout and
 * again on every resize. Per word survives natural wrapping with no measuring,
 * and reads the same at a glance.
 *
 * The mask carries bottom padding cancelled by a negative margin. Descenders
 * and the serif's italic overhang extend below the line box, and a mask
 * clipped to the line box alone would shear them off.
 *
 * The full string is present once for assistive tech (visually hidden) and the
 * animated words are aria-hidden, so a screen reader announces the sentence
 * rather than a list of words.
 */
type WordRevealProps = {
  text: string;
  as?: "h2" | "h3" | "p";
  className?: string;
  /** Seconds between consecutive words. */
  stagger?: number;
  /** Seconds before the first word moves. */
  delay?: number;
};

export function WordReveal({
  text,
  as = "h2",
  className,
  stagger = 0.04,
  delay = 0,
}: WordRevealProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const Tag = as as React.ElementType;
  const words = text.split(" ");

  return (
    <Tag
      ref={ref}
      className={cn("reveal-words", inView && "is-in", className)}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          {i > 0 ? " " : null}
          <span className="mask-word">
            <span
              style={
                {
                  "--word-delay": `${(delay + i * stagger).toFixed(3)}s`,
                } as React.CSSProperties
              }
            >
              {word}
            </span>
          </span>
        </span>
      ))}
    </Tag>
  );
}
