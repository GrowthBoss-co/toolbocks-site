import Image from "next/image";
import { Button } from "@/components/ui-kit";
import { DEMO_URL, hero } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="top"
      className="relative max-h-[64rem] overflow-hidden rounded-b-[2.5rem]"
    >
      {/* Orizon's three-part hero glow, rebuilt on the ToolBocks indigo ramp. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-x-0 bottom-[10%] min-h-[50%] w-full blur-[100px] max-lg:bottom-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgb(92 90 255 / 0.30), var(--p-600) 50%, rgb(92 90 255 / 0.30))",
            mixBlendMode: "plus-lighter",
          }}
        />
        <div
          className="absolute inset-0 size-full opacity-80"
          style={{
            backgroundImage:
              "radial-gradient(circle farthest-corner at 0% 100%, var(--p-700), transparent 34%)",
          }}
        />
        <div
          className="absolute inset-0 size-full opacity-80"
          style={{
            backgroundImage:
              "radial-gradient(circle farthest-corner at 100% 100%, var(--p-700), transparent 34%)",
          }}
        />
      </div>

      <div className="container-main pt-section-hero">
        <div className="section-layout">
          <div className="flex flex-col items-center gap-2xl">
            <div className="flex flex-col items-center gap-xl">
              <p className="text-eyebrow">{hero.eyebrow}</p>
              <div className="flex flex-col items-center gap-xl text-center">
                <h1 className="heading-h1 text-gradient max-w-[22ch] text-balance">
                  {hero.title}
                </h1>
                <p className="text-large max-w-[56ch] text-soft-200">
                  {hero.subtitle}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-md">
              <div className="flex flex-wrap items-center justify-center gap-lg">
                <Button href={DEMO_URL} variant="primary">
                  {hero.primaryCta}
                </Button>
                <Button href="#platform" variant="dark">
                  {hero.secondaryCta}
                </Button>
              </div>
              <p className="text-small text-soft">{hero.note}</p>
            </div>
          </div>

          {/* Product screenshot, ringed and faded into the page like Orizon's */}
          <div className="relative rounded-t-[1.5rem] shadow-[0_0_0_10px_rgb(255_255_255/0.08)]">
            <Image
              className="block h-auto w-full rounded-t-[1.5rem]"
              src="/assets/hero-team-dashboard.png"
              alt="The ToolBocks team dashboard: calls, connect rate, answer rate and AI cost across the team, with per-rep connect distribution, disposition mix and a best-time-to-call heatmap."
              width={1915}
              height={911}
              sizes="(min-width: 1264px) 1200px, 100vw"
              priority
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(14 18 27 / 0) 20%, rgb(14 18 27 / 0.6) 70%, rgb(14 18 27))",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
