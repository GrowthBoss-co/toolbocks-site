"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * The hero's character wave, for a paragraph further down the page.
 *
 * CharReveal runs on a CSS timeline from first paint because the hero is on
 * screen at load. Anything below the fold has to wait until it scrolls into
 * view, so this one watches itself with an IntersectionObserver and flips a
 * class; the per-character delays are CSS transitions (see .char-wave). It
 * runs once and stays.
 *
 * The stagger is roughly double the hero's, per Bahaa: the hero wave is a
 * flourish you half-see, this one is meant to be read as it happens. A
 * two-hundred-character statement takes about four seconds to finish.
 *
 * Same accessibility contract as CharReveal: the element carries the full
 * string in aria-label, the visual spans are aria-hidden, words are the
 * inline-block unit so lines never break mid-word.
 */
const STAGGER = 0.019;

export function ScrollCharReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        // In view, or already scrolled past: a fast flick under the smoother
        // can carry the paragraph through the viewport between two checks,
        // and a statement that never appears is worse than one that snaps in.
        const hit = entries.some(
          (e) => e.isIntersecting || e.boundingClientRect.bottom < (e.rootBounds?.top ?? 0),
        );
        if (hit) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: [0, 0.3] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let i = 0;
  return (
    <p ref={ref} aria-label={text} className={cn("char-wave", on && "is-in", className)}>
      {text.split(" ").map((word, w) => (
        <span key={w}>
          {w > 0 ? " " : null}
          <span aria-hidden="true" className="inline-block">
            {[...word].map((ch) => {
              const delay = (i++ * STAGGER).toFixed(3);
              return (
                <span
                  key={`${w}-${i}`}
                  className="cw"
                  style={{ "--char-delay": `${delay}s` } as React.CSSProperties}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        </span>
      ))}
    </p>
  );
}
