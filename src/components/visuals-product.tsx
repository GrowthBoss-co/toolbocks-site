/**
 * Visuals for the product walkthrough, one per beat of demo scenes 4 to 9.
 *
 * Same approach as `visuals.tsx`: authored as markup rather than screenshots so
 * they stay sharp at any density, restyle with the tokens, and add no image
 * weight. The demo reel used emoji for its icons; these use the SVG set in
 * `icons.tsx` instead. Every visual is decorative, so it is hidden from a11y
 * tools and the surrounding copy carries the meaning.
 *
 * Any figure shown here is a representative sample, not live data. Beats marked
 * `sample` in `content.ts` print a note saying so.
 */

import {
  ChartIcon,
  DocIcon,
  MailIcon,
  RepeatIcon,
  SearchIcon,
} from "@/components/icons";
import { PANEL, Pill } from "@/components/visuals";

/** Shared window chrome. The demo framed several scenes as a browser window. */
function Frame({
  label,
  children,
  badge,
}: {
  label: string;
  children: React.ReactNode;
  badge?: React.ReactNode;
}) {
  return (
    <div className="w-full overflow-hidden rounded-large border border-white/[0.07] bg-surface/90 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] select-none">
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3">
        <span className="flex shrink-0 items-center gap-1.5">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
        </span>
        <span className="truncate text-[0.75rem] text-sub">{label}</span>
        {badge ? <span className="ml-auto shrink-0">{badge}</span> : null}
      </div>
      {children}
    </div>
  );
}

function LiveBadge() {
  return (
    <span className="flex items-center gap-1.5 rounded-round border border-green/40 bg-green/[0.14] px-2.5 py-1 text-[0.625rem] font-bold uppercase leading-none tracking-[0.1em] text-[#5fdd9d]">
      <span className="relative flex size-1.5 items-center justify-center">
        <span className="soft-ping absolute size-1.5 rounded-full bg-[#5fdd9d]" />
        <span className="relative size-1.5 rounded-full bg-[#5fdd9d]" />
      </span>
      Live
    </span>
  );
}

/* ==========================================================================
   Scene 4. Every call, coached in real time.
   ========================================================================= */
