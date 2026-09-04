"use client";

import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon, ToolBocksLogo } from "@/components/icons";
import { Button } from "@/components/ui-kit";
import { APP_URL, DEMO_URL, navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The header: one calm, full-width bar.
 *
 * At the top of the page it is transparent and sits on the hero like a caption.
 * Once the page moves it turns into glass: a blurred, slightly saturated wash
 * of the ground with a hairline underneath, so it reads over the dark sections
 * and the cream ones alike without ever becoming a white strip. The transition
 * is on the wash, not the layout, so nothing jumps.
 *
 * The link for the section currently on screen carries a small lime dot. That
 * is the only colour in the bar besides the CTA, which is the same lime pill
 * as everywhere else.
 *
 * Scroll state listens to both `scroll` and the smoother's `smoothscroll`
 * event: under ScrollSmoother the native scroll position moves first and the
 * content catches up, and the bar should follow the content.
 */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("smoothscroll", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("smoothscroll", on);
    };
  }, []);

  useEffect(() => {
    const els = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Close the mobile panel once the viewport is wide enough to show the row.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 992px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const glass = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b transition-[background-color,border-color,box-shadow] duration-500",
          glass
            ? "border-white/[0.07] bg-[rgb(5_6_11/0.62)] shadow-[0_12px_40px_-24px_rgb(0_0_0/0.8)] backdrop-blur-2xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="container-main flex h-[4.25rem] items-center justify-between gap-lg lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <a href="#top" aria-label="ToolBocks home" className="shrink-0">
            <ToolBocksLogo priority />
          </a>

          {/* desktop links */}
          <nav aria-label="Main" className="hidden lg:flex lg:justify-center">
            <ul className="flex items-center gap-xs">
              {navLinks.map((l) => {
                const id = l.href.slice(1);
                const on = active === id;
                return (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      aria-current={on ? "true" : undefined}
                      className={cn(
                        "relative flex items-center rounded-round px-md py-sm text-[0.875rem] transition-colors duration-200 hover:text-ink",
                        on ? "text-ink" : "text-soft-400",
                      )}
                    >
                      {l.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-lime transition-opacity duration-300",
                          on ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center justify-end gap-md lg:flex">
            <a
              href={APP_URL}
              className="px-md py-sm text-[0.875rem] text-soft-400 transition-colors duration-200 hover:text-ink"
            >
              Sign in
            </a>
            <Button href={DEMO_URL} variant="primary" size="small">
              Book a demo
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-small text-ink transition-colors hover:bg-white/[0.06] lg:hidden"
          >
            {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>

        {/* mobile panel: the same glass, continued below the bar */}
        {open ? (
          <nav
            id="mobile-nav"
            aria-label="Main"
            className="container-main flex flex-col border-t border-white/[0.07] pb-xl pt-lg lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center py-sm text-large text-ink transition-opacity duration-200 hover:opacity-70"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-lg flex flex-col gap-sm">
              <Button href={APP_URL} variant="dark" size="small">
                Sign in
              </Button>
              <Button href={DEMO_URL} variant="primary" size="small">
                Book a demo
              </Button>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
