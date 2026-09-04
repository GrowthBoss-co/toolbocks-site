"use client";

import { useState } from "react";
import {
  MinusIcon,
  PlusIcon,
  RepeatIcon,
  ScalesIcon,
  UserCheckIcon,
} from "@/components/icons";
import { FairnessVisual } from "@/components/visuals";
import { benefits } from "@/lib/content";

// Scales reads as fairness here rather than as compliance; the compliance
// pillar in `System` took the gauge. Repeat is the two-way CRM sync item that
// replaced the duplicated compliance benefit.
const icons = [ScalesIcon, RepeatIcon, UserCheckIcon];

export function Benefits() {
  const [open, setOpen] = useState(0);

  return (
    <section id="benefits" className="grain relative isolate overflow-hidden bg-abyss">
      {/* The ground fades into the void below, the way the hero fades into the
          mission, so the two sections read as one run rather than two stripes. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent to-void"
      />
      <div className="relative container-main pt-section-main pb-section-main">
        <div className="grid grid-cols-1 items-center gap-4xl lg:grid-cols-2 lg:gap-6xl">
          <div className="flex flex-col gap-4xl lg:gap-6xl">
            <div className="flex flex-col items-start gap-xl">
              <p className="text-eyebrow">{benefits.eyebrow}</p>
              <h2 className="text-gradient max-w-[22ch] text-balance">
                {benefits.title}
              </h2>
            </div>

            <div className="flex flex-col gap-[var(--site-gutter)]">
              {benefits.items.map((item, i) => {
                const Icon = icons[i];
                const isOpen = open === i;
                return (
                  <div key={item.title}>
                    <div className="flex flex-col gap-sm">
                      <h3 className="heading-h5">
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? -1 : i)}
                          aria-expanded={isOpen}
                          aria-controls={`benefit-panel-${i}`}
                          className="group flex w-full cursor-pointer items-center gap-lg text-left max-md:py-sm max-md:pr-5"
                        >
                          <span className="grid size-12 shrink-0 place-items-center rounded-round bg-surface-800 p-md text-ink transition-colors duration-200 group-hover:bg-surface-700">
                            <Icon className="size-full" />
                          </span>
                          <span className="flex-1">{item.title}</span>
                          <span className="shrink-0 text-sub transition-colors duration-200 group-hover:text-ink">
                            {isOpen ? (
                              <MinusIcon className="size-5" />
                            ) : (
                              <PlusIcon className="size-5" />
                            )}
                          </span>
                        </button>
                      </h3>

                      <div
                        id={`benefit-panel-${i}`}
                        hidden={!isOpen}
                        className="overflow-hidden pl-16"
                      >
                        <p className="text-soft-400">{item.body}</p>
                      </div>
                    </div>
                    {i < benefits.items.length - 1 ? (
                      <div
                        aria-hidden="true"
                        className="mt-[var(--site-gutter)] h-px w-full bg-white/[0.08]"
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative flex size-full flex-col items-center justify-center">
            <div
              aria-hidden="true"
              className="aura left-1/2 top-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2"
            />
            <div className="lift-lg relative w-full max-w-[26rem] rounded-xlarge">
              <FairnessVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
