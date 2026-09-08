"use client";

import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon, ToolBocksLogo } from "@/components/icons";
import { Button } from "@/components/ui-kit";
import { DEMO_URL, navLinks } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The header: a caption at the top of the page that becomes an island.
 *
 * At rest it is a transparent, full-width row sitting on the hero. Once the
 * page moves it gathers itself into a floating capsule: the row shrinks in
 * height and width, lifts off the top edge, rounds off, and takes a near-solid
 * void ground with a slow-drifting indigo-to-magenta hairline ring, the same
 * gradient as the logo. It is deliberately an OBJECT floating over the page
 * rather than a translucent strip across it: the old strip was a 74% dark wash
 * that read as a grey band over the cream sections, which is what got it
 * replaced. Over cream the capsule stays dark; the cream shows around it.
 *
 * Two things move with the page. The link for the section on screen carries a
 * soft pill that slides between links rather than blinking from one to the
 * next, with the lime dot riding along. And a one-pixel gradient hairline
 * along the bottom of the capsule fills left to right with how far down the
 * page you are. Both are written straight to the DOM from a rAF-batched scroll
 * handler; nothing re-renders per frame.
 *
 * On a phone the menu unfolds out of the capsule, which relaxes from a pill to
 * a rounded card so the panel has corners to live in. The panel is always in
 * the DOM and animates its grid row from 0fr to 1fr, the links slide up one
 * after another, and the CTA arrives last. Closed, it is hidden from assistive
 * tech and its links leave the tab order.
 */
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const barRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // Scroll state and page progress, one rAF per burst of scroll events.
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      barRef.current?.style.setProperty("--progress", p.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
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

  // Slide the indicator under the active link. Measured from the DOM so it
  // stays right when the capsule changes width or a webfont swaps in.
  useEffect(() => {
    const list = listRef.current;
    const pill = indicatorRef.current;
    if (!list || !pill) return;
    const place = () => {
      const on = list.querySelector<HTMLElement>("a[aria-current='true']");
      if (!on) {
        pill.style.opacity = "0";
        return;
      }
      // Rects, not offsetLeft: the link's offset parent is its own <li>.
      const x = on.getBoundingClientRect().left - list.getBoundingClientRect().left;
      pill.style.opacity = "1";
      pill.style.transform = `translateX(${x}px)`;
      pill.style.width = `${on.offsetWidth}px`;
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(list);
    return () => ro.disconnect();
  }, [active, scrolled]);

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

  const island = scrolled || open;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="container-main">
        <div
          ref={barRef}
          className={cn(
            "nav-bar pointer-events-auto mx-auto",
            island && "is-island",
            open && "is-open",
          )}
        >
          <div className="nav-row flex items-center justify-between gap-lg lg:grid lg:grid-cols-[1fr_auto_1fr]">
            <a
              href="#top"
              aria-label="ToolBocks home"
              className="nav-logo shrink-0 origin-left"
              onClick={() => setOpen(false)}
            >
              <ToolBocksLogo priority />
            </a>

            {/* desktop links */}
            <nav aria-label="Main" className="hidden lg:flex lg:justify-center">
              <ul ref={listRef} className="relative flex items-center gap-xs">
                <span
                  ref={indicatorRef}
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-round bg-white/[0.07] opacity-0 transition-[transform,width,opacity] duration-500",
                    EASE,
                  )}
                />
                {navLinks.map((l) => {
                  const id = l.href.slice(1);
                  const on = active === id;
                  return (
                    <li key={l.label} className="relative">
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

          {/* page progress: a hairline along the capsule's floor */}
          <span aria-hidden="true" className="nav-progress" />

          {/* mobile panel: unfolds from the capsule */}
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
              <div className="border-t border-white/[0.07] pb-xl pt-lg">
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
      </div>
    </header>
  );
}
