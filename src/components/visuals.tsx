/**
 * ToolBocks product visuals.
 *
 * Orizon fills these slots with flat .webp screenshots. We build ours as markup
 * instead: they stay sharp at any density, restyle with the design tokens, and
 * add no image weight. Every one is decorative, so it is hidden from a11y tools
 * and the surrounding copy carries the meaning.
 */

const PANEL =
  "rounded-large border border-white/[0.07] bg-surface-800/70 backdrop-blur-[2px]";

function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "live" | "good" | "warn";
}) {
  const tones = {
    neutral: "bg-white/[0.06] text-soft-400",
    live: "bg-primary-500/15 text-primary-300",
    good: "bg-green/15 text-[#5fdd9d]",
    warn: "bg-warning/15 text-[#f0c45f]",
  } as const;
  return (
    <span
      className={`shrink-0 rounded-[6px] px-2 py-[3px] text-[0.6875rem] font-medium leading-tight ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/* ==========================================================================
   1. Team dialer / supervisor board. Fills the wide slot in the features grid.
   ========================================================================= */
export function SupervisorBoardVisual() {
  const tabs = [
    "Pipeline",
    "Cadence",
    "Team Dialer",
    "Lead Research",
    "AI Audit",
    "Reports",
  ];
  const rows: Array<{
    name: string;
    city: string;
    label: string;
    tone: "neutral" | "live" | "good" | "warn";
  }> = [
    { name: "Riverside Dental", city: "Oakville", label: "Meeting booked", tone: "good" },
    { name: "Northgate HVAC", city: "Toronto", label: "Connected 4:12", tone: "live" },
    { name: "Lakeshore Physio", city: "Burlington", label: "Cadence 3/7", tone: "neutral" },
    { name: "Maple Logistics", city: "Mississauga", label: "Queued", tone: "neutral" },
    { name: "Bayview Roofing", city: "Vaughan", label: "Voicemail", tone: "warn" },
  ];

  return (
    <div
      aria-hidden="true"
      className="min-w-[26rem] overflow-hidden rounded-l-[1.25rem] border-y border-l border-white/[0.07] bg-surface/90 select-none md:min-w-[34rem]"
    >
      {/* tab strip */}
      <div className="flex items-center gap-1 overflow-hidden border-b border-white/[0.06] px-4 py-3">
        {tabs.map((t) => (
          <span
            key={t}
            className={`whitespace-nowrap rounded-[6px] px-2.5 py-1.5 text-[0.75rem] leading-none ${
              t === "Team Dialer"
                ? "bg-primary-500/16 text-primary-200"
                : "text-sub"
            }`}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-3 p-4">
        {/* stat tiles */}
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { v: "1,928", l: "calls · 90 days", lit: true },
            { v: "2.1%", l: "abandon rate", lit: false },
            { v: "38", l: "meetings booked", lit: false },
          ].map((s) => (
            <div
              key={s.l}
              className={`${PANEL} px-3 py-2.5 ${
                s.lit ? "ring-1 ring-inset ring-primary-500/30" : ""
              }`}
            >
              <div className="text-[1.0625rem] font-semibold leading-none text-ink">
                {s.v}
              </div>
              <div className="mt-1 text-[0.6875rem] leading-none text-sub">{s.l}</div>
            </div>
          ))}
        </div>

        {/* queue rows */}
        <div className={`${PANEL} divide-y divide-white/[0.05]`}>
          {rows.map((r) => (
            <div key={r.name} className="flex items-center gap-3 px-3 py-2.5">
              <span
                className={`size-1.5 shrink-0 rounded-full ${
                  r.tone === "live"
                    ? "bg-primary-400"
                    : r.tone === "good"
                      ? "bg-green"
                      : "bg-white/20"
                }`}
              />
              <span className="truncate text-[0.8125rem] text-soft">{r.name}</span>
              <span className="truncate text-[0.75rem] text-sub">{r.city}</span>
              <span className="ml-auto">
                <Pill tone={r.tone}>{r.label}</Pill>
              </span>
            </div>
          ))}
        </div>

        {/* live coach strip */}
        <div className={`${PANEL} flex items-center gap-2.5 px-3 py-2.5`}>
          <span className="rounded-[6px] bg-lime px-1.5 py-[3px] text-[0.625rem] font-bold uppercase leading-none tracking-wide text-strong">
            Coach
          </span>
          <span className="truncate text-[0.8125rem] text-soft">
            Ask about their no-show rate
          </span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   2. Live call with coaching. Left feature card.
   ========================================================================= */
export function LiveCallVisual() {
  // Deterministic pseudo-waveform so server and client render identically.
  const bars = Array.from({ length: 34 }, (_, i) =>
    Math.round(22 + 30 * Math.abs(Math.sin(i * 1.15) * Math.cos(i * 0.42))),
  );

  return (
    <div
      aria-hidden="true"
      className="w-full max-w-[22rem] overflow-hidden rounded-large border border-white/[0.07] bg-surface/90 select-none"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2 items-center justify-center">
            <span className="absolute size-2 rounded-full bg-primary-400/60" />
            <span className="size-1.5 rounded-full bg-primary-400" />
          </span>
          <span className="text-[0.75rem] text-soft-400">On call</span>
        </div>
        <span className="font-medium tabular-nums text-[0.8125rem] text-ink">
          04:12
        </span>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div>
          <div className="text-[0.9375rem] font-medium leading-tight text-ink">
            Northgate HVAC
          </div>
          <div className="mt-0.5 text-[0.75rem] text-sub">
            Dave Kelly · Operations Manager
          </div>
        </div>

        {/* waveform */}
        <div className="flex h-12 items-center gap-[2px]">
          {bars.map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className={`w-full rounded-full ${
                i < 24 ? "bg-primary-500/70" : "bg-white/12"
              }`}
            />
          ))}
        </div>

        <div className={`${PANEL} px-3 py-2.5`}>
          <div className="text-[0.625rem] font-semibold uppercase leading-none tracking-wide text-primary-300">
            Objection detected
          </div>
          <div className="mt-1.5 text-[0.8125rem] leading-snug text-soft">
            &ldquo;We already have someone&rdquo; · ask who handles their
            recall list
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Pill tone="live">Pacer 1.4</Pill>
          <Pill tone="good">Abandon 2.1%</Pill>
          <Pill>Recording</Pill>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   3. Cadence builder. Right feature card.
   ========================================================================= */
export function CadenceVisual() {
  const steps: Array<{
    day: string;
    channel: string;
    angle: string;
    state: "done" | "active" | "queued";
  }> = [
    { day: "Day 1", channel: "Email", angle: "Pattern Interrupt", state: "done" },
    { day: "Day 2", channel: "Call", angle: "Direct dial", state: "done" },
    { day: "Day 4", channel: "SMS", angle: "Value Stack", state: "active" },
    { day: "Day 7", channel: "Email", angle: "Social Proof", state: "queued" },
    { day: "Day 14", channel: "Email", angle: "Breakup", state: "queued" },
  ];

  return (
    <div
      aria-hidden="true"
      className="w-full max-w-[22rem] overflow-hidden rounded-large border border-white/[0.07] bg-surface/90 select-none"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <span className="text-[0.8125rem] font-medium text-ink">
          Dental · Q3 outbound
        </span>
        <Pill tone="live">Running</Pill>
      </div>

      <div className="relative flex flex-col gap-0 p-4">
        {/* connector rail */}
        <span className="absolute left-[1.6875rem] top-6 bottom-6 w-px bg-white/[0.08]" />

        {steps.map((s) => (
          <div key={s.day} className="relative flex items-center gap-3 py-2">
            <span
              className={`z-10 grid size-6 shrink-0 place-items-center rounded-full border text-[0.5625rem] font-bold ${
                s.state === "done"
                  ? "border-transparent bg-primary-500 text-white"
                  : s.state === "active"
                    ? "border-lime bg-strong text-lime"
                    : "border-white/12 bg-strong text-sub"
              }`}
            >
              {s.channel.slice(0, 1)}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-[0.8125rem] text-soft">{s.channel}</span>
                <span className="text-[0.6875rem] text-sub">{s.day}</span>
              </div>
              <div className="truncate text-[0.6875rem] text-sub">{s.angle}</div>
            </div>
            {s.state === "active" ? <Pill tone="warn">Sends 9:00</Pill> : null}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-3">
        <span className="text-[0.6875rem] text-sub">142 enrolled</span>
        <span className="text-[0.6875rem] text-sub">
          Local time gate <span className="text-[#5fdd9d]">on</span>
        </span>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. Fairness dashboard. Benefits section visual.
   ========================================================================= */
export function FairnessVisual() {
  const reps = [
    { name: "Ethiene", connects: 42, pct: 100 },
    { name: "Joshua", connects: 39, pct: 93 },
    { name: "Paulo", connects: 37, pct: 88 },
    { name: "Gabriel", connects: 35, pct: 83 },
  ];

  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden rounded-xlarge border border-white/[0.07] bg-surface/90 select-none"
    >
      <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
        <div>
          <div className="text-[0.9375rem] font-medium text-ink">
            Fairness dashboard
          </div>
          <div className="mt-0.5 text-[0.75rem] text-sub">
            Connects distributed today
          </div>
        </div>
        <Pill tone="good">Even spread</Pill>
      </div>

      <div className="flex flex-col gap-3.5 px-5 py-5">
        {reps.map((r) => (
          <div key={r.name} className="flex items-center gap-3">
            <span className="w-16 shrink-0 text-[0.8125rem] text-soft-400">
              {r.name}
            </span>
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
              <span
                style={{ width: `${r.pct}%` }}
                className="block h-full rounded-full bg-gradient-to-r from-primary-600 to-primary-400"
              />
            </span>
            <span className="w-7 shrink-0 text-right text-[0.75rem] tabular-nums text-sub">
              {r.connects}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 divide-x divide-white/[0.06] border-t border-white/[0.06]">
        {[
          { v: "2.1%", l: "abandon" },
          { v: "1.4", l: "pacer" },
          { v: "0", l: "DNC hits" },
        ].map((s) => (
          <div key={s.l} className="px-4 py-3.5">
            <div className="text-[0.9375rem] font-semibold leading-none text-ink">
              {s.v}
            </div>
            <div className="mt-1 text-[0.6875rem] leading-none text-sub">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
