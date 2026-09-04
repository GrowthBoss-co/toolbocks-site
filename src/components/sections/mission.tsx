import { Reveal } from "@/components/motion/reveal";
import { ScrollCharReveal } from "@/components/motion/scroll-char-reveal";
import { mission } from "@/lib/content";

/**
 * One statement, nothing else on the ground with it.
 *
 * The stat strip used to live here and now sits under the hero stage, which
 * left this section doing a single job: a held beat between the hero and the
 * product. The quiet is the design — a supporting element would turn the
 * paragraph back into a subhead.
 */
export function Mission() {
  return (
    <section className="grain relative isolate bg-abyss">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="aura left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 opacity-50" />
      </div>

      <div className="container-main pb-section-main pt-section-main">
        <Reveal className="flex flex-col items-center gap-2xl text-center">
          <p className="text-eyebrow">{mission.eyebrow}</p>
          <ScrollCharReveal
            text={mission.text}
            className="heading-h3 max-w-[26ch] text-balance text-ink"
          />
        </Reveal>
      </div>
    </section>
  );
}
