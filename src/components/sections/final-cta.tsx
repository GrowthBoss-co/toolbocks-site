import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui-kit";
import { DEMO_URL, finalCta } from "@/lib/content";

/**
 * The closing band: one cream card, per Bahaa, on the same void as the section
 * above and the footer below, sitting a little way down onto the footer. The
 * section carries the card's overhang as a negative bottom margin; the footer
 * adds the matching room at its top (see SiteFooter). The lime button lives in
 * a `.scheme-dark` island so its label stays dark on cream.
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
                "inset 0 1px 0 0 rgb(255 255 255 / 0.7), 0 40px 90px -40px rgb(0 0 0 / 0.85), 0 0 0 1px rgb(20 21 27 / 0.06)",
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
