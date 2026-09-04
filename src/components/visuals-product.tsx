import {
  Avatar,
  Btn,
  Kpi,
  LiveDot,
  PageHead,
  Panel,
  Screen,
  StatusPill,
  Th,
} from "@/components/visuals";
import { cn } from "@/lib/utils";

/* ============================================================================
   The six walkthrough panels. Each is a crop of the ToolBox screen the step
   describes, on the same demo data as the product mockups. See visuals.tsx
   for the kit and the reasoning behind the literal palette.
   ========================================================================= */

/* ==========================================================================
   1. The live call, coached. The Power Dialer's ON THE CALL card beside the
      AI Live Coach panel, as the dialer shows them during a connect.
   ========================================================================= */
const plan = [
  ["Opener", "Lead with the leak framing, then dig before you pitch.", "lime"],
  ["Ask", "What happens to a quote request that lands at 6pm on a Friday?", "sky"],
  ["If they push back", "“Not looking”: you already run ads, this just catches what you pay for.", "amber"],
  ["Close", "If you booked 10 more roofs a month, worth a 15-minute look?", "green"],
] as const;

// Deterministic waveform, so server and client render identical bars.
const wave = Array.from({ length: 22 }, (_, i) =>
  Math.round(30 + 60 * Math.abs(Math.sin(i * 1.3) * Math.cos(i * 0.5))),
);

export function CoachedCallVisual() {
  return (
    <Screen>
      <div className="grid grid-cols-1 gap-2.5 p-3 sm:grid-cols-[1.1fr_1fr]">
        <Panel title="On the call · Northline HVAC">
          <div className="flex flex-col gap-2 px-3 py-2.5">
            <div className="flex items-center gap-1.5 text-[10px] text-[var(--tb-green)]">
              <LiveDot />
              Connected · <span className="font-mono">02:14</span>
            </div>
            <div>
              <div className="text-[12px] font-bold text-[var(--tb-text)]">Dev Patel · Owner</div>
              <div className="text-[9px] text-[var(--tb-muted)]">
                +1 (905) 555-0142 · Mississauga, ON
              </div>
            </div>
            <div className="flex h-7 items-center gap-[2px]">
              {wave.map((h, i) => (
                <span
                  key={i}
                  style={
                    {
                      height: `${h}%`,
                      "--wave-delay": `${((i % 6) * 0.11).toFixed(2)}s`,
                    } as React.CSSProperties
                  }
                  className={cn(
                    "wave-bar w-full rounded-full",
                    i < 15 ? "bg-[var(--tb-blue)]" : "bg-[rgba(255,255,255,0.14)]",
                  )}
                />
              ))}
            </div>
            <div className="text-[9px] leading-snug text-[var(--tb-text2)]">
              <span className="font-bold text-[var(--tb-text)]">Why now: </span>
              no paid ads, page two for furnace repair, two seasonal ads that came down.
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Btn primary>Book meeting</Btn>
              <Btn>Callback</Btn>
            </div>
          </div>
        </Panel>

        <Panel
          title="AI Live Coach"
          meta={<StatusPill tone="green">Live</StatusPill>}
        >
          <div className="flex flex-col gap-1.5 px-2.5 py-2.5">
            <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[var(--tb-muted)]">
              Game plan
            </span>
            {plan.map(([k, v, tone]) => (
              <div
                key={k}
                className="rounded-[7px] border border-[var(--tb-line)] bg-[var(--tb-panel2)] px-2 py-1.5"
              >
                <div
                  className={cn("text-[7.5px] font-bold uppercase tracking-[0.12em]", {
                    "text-[var(--tb-lime)]": tone === "lime",
                    "text-[var(--tb-sky)]": tone === "sky",
                    "text-[var(--tb-amber)]": tone === "amber",
                    "text-[var(--tb-green)]": tone === "green",
                  })}
                >
                  {k}
                </div>
                <div className="text-[9px] leading-snug text-[var(--tb-text2)]">{v}</div>
              </div>
            ))}
            <div className="mt-0.5 rounded-[7px] border border-[rgba(198,242,78,0.35)] bg-[rgba(198,242,78,0.06)] px-2 py-1.5">
              <div className="text-[7.5px] font-bold uppercase tracking-[0.12em] text-[var(--tb-lime)]">
                Live tip <span className="font-normal normal-case text-[var(--tb-dim)]">· refined in 1.8s</span>
              </div>
              <div className="text-[9px] leading-snug text-[var(--tb-text)]">
                Dev said <span className="font-semibold">&ldquo;we can&rsquo;t keep up in summer.&rdquo;</span>{" "}
                Mirror it, then anchor on never missing a busy-season lead.
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </Screen>
  );
}

