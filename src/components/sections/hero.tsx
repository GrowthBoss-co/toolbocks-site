import { CharReveal } from "@/components/motion/char-reveal";
import { HeroStage } from "@/components/sections/hero-stage";
import { Button } from "@/components/ui-kit";
import { DEMO_URL, hero, stats } from "@/lib/content";

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
        <div className="flex flex-col items-center gap-6xl">
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

          <HeroStage />

          {/* Durable figures, not live measurements. Sits under the stage so the
              first scroll lands on evidence rather than another claim. */}
          <dl className="grid w-full grid-cols-2 border-t border-white/[0.08] lg:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col gap-sm border-white/[0.08] px-lg py-2xl text-center ${
                  i % 2 === 1 ? "border-l" : ""
                } ${i > 1 ? "border-t" : ""} lg:border-t-0 lg:[&:not(:first-child)]:border-l`}
              >
                <dt className="heading-h4 order-1 text-ink">{s.value}</dt>
                <dd className="text-small order-2 text-sub">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
