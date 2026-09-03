import { CheckIcon, systemIcons } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui-kit";
import { system } from "@/lib/content";

/**
 * "Not a dialer. A sales system." from demo scene 10.
 *
 * Three across on desktop, two-up on tablet, stacked on mobile. Six pillars
 * rather than four since this absorbed the Values section, and six divides
 * evenly by three where it would leave two orphans in a four-column grid.
 *
 * The icons stay small and flat on purpose. This section makes a positioning
 * argument, so the copy has to carry it; the large gradient medallions Values
 * used pulled the eye away from the words.
 */
export function System() {
  return (
    <section id="why" className="grain relative isolate">
      <div className="container-main pt-section-main pb-section-main">
        <div className="flex flex-col gap-5xl">
          <Reveal>
            <SectionHeader
              eyebrow={system.eyebrow}
              title={system.title}
              body={system.body}
            />
          </Reveal>

          <div className="grid grid-cols-1 gap-[var(--site-gutter)] sm:grid-cols-2 lg:grid-cols-3">
            {system.pillars.map((pillar, i) => {
              const Icon = systemIcons[pillar.icon];
              return (
                <Reveal
                  as="article"
                  key={pillar.title}
                  // Staggered by column, not by index, so each row arrives as a
                  // sweep left-to-right instead of a six-beat queue.
                  delay={(i % 3) * 0.08}
                  className="surface-card flex flex-col gap-lg px-xl py-2xl"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-medium bg-primary-500/15">
                    <Icon className="size-[1.375rem] text-primary-300" />
                  </span>
                  <h3 className="heading-h5 text-balance">{pillar.title}</h3>
                  <p className="text-small text-soft-400">{pillar.body}</p>
                </Reveal>
              );
            })}
          </div>

          {/* Proof strip, moved here with the rest of Values. Deliberately the
              last thing in the section: it is the evidence for the pillars
              above, not a claim of its own. */}
          <ul className="flex flex-wrap items-center justify-center gap-lg md:px-16 lg:px-[5.5rem]">
            {system.tags.map((tag) => (
              <li
                key={tag}
                className="flex items-center gap-md rounded-round border border-white/[0.08] bg-white/[0.03] px-lg py-sm"
              >
                <CheckIcon className="size-[1.125rem] shrink-0 text-lime" />
                <span className="text-small text-soft-400">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