/* ==========================================================================
   2. Parallel dialing. The Team Dialer: lines live, agents and their states.
   ========================================================================= */
const agents = [
  { name: "Paulo", tone: "blue", state: "On a call", pill: "green", calls: "68", connects: "11" },
  { name: "Ethiene", tone: "pink", state: "Ready", pill: "blue", calls: "54", connects: "9" },
  { name: "Josh", tone: "sky", state: "Ready", pill: "blue", calls: "61", connects: "12" },
  { name: "Marina", tone: "amber", state: "Wrap-up", pill: "amber", calls: "47", connects: "5" },
  { name: "Dev", tone: "green", state: "Break", pill: "grey", calls: "22", connects: "3" },
] as const;

export function ParallelLinesVisual() {
  return (
    <Screen>
      <div className="flex flex-col gap-2.5 p-3">
        <PageHead
          title="Team Dialer"
          sub="One shared queue, several reps, no two people dialling the same lead."
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Kpi label="Agents ready" value="4" sub="of 5 online" tone="green" />
          <Kpi label="Lines live" value="9" sub="pacing 2.2x" />
          <Kpi label="Connects" value="37" sub="this session" tone="lime" />
          <Kpi label="Abandon" value="1.4%" sub="under the 3% cap" />
        </div>
        <Panel title="Agents">
          <Th
            cols={["Rep", "State", "Calls", "Connects"]}
            className="grid-cols-[1.3fr_1fr_0.6fr_0.8fr] [&>*:nth-child(n+3)]:text-right"
          />
          <ul className="divide-y divide-[var(--tb-line)]">
            {agents.map((a) => (
              <li
                key={a.name}
                className="grid grid-cols-[1.3fr_1fr_0.6fr_0.8fr] items-center gap-2 px-3 py-[7px] font-mono text-[10px] text-[var(--tb-text2)] [&>*:nth-child(n+3)]:text-right"
              >
                <span className="flex items-center gap-1.5 font-sans text-[10.5px] text-[var(--tb-text)]">
                  <Avatar initial={a.name[0]} tone={a.tone} />
                  {a.name}
                </span>
                <span>
                  <StatusPill tone={a.pill}>{a.state}</StatusPill>
                </span>
                <span>{a.calls}</span>
                <span>{a.connects}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Screen>
  );
}

/* ==========================================================================
   3. Research. One prospect researched before the dial, and the opening line
      written from what was actually found.
   ========================================================================= */
const findings = [
  ["northlinehvac.ca", "WordPress · no lead form above the fold · 3.1s load on mobile", "Opportunity", "amber"],
  ["Google Business Profile", "4.7★ from 61 reviews · last photo 14 months ago", "Claimed", "green"],
  ["Meta Ad Library", "No active ads. Two ads ran last winter, both seasonal.", "Not running", "grey"],
  ["Ranking", "Page 2 for “furnace repair mississauga” · a competitor holds the map pack", "Page 2", "pink"],
] as const;

export function ResearchFlowVisual() {
  return (
    <Screen>
      <div className="flex flex-col gap-2.5 p-3">
        <Panel title="Northline HVAC">
          <ul className="flex flex-col gap-1.5 p-2">
            {findings.map(([k, v, pill, tone]) => (
              <li
                key={k}
                className="flex items-center justify-between gap-3 rounded-[7px] border border-[var(--tb-line)] bg-[var(--tb-panel2)] px-2.5 py-2"
              >
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="text-[10.5px] font-semibold text-[var(--tb-text)]">{k}</span>
                  <span className="truncate text-[8.5px] text-[var(--tb-muted)]">{v}</span>
                </span>
                <StatusPill tone={tone}>{pill}</StatusPill>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel title="Opening line">
          <div className="flex flex-col gap-2 px-3 py-2.5">
            <div className="rounded-[7px] border border-[var(--tb-line)] bg-[var(--tb-panel2)] px-2.5 py-2 text-[9.5px] leading-snug text-[var(--tb-text)]">
              You are running no paid ads and sitting on page two for furnace repair, while a
              competitor holds the map pack. That is the one gap worth 20 minutes.
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Btn primary>Call now</Btn>
              <Btn>Add to cadence</Btn>
              <Btn>Build audit</Btn>
            </div>
          </div>
        </Panel>
      </div>
    </Screen>
  );
}

/* ==========================================================================
   4. Pipeline. The deal board, five stages, written back to the CRM.
   ========================================================================= */
const board = [
  { stage: "New", n: 12, cards: [["Bloom Dental", "$1,499", "Paulo", "2d"], ["Karim Physio", "$999", "Ethiene", "1d"], ["Nordic Sauna Co", "$1,499", "Josh", "3d"]] },
  { stage: "Contacted", n: 9, cards: [["Northline HVAC", "$2,599", "Josh", "5d"], ["Harbour Landscaping", "$1,499", "Paulo", "4d"]] },
  { stage: "Meeting booked", n: 6, cards: [["Salto Kitchen", "$3,595", "Ethiene", "8d"], ["Ridgeway Roofing", "$2,599", "Paulo", "6d"]] },
  { stage: "Proposal sent", n: 4, cards: [["Copper Fox Cafe", "$1,999", "Josh", "11d"], ["Lakeshore Dental", "$3,595", "Ethiene", "9d"]] },
  { stage: "Closed won", n: 3, cards: [["Sid's Ponds", "$3,595", "Paulo", "14d"], ["C.D Landscaping", "$2,599", "Josh", "21d"]] },
] as const;

export function PipelineBoardVisual() {
  return (
    <Screen>
      <div className="flex flex-col gap-2.5 p-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Kpi label="Open deals" value="34" sub="across 5 stages" />
          <Kpi label="Weighted value" value="$48,270" sub="by stage probability" tone="lime" />
          <Kpi label="Booked this month" value="17" sub="meetings from outreach" />
          <Kpi label="Won" value="3" sub="$9,793 MRR added" tone="green" />
        </div>
        <Panel title="Deal board" meta="drag to move a stage" bodyClassName="overflow-hidden p-2">
          <div className="grid grid-cols-[repeat(5,minmax(7.25rem,1fr))] gap-1.5">
            {board.map((col) => (
              <div
                key={col.stage}
                className="flex min-w-0 flex-col gap-1.5 rounded-[7px] border border-[var(--tb-line)] bg-[var(--tb-panel2)] p-1.5"
              >
                <div className="flex items-center justify-between px-0.5 text-[7.5px] font-semibold uppercase tracking-[0.1em] text-[var(--tb-muted)]">
                  <span className="truncate">{col.stage}</span>
                  <span className="font-mono">{col.n}</span>
                </div>
                {col.cards.map(([name, price, rep, age]) => (
                  <div
                    key={name}
                    className="flex flex-col gap-0.5 rounded-[6px] border border-[var(--tb-line)] bg-[var(--tb-panel)] px-1.5 py-1.5"
                  >
                    <span className="truncate text-[9px] font-semibold text-[var(--tb-text)]">{name}</span>
                    <span className="flex items-center gap-1 text-[8px] text-[var(--tb-dim)]">
                      <span className="font-mono text-[var(--tb-lime)]">{price}</span>
                      <span className="truncate">{rep}</span>
                      <span>{age}</span>
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </Screen>
  );
}

/* ==========================================================================
   5. Audits and proposals. The Audit screen: the build form and the branded
      preview it publishes to a link.
   ========================================================================= */
function Field({ label, value, faded }: { label: string; value: string; faded?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] font-semibold text-[var(--tb-text)]">{label}</span>
      <span
        className={cn(
          "rounded-[6px] border border-[var(--tb-line)] bg-[var(--tb-panel2)] px-2 py-1.5 text-[9.5px]",
          faded ? "text-[var(--tb-dim)]" : "text-[var(--tb-text)]",
        )}
      >
        {value}
      </span>
    </div>
  );
}

function Skeleton({ w }: { w: string }) {
  return <span className="block h-[5px] rounded-full bg-[#e6e6ea]" style={{ width: w }} />;
}

export function AuditProposalVisual() {
  return (
    <Screen>
      <div className="grid grid-cols-1 gap-2.5 p-3 sm:grid-cols-[1fr_1.15fr]">
        <Panel title="Build">
          <div className="flex flex-col gap-2 px-2.5 py-2.5">
            <Field label="Company" value="Northline HVAC" />
            <Field label="Website" value="northlinehvac.ca" />
            <Field label="Instagram" value="found automatically" faded />
            <div className="flex gap-1.5 pt-0.5">
              <Btn primary>Generate audit</Btn>
              <Btn>Open past audits</Btn>
            </div>
          </div>
        </Panel>
        <Panel title="Preview">
          <div className="flex flex-col gap-2 px-2.5 py-2.5">
            <div className="flex flex-col gap-2 rounded-[8px] bg-white px-3 py-3 text-[#111]">
              <span className="inline-flex w-fit rounded-[4px] bg-[#111] px-1.5 py-[3px] text-[7px] font-bold uppercase tracking-[0.14em] text-[var(--tb-lime)]">
                Digital audit
              </span>
              <span className="text-[12px] font-bold tracking-tight">Northline HVAC</span>
              <Skeleton w="82%" />
              <Skeleton w="96%" />
              <Skeleton w="60%" />
              <span className="pt-1 text-[9.5px] font-bold">1. No paid coverage in your busiest quarter</span>
              <Skeleton w="96%" />
              <Skeleton w="80%" />
              <span className="pt-1 text-[9.5px] font-bold">2. Page two for your money keyword</span>
              <Skeleton w="82%" />
            </div>
            <div className="flex items-center gap-1.5">
              <StatusPill tone="green">Published</StatusPill>
              <Btn>Open</Btn>
              <Btn>Download</Btn>
            </div>
          </div>
        </Panel>
      </div>
    </Screen>
  );
}

/* ==========================================================================
   6. Analytics per rep. The Productivity screen: attainment against target
      and every rep's own numbers.
   ========================================================================= */
const activity = [
  { name: "Paulo", tone: "blue", calls: "312", target: "104%", rate: "41%", talk: "3m 12s", meetings: "6" },
  { name: "Ethiene", tone: "pink", calls: "298", target: "99%", rate: "32%", talk: "4m 05s", meetings: "5" },
  { name: "Josh", tone: "sky", calls: "341", target: "114%", rate: "33%", talk: "2m 48s", meetings: "4" },
  { name: "Marina", tone: "amber", calls: "218", target: "73%", rate: "28%", talk: "1m 52s", meetings: "2" },
  { name: "Dev", tone: "green", calls: "115", target: "38%", rate: "15%", talk: "—", meetings: "0" },
] as const;

export function AnalyticsVisual() {
  return (
    <Screen>
      <div className="flex flex-col gap-2.5 p-3">
        <PageHead
          title="Productivity"
          sub="Not just how many calls, but how long the dialer was actually running and how much of that was talking."
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Kpi label="Calls" value="1,284" sub="of 1,500 target" />
          <Kpi label="Attainment" value="86%" tone="green" />
          <Kpi label="Dialing time" value="18h 42m" sub="across 5 reps" />
          <Kpi label="Avg talktime" value="3m 12s" sub="per connect over 30s" tone="lime" />
        </div>
        <Panel title="Activity by SDR" meta="5 reps">
          <Th
            cols={["SDR", "Calls", "Of target", "Connect rate", "Avg talktime", "Meetings"]}
            className="grid-cols-[1.3fr_0.7fr_1fr_0.8fr] [&>*:not(:first-child)]:text-right sm:grid-cols-[1.3fr_0.7fr_0.8fr_1fr_1fr_0.8fr]"
            hide={[2, 4]}
          />
          <ul className="divide-y divide-[var(--tb-line)]">
            {activity.map((r) => (
              <li
                key={r.name}
                className="grid grid-cols-[1.3fr_0.7fr_1fr_0.8fr] items-center gap-2 px-3 py-[7px] font-mono text-[10px] text-[var(--tb-text2)] [&>*:not(:first-child)]:text-right sm:grid-cols-[1.3fr_0.7fr_0.8fr_1fr_1fr_0.8fr]"
              >
                <span className="flex items-center gap-1.5 font-sans text-[10.5px] text-[var(--tb-text)]">
                  <Avatar initial={r.name[0]} tone={r.tone} />
                  {r.name}
                </span>
                <span>{r.calls}</span>
                <span className={cn("max-sm:hidden", r.target.startsWith("1") && "text-[var(--tb-green)]")}>{r.target}</span>
                <span>{r.rate}</span>
                <span className="max-sm:hidden">{r.talk}</span>
                <span>{r.meetings}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Screen>
  );
}

/** Keyed by `walkthrough.steps[].visual` in content.ts. */
export const walkthroughVisuals = {
  coachedCall: CoachedCallVisual,
  parallelLines: ParallelLinesVisual,
  researchFlow: ResearchFlowVisual,
  pipelineBoard: PipelineBoardVisual,
  auditProposal: AuditProposalVisual,
  analytics: AnalyticsVisual,
} as const;
