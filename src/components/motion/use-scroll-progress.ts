"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, type MotionValue } from "motion/react";

/**
 * 0-to-1 progress of an element travelling up the viewport.
 *
 * This exists instead of motion's own `useScroll({ target, offset })`, which
 * caches the target's measurement and refreshes it only on resize. This page
 * loads two webfonts and reveals a lot of content on scroll, both of which
 * change the height of everything below them after that measurement is taken,
 * and a stale mapping here is not a subtle bug: the walkthrough rail either
 * draws against the wrong scroll range or appears stuck, and the drawing is the
 * whole point of the section.
 *
 * Reading the rect on every scroll frame costs one forced layout read per frame
 * and cannot go stale, whatever moves above the element. The read is
 * rAF-batched, so a burst of scroll events collapses into one measurement.
 *
 * @param startVh Viewport fraction the element's TOP sits at for progress 0.
 *                0.75 means "starts when the top is three-quarters down".
 * @param endVh   Viewport fraction the element's BOTTOM sits at for progress 1.
 */
export function useScrollProgress(
  ref: React.RefObject<HTMLElement | null>,
  startVh: number,
  endVh: number,
): MotionValue<number> {
  const progress = useMotionValue(0);
  const frame = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      frame.current = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const span = rect.height + (startVh - endVh) * vh;
      if (span <= 0) return;
      const travelled = startVh * vh - rect.top;
      progress.set(Math.min(1, Math.max(0, travelled / span)));
    };

    const schedule = () => {
      if (frame.current) return;
      frame.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // The smooth scroller translates content for ~1.2s after the last native
    // scroll event; it dispatches this every frame it moves so the mapping
    // keeps tracking the content people actually see.
    window.addEventListener("smoothscroll", schedule);

    return () => {
      // Clearing the handle matters as much as cancelling it. React runs
      // effects twice on mount in development, and a stale non-zero handle
      // makes schedule() believe a frame is always pending — it then returns
      // early forever and the value never moves again after the remount.
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = 0;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("smoothscroll", schedule);
    };
  }, [ref, progress, startVh, endVh]);

  return progress;
}
