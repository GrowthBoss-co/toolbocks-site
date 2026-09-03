"use client";

import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon, ToolBocksLogo } from "@/components/icons";
import { Button } from "@/components/ui-kit";
import { APP_URL, DEMO_URL, navLinks } from "@/lib/content";

export function SiteNav() {
  const [open, setOpen] = useState(false);

  // Close the mobile panel once the viewport is wide enough to show the row.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 992px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-main">
        <div className="mt-lg rounded-round border border-white/[0.08] bg-void/70 px-lg py-sm shadow-[0_20px_50px_-30px_rgb(0_0_0/0.9)] backdrop-blur-xl lg:pr-sm">
          <div className="flex items-center justify-between gap-lg lg:grid lg:grid-cols-[1fr_2.5fr_1fr]">
            <a href="#top" aria-label="ToolBocks home" className="shrink-0">
              <ToolBocksLogo priority />
            </a>

            {/* desktop links */}
            <nav aria-label="Main" className="hidden lg:flex lg:justify-center">
              <ul className="flex items-center">
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="flex items-center px-lg py-sm text-small text-soft-400 transition-colors duration-200 hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden items-center justify-end gap-sm lg:flex">
              <Button href={APP_URL} variant="dark" size="small">
                Sign in
              </Button>
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
              {open ? (
                <CloseIcon className="size-6" />
              ) : (
                <MenuIcon className="size-6" />
              )}
            </button>
          </div>

          {/* mobile panel */}
          {open ? (
            <nav
              id="mobile-nav"
              aria-label="Main"
              className="mt-sm flex flex-col rounded-xlarge border border-white/[0.08] bg-void/95 px-xl py-lg backdrop-blur-xl lg:hidden"
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
      </div>
    </header>
  );
}
