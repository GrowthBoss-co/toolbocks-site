import Image from "next/image";
import type { ReactNode } from "react";
import type { FeatureVisualKey } from "@/lib/content";

/**
 * One small illustration per feature card, on white.
 *
 * These are derived from the ToolBox's own screens (the 29 design-system
 * mockups at c41ec86), not crops of them: each one takes the single element
 * that explains the feature and redraws it flat, in indigo tints on white, the
 * way the reference section draws its charts in one hue. Real labels where a
 * label carries the meaning (a disposition, a stage, a step), tinted bars
 * where it does not. Demo data throughout; no real prospect appears anywhere.
 *
 * Every visual fills the same box (see `Fig`) so the card grid stays even.
 */

const INK = "#15161b";
const MUTED = "#858a95";
const FAINT = "#f0f0ff";
const TINT = "#e4e3ff";
const MID = "#cbcaff";
const MAIN = "#5c5aff";
const LINE = "#ececf6";

function Fig({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex h-56 w-full flex-col justify-center overflow-hidden text-[0.6875rem] leading-tight ${className}`}
      style={{ color: INK }}
    >
      {children}
    </div>
  );
}

function Tiny({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`font-mono text-[0.5625rem] uppercase tracking-[0.12em] ${className}`}
      style={{ color: MUTED }}
    >
      {children}
    </span>
  );
}

function Chip({
  children,
  tone = "tint",
}: {
  children: ReactNode;
  tone?: "tint" | "main" | "ghost";
}) {
  const s =
    tone === "main"
      ? { background: MAIN, color: "#fff" }
      : tone === "ghost"
        ? { background: "#fff", color: INK, boxShadow: `inset 0 0 0 1px ${LINE}` }
        : { background: TINT, color: "#3f3dcc" };
  return (
    <span
      className="inline-flex h-[1.125rem] shrink-0 items-center rounded-full px-2 text-[0.5625rem] font-semibold"
      style={s}
    >
      {children}
    </span>
  );
}

function Dot({ tone = MAIN, size = 6 }: { tone?: string; size?: number }) {
  return (
    <span
      className="inline-block shrink-0 rounded-full"
      style={{ width: size, height: size, background: tone }}
    />
  );
}

function Avatar({ letter, tone = TINT }: { letter: string; tone?: string }) {
  return (
    <span
      className="grid size-5 shrink-0 place-items-center rounded-full text-[0.5625rem] font-bold"
      style={{ background: tone, color: "#3f3dcc" }}
    >
      {letter}
    </span>
  );
}

function Row({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`flex items-center gap-2 py-[0.4375rem] ${className}`}
      style={{ borderBottom: `1px solid ${LINE}` }}
    >
      {children}
    </div>
  );
}

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[0.625rem] px-3 py-2.5 ${className}`}
      style={{ background: FAINT }}
    >
      {children}
    </div>
  );
}

function Btn({ children, tone = "main" }: { children: ReactNode; tone?: "main" | "ghost" }) {
  return (
    <span
      className="inline-flex h-6 items-center rounded-md px-2.5 text-[0.625rem] font-semibold"
      style={
        tone === "main"
          ? { background: MAIN, color: "#fff" }
          : { background: "#fff", color: INK, boxShadow: `inset 0 0 0 1px ${LINE}` }
      }
    >
      {children}
    </span>
  );
}

function Bar({ w, h = 6, tone = MAIN }: { w: string; h?: number; tone?: string }) {
  return (
    <span
      className="block rounded-full"
      style={{ width: w, height: h, background: tone }}
    />
  );
}

/* ------------------------------------------------------------------ */

function Today() {
  const rows = [
    ["M", "Marina Alves", "Bloom Dental", "Call"],
    ["D", "Dev Patel", "Northline HVAC", "Callback"],
    ["C", "Chloe Renaud", "Salto Kitchen", "Reply"],
    ["T", "Tom Whitfield", "Harbour Landscaping", "Email"],
    ["A", "Aisha Karim", "Karim Physio", "Confirm"],
  ];
  return (
    <Fig>
      <div className="mb-1.5 flex items-center justify-between">
        <Tiny>Your work queue</Tiny>
        <Chip>23 due</Chip>
      </div>
      {rows.map(([l, n, c, w]) => (
        <Row key={n}>
          <Avatar letter={l} />
          <span className="font-medium">{n}</span>
          <span className="truncate" style={{ color: MUTED }}>
            {c}
          </span>
          <span className="ml-auto">
            <Chip tone={w === "Callback" ? "main" : "tint"}>{w}</Chip>
          </span>
        </Row>
      ))}
    </Fig>
  );
}

