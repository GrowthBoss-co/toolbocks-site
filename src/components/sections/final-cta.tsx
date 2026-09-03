import { SparkleIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui-kit";
import { DEMO_URL, finalCta } from "@/lib/content";

/**
 * The closing band, on the only indigo-cast ground on the page.
 *
 * The oversized marquee is set in the display serif at 12vw — the largest type
 * on the site by a wide margin. It is decoration, not a heading, so it carries
 * no heading tag and the duplicate track is aria-hidden; the actual close is
 * the h2 underneath it.
 */
export function FinalCta() {
  return (
    <section className="grain relative isolate overflow-hidden bg-pressure">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="aura left-1/2 top-full size-[60rem] -translate-x-1/2 -translate-y-1/2 opacity-80" />
      </div>

      <div className="marquee-viewport flex gap-lg overflow-hidden pb-sm pt-section-small">
        {[0, 1].map((k) => (
          <div
            key={k}
            aria-hidden={k === 1}
            className="marquee-track items-center justify-around gap-2xl pr-lg text-ink"
          >
            {[0, 1, 2].map((j) => (
              <span
                key={j}
                className="font-heading flex items-center gap-lg text-[12vw] uppercase leading-none tracking-[-0.02em]"
              >
                {finalCta.marquee}
                <SparkleIcon className="size-6 shrink-0 text-lime md:size-8 lg:size-12" />
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="container-main pb-section-main pt-section-small">
        <Reveal className="flex flex-col items-center gap-xl text-center">
          <h2 className="text-gradient max-w-[18ch] text-balance">
            {finalCta.title}
          </h2>
          <p className="text-large max-w-[52ch] text-soft-400">
            {finalCta.body}
          </p>
          <Button href={DEMO_URL} variant="primary" className="mt-lg">
            {finalCta.cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
