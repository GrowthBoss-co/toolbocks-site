"use client";

import { useRef, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { PlaybookIcon, SparkleIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { useScrollProgress } from "@/components/motion/use-scroll-progress";
import { WordReveal } from "@/components/motion/word-reveal";
import { Button } from "@/components/ui-kit";
import { walkthroughVisuals } from "@/components/visuals-product";
import { DEMO_URL, hero, walkthrough } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * A rep's day as one continuous line.
 *
 * The line starts at a prompt, runs to a pill that lights when it arrives, then
 * snakes down the page: through each step's copy column, across to the other
 * side, into the next step, and finally into a closing heading. Every segment
 * draws itself as it moves up the viewport, so reading the section and
 * watching the line are the same act.
 *
 * Nothing here is a one-shot. Each connector, fill, pill and paragraph has its
 * own 0-to-1 progress from its own viewport position (useScrollProgress), so
 * scrolling back rewinds it. That is what makes the line feel attached to the
 * page rather than played at it.
 *
 * Geometry is one reference viewBox, 940 x 369, and every connector is the
 * same path mirrored: drop 156, a 24-radius corner, cross, corner, drop. The
 * corners are cubic curves with the standard circle constant so they are true
 * quarter-arcs, not approximations. The wrapper holds the aspect ratio, so the
 * SVG is never distorted and the stroke stays 2px through
 * vector-effect: non-scaling-stroke.
 *
 * COLUMN is load-bearing. Every copy column is exactly this wide, the line runs
 * down its centre, and the connector below is inset by half of it on each side
 * so its endpoints land on the column centres. Change one, change all three.
 */
const COLUMN = "20rem";
const HALF_COLUMN = "10rem";

const VB_W = 940;
const VB_H = 369;
const DROP = 156;
const RADIUS = 24;
const MID_Y = DROP + RADIUS;
const KAPPA = 0.5523;
const EDGE = { left: 1, right: VB_W - 1, center: VB_W / 2 } as const;

type Side = keyof typeof EDGE;

function connectorPath(from: Side, to: Side): string {
  const x0 = EDGE[from];
  const x1 = EDGE[to];
  const d = x1 > x0 ? 1 : -1;
  const k = RADIUS * KAPPA;
  const r = RADIUS;
  return [
    `M ${x0} 0`,
    `V ${DROP}`,
    `C ${x0} ${DROP + k} ${x0 + d * (r - k)} ${MID_Y} ${x0 + d * r} ${MID_Y}`,
    `H ${x1 - d * r}`,
    `C ${x1 - d * (r - k)} ${MID_Y} ${x1} ${MID_Y + (r - k)} ${x1} ${MID_Y + r}`,
    `V ${VB_H}`,
  ].join(" ");
}

const TRACK = "var(--track)";

/* -------------------------------------------------------------------------- */

export function Walkthrough() {
  const steps = walkthrough.steps;
  const lastSide: Side = (steps.length - 1) % 2 === 0 ? "left" : "right";

  return (
    <section
      id="walkthrough"
      className="scheme-cream relative isolate overflow-hidden bg-void"
    >
      <div className="container-main pb-section-main pt-section-main">
        <header className="flex max-w-[44rem] flex-col gap-xl">
          <Reveal>
            <p className="text-eyebrow">{walkthrough.eyebrow}</p>
          </Reveal>
          <WordReveal
            text={walkthrough.title}
            className="heading-h2 max-w-[14ch] text-ink"
          />
          <WordReveal
            as="p"
            text={walkthrough.body}
            stagger={0.012}
            delay={0.25}
            className="text-large max-w-[54ch] text-soft-400"
          />
        </header>

        <div className="mt-7xl flex flex-col md:mt-8xl">
          <Start />

          {steps.map((step, i) => {
            const side: Side = i % 2 === 0 ? "left" : "right";
            const from: Side = side === "left" ? "right" : "left";
            // The connector INTO a step carries that step's tag: what the
            // system is doing on the way there. The final connector, into the
            // closing heading, carries none.
            return (
              <div key={step.title} className="flex flex-col">
                <Connector from={from} to={side} tag={step.tag} />
                <Step step={step} side={side} />
              </div>
            );
          })}

          <Connector from={lastSide} to="center" thick />

          <Closing />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Progress that respects reduced motion: the same MotionValue everywhere else
 * uses, or a constant 1 so every segment renders complete and nothing moves.
 */
function useProgress(
  ref: React.RefObject<HTMLElement | null>,
  startVh: number,
  endVh: number,
) {
  const live = useScrollProgress(ref, startVh, endVh);
  const done = useMotionValue(1);
  return useReducedMotion() ? done : live;
}

/**
 * True while a progress value is at or past a threshold, for lit states.
 *
 * The current value is read at subscription time, not only on change. The
 * progress hook measures once in its own effect, which runs before this one,
 * so a subscription alone misses that first value — and an element that lands
 * fully past its threshold in a single scroll jump then never changes again,
 * leaving its pill grey with the line drawn straight through it.
 */
function useCrossed(progress: MotionValue<number>, at: number) {
  return useSyncExternalStore(
    (notify) => progress.on("change", notify),
    () => progress.get() >= at,
    () => false,
  );
}

/* -------------------------------------------------------------------------- */

function Pill({
  icon: Icon,
  label,
  lit,
  className,
}: {
  icon: typeof SparkleIcon;
  label: string;
  lit: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-12 shrink-0 items-center gap-sm whitespace-nowrap rounded-round border px-xl text-small font-medium transition-colors duration-500 ease-out",
        lit
          ? "border-primary-500 bg-primary-500 text-white"
          : "border-[var(--pill-border)] bg-[var(--pill-bg)] text-[var(--pill-text)]",
        className,
      )}
    >
      <Icon className="size-[1.125rem] shrink-0" />
      {label}
    </span>
  );
}

/** The 2px line running vertically through a column, filling top-down. */
function VerticalFill({
  progress,
  className,
}: {
  progress: MotionValue<number>;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("pointer-events-none absolute w-[2px]", className)}
    >
      <span className="absolute inset-0" style={{ background: TRACK }} />
      <motion.span
        className="absolute inset-0 origin-top bg-primary-500"
        style={{ scaleY: progress }}
      />
    </span>
  );
}

/** Uppercase mono label whose characters arrive one at a time. */
function TagText({ text, on }: { text: string; on: boolean }) {
  return (
    <span
      aria-label={text}
      className="font-mono text-[0.625rem] uppercase leading-none tracking-[0.18em] text-soft-400"
    >
      {[...text].map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cn(
            "inline-block whitespace-pre transition-opacity duration-300",
            on ? "opacity-100" : "opacity-0",
          )}
          style={{ transitionDelay: `${i * 28}ms` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * The opening beat. A prompt on the left, a track running right into a pill
 * that lights when the fill arrives. The pill sits in a column exactly as wide
 * as every step column so the connector below lands on its centre.
 */
function Start() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useProgress(ref, 0.92, 0.62);

  const boxOpacity = useTransform(progress, [0, 0.2], [0, 1]);
  const boxY = useTransform(progress, [0, 0.2], [16, 0]);
  const fill = useTransform(progress, [0.15, 0.6], [0, 1]);
  const pillOpacity = useTransform(progress, [0.35, 0.65], [0, 1]);
  const pillY = useTransform(progress, [0.35, 0.65], [22, 0]);
  const lit = useCrossed(progress, 0.58);

  return (
    <div ref={ref} className="relative">
      {/* Desktop: one row, the line threaded through it. */}
      <div className="relative hidden h-12 items-center md:flex">
        <motion.div
          style={{ opacity: boxOpacity, y: boxY }}
          className="surface-card relative z-10 w-[22rem] px-xl py-lg text-small leading-snug text-ink"
        >
          {walkthrough.start.prompt}
        </motion.div>

        <span
          aria-hidden="true"
          className="absolute top-1/2 h-[2px] -translate-y-1/2"
          style={{ left: "22rem", right: HALF_COLUMN }}
        >
          <span className="absolute inset-0" style={{ background: TRACK }} />
          <motion.span
            className="absolute inset-0 origin-left bg-primary-500"
            style={{ scaleX: fill }}
          />
        </span>

        <motion.div
          style={{ opacity: pillOpacity, y: pillY, width: COLUMN }}
          className="absolute right-0 top-0 flex h-12 justify-center"
        >
          <Pill icon={SparkleIcon} label={walkthrough.start.pill} lit={lit} />
        </motion.div>
      </div>

      {/* Mobile: box, a short vertical run, then the pill, all on the rail. */}
      <div className="relative flex flex-col gap-lg pl-14 md:hidden">
        <VerticalFill progress={fill} className="inset-y-0 left-[1.3125rem]" />
        <motion.div
          style={{ opacity: boxOpacity, y: boxY }}
          className="surface-card relative px-xl py-lg text-small leading-snug text-ink"
        >
          {walkthrough.start.prompt}
        </motion.div>
        <motion.div
          style={{ opacity: pillOpacity, y: pillY }}
          className="relative flex"
        >
          <Pill icon={SparkleIcon} label={walkthrough.start.pill} lit={lit} />
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * The snaking line between two beats, drawn by scroll. Two copies of one path:
 * a static track and the coloured one whose dash offset runs 1 to 0. With
 * pathLength normalised to 1 the offset needs no measuring.
 *
 * The tag sits on the horizontal run with the section ground behind it, so the
 * line appears to break around the words.
 */
function Connector({
  from,
  to,
  tag,
  thick = false,
}: {
  from: Side;
  to: Side;
  tag?: string;
  thick?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useProgress(ref, 0.9, 0.4);
  const dashOffset = useTransform(progress, [0, 1], [1, 0]);
  const opacity = useTransform(progress, [0, 0.08], [0, 1]);
  const tagOn = useCrossed(progress, 0.45);

  const d = connectorPath(from, to);
  const strokeWidth = thick ? 4 : 2;

  return (
    <div ref={ref} className="relative">
      {/* Desktop: the S-curve, inset so its ends land on the column centres. */}
      <motion.div
        aria-hidden="true"
        style={{
          opacity,
          marginLeft: HALF_COLUMN,
          marginRight: HALF_COLUMN,
          aspectRatio: `${VB_W} / ${VB_H}`,
        }}
        className="relative hidden md:block"
      >
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="absolute inset-0 size-full overflow-visible"
          fill="none"
        >
          <path
            d={d}
            stroke={TRACK}
            strokeWidth={strokeWidth}
            vectorEffect="non-scaling-stroke"
          />
          <motion.path
            d={d}
            pathLength={1}
            strokeDasharray="1 1"
            style={{ strokeDashoffset: dashOffset }}
            stroke="var(--p-500)"
            strokeWidth={strokeWidth}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {tag ? (
          <span
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-void px-md py-xs"
            style={{ top: `${(MID_Y / VB_H) * 100}%` }}
          >
            <TagText text={tag} on={tagOn} />
          </span>
        ) : null}
      </motion.div>

      {/* Mobile: a short vertical run on the rail, the tag beside it. */}
      <motion.div
        aria-hidden="true"
        style={{ opacity }}
        className="relative flex h-24 items-center pl-14 md:hidden"
      >
        <VerticalFill
          progress={progress}
          className={cn("inset-y-0 left-[1.3125rem]", thick && "w-[3px]")}
        />
        {tag ? <TagText text={tag} on={tagOn} /> : null}
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

type StepData = (typeof walkthrough.steps)[number];

function Step({ step, side }: { step: StepData; side: Side }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useProgress(ref, 0.85, 0.45);
  const Visual = walkthroughVisuals[step.visual];

  const lit = useCrossed(progress, 0.35);
  const copyOpacity = useTransform(progress, [0.15, 0.55], [0, 1]);
  const copyY = useTransform(progress, [0.15, 0.55], [32, 0]);
  const copyBlur = useTransform(
    progress,
    [0.15, 0.55],
    ["blur(5px)", "blur(0px)"],
  );
  const panelOpacity = useTransform(progress, [0.05, 0.5], [0, 1]);
  const panelY = useTransform(progress, [0.05, 0.5], [28, 0]);

  // The desktop rail is two segments, above and below the copy, so the line
  // never runs through the words. The fill hands off between them: the upper
  // one completes in the first half of the step's travel, the lower one takes
  // the second, which reads as one line passing behind the copy.
  const railTop = useTransform(progress, [0, 0.45], [0, 1]);
  const railBottom = useTransform(progress, [0.55, 1], [0, 1]);

  const copyFirst = side === "left";

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 items-center gap-2xl pl-14 md:grid-cols-[var(--cols)] md:items-stretch md:gap-6xl md:pl-0"
      style={
        {
          "--cols": copyFirst
            ? `${COLUMN} minmax(0, 1fr)`
            : `minmax(0, 1fr) ${COLUMN}`,
        } as React.CSSProperties
      }
    >
      {/* Mobile rail through the whole step. */}
      <VerticalFill
        progress={progress}
        className="inset-y-0 left-[1.3125rem] md:hidden"
      />

      <div
        className={cn(
          "relative flex flex-col items-start gap-lg md:items-center md:text-center",
          copyFirst ? "md:order-1" : "md:order-2",
        )}
      >
        {/* Upper rail: column top down to the pill's centre. The pill is
            opaque and stacked above it, so the line appears to enter it. The
            flex-1 spacer collapses to nothing when the copy is taller than the
            panel, and the negative bottom keeps a stub across the gap so the
            join with the connector above never opens. */}
        <div className="relative hidden w-full flex-1 md:block">
          <VerticalFill
            progress={railTop}
            className="-bottom-10 left-1/2 top-0 -translate-x-1/2"
          />
        </div>

        <div className="relative z-10">
          <Pill icon={PlaybookIcon} label={step.kicker} lit={lit} />
        </div>

        <motion.div
          style={{ opacity: copyOpacity, y: copyY, filter: copyBlur }}
          className="relative flex flex-col gap-md py-sm md:items-center"
        >
          <h3 className="heading-h5 max-w-[16ch] text-balance">{step.title}</h3>
          <p className="text-small max-w-[30ch] text-soft-400">{step.body}</p>
          {step.sample ? (
            <p className="text-[0.6875rem] leading-snug text-sub">
              {walkthrough.sampleNote}
            </p>
          ) : null}
        </motion.div>

        {/* Lower rail: from under the copy to the column bottom, where the
            next connector picks it up. */}
        <div className="relative hidden w-full flex-1 md:block">
          <VerticalFill
            progress={railBottom}
            className="-top-4 bottom-0 left-1/2 -translate-x-1/2"
          />
        </div>
      </div>

      <motion.div
        style={{ opacity: panelOpacity, y: panelY }}
        className={cn(
          "relative flex md:items-center",
          copyFirst
            ? "md:order-2 md:justify-end"
            : "md:order-1 md:justify-start",
        )}
      >
        <div className="scheme-dark lift-lg w-full max-w-[34rem] rounded-xlarge">
          <Visual />
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Closing() {
  return (
    <div className="flex flex-col items-center gap-xl pt-4xl text-center md:pt-2xl">
      <WordReveal
        as="h2"
        text={walkthrough.title}
        className="heading-h3 max-w-[18ch] text-ink"
      />
      <Reveal delay={0.25}>
        <p className="text-large max-w-[44ch] text-soft-400">{hero.note}</p>
      </Reveal>
      <Reveal delay={0.4} className="scheme-dark">
        <Button href={DEMO_URL} variant="primary">
          {hero.primaryCta}
        </Button>
      </Reveal>
    </div>
  );
}
