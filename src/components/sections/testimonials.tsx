import Image from "next/image";
import { StarIcon } from "@/components/icons";
import { SectionHeader } from "@/components/ui-kit";
import { testimonials } from "@/lib/content";

/** Every avatar source is a square Slack profile photo at this size. */
const AVATAR_SOURCE = 512;

/**
 * Applies a testimonial's crop box in CSS rather than relying on a pre-cropped
 * file, so the original photos stay untouched in `public/` and reframing someone
 * is a number change in `content.ts`.
 *
 * The box is expressed in source pixels; converting it to percentages keeps the
 * result independent of the rendered avatar size. `max-w-none` matters: the image
 * has to be allowed past 100% width for a crop to zoom at all.
 */
function Avatar({
  avatar,
}: {
  avatar: { src: string; crop: { left: number; top: number; size: number } };
}) {
  const { left, top, size } = avatar.crop;
  return (
    <span
      aria-hidden="true"
      className="relative size-14 shrink-0 overflow-hidden rounded-round bg-surface-800"
    >
      <Image
        // Decorative: the name and role sit immediately beside it, so alt text
        // would only repeat the caption.
        alt=""
        src={avatar.src}
        width={AVATAR_SOURCE}
        height={AVATAR_SOURCE}
        // Ask for well over the 56px box: the tightest crop here shows about
        // half the source, so a smaller request would go soft on a 3x screen.
        sizes="384px"
        className="absolute max-w-none"
        style={{
          width: `${(AVATAR_SOURCE / size) * 100}%`,
          height: "auto",
          left: `${(-left / size) * 100}%`,
          top: `${(-top / size) * 100}%`,
        }}
      />
    </span>
  );
}

/**
 * Orizon uses a Webflow slider here. This is a CSS marquee instead, reusing the
 * `marquee-viewport` / `marquee-track` pair the closing band already uses, so
 * there is no slider library and no client JS.
 *
 * It drifts rather than snapping, which means the cards are no longer manually
 * scrollable. Hovering pauses it so a quote can be read in full, and the global
 * prefers-reduced-motion rule stops the drift entirely.
 */
export function Testimonials() {
  return (
    <section className="grain relative isolate">
      <div className="container-main pt-section-main pb-section-main">
        <div className="section-layout">
          <SectionHeader
            eyebrow={testimonials.eyebrow}
            title={testimonials.title}
          />

          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[8%] bg-gradient-to-r from-void to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[8%] bg-gradient-to-l from-void to-transparent"
            />

            {/* Two identical tracks: the first scrolls out to -100% of its own
                width exactly as the second arrives, which is what makes the loop
                seamless. Spacing lives entirely on the track (gap plus a matching
                pr) so the join between tracks is the same gap as between cards.
                `marquee-viewport` pauses the animation on hover, and the global
                prefers-reduced-motion rule stops it outright. */}
            <div className="marquee-viewport flex overflow-hidden pb-lg">
              {[0, 1].map((track) => (
                <ul
                  key={track}
                  // The duplicate is decorative; without this a screen reader
                  // reads every quote twice.
                  aria-hidden={track === 1}
                  className="marquee-track is-slow items-stretch gap-xl pr-xl"
                >
                  {testimonials.items.map((t, i) => (
                    <li
                      key={i}
                      // Fixed widths, not percentages: the track sizes itself to
                      // its content, so a percentage width would have nothing
                      // stable to resolve against.
                      className="w-[19rem] shrink-0 sm:w-[22rem] lg:w-[24rem]"
                    >
                      {/* min-h rather than a fixed h: at narrow widths a real
                          quote runs past 26rem, and a fixed height pushed the
                          name and photo outside the card. Cards stretch to the
                          tallest in the track, so the row stays even. */}
                      <figure className="surface-card flex h-full min-h-[26rem] flex-col justify-between gap-2xl p-3xl">
                        <div className="flex flex-col gap-xl">
                          <div className="flex gap-xs text-gold" aria-hidden="true">
                            {Array.from({ length: 5 }, (_, s) => (
                              <StarIcon key={s} className="size-5" />
                            ))}
                          </div>
                          <blockquote className="heading-h5">
                            {t.quote}
                          </blockquote>
                        </div>
                        <figcaption className="flex items-center gap-lg text-left">
                          {t.avatar ? (
                            <Avatar avatar={t.avatar} />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="grid size-14 shrink-0 place-items-center rounded-round bg-surface-800 text-small text-sub"
                            >
                              {t.name.slice(0, 1)}
                            </span>
                          )}
                          <span className="flex flex-col">
                            <span className="text-small text-ink">{t.name}</span>
                            <span className="text-small text-sub">{t.role}</span>
                          </span>
                        </figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
