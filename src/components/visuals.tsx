import { cn } from "@/lib/utils";

/* ============================================================================
   Product visuals, built from the ToolBox's own screens.

   Every panel on the site is a faithful crop of a screen that exists in the
   product today, taken from the design-system mockups Paulo generated from the
   app at c41ec86 (29 screens, demo data, no real prospects). They are authored
   as markup rather than dropped in as PNGs so they stay sharp at any density,
   cost no image weight, and can carry a little ambient life.

   They deliberately use the PRODUCT's palette as literal values, not the site's
   tokens: a screenshot of the app should look like the app whatever ground the
   marketing page paints under it, and the walkthrough's cream section remaps
   the site tokens for its own copy. Text is Work Sans standing in for the app's
   Manrope; numbers are mono and tabular, as in the app.

   Every visual is aria-hidden and select-none: the copy beside it carries the
   meaning, the panel is illustration.
   ========================================================================= */

/** The app's palette, set on each visual's root so children can read it. */
export const TB = {
  "--tb-bg": "#0a0a0d",
  "--tb-panel": "#121217",
  "--tb-panel2": "#16161c",
  "--tb-panel3": "#1d1d24",
  "--tb-line": "rgba(255,255,255,0.07)",
  "--tb-line2": "rgba(255,255,255,0.11)",
  "--tb-text": "#f5f5f7",
  "--tb-text2": "#cfcfd6",
  "--tb-muted": "#9a9aa3",
  "--tb-dim": "#6b6b74",
  "--tb-lime": "#c6f24e",
  "--tb-green": "#34d399",
  "--tb-amber": "#e6a84e",
  "--tb-blue": "#7c6cf0",
  "--tb-sky": "#38bdf8",
  "--tb-red": "#ff5a5a",
  "--tb-pink": "#f0708f",
} as React.CSSProperties;

/* -- kit ----------------------------------------------------------------- */

