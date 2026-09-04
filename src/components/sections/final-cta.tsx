import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui-kit";
import { DEMO_URL, finalCta } from "@/lib/content";

/**
 * The closing band: one cream card that sits a little way down onto the
 * footer, per Bahaa. The section itself stays on the void and carries the
 * card's overhang as a negative bottom margin; the footer adds the matching
 * room at its top (see SiteFooter), so the card reads as resting on the seam
 * between the two rather than floating.
 *
 * The button keeps its dark label inside a `.scheme-dark` island, because on
 * cream the `--void` token is cream and the lime pill would otherwise print
 * cream on lime.
 */
export const CTA_OVERHANG = "6rem";

export function FinalCta() {
  return (
    <section className="relative z-10 bg-void" style={{ marginBottom: `calc(-1 * ${CTA_OVERHANG})` }}>
      <div className="container-main pt-section-main">
        <Reveal y={32} className="scheme-cream">
          <div
            className="relative overflow-hidden rounded-[2rem] bg-void px-xl py-5xl text-center sm:px-4xl lg:py-7xl"
            style={{
              boxShadow:
                "0 1px 0 0 rgb(255 255 255 / 0.6) inset, 0 40px 90px -40px rgb(0 0 0 / 0.75), 0 0 0 1px rgb(20 21 27 / 0.06)",
            }}
          >
            <div className="relative mx-auto flex max-w-[44rem] flex-col items-center gap-xl">
              <h2 className="max-w-[18ch] text-balance text-ink">{finalCta.title}</h2>
              <p className="text-large max-w-[52ch] text-soft-400">{finalCta.body}</p>
              <div className="scheme-dark mt-lg">
                <Button href={DEMO_URL} variant="primary">
                  {finalCta.cta}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
