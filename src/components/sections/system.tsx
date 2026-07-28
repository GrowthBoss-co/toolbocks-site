import { systemIcons } from "@/components/icons";
import { SectionHeader } from "@/components/ui-kit";
import { system } from "@/lib/content";

/**
 * "Not a dialer. A sales system." from demo scene 10.
 *
 * Four across on desktop, two-up on tablet, stacked on mobile. Deliberately
 * flatter than the `Values` cards below it: this section makes a positioning
 * argument, so the copy carries it and the icons stay small rather than sitting
 * in the large gradient medallions Values uses.
 */
export function System() {
  return (
    <section id="system">
      <div className="container-main pt-section-main pb-section-main">
        <div className="flex flex-col gap-5xl">
          <SectionHeader
            eyebrow={system.eyebrow}
            title={system.title}
            body={system.body}
          />

          <div className="grid grid-cols-1 gap-[var(--site-gutter)] sm:grid-cols-2 lg:grid-cols-4">
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
        </div>
      </div>
    </section>
  );
}
