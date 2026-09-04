import { CheckIcon, systemIcons } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { system } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * "Not a dialer. A sales system." as a bento, after the Claude Design handoff
 * (Sales System Section.dc.html, option 2a).
 *
 * Six cards on a four-column grid, Compliance and Costs double-wide. Every card
 * has the same anatomy: icon tile and mono tag on top, a small live demo of the
 * mechanism in the middle, the serif title and copy at the base. The demos are
 * pure CSS loops on tiny elements (see the sys-* keyframes) so the grid feels
 * like running software without any of it being scroll-linked.
 *
 * Copy is content.ts, untouched: the handoff shortened a few bodies for its
 * mock and those shortenings are not ours to ship. The one string the design
 * added is the mono tag per card, which lives on each pillar as `tag`.
 *
 * Order follows the design, not content.ts: the wide Compliance card opens the
 * grid and the wide Costs card closes it, with the four singles between.
 */
const ORDER = ["gauge", "playbook", "server", "lock", "shield", "chart"] as const;

const card =
  "group relative flex flex-col gap-lg overflow-hidden rounded-[1.125rem] border border-white/[0.07] p-xl transition-[border-color,transform] duration-300 hover:-translate-y-[3px] hover:border-primary-400/50 md:p-2xl";
const cardBg = {
  backgroundImage: "linear-gradient(180deg, #151620, #10111a)",
} as React.CSSProperties;

