"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { featureVisuals } from "@/components/feature-visuals";
import { featureIcons } from "@/components/feature-icons";
import { Reveal } from "@/components/motion/reveal";
import { featureCatalog } from "@/lib/content";

/**
 * Every feature in the product, one card each, in a row you scroll sideways.
 *
 * A port of the "Explore all the features" carousel Bahaa supplied: cream
 * ground, white cards with a flat one-hue illustration on top and an icon,
 * title and two lines of copy underneath, two dark square arrows bottom-left.
 * The row starts on the container's left edge and runs off the right edge of
 * the viewport, so the cut-off card is the invitation to scroll.
 *
 * The scroller is native overflow with snap points. The arrows move to the
 * next or previous card's snap position rather than by a fixed distance, so a
 * click never leaves a card half-shown. Touch, trackpad and shift-wheel all
 * work without the buttons.
 *
 * The left padding is `max(0, (100% - site-width) / 2) + site-margin`, which
 * is exactly where `.container-main` puts its content. It is expressed in the
 * scroller's own percentage rather than 100vw so the page scrollbar cannot
 * knock it out of line with the header above.
 */
const CARD_W = "21.5rem";

export function FeatureCatalog() {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, [measure]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const cards = Array.from(el.children) as HTMLElement[];
    const current = el.scrollLeft;
    const targets = cards.map((c) => c.offsetLeft - pad);
    const next =
      dir === 1
        ? targets.find((t) => t > current + 4)
        : [...targets].reverse().find((t) => t < current - 4);
    if (next === undefined) return;
    el.scrollTo({ left: next, behavior: "smooth" });
  };

  return (
    <section
      id="platform"
      className="scheme-cream relative isolate overflow-hidden bg-void"
      style={{ borderTop: "1px solid var(--track)" }}
    >
      <div className="relative">
        <div className="container-main relative pt-section-main">
          <Reveal className="flex flex-col gap-lg">
            <p className="text-eyebrow">[ {featureCatalog.eyebrow} ]</p>
            <h2 className="max-w-[22ch] text-[clamp(2rem,3.6vw,2.875rem)] font-medium leading-[1.12] tracking-[-0.02em] text-ink [font-family:var(--font-body-family)]">
              <span className="text-soft-400">
                {featureCatalog.titleLead}{" "}
                <span className="text-soft">
                  {featureCatalog.titleAccent}
                </span>
              </span>
              <br />
              <span className="font-semibold">{featureCatalog.titleLine2}</span>
            </h2>
          </Reveal>
        </div>
      </div>

      <Reveal y={32} delay={0.1}>
        <ul
          ref={track}
          className="mt-3xl flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            paddingLeft: "calc(max(0px, (100% - var(--site-width-main)) / 2) + var(--site-margin))",
            paddingRight: "calc(max(0px, (100% - var(--site-width-main)) / 2) + var(--site-margin))",
            scrollPaddingLeft:
              "calc(max(0px, (100% - var(--site-width-main)) / 2) + var(--site-margin))",
          }}
        >
          {featureCatalog.items.map((item) => {
            const Visual = featureVisuals[item.visual];
            const Icon = featureIcons[item.visual];
            return (
              <li
                key={item.visual}
                className="flex shrink-0 snap-start flex-col rounded-[1.25rem] bg-white p-7"
                style={{
                  width: CARD_W,
                  boxShadow:
                    "0 1px 2px rgb(20 21 27 / 0.04), 0 16px 40px -24px rgb(20 21 27 / 0.18)",
                }}
              >
                <Visual />
                <div className="mt-6 flex items-center gap-2.5">
                  <Icon className="size-5 shrink-0 text-[var(--p-500)]" />
                  <h3 className="text-[1.1875rem] font-semibold leading-tight tracking-[-0.01em] text-ink [font-family:var(--font-body-family)]">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3 text-[0.9375rem] leading-[1.55] text-soft-400">
                  {item.body}
                </p>
              </li>
            );
          })}
        </ul>
      </Reveal>

      <div className="container-main pb-section-main pt-xl">
        <div className="flex gap-2">
          <ArrowButton dir={-1} disabled={atStart} onClick={() => step(-1)} label="Previous features" />
          <ArrowButton dir={1} disabled={atEnd} onClick={() => step(1)} label="More features" />
        </div>
      </div>
    </section>
  );
}

function ArrowButton({
  dir,
  disabled,
  onClick,
  label,
}: {
  dir: 1 | -1;
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-[0.5rem] bg-[#15161b] text-white transition-[opacity,transform] duration-200 hover:-translate-y-0.5 disabled:cursor-default disabled:opacity-35 disabled:hover:translate-y-0"
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4">
        <path
          d={dir === 1 ? "m9 5 7 7-7 7" : "m15 5-7 7 7 7"}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
