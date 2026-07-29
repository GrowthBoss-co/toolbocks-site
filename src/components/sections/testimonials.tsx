import { StarIcon } from "@/components/icons";
import { SectionHeader } from "@/components/ui-kit";
import { testimonials } from "@/lib/content";

/**
 * Orizon uses a Webflow slider here. This is a scroll-snap rail instead: same
 * peek-the-next-card look, no slider library, and it stays keyboard and
 * touch friendly.
 */
export function Testimonials() {
  return (
    <section className="relative">
      <div className="container-main pt-section-main pb-section-main">
        <div className="section-layout">
          <SectionHeader
            eyebrow={testimonials.eyebrow}
            title={testimonials.title}
          />

          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[8%] bg-gradient-to-r from-strong to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[8%] bg-gradient-to-l from-strong to-transparent"
            />

            <ul className="flex snap-x snap-mandatory gap-xl overflow-x-auto pb-lg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {testimonials.items.map((t, i) => (
                <li
                  key={i}
                  className="w-[85%] shrink-0 snap-start sm:w-[52%] lg:w-[32%]"
                >
                  <figure className="surface-card flex h-[26rem] flex-col justify-between p-3xl">
                    <div className="flex flex-col gap-xl">
                      <div className="flex gap-xs text-sub" aria-hidden="true">
                        {Array.from({ length: 5 }, (_, s) => (
                          <StarIcon key={s} className="size-5" />
                        ))}
                      </div>
                      <blockquote className="heading-h5">{t.quote}</blockquote>
                    </div>
                    <figcaption className="flex items-center gap-lg text-left">
                      <span
                        aria-hidden="true"
                        className="grid size-14 shrink-0 place-items-center rounded-round bg-surface-800 text-small text-sub"
                      >
                        {t.name.slice(0, 1)}
                      </span>
                      <span className="flex flex-col">
                        <span className="text-small text-ink">{t.name}</span>
                        <span className="text-small text-sub">{t.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
