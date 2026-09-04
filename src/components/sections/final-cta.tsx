import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui-kit";
import { DEMO_URL, finalCta } from "@/lib/content";

/**
 * The closing band, on the same void as everything above it. The 12vw
 * marquee that used to run above the heading is gone at Bahaa's call.
 */
export function FinalCta() {
  return (
    <section className="grain relative isolate overflow-hidden bg-void">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="aura left-1/2 top-full size-[60rem] -translate-x-1/2 -translate-y-1/2 opacity-80" />
      </div>

      <div className="container-main pb-section-main pt-section-main">
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