function Pipeline() {
  const cols: [string, number, number][] = [
    ["New", 12, 3],
    ["Contacted", 8, 2],
    ["Meeting", 5, 2],
    ["Won", 3, 1],
  ];
  return (
    <Fig>
      <div className="grid grid-cols-4 gap-2">
        {cols.map(([name, n, cards], i) => (
          <div key={name} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between">
              <Tiny>{name}</Tiny>
              <span className="text-[0.625rem] font-semibold">{n}</span>
            </div>
            {Array.from({ length: cards }).map((_, j) => (
              <div
                key={j}
                className="flex h-11 flex-col justify-between rounded-md p-1.5"
                style={{
                  background: i === 3 ? MAIN : j === 0 && i === 2 ? MID : TINT,
                }}
              >
                <Bar w="70%" h={4} tone={i === 3 ? "rgba(255,255,255,.8)" : "rgba(92,90,255,.55)"} />
                <Bar w="40%" h={4} tone={i === 3 ? "rgba(255,255,255,.5)" : "rgba(92,90,255,.3)"} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <Dot />
        <Tiny>Stage moves write back to the CRM</Tiny>
      </div>
    </Fig>
  );
}

function LeadGen() {
  const fields: [string, string][] = [
    ["Industry", "Restaurants & Food Service"],
    ["Location", "Toronto · 40km"],
    ["Headcount", "5 to 50"],
  ];
  const hits: [string, string][] = [
    ["Copper Fox Cafe", "No ads"],
    ["Nordic Sauna Co", "New site"],
    ["Ridgeway Roofing", "No ads"],
  ];
  return (
    <Fig>
      <div className="grid grid-cols-[1.1fr_1fr] gap-3">
        <div className="flex flex-col gap-1.5">
          {fields.map(([k, v]) => (
            <div key={k}>
              <Tiny>{k}</Tiny>
              <div
                className="mt-0.5 truncate rounded-md px-2 py-1 text-[0.625rem]"
                style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}
              >
                {v}
              </div>
            </div>
          ))}
          <div className="mt-1">
            <Btn>Preview 214 matches</Btn>
          </div>
        </div>
        <div>
          <div className="mb-1 flex justify-between">
            <Tiny>Matches</Tiny>
            <Tiny>214</Tiny>
          </div>
          {hits.map(([n, s]) => (
            <Row key={n}>
              <span className="truncate text-[0.625rem] font-medium">{n}</span>
              <span className="ml-auto">
                <Chip>{s}</Chip>
              </span>
            </Row>
          ))}
        </div>
      </div>
    </Fig>
  );
}

function LeadResearch() {
  const finds = [
    "No paid ads running, going into the busiest quarter",
    "Page two for furnace repair in Mississauga",
    "Two seasonal ads came down last winter",
  ];
  return (
    <Fig>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold">Northline HVAC</span>
        <Chip>Researched 41s</Chip>
      </div>
      {finds.map((f) => (
        <div key={f} className="flex items-start gap-2 py-1.5">
          <span className="mt-1">
            <Dot />
          </span>
          <span style={{ color: "#3d414b" }}>{f}</span>
        </div>
      ))}
      <Panel className="mt-2">
        <Tiny>Opener</Tiny>
        <p className="mt-1 text-[0.6875rem] leading-snug" style={{ color: INK }}>
          Saw you are on page two for furnace repair right before winter. Worth 20
          minutes?
        </p>
      </Panel>
    </Fig>
  );
}

function Cadence() {
  const steps: [string, string, string][] = [
    ["Call · pattern interrupt", "Day 1", "Sent 214"],
    ["Email · the gap you found", "Day 1", "Sent 198"],
    ["Call · second attempt", "Day 3", "Due 18"],
    ["SMS · one line, no pitch", "Day 5", "Queued 47"],
    ["Email · case study", "Day 7", "Queued 63"],
  ];
  return (
    <Fig>
      <div className="relative">
        <span
          className="absolute bottom-3 left-[0.5625rem] top-3 w-px"
          style={{ background: MID }}
        />
        {steps.map(([t, d, s], i) => (
          <div key={t} className="relative flex items-center gap-3 py-[0.375rem]">
            <span
              className="grid size-[1.125rem] shrink-0 place-items-center rounded-full text-[0.5625rem] font-bold"
              style={{ background: i < 2 ? MAIN : TINT, color: i < 2 ? "#fff" : "#3f3dcc" }}
            >
              {i + 1}
            </span>
            <div className="min-w-0">
              <div className="truncate font-medium">{t}</div>
              <Tiny>{d}</Tiny>
            </div>
            <span className="ml-auto">
              <Chip tone={i < 2 ? "tint" : "ghost"}>{s}</Chip>
            </span>
          </div>
        ))}
      </div>
    </Fig>
  );
}

function Nurturer() {
  const tracks: [string, string, number][] = [
    ["Not now, call in Q4", "one touch every 21 days", 3],
    ["Went dark after a meeting", "one touch every 14 days", 4],
    ["Lost on price", "one touch every 30 days", 2],
  ];
  return (
    <Fig>
      {tracks.map(([t, sub, n], i) => (
        <div key={t} className="py-2">
          <div className="flex items-baseline justify-between">
            <span className="font-semibold">{t}</span>
            <Tiny>{sub}</Tiny>
          </div>
          <div className="relative mt-2 h-4">
            <span
              className="absolute inset-x-0 top-1/2 h-px"
              style={{ background: LINE }}
            />
            {Array.from({ length: n }).map((_, j) => (
              <span
                key={j}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: `${(j / 4) * 100}%` }}
              >
                <Dot tone={j === 0 ? MAIN : MID} size={8} />
              </span>
            ))}
            {i === 1 && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2">
                <Chip tone="main">Re-engaged</Chip>
              </span>
            )}
          </div>
        </div>
      ))}
    </Fig>
  );
}

function SocialSelling() {
  return (
    <Fig>
      <div className="mb-2 flex items-center gap-2">
        <Tiny>Draft · Dev Patel</Tiny>
        <Chip>LinkedIn</Chip>
      </div>
      <Panel>
        <p className="leading-snug">
          Saw your post about turning down three jobs in January because the crew was
          maxed. Curious what you did with the leads you could not take.
        </p>
      </Panel>
      <Tiny className="mt-2 block normal-case tracking-normal">
        Built from their post 4 days ago, not a template.
      </Tiny>
      <div className="mt-3 flex items-center gap-2">
        <Btn>Send DM</Btn>
        <Btn tone="ghost">Rewrite</Btn>
        <span className="ml-auto flex gap-1">
          <Chip tone="ghost">Instagram · Sent</Chip>
        </span>
      </div>
    </Fig>
  );
}

function PowerDialer() {
  const bars = [4, 9, 6, 14, 10, 18, 8, 12, 16, 7, 11, 5, 13, 9, 15, 6, 10, 4];
  return (
    <Fig>
      <div className="flex items-center gap-2">
        <Dot tone="#1fa971" />
        <Tiny className="normal-case tracking-normal">Connected · 02:14</Tiny>
        <span className="ml-auto">
          <Chip>Local presence</Chip>
        </span>
      </div>
      <div className="mt-2 font-semibold">Dev Patel · Owner</div>
      <Tiny className="normal-case tracking-normal">+1 (905) 555-0142 · Mississauga, ON</Tiny>
      <div className="mt-4 flex h-8 items-center gap-[3px]">
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-[5px] rounded-full"
            style={{ height: h * 1.6, background: i < 12 ? MAIN : TINT }}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        <Btn>Book meeting</Btn>
        <Btn tone="ghost">Callback</Btn>
        <Btn tone="ghost">Not interested</Btn>
      </div>
    </Fig>
  );
}

function TeamDialer() {
  const lines: [string, string, number, boolean][] = [
    ["Line 1", "Connected · Paulo", 100, true],
    ["Line 2", "Ringing", 62, false],
    ["Line 3", "Voicemail", 38, false],
    ["Line 4", "Dialing", 18, false],
  ];
  return (
    <Fig>
      <div className="mb-1.5 flex justify-between">
        <Tiny>Shared queue</Tiny>
        <Tiny>4 lines · 61 waiting</Tiny>
      </div>
      {lines.map(([l, s, w, hot]) => (
        <div key={l} className="py-2">
          <div className="flex justify-between">
            <span className="font-medium">{l}</span>
            <span style={{ color: hot ? "#3f3dcc" : MUTED }}>{s}</span>
          </div>
          <div className="relative mt-1.5 h-1.5 rounded-full" style={{ background: FAINT }}>
            <span
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: `${w}%`, background: hot ? MAIN : MID }}
            />
          </div>
        </div>
      ))}
    </Fig>
  );
}

