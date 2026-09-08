"use client";

import { useEffect } from "react";

/**
 * The page scrolls natively. It used to run GSAP ScrollSmoother (content
 * translated ~1.2s behind the real scroll position, matching auxia.io), and
 * that is exactly what made the page feel like it was snapping on some
 * machines: a smoothed scroll is driven by JavaScript on the main thread, so
 * every frame the page is busy (per-frame layout reads for the walkthrough,
 * the blurred header, a 3,000-node DOM) shows up as the content lurching to
 * catch up. Native scrolling runs on the compositor thread and stays smooth
 * whatever the main thread is doing, on every screen.
 *
 * What survives from the smoother is the one thing it did for usability:
 * same-page anchor links land the target below the fixed nav instead of under
 * it, and a hash on arrival does the same.
 */
const NAV_OFFSET = 104;

function scrollToHash(hash: string, smooth: boolean) {
  const id = decodeURIComponent(hash.slice(1));
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET);
  window.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
  return true;
}

export function AnchorScroll() {
  useEffect(() => {
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
  }, []);

  return null;
}
