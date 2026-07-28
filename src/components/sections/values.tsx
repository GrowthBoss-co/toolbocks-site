import { CheckIcon, valueIcons } from "@/components/icons";
import { SectionHeader } from "@/components/ui-kit";
import { values } from "@/lib/content";

const ICON_GRADIENT =
  "linear-gradient(135deg, var(--n-800), var(--n-900) 58%, var(--n-950))";

export function Values() {
  return (
    <section id="why">
      <div className="container-main pt-section-main pb-section-main">
        <div className="flex flex-col gap-5xl">
          <SectionHeader eyebrow={values.eyebrow} title={values.title} />

          <div className="grid grid-cols-1 gap-xl md:grid-cols-3">
            {values.cards.map((card) => {
              const Icon = valueIcons[card.icon];
              return (
                <article key={card.title} className="surface-card">
                  <div className="mx-auto flex items-start justify-center pb-2xl pt-3xl">
                    <span
                      className="grid place-items-center rounded-round p-xl"
                      style={{ backgroundImage: ICON_GRADIENT }}
                    >
                      <Icon className="size-12 text-primary-500" />
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-[1.25rem] px-lg pb-4xl text-center md:px-2xl">
                    <h3 className="heading-h5">{card.title}</h3>
                    <p className="text-soft-400">{card.body}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-lg md:px-16 lg:px-[5.5rem]">
            {values.tags.map((tag) => (
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
