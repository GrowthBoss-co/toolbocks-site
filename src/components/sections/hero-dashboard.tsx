"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { DemoFrame } from "@/components/sections/demo-frame";

/**
 * The hero's product stage: the Team Dashboard in a dark bezel, with six
 * faint lines running down from the top of the page and turning into its top
 * edge, three a side.
 *
 * The dashboard is the app's own screen (public/demo/team-dashboard.html, a
 * self-contained bundle supplied by Bahaa), laid out at a laptop width and
 * scaled to the column by DemoFrame. It is never reflowed: a phone gets the
 * same picture, smaller.
 *
 * The lines are measured, not guessed. They have to start at the very top of
 * the section, behind the headline, and land on the bezel's top edge, and that
 * edge sits wherever the headline's line count puts it. So `HeroLines` reads
 * the section and bezel rectangles, builds the six paths in pixel space, and
 * rebuilds them on resize. Each line fades out toward the top through a
 * gradient stroke; each carries a couple of soft dots that travel down it on
 * their own cadence (SMIL, no JavaScript per frame) and flash a small ring
 * where they meet the dashboard. Reduced motion keeps the lines and drops the
 * dots.
 */
const INTRINSIC = { width: 1440, height: 690 };
/** The wordmark's cyan-indigo-magenta sweep. */
const LOGO_GRADIENT = "linear-gradient(135deg, #2dd4ff 0%, #6a5cff 48%, #d946ef 100%)";
export const HERO_FRAME_ID = "hero-dashboard";

