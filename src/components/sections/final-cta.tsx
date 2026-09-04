import { Reveal } from "@/components/motion/reveal";
import { DemoFrame } from "@/components/sections/demo-frame";
import { Button } from "@/components/ui-kit";
import { DEMO_URL, finalCta, hero } from "@/lib/content";

/**
 * The closing band, after the reference Bahaa sent: the same void as the
 * pricing section above, and on it one dark card that straddles the seam with
 * the footer, half on each colour. Copy on the left
 * under a bracketed eyebrow, two buttons, and the Team Dashboard on the right
 * running out past the card's right and bottom edges, clipped by the card. The
 * warm glow in the reference is the wordmark's indigo and magenta here.
 *
 * The section carries the card's overhang as a negative bottom margin and
 * paints the void only down to the seam, so the footer's colour shows through
 * the overhang strip and the card really does sit on two grounds. The footer
 * adds the matching room at its top (see SiteFooter).
 */
export const CTA_OVERHANG = "12rem";

const INTRINSIC = { width: 1440, height: 690 };

export function FinalCta() {
  return (
    <section
      className="relative z-10"
      style={{
        marginBottom: `calc(-1 * ${CTA_OVERHANG})`,
        // The void down to the seam, then nothing: the footer's colour shows
        // through the overhang strip, so the card sits on two grounds.
        backgroundImage: `linear-gradient(to bottom, var(--void) calc(100% - ${CTA_OVERHANG}), transparent calc(100% - ${CTA_OVERHANG}))`,
      }}
    >
      <div className="container-main pt-section-main">
        <Reveal y={32} className="scheme-dark">
          <div
            className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#07070c] text-ink"
            style={{
              boxShadow:
                "0 50px 110px -50px rgb(0 0 0 / 0.7), 0 0 0 1px rgb(255 255 255 / 0.06)",
            }}
          >
            {/* the glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 90% at 38% 70%, rgb(92 90 255 / 0.55), transparent 65%), radial-gradient(ellipse 45% 70% at 62% 15%, rgb(217 70 239 / 0.28), transparent 60%)",
              }}
            />

            <div className="relative grid grid-cols-1 gap-3xl px-xl pb-0 pt-4xl sm:px-3xl lg:min-h-[24rem] lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-4xl lg:px-4xl lg:py-5xl">
              <div className="flex flex-col items-start gap-lg">
                <p className="text-eyebrow">[ {finalCta.eyebrow} ]</p>
                <h2 className="max-w-[16ch] text-balance">{finalCta.title}</h2>
                <p className="text-large max-w-[38ch] text-soft-400">{finalCta.body}</p>
                <div className="mt-md flex flex-wrap items-center gap-md">
                  <Button href={DEMO_URL} variant="primary" size="small">
                    {finalCta.cta}
                  </Button>
                  <Button href="#platform" variant="dark" size="small">
                    {hero.secondaryCta}
                  </Button>
                </div>
              </div>

              {/* The dashboard, bleeding off the card's right and bottom edges.
                  Static below lg: full width under the copy, still clipped at
                  the bottom. */}
              <div className="relative h-[16rem] lg:h-auto">
                <div className="absolute left-0 top-0 w-[115%] overflow-hidden rounded-t-[1rem] ring-1 ring-white/[0.1] lg:left-[6%] lg:top-[3.5rem] lg:w-[118%]">
                  <DemoFrame
                    src="/demo/team-dashboard.html"
                    title="ToolBocks Team Dashboard, running on sample data"
                    intrinsic={INTRINSIC}
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
