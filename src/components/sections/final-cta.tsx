import { SparkleIcon } from "@/components/icons";
import { Button } from "@/components/ui-kit";
import { DEMO_URL, finalCta } from "@/lib/content";

export function FinalCta() {
  return (
    <section>
      {/* Oversized marquee, straight off Orizon's closing band */}
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
                className="flex items-center gap-lg text-[12vw] font-semibold uppercase leading-none"
              >
                {finalCta.marquee}
                <SparkleIcon className="size-6 shrink-0 md:size-8 lg:size-12" />
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="container-main pb-section-main pt-section-small">
        <div className="surface-card flex flex-col items-center gap-xl px-xl py-6xl text-center md:px-6xl">
          <h2 className="text-gradient max-w-[22ch] text-balance">
            {finalCta.title}
          </h2>
          <p className="text-large max-w-[56ch] text-soft-400">{finalCta.body}</p>
          <Button href={DEMO_URL} variant="primary" className="mt-lg">
            {finalCta.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
