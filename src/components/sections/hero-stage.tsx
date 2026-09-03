"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { useScrollProgress } from "@/components/motion/use-scroll-progress";
import { CadenceVisual, LiveCallVisual } from "@/components/visuals";
import { CoachedCallVisual } from "@/components/visuals-product";

/**
 * The hero's product stage: three panels at three parallax depths.
 *
 * It replaced a single 192KB screenshot of the team dashboard. The panels are
 * the same authored-in-markup mocks the rest of the page uses, so they stay
 * sharp at any density, restyle with the tokens, and cost no image weight —
 * and, unlike a screenshot, they are alive (the waveform breathes, the status
 * dots ping).
 *
 * Depth is the only thing scroll drives: back moves furthest, front least,
 * which is what reads as distance. The whole stage then fades toward 15% as it
 * leaves, so the section below it arrives on a clean ground rather than
 * fighting three bright panels for attention.
 *
 * Below lg the panels stack into a single column and every transform is
 * dropped. Overlapping three panels on a 390px screen produces a pile, not a
 * composition, and parallax on a short viewport is mostly invisible anyway.
 */
export function HeroStage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const scrollYProgress = useScrollProgress(ref, 0.85, 0);

  const front = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const mid = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const back = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const fade = useTransform(scrollYProgress, [0.55, 1], [1, 0.15]);

  const still = { y: undefined, opacity: undefined };
  const depth = (y: typeof front) => (reduceMotion ? still : { y });

  // w-full is load-bearing. The hero column is a centred flex column, which
  // sizes its items to their content, and at lg every panel in here is
  // absolutely positioned — so without it this box measures zero wide and
  // left-0/right-0 both resolve to the same point in the middle of the page.
  return (
    <div ref={ref} className="relative w-full">
      <motion.div
        style={reduceMotion ? undefined : { opacity: fade }}
        className="relative flex flex-col items-center gap-xl lg:block lg:h-[30rem]"
      >
        {/* Rear left: the cadence rail, tucked behind and slightly down. */}
        <motion.div
          {...depth(back)}
          className="w-full max-w-[22rem] lg:absolute lg:left-0 lg:top-16 lg:w-[20rem] lg:max-w-none xl:left-8"
        >
          <div className="lift origin-bottom-right rounded-large lg:-rotate-[3deg] lg:opacity-90">
            <CadenceVisual />
          </div>
        </motion.div>

        {/* Right: the compact live-call panel. */}
        <motion.div
          {...depth(mid)}
          className="w-full max-w-[22rem] lg:absolute lg:right-0 lg:top-24 lg:w-[20rem] lg:max-w-none xl:right-8"
        >
          <div className="lift origin-bottom-left rounded-large lg:rotate-[3deg] lg:opacity-95">
            <LiveCallVisual />
          </div>
        </motion.div>

        {/* Front and centre: the coached call, the thing the product is for. */}
        <motion.div
          {...depth(front)}
          className="relative z-10 w-full max-w-[34rem] lg:absolute lg:left-1/2 lg:top-0 lg:-translate-x-1/2"
        >
          <div className="lift-lg rounded-large">
            <CoachedCallVisual />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
