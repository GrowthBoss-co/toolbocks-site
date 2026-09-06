"use client";

import { useEffect } from "react";

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
 * Where it does NOT run, and why the library is loaded on demand:
 *
 * - Reduced motion: the smoother is not created at all and the page scrolls
 *   natively, which is the correct reading of that preference.
 * - Touch-only devices (phones, most tablets): ScrollSmoother itself refuses
 *   to smooth there (`smoothTouch` defaults to 0), so creating it bought a
 *   phone nothing but ~130KB of script to download and evaluate before the
 *   page could settle. Those devices get native scrolling plus the same
 *   nav-offset anchor handling, without GSAP ever being fetched.
 *
 * GSAP is imported inside the effect so it lands in its own chunk, requested
 * only by the devices that will use it.
 */
export const SMOOTH_WRAPPER = "smooth-wrapper";
export const SMOOTH_CONTENT = "smooth-content";
export const SMOOTH_EVENT = "smoothscroll";

const NAV_OFFSET = 104;

type ScrollTo = (el: HTMLElement, smooth: boolean) => void;

/**
 * Intercept same-page anchor clicks (and honour a hash on arrival) through the
 * given scroller, so the target lands below the fixed nav.
 */
function installAnchorHandling(scrollTo: ScrollTo) {
  const scrollToHash = (hash: string, smooth: boolean) => {
    const id = decodeURIComponent(hash.slice(1));
    if (!id) return false;
    const el = document.getElementById(id);
    if (!el) return false;
    scrollTo(el, smooth);
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
  return () => document.removeEventListener("click", onClick);
}

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const touchOnly = window.matchMedia("(pointer: coarse) and (hover: none)").matches;
    if (touchOnly) {
      return installAnchorHandling((el, smooth) => {
        const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET);
        window.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
      });
    }

    let cancelled = false;
    let cleanup: () => void = () => {};

    Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("gsap/ScrollSmoother"),
    ]).then(([{ gsap }, { ScrollTrigger }, { ScrollSmoother }]) => {
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      const smoother = ScrollSmoother.create({
        wrapper: `#${SMOOTH_WRAPPER}`,
        content: `#${SMOOTH_CONTENT}`,
        smooth: 1.2,
        effects: true,
        onUpdate: () => window.dispatchEvent(new Event(SMOOTH_EVENT)),
      });

      const removeAnchors = installAnchorHandling((el, smooth) => {
        const y = Math.max(0, smoother.offset(el, "top top") - NAV_OFFSET);
        smoother.scrollTo(y, smooth);
      });

      cleanup = () => {
        removeAnchors();
        smoother.kill();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return null;
}
