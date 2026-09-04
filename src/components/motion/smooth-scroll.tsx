"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * The page's scroll feel, matched to auxia.io: GSAP ScrollSmoother with
 * `smooth: 1.2, effects: true`, which is exactly what their homepage creates.
 *
 * How it works, because it constrains the rest of the page: the document keeps
 * its real height and scrolls natively (so the scrollbar, keyboard, wheel over
 * an iframe and touch all behave), and the content inside #smooth-content is
 * translated to lag the scroll position by ~1.2s of easing. Two consequences:
 *
 * - Anything `position: fixed` must live OUTSIDE #smooth-content, or it is
 *   translated with the content. The nav is rendered before the wrapper.
 * - Nothing fires a scroll event while the content catches up, so scroll-linked
 *   values measured on `scroll` would freeze mid-ease. The smoother's onUpdate
 *   dispatches `smoothscroll` on window every frame it moves, and
 *   useScrollProgress listens for it.
 *
 * Anchor links are intercepted and driven through the smoother, because a
 * native hash jump has no idea the content is translated. The nav's height is
 * subtracted so a heading never lands under it.
 *
 * Reduced motion: the smoother is not created at all and the page scrolls
 * natively, which is the correct reading of that preference.
 */
export const SMOOTH_WRAPPER = "smooth-wrapper";
export const SMOOTH_CONTENT = "smooth-content";
export const SMOOTH_EVENT = "smoothscroll";

const NAV_OFFSET = 104;

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const smoother = ScrollSmoother.create({
      wrapper: `#${SMOOTH_WRAPPER}`,
      content: `#${SMOOTH_CONTENT}`,
      smooth: 1.2,
      effects: true,
      onUpdate: () => window.dispatchEvent(new Event(SMOOTH_EVENT)),
    });

    const scrollToHash = (hash: string, smooth: boolean) => {
      const id = decodeURIComponent(hash.slice(1));
      if (!id) return false;
      const el = document.getElementById(id);
      if (!el) return false;
      const y = Math.max(0, smoother.offset(el, "top top") - NAV_OFFSET);
      smoother.scrollTo(y, smooth);
      return true;
    };

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='#']");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href.length < 2) return;
      if (scrollToHash(href, true)) {
        e.preventDefault();
        history.pushState(null, "", href);
      }
    };

    document.addEventListener("click", onClick);
    if (location.hash) {
      // Layout is still settling on first paint; let it land before measuring.
      requestAnimationFrame(() => scrollToHash(location.hash, false));
    }

    return () => {
      document.removeEventListener("click", onClick);
      smoother.kill();
    };
  }, []);

  return null;
}