export function HeroDashboard() {
  return (
    <div id={HERO_FRAME_ID} className="relative z-10 w-full">
      {/* The logo's gradient, twice: a soft glow behind the frame and a one
          pixel ring around it (a gradient background under a one pixel
          padding, with the dark bezel painted on top). */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 rounded-[2rem] opacity-[0.22] blur-2xl"
        style={{ background: LOGO_GRADIENT }}
      />
      <div
        className="lift-lg relative rounded-[1.5rem] p-px"
        style={{ background: LOGO_GRADIENT }}
      >
        <div className="rounded-[calc(1.5rem-1px)] bg-[#0b0b12] p-2 sm:p-2.5">
        <div className="overflow-hidden rounded-[1rem] bg-[#0a0a0f] ring-1 ring-white/[0.06]">
          <DemoFrame
            src="/demo/team-dashboard.html"
            title="ToolBocks Team Dashboard, running on sample data"
            intrinsic={INTRINSIC}
            eager
          />
        </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

type Geometry = { w: number; h: number; fl: number; fr: number };

/** Start x as a share of the section width, outermost first. */
const STARTS = [0.1, 0.17, 0.3];
/** Landing x as a share of the bezel width from its edge, outermost first. */
const LANDS = [0.05, 0.19, 0.35];

/** Small deterministic hash so server and client agree on every "random". */
function rnd(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * The reference's shape: straight down from the top, one rounded elbow, then
 * a straight run into the bezel. The elbow is a quadratic whose control point
 * is the corner itself, so it is tangent to the drop above and to the run
 * below, and every line turns at the same height regardless of where it lands.
 */
function buildPath(x0: number, x1: number, h: number) {
  const corner = h * 0.72;
  const dx = x1 - x0;
  const dy = h - corner;
  const run = Math.hypot(dx, dy);
  const r = Math.min(h * 0.2, run * 0.7, corner * 0.9);
  const sy = corner - r;
  const ex = x0 + (dx / run) * r;
  const ey = corner + (dy / run) * r;
  const f = (n: number) => n.toFixed(1);
  return `M ${f(x0)} 0 L ${f(x0)} ${f(sy)} Q ${f(x0)} ${f(corner)} ${f(ex)} ${f(ey)} L ${f(x1)} ${f(h)}`;
}

export function HeroLines({ hostId }: { hostId: string }) {
  const [geo, setGeo] = useState<Geometry | null>(null);
  const reduceMotion = useReducedMotion();
  const raf = useRef(0);

  useEffect(() => {
    const host = document.getElementById(hostId);
    const frame = document.getElementById(HERO_FRAME_ID);
    if (!host || !frame) return;

    const measure = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const a = host.getBoundingClientRect();
        const b = frame.getBoundingClientRect();
        setGeo({
          w: Math.round(a.width),
          h: Math.round(b.top - a.top),
          fl: Math.round(b.left - a.left),
          fr: Math.round(b.right - a.left),
        });
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    ro.observe(frame);
    // Webfonts swapping in can move the bezel by a line of headline.
    document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [hostId]);

  if (!geo || geo.h < 80) return null;
  const { w, h, fl, fr } = geo;
  const fw = fr - fl;

  const lines = [
    ...STARTS.map((s, i) => ({ x0: w * s, x1: fl + fw * LANDS[i] })),
    ...STARTS.map((s, i) => ({ x0: w * (1 - s), x1: fr - fw * LANDS[i] })),
  ];

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-auto w-full"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{ height: h }}
    >
      <defs>
        <linearGradient id="hero-line-fade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={h}>
          <stop offset="0" stopColor="#cbcaff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#cbcaff" stopOpacity="0.18" />
          <stop offset="1" stopColor="#cbcaff" stopOpacity="0.36" />
        </linearGradient>
        <radialGradient id="hero-dot">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.35" stopColor="#cbcaff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#5c5aff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {lines.map((l, i) => (
        <path
          key={`p${i}`}
          id={`hero-line-${i}`}
          d={buildPath(l.x0, l.x1, h)}
          fill="none"
          stroke="url(#hero-line-fade)"
          strokeWidth="1"
        />
      ))}

      {!reduceMotion &&
        lines.map((l, i) =>
          [0, 1].map((k) => {
            const travel = 2.8 + rnd(i, 1 + k) * 1.8; // s on the line
            const gap = 1.2 + rnd(i, 7 + k) * 4.2; // s parked, invisible
            const period = travel + gap;
            const t = travel / period;
            const begin = -(rnd(i, 13 + k) * period);
            return (
              <g key={`d${i}-${k}`}>
                <circle r="7" fill="url(#hero-dot)" opacity="0">
                  <animateMotion
                    dur={`${period.toFixed(2)}s`}
                    begin={`${begin.toFixed(2)}s`}
                    repeatCount="indefinite"
                    calcMode="linear"
                    keyPoints={`0;1;1`}
                    keyTimes={`0;${t.toFixed(3)};1`}
                  >
                    <mpath href={`#hero-line-${i}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    dur={`${period.toFixed(2)}s`}
                    begin={`${begin.toFixed(2)}s`}
                    repeatCount="indefinite"
                    values="0;0.15;0.9;0.9;0;0"
                    keyTimes={`0;${(t * 0.25).toFixed(3)};${(t * 0.6).toFixed(3)};${(t * 0.96).toFixed(3)};${t.toFixed(3)};1`}
                  />
                </circle>
                {/* The landing: a ring that blooms on the bezel edge as the dot arrives. */}
                <circle cx={l.x1} cy={h} r="2" fill="none" stroke="#cbcaff" strokeWidth="1" opacity="0">
                  <animate
                    attributeName="r"
                    dur={`${period.toFixed(2)}s`}
                    begin={`${begin.toFixed(2)}s`}
                    repeatCount="indefinite"
                    values={`2;2;11;11`}
                    keyTimes={`0;${(t - 0.005).toFixed(3)};${Math.min(0.999, t + 0.1).toFixed(3)};1`}
                  />
                  <animate
                    attributeName="opacity"
                    dur={`${period.toFixed(2)}s`}
                    begin={`${begin.toFixed(2)}s`}
                    repeatCount="indefinite"
                    values="0;0;0.55;0;0"
                    keyTimes={`0;${(t - 0.005).toFixed(3)};${t.toFixed(3)};${Math.min(0.999, t + 0.1).toFixed(3)};1`}
                  />
                </circle>
              </g>
            );
          }),
        )}
    </svg>
  );
}
