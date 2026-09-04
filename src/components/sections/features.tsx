import { DotTrail } from "@/components/motion/dot-trail";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui-kit";
import { CadenceVisual, LiveCallVisual, SupervisorBoardVisual } from "@/components/visuals";
import { features } from "@/lib/content";

/**
 * Chapters, not cards.
 *
 * These used to be three boxes in a grid, which framed two long-form claims and
 * a whole supervisor console as peers of equal weight. As full-bleed bands
 * separated by hairlines, each one gets the viewport to itself and the section
 * reads at the pace it is meant to be read.
 *
 * The panels here are the same LiveCall and Cadence mocks that appear in the
 * hero stage, and that repetition is deliberate: up there they are angled,
 * dimmed and cropped — an establishing shot — and down here they are square-on
 * and legible. The second look is where you are actually meant to read them.
 */
const bandVisuals = [LiveCallVisual, CadenceVisual];

export function Features() {
  return (
    <section id="platform" className="relative isolate bg-void">
      {/* The header sits on a field of dots the cursor draws through (see
          DotTrail). The field is the whole band, not the container, so the path
          can run out to the edges the way it does on the reference. */}
      <div className="relative">
        <DotTrail />
        <div className="container-main relative pb-section-main pt-section-main">
          <Reveal>
            <SectionHeader
              eyebrow={features.eyebrow}
              title={features.title}
              body={features.body}
            />
          </Reveal>
        </div>
      </div>

      {features.cards.map((card, i) => {
        const Visual = bandVisuals[i];
        const flip = i % 2 === 1;

        return (
          <div
            key={card.title}
            className="border-t border-white/[0.07]"
          >
            <div className="container-main py-section-small">
              <Reveal className="grid grid-cols-1 items-center gap-3xl lg:grid-cols-2 lg:gap-7xl">
                <div
                  className={`flex flex-col gap-lg ${flip ? "lg:order-2" : ""}`}
                >
                  <p className="text-eyebrow is-small">{card.eyebrow}</p>
                  <h3 className="heading-h3 max-w-[16ch] text-balance">
                    {card.title}
                  </h3>
                  <p className="text-large max-w-[46ch] text-soft-400">
                    {card.body}
                  </p>
                </div>

                <div
                  className={`flex justify-center ${flip ? "lg:order-1 lg:justify-start" : "lg:justify-end"}`}
                >
                  <div className="lift-lg w-full max-w-[30rem] rounded-large">
                    <Visual />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        );
      })}

      {/* The supervisor board closes the section on the widest view of the
          product: everything above is one rep, this is the whole floor. It
          bleeds off the right edge rather than sitting centred, so the panel
          reads as a window onto something larger than the band. */}
      <div className="border-y border-white/[0.07]">
        <div className="container-main overflow-hidden py-section-small">
          <Reveal
            y={40}
            className="flex justify-center lg:-mr-[var(--site-margin)] lg:justify-end"
          >
            <div className="lift-lg rounded-l-xlarge">
              <SupervisorBoardVisual />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
