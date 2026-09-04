import Image from "next/image";
import { CharReveal } from "@/components/motion/char-reveal";
import { HeroDashboard, HeroLines } from "@/components/sections/hero-dashboard";
import { Button } from "@/components/ui-kit";
import { DEMO_URL, hero, integrations } from "@/lib/content";

/**
 * Everything above the fold animates in on a CSS timeline, not on scroll or
 * hydration, so the first paint is already the finished hero. The delays below
 * are the running order: eyebrow, headline (which runs its own per-character
 * wave), subtitle, buttons, note.
 */
const RISE = {
  subtitle: "0.5s",
  ctas: "0.62s",
  note: "0.8s",
} as const;

export function Hero() {
  return (
    <section id="top" className="grain relative isolate overflow-hidden">
      {/* Six lines from the top of the page into the dashboard, measured against
          this section (see HeroLines). Behind everything, above the ground. */}
      <HeroLines hostId="top" />
      {/* Ambient light. Two indigo pools low in the frame and a violet one high
          on the right, so the ground is unevenly lit rather than flatly tinted. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="aura left-1/2 top-[-10%] size-[46rem] -translate-x-1/2 opacity-90" />
        <div className="aura is-violet right-[-8%] top-[6%] size-[34rem]" />
        <div className="aura bottom-[-14%] left-[-6%] size-[38rem] opacity-70" />
      </div>

      {/* The ground fades to the section below, so the hero has no visible seam. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-abyss"
      />

      <div className="container-main pt-section-hero">
        <div className="relative z-10 flex flex-col items-center gap-6xl">
          <div className="flex flex-col items-center gap-2xl text-center">
            <p className="text-eyebrow rise-in">{hero.eyebrow}</p>

            <CharReveal
              text={hero.title}
              accentWords={1}
              className="heading-h1 max-w-[19ch] text-ink"
            />

            <p
              className="text-large rise-in max-w-[54ch] text-soft-400"
              style={{ "--rise-delay": RISE.subtitle } as React.CSSProperties}
            >
              {hero.subtitle}
            </p>

            <div
              className="rise-in flex flex-col items-center gap-md"
              style={{ "--rise-delay": RISE.ctas } as React.CSSProperties}
            >
              <div className="flex flex-wrap items-center justify-center gap-lg">
                <Button href={DEMO_URL} variant="primary">
                  {hero.primaryCta}
                </Button>
                <Button href="#platform" variant="dark">
                  {hero.secondaryCta}
                </Button>
              </div>
              <p
                className="text-small rise-in text-sub"
                style={{ "--rise-delay": RISE.note } as React.CSSProperties}
              >
                {hero.note}
              </p>
            </div>
          </div>

          <HeroDashboard />
          {/* The CRMs, where the four numbers used to sit: a very small line and
              the marks in their own colours, no names. The id keeps the nav's
              "Integrations" link resolving. */}
          <div
            id="integrations"
            className="flex w-full flex-col items-center gap-2xl pt-2xl"
          >
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-sub">
              {integrations.heading}
            </p>
            <ul className="grid w-full max-w-[68rem] grid-cols-3 items-center justify-items-center gap-x-6 gap-y-9 sm:grid-cols-4 lg:grid-cols-6 lg:gap-x-10">
              {integrations.brands.map((b) => (
                <li key={b.name} className="flex h-12 items-center justify-center">
                  <Image
                    src={`/logos/crm/${b.file}`}
                    alt={b.name}
                    width={b.w}
                    height={b.h}
                    unoptimized
                    className="w-auto max-w-full transition-opacity duration-300 hover:opacity-100"
                    style={{ height: `${b.size}rem`, opacity: 0.92 }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