/** Outer window: dark ground, hairline, rounded. Everything else sits inside. */
export function Screen({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      style={TB}
      className={cn(
        "w-full select-none overflow-hidden rounded-large border border-[var(--tb-line)] bg-[var(--tb-bg)] font-sans text-[var(--tb-text)] antialiased",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Page title + one-line description, as every screen opens. */
export function PageHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-[15px] font-bold leading-tight tracking-tight text-[var(--tb-text)]">
        {title}
      </div>
      <div className="text-[10.5px] leading-snug text-[var(--tb-muted)]">{sub}</div>
    </div>
  );
}

/** A panel with the uppercase header strip and optional right-hand meta. */
export function Panel({
  title,
  meta,
  children,
  className,
  bodyClassName,
}: {
  title: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[10px] border border-[var(--tb-line)] bg-[var(--tb-panel)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-[var(--tb-line)] px-3 py-2">
        <span className="text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[var(--tb-text2)]">
          {title}
        </span>
        {meta ? <span className="text-[9.5px] text-[var(--tb-dim)]">{meta}</span> : null}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

/** KPI tile: label, big number, caption. `tone` colours the number. */
export function Kpi({
  label,
  value,
  sub,
  tone = "text",
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "text" | "lime" | "green" | "sky";
}) {
  const color = {
    text: "text-[var(--tb-text)]",
    lime: "text-[var(--tb-lime)]",
    green: "text-[var(--tb-green)]",
    sky: "text-[var(--tb-sky)]",
  }[tone];
  return (
    <div className="flex min-w-0 flex-col gap-1 rounded-[10px] border border-[var(--tb-line)] bg-[var(--tb-panel)] px-3 py-2.5">
      <span className="truncate text-[8.5px] font-semibold uppercase tracking-[0.14em] text-[var(--tb-muted)]">
        {label}
      </span>
      <span className={cn("font-mono text-[19px] font-bold leading-none tracking-tight", color)}>
        {value}
      </span>
      {sub ? (
        <span className="truncate text-[9px] leading-snug text-[var(--tb-dim)]">{sub}</span>
      ) : null}
    </div>
  );
}

const pillTones = {
  green: "bg-[rgba(52,211,153,0.14)] text-[var(--tb-green)]",
  grey: "bg-[rgba(255,255,255,0.07)] text-[var(--tb-muted)]",
  blue: "bg-[rgba(124,108,240,0.18)] text-[#b3a8ff]",
  sky: "bg-[rgba(56,189,248,0.14)] text-[var(--tb-sky)]",
  amber: "bg-[rgba(230,168,78,0.16)] text-[var(--tb-amber)]",
  pink: "bg-[rgba(240,112,143,0.16)] text-[var(--tb-pink)]",
  lime: "bg-[var(--tb-lime)] text-[#0a0a0d]",
} as const;

export type PillTone = keyof typeof pillTones;

/** Status chip, as the app draws outcomes, states and queue counts. */
export function StatusPill({
  children,
  tone = "grey",
  className,
}: {
  children: React.ReactNode;
  tone?: PillTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-[5px] px-1.5 py-[2px] text-[9px] font-semibold leading-none",
        pillTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

const avatarTones = {
  blue: "bg-[rgba(124,108,240,0.3)] text-[#c9c2ff]",
  pink: "bg-[rgba(240,112,143,0.3)] text-[#ffc2d1]",
  sky: "bg-[rgba(56,189,248,0.28)] text-[#a8e4ff]",
  amber: "bg-[rgba(230,168,78,0.3)] text-[#ffd9a6]",
  green: "bg-[rgba(52,211,153,0.28)] text-[#a8f0d4]",
} as const;

export function Avatar({
  initial,
  tone,
}: {
  initial: string;
  tone: keyof typeof avatarTones;
}) {
  return (
    <span
      className={cn(
        "grid size-[18px] shrink-0 place-items-center rounded-full text-[8px] font-bold",
        avatarTones[tone],
      )}
    >
      {initial}
    </span>
  );
}

/** Buttons: lime primary with the app's soft glow, dark secondary. */
export function Btn({
  children,
  primary,
}: {
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-[24px] shrink-0 items-center whitespace-nowrap rounded-[6px] px-2.5 text-[10px] font-semibold",
        primary
          ? "bg-[var(--tb-lime)] text-[#0a0a0d] shadow-[0_0_14px_-2px_rgba(198,242,78,0.45)]"
          : "border border-[var(--tb-line2)] bg-[var(--tb-panel3)] text-[var(--tb-text)]",
      )}
    >
      {children}
    </span>
  );
}

/** Column header row for the app's tables. */
export function Th({
  cols,
  className,
  hide = [],
}: {
  cols: string[];
  className?: string;
  /** Column indices that drop out below sm; the rows must hide the same. */
  hide?: number[];
}) {
  return (
    <div
      className={cn(
        "grid items-center gap-2 border-b border-[var(--tb-line)] px-3 py-1.5 text-[8.5px] font-semibold uppercase tracking-[0.12em] text-[var(--tb-muted)]",
        className,
      )}
    >
      {cols.map((c, i) => (
        <span key={c} className={cn("truncate", hide.includes(i) && "max-sm:hidden")}>
          {c}
        </span>
      ))}
    </div>
  );
}

/** The app's left rail, condensed. Only the wide visuals carry it. */
export function Sidebar({ active }: { active: string }) {
  const groups: Array<[string, string[]]> = [
    ["", ["Today"]],
    ["Pipeline & leads", ["Pipeline", "Lead Gen", "Lead Research"]],
    ["Outreach", ["Cadence", "Nurturer", "Power Dialer", "Team Dialer", "Conversations"]],
    ["Deals & delivery", ["Audit", "Proposal", "Sales Handoff"]],
    ["Insights", ["Team Dashboard", "Productivity", "ROI", "Dialer Reports", "AI Costs"]],
  ];
  return (
    <div className="flex w-[9.5rem] shrink-0 flex-col gap-2.5 border-r border-[var(--tb-line)] bg-[#08080a] px-2.5 py-3">
      <div className="flex items-center gap-1.5 px-1">
        <span className="grid size-5 place-items-center rounded-[6px] bg-[var(--tb-blue)] text-[9px] font-bold text-white shadow-[0_0_10px_rgba(124,108,240,0.6)]">
          G
        </span>
        <span className="flex flex-col leading-none">
          <span className="text-[9.5px] font-bold text-[var(--tb-text)]">Growth Boss</span>
          <span className="text-[6.5px] uppercase tracking-[0.18em] text-[var(--tb-dim)]">
            Toolbox
          </span>
        </span>
      </div>
      {groups.map(([label, items]) => (
        <div key={label || "top"} className="flex flex-col gap-[2px]">
          {label ? (
            <span className="px-1 pb-0.5 pt-1 text-[6.5px] font-semibold uppercase tracking-[0.16em] text-[var(--tb-dim)]">
              {label}
            </span>
          ) : null}
          {items.map((item) => (
            <span
              key={item}
              className={cn(
                "flex items-center gap-1.5 rounded-[6px] px-1.5 py-[3px] text-[8.5px]",
                item === active
                  ? "bg-[rgba(124,108,240,0.18)] font-semibold text-[var(--tb-text)]"
                  : "text-[var(--tb-muted)]",
              )}
            >
              <span
                className={cn(
                  "size-[6px] rounded-[2px]",
                  item === active ? "bg-[var(--tb-blue)]" : "bg-[rgba(255,255,255,0.14)]",
                )}
              />
              {item}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Top bar: search field and the signed-in rep. */
export function Topbar() {
  return (
    <div className="flex items-center justify-between border-b border-[var(--tb-line)] px-4 py-2">
      <span className="w-[42%] rounded-[7px] border border-[var(--tb-line)] bg-[var(--tb-panel)] px-2.5 py-1 text-[9px] text-[var(--tb-dim)]">
        Search leads, companies, numbers...
      </span>
      <span className="flex items-center gap-1.5 text-[10px] text-[var(--tb-text)]">
        <Avatar initial="P" tone="blue" />
        Paulo
      </span>
    </div>
  );
}

/** A pulsing live dot. */
export function LiveDot({ tone = "green" }: { tone?: "green" | "blue" }) {
  const color = tone === "green" ? "bg-[var(--tb-green)]" : "bg-[var(--tb-blue)]";
  return (
    <span className="relative flex size-[7px] items-center justify-center">
      <span className={cn("soft-ping absolute size-[7px] rounded-full", color)} />
      <span className={cn("relative size-[6px] rounded-full", color)} />
    </span>
  );
}

/* ==========================================================================
   1. Live call. Hero stage (right) and the "On the call" band. A crop of the
      Power Dialer screen's ON THE CALL panel.
   ========================================================================= */
export function LiveCallVisual() {
  return (
    <Screen>
      <Panel title="On the call · Northline HVAC">
        <div className="flex flex-col gap-2.5 px-3 py-3">
          <div className="flex items-center gap-1.5 text-[10px] text-[var(--tb-green)]">
            <LiveDot />
            Connected · <span className="font-mono">02:14</span>
          </div>
          <div>
            <div className="text-[12px] font-bold text-[var(--tb-text)]">Dev Patel · Owner</div>
            <div className="text-[9.5px] text-[var(--tb-muted)]">
              +1 (905) 555-0142 · Mississauga, ON · attempt 4
            </div>
          </div>
          <div className="text-[9.5px] leading-snug text-[var(--tb-text2)]">
            <span className="font-bold text-[var(--tb-text)]">Why now: </span>
            no paid ads running, page two for furnace repair, and two seasonal ads that
            came down last winter.
          </div>
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            <Btn primary>Book meeting</Btn>
            <Btn>Not interested</Btn>
            <Btn>Callback</Btn>
            <Btn>Wrong number</Btn>
          </div>
          <div className="text-[8.5px] text-[var(--tb-dim)]">
            Recording on · transcript and summary land on the contact when you hang up.
          </div>
        </div>
      </Panel>
    </Screen>
  );
}

/* ==========================================================================
   2. Cadence. Hero stage (left) and the "After the call" band. The RAMP Q3
      sequence from the Cadence screen.
   ========================================================================= */
const cadenceSteps = [
  { n: 1, title: "Call · pattern interrupt", sub: "Day 1 · 09:00 local", pill: "Sent 214", tone: "grey" },
  { n: 2, title: "Email · the gap you found", sub: "Day 1 · after the call", pill: "Sent 198", tone: "grey" },
  { n: 3, title: "Call · second attempt", sub: "Day 3 · different hour", pill: "Due 18", tone: "blue" },
  { n: 4, title: "SMS · one line, no pitch", sub: "Day 5", pill: "Queued 47", tone: "sky" },
  { n: 5, title: "Email · case study", sub: "Day 7", pill: "Queued 63", tone: "sky" },
  { n: 6, title: "Call · breakup", sub: "Day 10", pill: "Queued 71", tone: "sky" },
] as const;

export function CadenceVisual() {
  return (
    <Screen>
      <Panel title="Ramp Q3 · 6 steps over 10 days" meta="214 enrolled">
        <ul className="divide-y divide-[var(--tb-line)]">
          {cadenceSteps.map((s) => (
            <li key={s.n} className="flex items-center gap-2.5 px-3 py-2">
              <span
                className={cn(
                  "grid size-[18px] shrink-0 place-items-center rounded-full text-[8.5px] font-bold",
                  s.n === 3
                    ? "bg-[var(--tb-blue)] text-white"
                    : "bg-[rgba(124,108,240,0.18)] text-[#c9c2ff]",
                )}
              >
                {s.n}
              </span>
              <span className="flex min-w-0 flex-1 flex-col leading-tight">
                <span className="truncate text-[10.5px] font-semibold text-[var(--tb-text)]">
                  {s.title}
                </span>
                <span className="text-[8.5px] text-[var(--tb-muted)]">{s.sub}</span>
              </span>
              <StatusPill tone={s.tone}>{s.pill}</StatusPill>
            </li>
          ))}
        </ul>
      </Panel>
    </Screen>
  );
}

/* ==========================================================================
   3. Supervisor board. The wide band that bleeds off the right edge: the
      Team Dashboard with the app's rail, KPI row, by-rep table and the
      calls-by-hour chart.
   ========================================================================= */
const reps = [
  { name: "Paulo", tone: "blue", calls: "312", connected: "128 (41%)", thirty: "47 (15%)", talk: "3m 12s", meetings: "6" },
  { name: "Ethiene", tone: "pink", calls: "298", connected: "94 (32%)", thirty: "41 (14%)", talk: "4m 05s", meetings: "5" },
  { name: "Josh", tone: "sky", calls: "341", connected: "112 (33%)", thirty: "52 (15%)", talk: "2m 48s", meetings: "4" },
  { name: "Marina", tone: "amber", calls: "218", connected: "61 (28%)", thirty: "19 (9%)", talk: "1m 52s", meetings: "2" },
  { name: "Dev", tone: "green", calls: "115", connected: "17 (15%)", thirty: "9 (8%)", talk: "—", meetings: "0" },
] as const;

// Calls by hour, 8am to 7pm, as a share of the tallest bar.
const hours = [
  ["8", 8], ["9", 32], ["10", 66], ["11", 88], ["12", 80], ["13", 48],
  ["14", 14], ["15", 64], ["16", 96], ["17", 86], ["18", 52], ["19", 12],
] as const;

export function SupervisorBoardVisual() {
  return (
    <Screen className="w-[62rem] max-w-none rounded-l-[1.25rem] border-r-0">
      <div className="flex">
        <Sidebar active="Team Dashboard" />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <div className="flex flex-col gap-3 px-4 py-3.5">
            <PageHead
              title="Team Dashboard"
              sub="The whole team's day on one page. Dials, who actually picked up, who went past a hello, and what it cost."
            />
            <div className="grid grid-cols-6 gap-2">
              <Kpi label="Calls" value="1,284" />
              <Kpi label="Connected" value="412" sub="32% of calls" />
              <Kpi label="Connects 30s+" value="168" sub="13% of calls" tone="green" />
              <Kpi label="Avg talktime" value="3m 12s" sub="over 168 connects" tone="lime" />
              <Kpi label="Replies" value="63" />
              <Kpi label="Meetings" value="17" tone="lime" />
            </div>
            <Panel title="By rep" meta="5 reps">
              <Th
                cols={["Rep", "Calls", "Connected", "Connects 30s+", "Avg talktime", "Meetings"]}
                className="grid-cols-[1.4fr_0.7fr_1fr_1fr_1fr_0.7fr] [&>*:not(:first-child)]:text-right"
              />
              <ul className="divide-y divide-[var(--tb-line)]">
                {reps.map((r) => (
                  <li
                    key={r.name}
                    className="grid grid-cols-[1.4fr_0.7fr_1fr_1fr_1fr_0.7fr] items-center gap-2 px-3 py-[7px] font-mono text-[10px] text-[var(--tb-text2)] [&>*:not(:first-child)]:text-right"
                  >
                    <span className="flex items-center gap-1.5 font-sans text-[10.5px] text-[var(--tb-text)]">
                      <Avatar initial={r.name[0]} tone={r.tone} />
                      {r.name}
                    </span>
                    <span>{r.calls}</span>
                    <span>{r.connected}</span>
                    <span>{r.thirty}</span>
                    <span>{r.talk}</span>
                    <span>{r.meetings}</span>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel title="Calls by hour" bodyClassName="px-3 pb-2 pt-3">
              <div className="flex h-[72px] items-end gap-1">
                {hours.map(([h, v]) => (
                  <div key={h} className="flex flex-1 flex-col items-center gap-1">
                    <span
                      className="w-full rounded-t-[3px] bg-gradient-to-b from-[#8f7cff] to-[#5b48e6]"
                      style={{ height: `${Math.max(6, v * 0.6)}px` }}
                    />
                    <span className="text-[7.5px] text-[var(--tb-dim)]">{h}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </Screen>
  );
}

/* ==========================================================================
   4. Fairness. The Benefits panel: "Where the day went" from the Productivity
      screen, which is exactly the connects-and-idle-time distribution the
      benefit copy talks about.
   ========================================================================= */
const dayWent = [
  { name: "Paulo", tone: "blue", present: "8h 10m", dialing: "5h 30m", idle: "2h 40m", share: 67, talking: "2h 31m" },
  { name: "Ethiene", tone: "pink", present: "7h 45m", dialing: "5h 42m", idle: "2h 03m", share: 74, talking: "2h 47m" },
  { name: "Josh", tone: "sky", present: "8h 30m", dialing: "5h 35m", idle: "2h 55m", share: 66, talking: "2h 25m" },
  { name: "Marina", tone: "amber", present: "7h 20m", dialing: "4h 58m", idle: "2h 22m", share: 68, talking: "1m 52m" },
] as const;

export function FairnessVisual() {
  return (
    <Screen>
      <div className="flex flex-col gap-2.5 p-3">
        <div className="grid grid-cols-3 gap-2">
          <Kpi label="Dialing time" value="18h 42m" sub="across 5 reps" />
          <Kpi label="Idle" value="6h 11m" sub="online, not dialing" />
          <Kpi label="Avg talktime" value="3m 12s" sub="per connect over 30s" tone="lime" />
        </div>
        <Panel title="Where the day went">
          <Th
            cols={["SDR", "Dialing", "Idle", "Dialing share", "Talking"]}
            className="grid-cols-[1.3fr_0.9fr_0.9fr_1.6fr] sm:grid-cols-[1.3fr_0.9fr_0.9fr_1.6fr_0.9fr]"
            hide={[4]}
          />
          <ul className="divide-y divide-[var(--tb-line)]">
            {dayWent.map((r) => (
              <li
                key={r.name}
                className="grid grid-cols-[1.3fr_0.9fr_0.9fr_1.6fr] items-center gap-2 px-3 py-2 font-mono text-[10px] text-[var(--tb-text2)] sm:grid-cols-[1.3fr_0.9fr_0.9fr_1.6fr_0.9fr]"
              >
                <span className="flex items-center gap-1.5 font-sans text-[10.5px] text-[var(--tb-text)]">
                  <Avatar initial={r.name[0]} tone={r.tone} />
                  {r.name}
                </span>
                <span>{r.dialing}</span>
                <span>{r.idle}</span>
                <span className="flex items-center gap-1.5">
                  <span className="h-[5px] flex-1 overflow-hidden rounded-full bg-[rgba(255,255,255,0.07)]">
                    <span
                      className="block h-full rounded-full bg-gradient-to-r from-[#5b48e6] to-[#8f7cff]"
                      style={{ width: `${r.share}%` }}
                    />
                  </span>
                  <span className="w-[26px] text-right">{r.share}%</span>
                </span>
                <span className="max-sm:hidden">{r.talking}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Screen>
  );
}
