import { CheckIcon, systemIcons } from "@/components/icons";
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
    <section id="why">
      <div className="container-main pt-section-main pb-section-main">
        <div className="flex flex-col gap-5xl">
          <SectionHeader
            eyebrow={system.eyebrow}
            title={system.title}
            body={system.body}
          />

          <div className="grid grid-cols-1 gap-[var(--site-gutter)] sm:grid-cols-2 lg:grid-cols-3">
            {system.pillars.map((pillar) => {
              const Icon = systemIcons[pillar.icon];
              return (
                <article
                  key={pillar.title}
                  className="surface-card flex flex-col gap-lg px-xl py-2xl"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-medium bg-primary-500/15">
                    <Icon className="size-[1.375rem] text-primary-300" />
                  </span>
                  <h3 className="heading-h6 text-balance">{pillar.title}</h3>
                  <p className="text-small text-soft-400">{pillar.body}</p>
                </article>
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
                className="surface-card flex items-center gap-md rounded-large px-lg py-sm"
              >
                <CheckIcon className="size-[1.125rem] shrink-0 text-primary-500" />
                <span className="text-small text-soft-400">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
