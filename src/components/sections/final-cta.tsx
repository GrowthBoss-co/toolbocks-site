import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui-kit";
import { DEMO_URL, finalCta } from "@/lib/content";

/**
 * The closing band: one card that sits a little way down onto the footer, per
 * Bahaa. It is the same void as the section above and the footer below, so it
 * reads as a raised panel of the same material: a hairline ring, a faint
 * highlight along the top edge, an indigo aura masked so it never meets the
 * card's edge. The section carries the card's overhang as a negative bottom
 * margin; the footer adds the matching room at its top (see SiteFooter).
 */
export const CTA_OVERHANG = "6rem";

export function FinalCta() {
  return (
    <section className="relative z-10 bg-void" style={{ marginBottom: `calc(-1 * ${CTA_OVERHANG})` }}>
      <div className="container-main pt-section-main">
        <Reveal y={32}>
          <div
            className="relative isolate overflow-hidden rounded-[2rem] bg-void px-xl py-5xl text-center ring-1 ring-white/[0.09] sm:px-4xl lg:py-7xl"
            style={{
              boxShadow:
                "inset 0 1px 0 0 rgb(255 255 255 / 0.08), 0 40px 90px -40px rgb(0 0 0 / 0.9)",
            }}
          >
            <div aria-hidden="true" className="aura-field pointer-events-none absolute inset-0 overflow-hidden">
              <div className="aura left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 opacity-70" />
            </div>
            <div className="relative mx-auto flex max-w-[44rem] flex-col items-center gap-xl">
              <h2 className="text-gradient max-w-[18ch] text-balance">{finalCta.title}</h2>
              <p className="text-large max-w-[52ch] text-soft-400">{finalCta.body}</p>
              <Button href={DEMO_URL} variant="primary" className="mt-lg">
                {finalCta.cta}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