function LiveCoach() {
  return (
    <Fig>
      <div className="flex items-center justify-between">
        <Tiny>Live transcript</Tiny>
        <span className="flex items-center gap-1">
          <Dot tone="#1fa971" />
          <Tiny>Live</Tiny>
        </span>
      </div>
      <p className="mt-2 leading-snug" style={{ color: "#3d414b" }}>
        <span className="font-semibold" style={{ color: INK }}>
          Dev:
        </span>{" "}
        honestly we can&rsquo;t keep up in summer as it is, so I&rsquo;m not sure more leads
        is the problem.
      </p>
      <div
        className="mt-3 rounded-[0.625rem] p-3"
        style={{ background: FAINT, boxShadow: `inset 0 0 0 1px ${MID}` }}
      >
        <div className="flex items-center gap-2">
          <Tiny className="!text-[#3f3dcc]">Live tip</Tiny>
          <Tiny>refined in 1.8s</Tiny>
        </div>
        <p className="mt-1 leading-snug">
          Mirror it: <span className="font-semibold">&ldquo;can&rsquo;t keep up&rdquo;</span>.
          Then anchor on never missing a busy-season lead.
        </p>
      </div>
    </Fig>
  );
}

function EmailBlast() {
  const k: [string, string, number][] = [
    ["Sent", "186", 100],
    ["Opened", "74", 40],
    ["Replied", "12", 7],
    ["Opted out", "3", 2],
  ];
  return (
    <Fig>
      <div
        className="rounded-md px-2 py-1.5 text-[0.625rem]"
        style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}
      >
        <span style={{ color: MUTED }}>To</span> Tag: gta-restaurants-q3 · 214 contacts
      </div>
      <div
        className="mt-1.5 rounded-md px-2 py-1.5 text-[0.625rem]"
        style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}
      >
        <span style={{ color: MUTED }}>Subject</span> Quick question about your winter
        bookings
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {k.map(([l, v, w]) => (
          <div key={l}>
            <Tiny>{l}</Tiny>
            <div className="text-sm font-semibold">{v}</div>
            <div className="mt-1 h-1 rounded-full" style={{ background: FAINT }}>
              <span
                className="block h-full rounded-full"
                style={{ width: `${Math.max(w, 4)}%`, background: MAIN }}
              />
            </div>
          </div>
        ))}
      </div>
      <Tiny className="mt-3 block normal-case tracking-normal">
        Unsubscribe footer appended automatically.
      </Tiny>
    </Fig>
  );
}

