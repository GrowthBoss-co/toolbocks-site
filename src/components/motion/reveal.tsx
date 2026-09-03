"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered entrance.
 *
 * An IntersectionObserver rather than a scroll listener, so nothing runs on the
 * main thread between reveals, and the observer disconnects the moment an
 * element has been seen — these are one-shot entrances, not a state that should
 * reverse when you scroll back up past them.
 *
 * The hidden state lives in CSS (.reveal), not in a style prop. That matters
 * for reduced motion: the media query in globals.css can force .reveal visible
 * with no JavaScript involved, so someone with the setting on never depends on
 * an observer firing to be able to read the page.
 */
const ROOT_MARGIN = "0px 0px -80px 0px";

export function useInView<T extends HTMLElement>(rootMargin = ROOT_MARGIN) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}

type RevealProps = {
  children: React.ReactNode;
  /** Seconds to hold before this element starts, for staggering a group. */
  delay?: number;
  /** Distance travelled, in px. Larger for panels, smaller for text. */
  y?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section" | "figure";
};

export function Reveal({
  children,
  delay = 0,
  y,
  className,
  as = "div",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();

  // Widened deliberately. Typed as the literal union, TypeScript intersects the
  // ref types of every allowed tag and nothing satisfies the result.
  const Tag = as as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={cn("reveal", inView && "is-in", className)}
      style={
        {
          "--reveal-delay": delay ? `${delay}s` : undefined,
          "--reveal-y": y ? `${y}px` : undefined,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
