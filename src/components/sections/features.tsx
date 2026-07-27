import {
  CadenceVisual,
  LiveCallVisual,
  SupervisorBoardVisual,
} from "@/components/visuals";
import { features } from "@/lib/content";

const cardVisuals = [LiveCallVisual, CadenceVisual];

export function Features() {
  return (
    <section id="platform">
      <div className="container-main pt-section-main pb-section-main">
        <div className="flex flex-col gap-[var(--site-gutter)]">
          {/* Wide split panel: copy left, product visual bleeding off the right */}
          <div className="surface-card grid grid-cols-1 gap-y-3xl overflow-hidden md:grid-cols-2 md:gap-0">
            <div className="flex flex-col items-start justify-center px-2xl py-xl md:px-5xl md:py-0">
              <div className="flex flex-col gap-lg">
                <p className="text-eyebrow">{features.eyebrow}</p>
                <h2 className="text-gradient text-balance">{features.title}</h2>
                <p className="text-soft-400">{features.body}</p>
              </div>
            </div>

            <div className="relative -order-1 overflow-hidden py-[0.875rem] pl-xl md:order-none">
              <SupervisorBoardVisual />
            </div>
          </div>

          {/* Two feature cards, each with its own product visual */}
          <div className="grid grid-cols-1 gap-[var(--site-gutter)] md:grid-cols-2">
            {features.cards.map((card, i) => {
              const Visual = cardVisuals[i];
              return (
                <article key={card.title} className="surface-card flex flex-col">
                  <div className="relative flex h-full items-center justify-center overflow-clip p-lg pt-3xl">
                    <Visual />
                  </div>
                  <div className="flex w-full flex-col gap-lg px-xl pb-xl pt-3xl md:px-5xl md:pb-6xl">
                    <p className="text-eyebrow is-small">{card.eyebrow}</p>
                    <h3>{card.title}</h3>
                    <p className="text-soft-400">{card.body}</p>
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