function Conversations() {
  const msgs: [string, boolean][] = [
    ["What would this actually cost?", false],
    ["Depends on the track. For what you described, the middle tier.", true],
    ["And how fast do we see anything?", false],
    ["First leads inside 14 days. Thursday at 10?", true],
  ];
  return (
    <Fig>
      <div className="flex flex-col gap-1.5">
        {msgs.map(([m, me]) => (
          <div
            key={m}
            className={`max-w-[82%] rounded-[0.625rem] px-2.5 py-1.5 leading-snug ${me ? "self-end" : "self-start"}`}
            style={me ? { background: MAIN, color: "#fff" } : { background: FAINT }}
          >
            {m}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-1.5">
        <Btn>Send</Btn>
        <Btn tone="ghost">Book meeting</Btn>
        <Btn tone="ghost">Stop cadence</Btn>
      </div>
    </Fig>
  );
}

function Audit() {
  const rows: [string, number][] = [
    ["Website", 71],
    ["Google Business Profile", 84],
    ["Paid ads", 22],
    ["Reviews", 66],
  ];
  return (
    <Fig>
      <div className="mb-2 flex items-center justify-between">
        <span className="font-semibold">Northline HVAC · Digital audit</span>
        <Chip>Branded</Chip>
      </div>
      {rows.map(([l, v]) => (
        <div key={l} className="py-1.5">
          <div className="flex justify-between">
            <span>{l}</span>
            <span className="font-semibold">{v}</span>
          </div>
          <div className="mt-1 h-1.5 rounded-full" style={{ background: FAINT }}>
            <span
              className="block h-full rounded-full"
              style={{ width: `${v}%`, background: v < 40 ? MID : MAIN }}
            />
          </div>
        </div>
      ))}
      <div className="mt-2 flex items-center gap-2">
        <Btn>Publish with booking link</Btn>
      </div>
    </Fig>
  );
}

function Proposal() {
  return (
    <Fig>
      <div className="grid grid-cols-[1fr_1.15fr] gap-3">
        <div className="flex flex-col gap-1.5">
          <Tiny>Inputs</Tiny>
          {["Client · Salto Kitchen", "Track · Advertising", "From the call · 09:41"].map((t) => (
            <div
              key={t}
              className="truncate rounded-md px-2 py-1 text-[0.625rem]"
              style={{ boxShadow: `inset 0 0 0 1px ${LINE}` }}
            >
              {t}
            </div>
          ))}
          <div className="mt-1">
            <Btn>Send for review</Btn>
          </div>
        </div>
        <div className="rounded-[0.5rem] p-3" style={{ background: FAINT }}>
          <div
            className="rounded-[0.375rem] bg-white p-2.5"
            style={{ boxShadow: "0 6px 16px -10px rgba(20,21,27,.35)" }}
          >
            <Bar w="55%" h={5} tone={INK} />
            <div className="mt-2 flex flex-col gap-1">
              <Bar w="100%" h={3} tone={LINE} />
              <Bar w="92%" h={3} tone={LINE} />
              <Bar w="70%" h={3} tone={LINE} />
            </div>
            <div className="mt-2.5 flex justify-between text-[0.5625rem]">
              <span style={{ color: MUTED }}>Advertising Accelerator</span>
              <span className="font-semibold">$3,595/mo</span>
            </div>
            <div className="mt-1 flex justify-between text-[0.5625rem]">
              <span style={{ color: MUTED }}>Term</span>
              <span className="font-semibold">6 months</span>
            </div>
          </div>
        </div>
      </div>
    </Fig>
  );
}

function ProgramStrategy() {
  const m: [string, string][] = [
    ["Prove the channel", "Meta lead ads · 3 creatives · test spend"],
    ["Scale what worked", "Double down on the winning angle · add search"],
    ["Make it repeatable", "Retargeting · email flow on the list built"],
  ];
  return (
    <Fig>
      <div className="flex flex-col gap-2">
        {m.map(([t, s], i) => (
          <div
            key={t}
            className="flex items-center gap-3 rounded-[0.625rem] px-3 py-2"
            style={{ background: i === 0 ? TINT : FAINT }}
          >
            <span
              className="grid size-7 shrink-0 place-items-center rounded-md text-xs font-bold"
              style={{ background: i === 0 ? MAIN : "#fff", color: i === 0 ? "#fff" : "#3f3dcc" }}
            >
              {i + 1}
            </span>
            <div className="min-w-0">
              <div className="font-semibold">Month {i + 1} · {t}</div>
              <div className="truncate" style={{ color: MUTED }}>
                {s}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fig>
  );
}

function SalesHandoff() {
  return (
    <Fig>
      <div className="mb-2 flex items-center gap-2">
        <span className="font-semibold">Salto Kitchen</span>
        <Chip>Outbound · attempt 3</Chip>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Panel>
          <Tiny>What we promised</Tiny>
          <p className="mt-1 leading-snug">
            First leads inside 14 days. Meta first, Google in month 2.
          </p>
        </Panel>
        <Panel>
          <Tiny>What we did not</Tiny>
          <p className="mt-1 leading-snug">
            No website rebuild. No photo shoot in month 1.
          </p>
        </Panel>
      </div>
      <Row className="mt-2">
        <Tiny>Decision maker</Tiny>
        <span className="ml-auto">Chloe Renaud · answers her mobile</span>
      </Row>
      <Row>
        <Tiny>Handed to</Tiny>
        <span className="ml-auto flex items-center gap-1.5">
          <Avatar letter="E" /> Ethiene
        </span>
      </Row>
    </Fig>
  );
}

function BusinessLibrary() {
  const docs: [string, string, string][] = [
    ["Services and pricing", "PDF · 240 KB", "Proposal, Strategy"],
    ["Case studies 2026", "PDF · 1.1 MB", "Audit, Cadence"],
    ["Objection handling", "DOCX · 88 KB", "Coach Playbook"],
  ];
  return (
    <Fig>
      <Tiny>What the AI knows about you</Tiny>
      <div className="mt-1.5">
        {docs.map(([n, meta, used]) => (
          <Row key={n}>
            <span
              className="grid size-6 shrink-0 place-items-center rounded-md"
              style={{ background: TINT }}
            >
              <span className="block h-3 w-2.5 rounded-[2px] bg-white" />
            </span>
            <div className="min-w-0">
              <div className="truncate font-medium">{n}</div>
              <Tiny className="normal-case tracking-normal">
                {meta} · used by {used}
              </Tiny>
            </div>
            <span className="ml-auto">
              <Chip>Indexed</Chip>
            </span>
          </Row>
        ))}
      </div>
      <div className="mt-3">
        <Btn tone="ghost">Upload a document</Btn>
      </div>
    </Fig>
  );
}

function TeamDashboard() {
  const reps: [string, string, string, string, string][] = [
    ["P", "Paulo", "492", "202 (41%)", "9"],
    ["E", "Ethiene", "470", "151 (32%)", "8"],
    ["J", "Josh", "538", "177 (33%)", "6"],
  ];
  const calls = [4, 22, 48, 66, 58, 30, 12, 44, 72, 60, 34, 10];
  const max = Math.max(...calls);
  return (
    <Fig>
      <div className="grid grid-cols-3 gap-2">
        {[
          ["Calls", "2,025", ""],
          ["Connected", "653", "32% of calls"],
          ["Meetings", "26", ""],
        ].map(([l, v, s]) => (
          <div key={l} className="rounded-md px-2 py-1.5" style={{ background: FAINT }}>
            <Tiny>{l}</Tiny>
            <div className="text-sm font-semibold leading-tight">{v}</div>
            {s ? <Tiny className="normal-case tracking-normal">{s}</Tiny> : null}
          </div>
        ))}
      </div>
      <div className="mt-2.5 grid grid-cols-[1fr_2.5rem_4rem_1.5rem] gap-x-2 text-[0.5625rem]" style={{ color: MUTED }}>
        <Tiny>By rep</Tiny>
        <Tiny className="text-right">Calls</Tiny>
        <Tiny className="text-right">Connected</Tiny>
        <Tiny className="text-right">Mtg</Tiny>
      </div>
      {reps.map(([l, n, c, k, m]) => (
        <div
          key={n}
          className="grid grid-cols-[1fr_2.5rem_4rem_1.5rem] items-center gap-x-2 py-[0.3125rem]"
          style={{ borderBottom: `1px solid ${LINE}` }}
        >
          <span className="flex items-center gap-1.5 font-medium">
            <Avatar letter={l} />
            {n}
          </span>
          <span className="text-right font-mono text-[0.625rem]">{c}</span>
          <span className="text-right font-mono text-[0.625rem]">{k}</span>
          <span className="text-right font-mono text-[0.625rem]">{m}</span>
        </div>
      ))}
      <div className="mt-2.5 flex items-end gap-[3px]" style={{ height: 34 }}>
        {calls.map((v, i) => (
          <span
            key={i}
            className="flex-1 rounded-t-[3px]"
            style={{ height: `${(v / max) * 100}%`, background: v === max ? MAIN : v > 40 ? MID : TINT }}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between">
        <Tiny>Calls by hour</Tiny>
        <Tiny>8 to 19</Tiny>
      </div>
    </Fig>
  );
}

function Productivity() {
  const reps = ["Paulo", "Ethiene", "Josh", "Marina", "Dana"];
  const grid = [
    [1, 3, 4, 2, 1, 3, 4, 3, 1],
    [2, 3, 3, 1, 2, 4, 4, 2, 1],
    [1, 2, 4, 3, 1, 2, 3, 4, 2],
    [0, 1, 2, 2, 1, 3, 3, 2, 1],
    [1, 1, 1, 0, 1, 2, 2, 1, 0],
  ];
  const tones = [FAINT, TINT, MID, "#8f8dff", MAIN];
  return (
    <Fig>
      <div className="mb-1.5 flex justify-between">
        <Tiny>Talk time by hour</Tiny>
        <Tiny>last 7 days</Tiny>
      </div>
      <div className="grid grid-cols-[3.25rem_1fr] gap-x-2 gap-y-1">
        {grid.map((row, r) => (
          <div key={reps[r]} className="contents">
            <Tiny className="self-center truncate normal-case tracking-normal">
              {reps[r]}
            </Tiny>
            <div className="grid grid-cols-9 gap-1">
              {row.map((v, c) => (
                <span
                  key={c}
                  className="aspect-square rounded-[3px]"
                  style={{ background: tones[v] }}
                />
              ))}
            </div>
          </div>
        ))}
        <span />
        <div className="grid grid-cols-9 gap-1">
          {[9, 10, 11, 12, 13, 14, 15, 16, 17].map((h) => (
            <Tiny key={h} className="text-center tracking-normal">
              {h}
            </Tiny>
          ))}
        </div>
      </div>
    </Fig>
  );
}

function Roi() {
  return (
    <Fig>
      <div className="flex items-baseline justify-between">
        <div>
          <Tiny>Return on the month</Tiny>
          <div className="text-lg font-semibold">14.2x</div>
        </div>
        <div className="text-right">
          <Tiny>Cost per meeting</Tiny>
          <div className="text-sm font-semibold">$63.20</div>
        </div>
      </div>
      <svg viewBox="0 0 288 110" className="mt-2 w-full">
        <defs>
          <linearGradient id="roiFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={MAIN} stopOpacity="0.22" />
            <stop offset="1" stopColor={MAIN} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[20, 45, 70, 95].map((y) => (
          <line key={y} x1="0" x2="288" y1={y} y2={y} stroke={LINE} />
        ))}
        <path
          d="M0 92 C 30 90, 50 86, 80 82 S 140 74, 170 60 S 230 30, 288 14 V 110 H 0 Z"
          fill="url(#roiFill)"
        />
        <path
          d="M0 92 C 30 90, 50 86, 80 82 S 140 74, 170 60 S 230 30, 288 14"
          fill="none"
          stroke={MAIN}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M0 84 C 60 82, 120 80, 180 79 S 250 78, 288 76"
          fill="none"
          stroke={MID}
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <circle cx="288" cy="14" r="3.5" fill={MAIN} />
      </svg>
      <div className="flex gap-4">
        <span className="flex items-center gap-1.5">
          <Bar w="0.75rem" h={2} tone={MAIN} />
          <Tiny>Return</Tiny>
        </span>
        <span className="flex items-center gap-1.5">
          <Bar w="0.75rem" h={2} tone={MID} />
          <Tiny>Spend</Tiny>
        </span>
      </div>
    </Fig>
  );
}

function CampaignReports() {
  const steps: [string, number][] = [
    ["Call · pattern interrupt", 214],
    ["Email · the gap", 198],
    ["Call · second attempt", 163],
    ["SMS · one line", 121],
    ["Email · case study", 94],
    ["Call · breakup", 71],
  ];
  return (
    <Fig>
      <div className="mb-1.5 flex justify-between">
        <Tiny>Step funnel</Tiny>
        <Tiny>27 replied · 9 booked</Tiny>
      </div>
      <div className="flex flex-col gap-1.5">
        {steps.map(([l, n], i) => (
          <div key={l} className="flex items-center gap-2">
            <span className="w-4 text-right text-[0.5625rem] font-semibold" style={{ color: MUTED }}>
              {i + 1}
            </span>
            <div className="relative h-5 flex-1 rounded-md" style={{ background: FAINT }}>
              <span
                className="absolute inset-y-0 left-0 rounded-md"
                style={{ width: `${(n / 214) * 100}%`, background: i === 0 ? MAIN : MID }}
              />
              <span className="absolute inset-y-0 left-2 flex items-center text-[0.5625rem] font-medium" style={{ color: i === 0 ? "#fff" : INK }}>
                {l}
              </span>
            </div>
            <span className="w-7 text-right text-[0.625rem] font-semibold">{n}</span>
          </div>
        ))}
      </div>
    </Fig>
  );
}

function DialerReports() {
  const rows: [string, string, string, string][] = [
    ["09:41", "Marina Alves", "Connected", "3m 41s"],
    ["09:33", "Tom Whitfield", "Voicemail", "–"],
    ["09:28", "Aisha Karim", "Connected", "0m 22s"],
    ["09:19", "Marcus Bell", "No answer", "–"],
    ["09:11", "Priya Nair", "Connected", "1m 58s"],
  ];
  return (
    <Fig>
      <div className="mb-1 flex justify-between">
        <Tiny>Calls</Tiny>
        <Tiny>1,284 · 97% transcribed</Tiny>
      </div>
      {rows.map(([t, n, o, d]) => (
        <Row key={t}>
          <span className="font-mono text-[0.625rem]" style={{ color: MUTED }}>
            {t}
          </span>
          <span className="truncate font-medium">{n}</span>
          <Chip tone={o === "Connected" ? "tint" : "ghost"}>{o}</Chip>
          <span className="ml-auto font-mono text-[0.625rem]">{d}</span>
          <span
            className="grid h-[1.125rem] w-8 place-items-center rounded-full text-[0.5625rem] font-semibold"
            style={{ background: o === "Connected" ? MAIN : FAINT, color: o === "Connected" ? "#fff" : MUTED }}
          >
            Play
          </span>
        </Row>
      ))}
    </Fig>
  );
}

function AiCosts() {
  const ops: [string, number, string][] = [
    ["Lead research", 100, "$61.40"],
    ["Call summary", 47, "$28.90"],
    ["Transcription", 31, "$19.11"],
    ["Proposal", 30, "$18.20"],
    ["Audit", 18, "$11.30"],
    ["Coach", 5, "$3.27"],
  ];
  return (
    <Fig>
      <div className="mb-2 flex items-baseline justify-between">
        <div>
          <Tiny>This month</Tiny>
          <div className="text-lg font-semibold">$142.18</div>
        </div>
        <Tiny>3,417 requests</Tiny>
      </div>
      {ops.map(([l, w, c]) => (
        <div key={l} className="flex items-center gap-2 py-[0.3125rem]">
          <span className="w-[5.5rem] truncate">{l}</span>
          <div className="h-1.5 flex-1 rounded-full" style={{ background: FAINT }}>
            <span className="block h-full rounded-full" style={{ width: `${w}%`, background: MAIN }} />
          </div>
          <span className="w-12 text-right font-mono text-[0.625rem]">{c}</span>
        </div>
      ))}
    </Fig>
  );
}

function CoachPlaybook() {
  const rows: [string, number, number][] = [
    ["How much is it?", 129, 54],
    ["Send me an email", 96, 62],
    ["We already have an agency", 71, 38],
    ["Not the right time", 63, 41],
  ];
  return (
    <Fig>
      <div className="mb-1.5 flex justify-between">
        <Tiny>What you hear, and what works</Tiny>
        <Tiny>398 calls</Tiny>
      </div>
      {rows.map(([q, n, save]) => (
        <div key={q} className="py-1.5">
          <div className="flex items-center justify-between">
            <span className="font-medium">&ldquo;{q}&rdquo;</span>
            <Chip>{save}% saved</Chip>
          </div>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-1 flex-1 rounded-full" style={{ background: FAINT }}>
              <span className="block h-full rounded-full" style={{ width: `${save}%`, background: MAIN }} />
            </div>
            <Tiny className="tracking-normal">heard {n}x</Tiny>
          </div>
        </div>
      ))}
    </Fig>
  );
}

function UsersRoles() {
  const people: [string, string, string, string][] = [
    ["P", "Paulo", "Manager", "All"],
    ["E", "Ethiene", "Operator", "Dialer · Cadence · Audit"],
    ["J", "Josh", "Operator", "Dialer · Cadence · Lead Gen"],
    ["D", "Dana", "Owner", "Reporting · Business Profile"],
  ];
  return (
    <Fig>
      <div className="mb-1 flex justify-between">
        <Tiny>People</Tiny>
        <Tiny>5 on this instance</Tiny>
      </div>
      {people.map(([l, n, r, m]) => (
        <Row key={n}>
          <Avatar letter={l} tone={r === "Manager" ? MID : TINT} />
          <span className="w-12 font-medium">{n}</span>
          <Chip tone={r === "Manager" ? "main" : "tint"}>{r}</Chip>
          <span className="ml-auto truncate text-right" style={{ color: MUTED }}>
            {m}
          </span>
        </Row>
      ))}
      <div className="mt-3">
        <Btn>Invite someone</Btn>
      </div>
    </Fig>
  );
}

function Integrations() {
  const crm = [
    ["highlevel-dark.png", "HighLevel", 1024, 232, 0.95],
    ["salesforce.svg", "Salesforce", 273, 191, 1.5],
    ["hubspot-dark.svg", "HubSpot", 106, 30, 0.95],
    ["zoho.svg", "Zoho", 1024, 450, 1.05],
  ] as const;
  return (
    <Fig>
      <div className="flex items-center justify-between">
        <Tiny>CRM</Tiny>
        <Chip tone="main">Connected</Chip>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
        {crm.map(([file, name, w, h, size]) => (
          <Image
            key={name}
            src={`/logos/crm/${file}`}
            alt={name}
            width={w}
            height={h}
            unoptimized
            className="w-auto"
            style={{ height: `${size}rem` }}
          />
        ))}
      </div>
      <Row className="mt-3">
        <span className="w-14">
          <Tiny>Calling</Tiny>
        </span>
        <Image src="/logos/crm/twilio.svg" alt="" width={24} height={24} unoptimized className="size-4" />
        <span className="font-medium">Twilio</span>
        <Tiny className="normal-case tracking-normal">4 numbers · local presence</Tiny>
        <span className="ml-auto">
          <Chip tone="main">Connected</Chip>
        </span>
      </Row>
      <Row>
        <span className="w-14">
          <Tiny>AI</Tiny>
        </span>
        <Image src="/logos/crm/anthropic.svg" alt="" width={24} height={24} unoptimized className="size-4" />
        <span className="font-medium">Anthropic</span>
        <Tiny className="normal-case tracking-normal">research, audits, coaching</Tiny>
        <span className="ml-auto">
          <Chip tone="main">Connected</Chip>
        </span>
      </Row>
      <Tiny className="mt-3 block normal-case tracking-normal">
        Credentials are encrypted on this instance and never leave it.
      </Tiny>
    </Fig>
  );
}

export const featureVisuals: Record<FeatureVisualKey, () => ReactNode> = {
  today: Today,
  pipeline: Pipeline,
  leadGen: LeadGen,
  leadResearch: LeadResearch,
  cadence: Cadence,
  nurturer: Nurturer,
  socialSelling: SocialSelling,
  powerDialer: PowerDialer,
  teamDialer: TeamDialer,
  liveCoach: LiveCoach,
  emailBlast: EmailBlast,
  conversations: Conversations,
  audit: Audit,
  proposal: Proposal,
  programStrategy: ProgramStrategy,
  salesHandoff: SalesHandoff,
  businessLibrary: BusinessLibrary,
  teamDashboard: TeamDashboard,
  productivity: Productivity,
  roi: Roi,
  campaignReports: CampaignReports,
  dialerReports: DialerReports,
  aiCosts: AiCosts,
  coachPlaybook: CoachPlaybook,
  usersRoles: UsersRoles,
  integrations: Integrations,
};
