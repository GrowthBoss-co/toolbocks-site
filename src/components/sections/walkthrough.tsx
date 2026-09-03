"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";
import { useInView } from "@/components/motion/reveal";
import { useScrollProgress } from "@/components/motion/use-scroll-progress";
import { SectionHeader } from "@/components/ui-kit";
import { walkthroughVisuals } from "@/components/visuals-product";
import { walkthrough } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The six steps of a rep's day, threaded on a line that draws itself as you
 * scroll.
 *
 * How it is built: one rail spans the whole list. The undrawn part is a static
 * hairline; the drawn part is a gradient bar whose scaleY is bound to the
 * section's scroll progress, origin top, so it grows downward. The spring is
 * what stops it feeling like a progress bar — raw scrollYProgress tracks the
 * wheel exactly and reads as mechanical.
 *
 * The offset is deliberately asymmetric. It starts drawing when the list is
 * still a quarter-viewport below the fold and finishes with a third of it still
 * to go, so the line is never caught standing still at either end.
 *
 * Each step lights independently off its own observer rather than off the
 * shared progress value, because a step should light when *it* reaches the
 * reader, which is not the same instant the rail happens to reach its node.
 */
const STEP_ROOT_MARGIN = "0px 0px -45% 0px";

export function Walkthrough() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotion();

  const progress = useScrollProgress(listRef, 0.75, 0.35);
  const drawn = useSpring(progress, { stiffness: 90, damping: 24 });

  return (
    <section
      id="walkthrough"
      className="grain relative isolate overflow-hidden bg-void"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="aura left-1/2 top-[18%] size-[52rem] -translate-x-1/2 opacity-60" />
      </div>

      <div className="container-main pb-section-main pt-section-main">
        <SectionHeader
          eyebrow={walkthrough.eyebrow}
          title={walkthrough.title}
          body={walkthrough.body}
        />

        <ol ref={listRef} className="relative mt-7xl list-none">
          {/* The rail. Left-anchored on mobile where there is no room for a
              centred thread, dead centre from md up. */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-[1.375rem] w-px md:left-1/2"
          >
            <div className="absolute inset-0 bg-white/[0.09]" />
            <motion.div
              className="absolute inset-0 origin-top bg-gradient-to-b from-primary-500 to-lime"
              style={reduceMotion ? { scaleY: 1 } : { scaleY: drawn }}
            />
          </div>

          {walkthrough.steps.map((step, i) => (
            <Step key={step.title} step={step} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}

type StepProps = {
  step: (typeof walkthrough.steps)[number];
  index: number;
};

function Step({ step, index }: StepProps) {
  const { ref, inView } = useInView<HTMLLIElement>(STEP_ROOT_MARGIN);
  const Visual = walkthroughVisuals[step.visual];

  // Odd steps put the panel on the left, so the eye crosses the thread on
  // every beat instead of running down one side of it.
  const flip = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <li
      ref={ref}
      className="relative grid grid-cols-1 gap-2xl pb-8xl pl-14 last:pb-0 md:grid-cols-[1fr_7rem_1fr] md:gap-0 md:pb-8xl md:pl-0 md:last:pb-0"
    >
      {/* Node. Absolutely placed rather than sat in the middle column, so one
          rule keeps it on the rail at both breakpoints. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-[1.375rem] top-[1.75rem] z-10 size-3 -translate-x-1/2 rounded-full border transition-colors duration-500 md:left-1/2 md:top-[3.5rem]",
          inView
            ? "node-glow border-primary-300 bg-primary-500"
            : "border-white/20 bg-void",
        )}
      />

      {/* Elbow. A hairline from the node out toward the copy, lighting with it. */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-[3.5rem] hidden h-px w-[3.5rem] transition-colors duration-500 md:block",
          flip ? "left-1/2" : "right-1/2",
          inView ? "bg-primary-500/50" : "bg-white/[0.09]",
        )}
      />

      <div
        style={{ "--reveal-y": "20px" } as React.CSSProperties}
        className={cn(
          "reveal flex flex-col gap-lg",
          flip ? "md:order-3 md:pl-7xl" : "md:order-1 md:pr-7xl",
          inView && "is-in",
        )}
      >
        <div
          className={cn(
            "flex w-fit items-center gap-md rounded-round px-md py-xs transition-colors duration-500",
            inView ? "bg-primary-500" : "bg-white/[0.06]",
          )}
        >
          <span
            className={cn(
              "text-[0.6875rem] font-semibold tabular-nums",
              inView ? "text-white" : "text-sub",
            )}
          >
            {number}
          </span>
          <span
            className={cn(
              "text-[0.6875rem] font-medium uppercase tracking-[0.14em]",
              inView ? "text-primary-100" : "text-soft-400",
            )}
          >
            {step.kicker}
          </span>
        </div>

        <h3 className="heading-h4 max-w-[18ch] text-balance">{step.title}</h3>
        <p className="text-soft-400 md:max-w-[42ch]">{step.body}</p>

        {step.sample ? (
          <p className="text-[0.75rem] leading-snug text-sub">
            {walkthrough.sampleNote}
          </p>
        ) : null}
      </div>

      {/* Middle column is the rail's gutter and stays empty on purpose. */}
      <div aria-hidden="true" className="hidden md:order-2 md:block" />

      <div
        style={{ "--reveal-y": "32px" } as React.CSSProperties}
        className={cn(
          "reveal flex",
          flip
            ? "md:order-1 md:justify-end md:pr-7xl"
            : "md:order-3 md:justify-start md:pl-7xl",
          inView && "is-in",
        )}
      >
        <div className="lift w-full rounded-large">
          <Visual />
        </div>
      </div>
    </li>
  );
}