export function CoachedCallVisual() {
  const transcript: Array<{ who: "them" | "rep"; line: string }> = [
    { who: "rep", line: "…so you're running the recall list by hand right now?" },
    { who: "them", line: "We already have someone doing that." },
    { who: "rep", line: "Got it. Who owns it when they're off?" },
  ];

  return (
    <div aria-hidden="true" className="w-full max-w-[34rem]">
      <Frame label="Team Dialer" badge={<LiveBadge />}>
        <div className="flex flex-col gap-3 p-4">
          {/* lead intel, auto-pulled before the call connects */}
          <div className={`${PANEL} flex flex-col gap-2 px-3.5 py-3`}>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[0.625rem] font-semibold uppercase leading-none tracking-wide text-primary-300">
                Lead intel
              </span>
              <span className="text-[0.625rem] leading-none text-sub">
                auto-pulled
              </span>
            </div>
            <div className="text-[0.9375rem] font-medium leading-tight text-ink">
              Northgate HVAC
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Pill tone="live">Running Meta ads</Pill>
              <Pill>42 reviews</Pill>
              <Pill tone="warn">No booking link</Pill>
            </div>
          </div>

          {/* transcript */}
          <div className="flex flex-col gap-1.5">
            {transcript.map((t, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-medium px-3 py-2 text-[0.75rem] leading-snug ${
                  t.who === "rep"
                    ? "self-end bg-primary-500/15 text-soft"
                    : "self-start bg-white/[0.05] text-soft-400"
                }`}
              >
                {t.line}
              </div>
            ))}
          </div>

          {/* the coach fires on the objection, mid-sentence */}
          <div className="rounded-medium border border-white/[0.07] border-l-[3px] border-l-lime bg-surface-800/95 px-3.5 py-2.5">
            <div className="flex items-center gap-2">
              <span className="rounded-[5px] bg-lime px-1.5 py-[3px] text-[0.5625rem] font-bold uppercase leading-none tracking-wide text-strong">
                AI Live Coach
              </span>
              <span className="text-[0.625rem] leading-none text-sub">
                objection detected
              </span>
            </div>
            <div className="mt-1.5 text-[0.8125rem] font-medium leading-snug text-soft">
              Ask who covers the recall list on their day off.
            </div>
          </div>
        </div>
      </Frame>
    </div>
  );
}

/* ==========================================================================
   Scene 5. Parallel dialing, several lines at once.
   ========================================================================= */
export function ParallelLinesVisual() {
  const lines: Array<{
    initials: string;
    name: string;
    state: string;
    tone: "neutral" | "live" | "good";
  }> = [
    { initials: "SR", name: "Sofia Reyes", state: "ringing", tone: "neutral" },
    { initials: "DC", name: "Devon Clarke", state: "ringing", tone: "neutral" },
    {
      initials: "MW",
      name: "Marcus Whitfield",
      state: "bridging rep",
      tone: "good",
    },
  ];
  const today = [
    { v: "412", l: "dials" },
    { v: "58", l: "connects" },
    { v: "9", l: "meetings" },
    { v: "2.1%", l: "abandon" },
  ];

  return (
    <div
      aria-hidden="true"
      className="grid w-full max-w-[34rem] grid-cols-1 gap-3 select-none sm:grid-cols-2"
    >
      {/* live lines */}
      <div className={`${PANEL} overflow-hidden`}>
        <div className="border-b border-white/[0.06] px-3.5 py-2.5 text-[0.6875rem] uppercase leading-none tracking-wide text-sub">
          Live lines
        </div>
        <div className="divide-y divide-white/[0.05]">
          {lines.map((l) => (
            <div key={l.initials} className="flex items-center gap-2.5 px-3.5 py-2.5">
              <span
                className={`grid size-7 shrink-0 place-items-center rounded-full text-[0.625rem] font-bold ${
                  l.tone === "good"
                    ? "bg-green/20 text-[#5fdd9d]"
                    : "bg-white/[0.07] text-soft-400"
                }`}
              >
                {l.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.8125rem] leading-tight text-soft">
                  {l.name}
                </span>
                <span className="block truncate text-[0.6875rem] leading-tight text-sub">
                  {l.state}
                </span>
              </span>
              {l.tone === "good" ? (
                <span className="size-1.5 shrink-0 rounded-full bg-[#5fdd9d]" />
              ) : (
                <span className="relative flex size-1.5 shrink-0 items-center justify-center">
                  <span className="soft-ping absolute size-1.5 rounded-full bg-primary-400" />
                  <span className="relative size-1.5 rounded-full bg-primary-400" />
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-white/[0.06] px-3.5 py-2.5">
          <Pill tone="live">AMD screening machines</Pill>
        </div>
      </div>

      {/* today */}
      <div className={`${PANEL} flex flex-col`}>
        <div className="border-b border-white/[0.06] px-3.5 py-2.5 text-[0.6875rem] uppercase leading-none tracking-wide text-sub">
          Today
        </div>
        <div className="grid flex-1 grid-cols-2">
          {today.map((s, i) => (
            <div
              key={s.l}
              className={`px-3.5 py-3 ${i % 2 === 0 ? "border-r" : ""} ${
                i < 2 ? "border-b" : ""
              } border-white/[0.05]`}
            >
              <div className="text-[1.125rem] font-semibold leading-none text-ink">
                {s.v}
              </div>
              <div className="mt-1 text-[0.6875rem] leading-none text-sub">
                {s.l}
              </div>
            </div>
          ))}
        </div>
        {/* Shows the compliance window as state. The prose beside this visual
            explains what happens outside it, so don't restate it here. */}
        <div className="flex items-center justify-between gap-2 border-t border-white/[0.06] px-3.5 py-2.5">
          <span className="text-[0.6875rem] leading-none text-sub">
            Calling window 9:00-20:00
          </span>
          <Pill tone="good">Enforced</Pill>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Scene 6. AI research feeds every touch.
   ========================================================================= */
export function ResearchFlowVisual() {
  const steps = [
    { Icon: SearchIcon, title: "Lead research", body: "Web + ad-library scan" },
    { Icon: RepeatIcon, title: "Cadence", body: "Multi-touch, tag-routed" },
    { Icon: MailIcon, title: "Email & SMS", body: "Personalised, CASL-safe" },
  ];

  return (
    <div
      aria-hidden="true"
      className="flex w-full max-w-[34rem] flex-col items-stretch gap-2 select-none sm:flex-row sm:items-center"
    >
      {steps.map((s, i) => (
        <div key={s.title} className="flex flex-1 items-center gap-2">
          <div
            className={`${PANEL} flex flex-1 flex-col items-center gap-2 px-3 py-4 text-center`}
          >
            <span className="grid size-9 place-items-center rounded-medium bg-primary-500/15">
              <s.Icon className="size-[1.125rem] text-primary-300" />
            </span>
            <span className="text-[0.8125rem] font-medium leading-tight text-ink">
              {s.title}
            </span>
            <span className="text-[0.6875rem] leading-tight text-sub">
              {s.body}
            </span>
          </div>
          {i < steps.length - 1 ? (
            <span
              className="shrink-0 text-sub"
              // Points down when the row stacks on narrow screens.
              style={{ lineHeight: 0 }}
            >
              <svg
                viewBox="0 0 16 16"
                className="size-4 rotate-90 sm:rotate-0"
                fill="none"
              >
                <path
                  d="M3 8h9m0 0L8.6 4.6M12 8l-3.4 3.4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/* ==========================================================================
   Scene 7. A board that writes itself.
   ========================================================================= */
export function PipelineBoardVisual() {
  const columns = [
    {
      head: "New",
      count: "12",
      cards: [{ co: "Brightline Retail", note: "Enrolled", tone: "neutral" as const }],
    },
    {
      head: "Contacted",
      count: "8",
      cards: [{ co: "Halcyon Freight", note: "Connected", tone: "live" as const }],
    },
    {
      head: "Qualified",
      count: "5",
      cards: [{ co: "Northwind Apps", note: "Positive", tone: "live" as const }],
    },
    {
      head: "Meeting",
      count: "3",
      cards: [{ co: "Cedar & Bloom", note: "Booked", tone: "good" as const }],
    },
  ];

  return (
    <div aria-hidden="true" className="w-full max-w-[34rem] select-none">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {columns.map((c) => (
          <div key={c.head} className={`${PANEL} flex flex-col gap-2 p-2.5`}>
            <div className="flex items-baseline justify-between gap-1">
              <span className="truncate text-[0.6875rem] uppercase leading-none tracking-wide text-sub">
                {c.head}
              </span>
              <span className="text-[0.6875rem] leading-none tabular-nums text-soft-400">
                {c.count}
              </span>
            </div>
            {c.cards.map((card) => (
              <div
                key={card.co}
                className="rounded-medium border border-white/[0.06] bg-surface/80 px-2.5 py-2"
              >
                <div className="truncate text-[0.75rem] font-medium leading-tight text-soft">
                  {card.co}
                </div>
                <div className="mt-1.5">
                  <Pill tone={card.tone}>{card.note}</Pill>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* two-way sync footer */}
      <div
        className={`${PANEL} mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 px-3.5 py-2.5`}
      >
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#5fdd9d]" />
          <span className="text-[0.75rem] text-soft-400">GoHighLevel</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-white/25" />
          <span className="text-[0.75rem] text-sub">Salesforce</span>
          <Pill tone="warn">Pilot</Pill>
        </span>
        <span className="ml-auto text-[0.6875rem] text-sub">syncs both ways</span>
      </div>
    </div>
  );
}

/* ==========================================================================
   Scene 8. Branded audits and proposals, one click.
   ========================================================================= */
export function AuditProposalVisual() {
  const cards = [
    {
      Icon: ChartIcon,
      title: "Instant audit",
      body: "Point it at a website and Instagram. It returns a full, on-brand marketing audit, ready to send.",
      meta: "~2 min",
    },
    {
      Icon: DocIcon,
      title: "Package proposal",
      body: "From a discovery-call transcript it writes a package-forward proposal, signed by the rep.",
      meta: "Tier recommended",
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="grid w-full max-w-[34rem] grid-cols-1 gap-3 select-none sm:grid-cols-2"
    >
      {cards.map((c) => (
        <div key={c.title} className={`${PANEL} flex flex-col gap-2.5 p-4`}>
          <span className="grid size-10 place-items-center rounded-medium bg-primary-500/15">
            <c.Icon className="size-5 text-primary-300" />
          </span>
          <span className="text-[0.9375rem] font-medium leading-tight text-ink">
            {c.title}
          </span>
          <span className="text-[0.75rem] leading-snug text-sub">{c.body}</span>
          <span className="mt-auto pt-1">
            <Pill tone="live">{c.meta}</Pill>
          </span>
        </div>
      ))}
    </div>
  );
}

/* ==========================================================================
   Scene 9. Every rep, every dollar, measured.
   ========================================================================= */
export function AnalyticsVisual() {
  const tiles = [
    { v: "14.1%", l: "connect rate" },
    { v: "10-11a", l: "best time to call" },
    { v: "$0.42", l: "AI cost / call" },
  ];
  // Deterministic so server and client render the same bars.
  const hours = [38, 52, 71, 96, 84, 61, 44, 57, 73, 49];
  const mix = [
    { l: "Connected", pct: 46, tone: "bg-gradient-to-r from-primary-600 to-primary-400" },
    { l: "Voicemail", pct: 31, tone: "bg-white/20" },
    { l: "No answer", pct: 23, tone: "bg-white/12" },
  ];

  return (
    <div aria-hidden="true" className="w-full max-w-[34rem] select-none">
      <Frame label="Reports">
        <div className="flex flex-col gap-3 p-4">
          <div className="grid grid-cols-3 gap-2.5">
            {tiles.map((t) => (
              <div key={t.l} className={`${PANEL} px-3 py-2.5`}>
                <div className="text-[1rem] font-semibold leading-none text-ink">
                  {t.v}
                </div>
                <div className="mt-1 text-[0.625rem] leading-tight text-sub">
                  {t.l}
                </div>
              </div>
            ))}
          </div>

          {/* connects by hour */}
          <div className={`${PANEL} px-3.5 py-3`}>
            <div className="text-[0.625rem] uppercase leading-none tracking-wide text-sub">
              Connects by hour
            </div>
            <div className="mt-2.5 flex h-14 items-end gap-1">
              {hours.map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`w-full rounded-[3px] ${
                    h > 80 ? "bg-primary-400" : "bg-primary-500/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* disposition mix */}
          <div className={`${PANEL} flex flex-col gap-2 px-3.5 py-3`}>
            <div className="text-[0.625rem] uppercase leading-none tracking-wide text-sub">
              Disposition mix
            </div>
            {mix.map((m) => (
              <div key={m.l} className="flex items-center gap-2.5">
                <span className="w-[4.5rem] shrink-0 text-[0.6875rem] text-soft-400">
                  {m.l}
                </span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                  <span
                    style={{ width: `${m.pct}%` }}
                    className={`block h-full rounded-full ${m.tone}`}
                  />
                </span>
                <span className="w-8 shrink-0 text-right text-[0.6875rem] tabular-nums text-sub">
                  {m.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    </div>
  );
}

/** Keyed by the `visual` field on each walkthrough step in `content.ts`. */
export const walkthroughVisuals = {
  coachedCall: CoachedCallVisual,
  parallelLines: ParallelLinesVisual,
  researchFlow: ResearchFlowVisual,
  pipelineBoard: PipelineBoardVisual,
  auditProposal: AuditProposalVisual,
  analytics: AnalyticsVisual,
} as const;
