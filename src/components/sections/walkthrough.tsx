import { SectionHeader } from "@/components/ui-kit";
import { walkthroughVisuals } from "@/components/visuals-product";
import { walkthrough } from "@/lib/content";

/**
 * The product walkthrough from the demo reel, as alternating copy/visual rows.
 *
 * Rows alternate side on desktop and always put the visual first on mobile, so
 * a reader scrolling on a phone sees the interface before the paragraph about
 * it. The step number is the only ornament: it carries the "step by step"
 * promise in the section header without needing a connector rail.
 */
export function Walkthrough() {
  return (
    <section id="walkthrough">
      <div className="container-main pt-section-main pb-section-main">
        <div className="flex flex-col gap-6xl">
          <SectionHeader
            eyebrow={walkthrough.eyebrow}
            title={walkthrough.title}
            body={walkthrough.body}
          />

          <div className="flex flex-col gap-[var(--site-gutter)]">
            {walkthrough.steps.map((step, i) => {
              const Visual = walkthroughVisuals[step.visual];
              const flip = i % 2 === 1;

              return (
                <article
                  key={step.title}
                  className="surface-card grid grid-cols-1 items-center gap-y-2xl overflow-hidden px-xl py-2xl md:grid-cols-2 md:gap-x-5xl md:px-5xl md:py-4xl"
                >
                  <div
                    className={`flex flex-col gap-lg ${
                      flip ? "md:order-2" : ""
                    }`}
                  >
                    <div className="flex items-center gap-md">
                      <span className="grid size-7 shrink-0 place-items-center rounded-round bg-primary-500/15 text-[0.75rem] font-semibold tabular-nums text-primary-300">
                        {i + 1}
                      </span>
                      <p className="text-eyebrow is-small">{step.kicker}</p>
                    </div>
                    <h3 className="heading-h4 text-balance">{step.title}</h3>
                    <p className="text-soft-400">{step.body}</p>
                    {step.sample ? (
                      <p className="text-[0.75rem] leading-snug text-sub">
                        {walkthrough.sampleNote}
                      </p>
                    ) : null}
                  </div>

                  <div
                    className={`flex -order-1 justify-center md:order-none ${
                      flip ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    <Visual />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