function Head({ icon, tag, rings }: { icon: keyof typeof systemIcons; tag: string; rings?: boolean }) {
  const Icon = systemIcons[icon];
  return (
    <div className="flex items-center justify-between">
      <span className="relative size-[38px]">
        {rings ? (
          <>
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-primary-400"
              style={{ animation: "sys-ring 2.6s ease-out infinite" }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-primary-400"
              style={{ animation: "sys-ring 2.6s 1.3s ease-out infinite" }}
            />
          </>
        ) : null}
        <span className="absolute inset-0 grid place-items-center rounded-[11px] bg-primary-500/15 text-primary-300">
          <Icon className="size-[19px]" />
        </span>
      </span>
      <span className="font-mono text-[0.625rem] font-medium uppercase tracking-[0.08em] text-[#6a6b78]">
        {tag}
      </span>
    </div>
  );
}

function Base({ title, body, wide }: { title: string; body: string; wide?: boolean }) {
  return (
    <div>
      <h3 className={cn("text-balance", wide ? "text-[1.625rem] leading-[1.1]" : "heading-h5")}>{title}</h3>
      <p className={cn("mt-1.5 leading-relaxed text-soft-400", wide ? "max-w-[46ch] text-[0.85rem]" : "text-[0.8125rem]")}>
        {body}
      </p>
    </div>
  );
}

const mono = "font-mono text-[0.625rem] text-[#6a6b78]";

/* -- the six demos --------------------------------------------------------- */

function GateDemo() {
  return (
    <div className="flex flex-1 flex-col justify-center gap-2">
      <div className={cn("flex justify-between", mono)}>
        {["6a", "8a", "10a", "12p", "2p", "4p", "6p", "8p", "10p"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      <div className="relative h-9 overflow-hidden rounded-lg bg-white/[0.04]">
        <div className="absolute inset-y-0 left-[22%] right-[22%] border-x border-primary-400 bg-primary-500/15" />
        <div
          className="absolute left-[10%] top-[7px] flex items-center gap-[7px] rounded-md border border-white/[0.12] bg-void px-[9px] py-1 text-[0.65625rem] text-ink"
          style={{ animation: "sys-gate 6s ease-in-out infinite" }}
        >
          <span className="size-1.5 rounded-full bg-gold" style={{ animation: "sys-blink 1.2s infinite" }} />
          +1 (602) · Phoenix
        </div>
      </div>
      <div className="flex items-center gap-3 text-[0.6875rem] text-soft-400">
        <span className="whitespace-nowrap">Pacer ratio</span>
        <span className="h-1 flex-1 overflow-hidden rounded-sm bg-white/[0.06]">
          <span
            className="block h-full rounded-sm bg-gradient-to-r from-primary-600 to-primary-300"
            style={{ animation: "sys-pacer 7s ease-in-out infinite" }}
          />
        </span>
        <span className="whitespace-nowrap font-mono text-[0.65625rem] text-primary-200">abandon &lt; 3%</span>
      </div>
    </div>
  );
}

function TypeDemo() {
  return (
    <div className="flex flex-1 flex-col justify-center gap-[7px]">
      {[
        ["100%", "0s", "bg-primary-400"],
        ["82%", "0.4s", "bg-primary-400"],
        ["64%", "0.8s", "bg-gold opacity-80"],
      ].map(([w, d, color]) => (
        <span key={w} className="block h-1.5 overflow-hidden rounded-[3px] bg-white/[0.07]" style={{ width: w }}>
          <span className={cn("block h-full", color)} style={{ animation: `sys-type 5s ${d} ease-in-out infinite` }} />
        </span>
      ))}
    </div>
  );
}

function InstanceDemo() {
  return (
    <div className="flex flex-1 items-center gap-2">
      <span className="relative h-14 flex-1 rounded-[10px] border border-primary-400/60 bg-primary-500/10">
        <span
          className="absolute right-2 top-2 size-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(242,181,60,0.7)]"
          style={{ animation: "sys-blink 1.6s infinite" }}
        />
        <span className="absolute bottom-[7px] left-2 font-mono text-[0.59375rem] text-primary-200">you</span>
      </span>
      <span className="h-14 flex-1 rounded-[10px] border border-dashed border-white/[0.12]" style={{ animation: "sys-drift 4s ease-in-out infinite" }} />
      <span className="h-14 flex-1 rounded-[10px] border border-dashed border-white/[0.12]" style={{ animation: "sys-drift 4s 1s ease-in-out infinite" }} />
    </div>
  );
}

function LicenceDemo() {
  return (
    <div className="flex flex-1 items-center">
      <span className="flex w-full items-center gap-2 rounded-[10px] border border-primary-400/30 bg-primary-500/[0.06] px-3 py-2.5 font-mono text-[0.65625rem] text-primary-200">
        <CheckIcon className="size-3 shrink-0 text-gold" />
        signed · yourdomain.com
      </span>
    </div>
  );
}

function VaultDemo() {
  return (
    <div className="flex flex-1 items-center">
      <span className="flex w-full items-center justify-between rounded-[10px] border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 font-mono text-[0.6875rem] tracking-[0.12em] text-[#6a6b78]">
        <span>
          ••••••••••••••
          <span className="text-gold" style={{ animation: "sys-blink 1s infinite" }}>
            ▌
          </span>
        </span>
        <span className="text-[0.5625rem] tracking-[0.06em] text-primary-400">AES-256</span>
      </span>
    </div>
  );
}

function CostDemo() {
  return (
    <div className="flex items-stretch gap-2.5 border-white/[0.06] pt-1.5 md:border-l md:pl-7">
      {[
        ["AI", "0s", false],
        ["Calls", "0.5s", false],
        ["SMS", "1s", false],
        ["Return", "1.5s", true],
      ].map(([label, d, gold]) => (
        <div key={label as string} className="flex flex-1 flex-col justify-end gap-2">
          <span
            className={cn(
              "flex-1 origin-bottom rounded-t-md rounded-b-sm",
              gold ? "bg-gradient-to-b from-gold to-[#8a6a1c]" : "bg-gradient-to-b from-primary-400 to-[#3f3fa8]",
            )}
            style={{ animation: `sys-rise 4s ${d} ease-in-out infinite` }}
          />
          <span className={cn("text-center font-mono text-[0.625rem]", gold ? "text-gold" : "text-[#6a6b78]")}>{label}</span>
        </div>
      ))}
    </div>
  );
}

const demos: Record<(typeof ORDER)[number], () => React.ReactElement> = {
  gauge: GateDemo,
  playbook: TypeDemo,
  server: InstanceDemo,
  lock: LicenceDemo,
  shield: VaultDemo,
  chart: CostDemo,
};

/* -------------------------------------------------------------------------- */

export function System() {
  const byIcon = Object.fromEntries(system.pillars.map((p) => [p.icon, p])) as Record<
    (typeof ORDER)[number],
    (typeof system.pillars)[number]
  >;

  // "Not a dialer. A sales system." with the second sentence in the accent.
  const [lead, ...rest] = system.title.split(". ");
  const accent = rest.join(". ");

  return (
    <section id="why" className="grain relative isolate overflow-hidden bg-void">
      <div aria-hidden="true" className="aura-field pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aura left-1/2 top-[-6rem] size-[44rem] -translate-x-1/2 opacity-80" />
      </div>

      <div className="container-main pb-section-main pt-section-main">
        <Reveal className="flex flex-col items-center gap-lg text-center">
          <p className="text-eyebrow inline-flex items-center gap-2">
            <span aria-hidden="true" className="size-[5px] rounded-full bg-gold" />
            {system.eyebrow}
          </p>
          <h2 className="heading-h2 max-w-[30ch] text-balance text-ink">
            {lead}.{" "}
            {accent ? <span className="heading-accent inline-block">{accent}</span> : null}
          </h2>
          <p className="text-large max-w-[56ch] text-soft-400">{system.body}</p>
        </Reveal>

        <div className="mt-6xl grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(17.75rem,auto)]">
          {ORDER.map((key, i) => {
            const p = byIcon[key];
            const Demo = demos[key];
            const wide = key === "gauge" || key === "chart";

            if (key === "chart") {
              return (
                <Reveal
                  as="article"
                  key={p.title}
                  delay={0.05 + i * 0.1}
                  className={cn(card, "md:col-span-2 md:grid md:grid-cols-2 md:gap-7")}
                >
                  <div style={cardBg} aria-hidden="true" className="absolute inset-0 -z-10" />
                  <div className="flex flex-col gap-lg">
                    <Head icon={key} tag={p.tag} />
                    <div className="flex-1" />
                    <Base title={p.title} body={p.body} wide />
                  </div>
                  <Demo />
                </Reveal>
              );
            }

            return (
              <Reveal
                as="article"
                key={p.title}
                delay={0.05 + i * 0.1}
                className={cn(card, wide && "md:col-span-2")}
              >
                <div style={cardBg} aria-hidden="true" className="absolute inset-0 -z-10" />
                <Head icon={key} tag={p.tag} rings={key === "shield"} />
                <Demo />
                <Base title={p.title} body={p.body} wide={wide} />
              </Reveal>
            );
          })}
        </div>

        {/* Proof chips, drifting, with the ends masked off. The evidence for the
            cards above, not a claim of its own. */}
        <div
          className="marquee-viewport relative mt-4xl flex overflow-hidden"
          style={{
            maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          }}
        >
          {[0, 1].map((track) => (
            <ul key={track} aria-hidden={track === 1} className="marquee-track items-center gap-2.5 pr-2.5">
              {system.tags.map((tag) => (
                <li
                  key={tag}
                  className="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-round border border-white/[0.08] bg-white/[0.02] px-4 py-[9px] text-[0.78125rem] text-soft-200"
                >
                  <CheckIcon className="size-3 shrink-0 text-gold" />
                  {tag}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
