"use client";

import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon, ToolBocksLogo } from "@/components/icons";
import { Button } from "@/components/ui-kit";
import { DEMO_URL, navLinks } from "@/lib/content";
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
 * On a phone the menu unfolds out of the bar rather than popping: the panel
 * is always in the DOM and animates its grid row from 0fr to 1fr, the links
 * slide up one after another, and the CTA arrives last. The menu icon turns
 * into the close icon with a quarter turn. Closed, the panel is hidden from
 * assistive tech and its links leave the tab order.
 *
 * Scroll state listens to both `scroll` and the smoother's `smoothscroll`
 * event: under ScrollSmoother the native scroll position moves first and the
 * content catches up, and the bar should follow the content.
 */
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

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

  // Close the mobile panel once the viewport is wide enough to show the row,
  // and on Escape.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 992px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    mq.addEventListener("change", onChange);
    window.addEventListener("keydown", onKey);
    return () => {
      mq.removeEventListener("change", onChange);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const glass = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b transition-[background-color,border-color,box-shadow] duration-500",
          glass
            ? "border-white/[0.07] bg-[rgb(5_6_11/0.74)] shadow-[0_12px_40px_-24px_rgb(0_0_0/0.8)] backdrop-blur-2xl backdrop-saturate-150"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="container-main flex h-[4.25rem] items-center justify-between gap-lg lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <a
            href="#top"
            aria-label="ToolBocks home"
            className="shrink-0"
            onClick={() => setOpen(false)}
          >
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
            className="relative grid size-10 place-items-center rounded-round text-ink transition-colors hover:bg-white/[0.06] lg:hidden"
          >
            <MenuIcon
              className={cn(
                "absolute size-6 transition-[opacity,transform] duration-300",
                EASE,
                open ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100",
              )}
            />
            <CloseIcon
              className={cn(
                "absolute size-6 transition-[opacity,transform] duration-300",
                EASE,
                open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0",
              )}
            />
          </button>
        </div>

        {/* mobile panel: unfolds from the bar */}
        <div
          className={cn("grid transition-[grid-template-rows] duration-500 lg:hidden", EASE)}
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <nav
            id="mobile-nav"
            aria-label="Main"
            aria-hidden={!open}
            className="min-h-0 overflow-hidden"
          >
            <div className="container-main border-t border-white/[0.07] pb-2xl pt-lg">
              <ul className="flex flex-col">
                {navLinks.map((l, i) => (
                  <li
                    key={l.label}
                    className={cn(
                      "border-b border-white/[0.06] transition-[opacity,transform] duration-400 last:border-b-0",
                      EASE,
                      open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                    )}
                    style={{ transitionDelay: open ? `${90 + i * 55}ms` : "0ms" }}
                  >
                    <a
                      href={l.href}
                      tabIndex={open ? 0 : -1}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-md text-[1.375rem] font-medium text-ink"
                    >
                      {l.label}
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 text-soft-400">
                        <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
              <div
                className={cn(
                  "mt-xl transition-[opacity,transform] duration-400",
                  EASE,
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
                style={{ transitionDelay: open ? `${90 + navLinks.length * 55 + 40}ms` : "0ms" }}
              >
                <Button href={DEMO_URL} variant="primary" className="w-full">
                  Book a live demo
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
