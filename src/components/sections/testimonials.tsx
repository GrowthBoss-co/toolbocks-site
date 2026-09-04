import Image from "next/image";
import { StarIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui-kit";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

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
      className="relative size-11 shrink-0 overflow-hidden rounded-round bg-surface-800 ring-1 ring-white/10"
    >
      <Image
        // Decorative: the name and role sit immediately beside it, so alt text
        // would only repeat the caption.
        alt=""
        src={avatar.src}
        width={AVATAR_SOURCE}
        height={AVATAR_SOURCE}
        // Ask for well over the box: the tightest crop here shows about half
        // the source, so a smaller request would go soft on a 3x screen.
        sizes="320px"
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
 * Four cards in a row, each set a little lower or higher than its neighbour
 * and tilted a degree or so, so the row reads as a loose hand of cards rather
 * than a grid. The stagger and tilt exist only from lg up; below that the
 * cards stack and a tilt would just look like a mistake.
 *
 * This replaced the drifting marquee. The cards are min-height, not fixed:
 * a fixed height once pushed the name and photo out of the card at narrow
 * widths, and nothing here reintroduces that.
 */
const OFFSETS = ["lg:mt-0", "lg:mt-16", "lg:mt-6", "lg:mt-24"] as const;
const TILTS = ["lg:-rotate-[1.2deg]", "lg:rotate-[0.8deg]", "lg:-rotate-[0.6deg]", "lg:rotate-[1.1deg]"] as const;

export function Testimonials() {
  return (
    <section id="testimonials" className="grain relative isolate overflow-hidden bg-void">
      <div
        aria-hidden="true"
        className="aura-field pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="aura left-1/2 top-[60%] size-[56rem] -translate-x-1/2 opacity-60" />
      </div>

      <div className="container-main pb-section-main pt-section-main">
        <div className="flex flex-col gap-6xl">
          <Reveal>
            <SectionHeader
              eyebrow={testimonials.eyebrow}
              title={testimonials.title}
            />
          </Reveal>

          <ul className="grid grid-cols-1 gap-xl sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
            {testimonials.items.map((t, i) => (
              <Reveal
                as="li"
                key={t.name}
                delay={i * 0.1}
                y={36}
                className={cn(OFFSETS[i % OFFSETS.length])}
              >
                <figure
                  className={cn(
                    "flex min-h-[24rem] flex-col justify-between gap-2xl rounded-[1.125rem] border border-white/[0.08] p-2xl transition-transform duration-500 ease-out lg:hover:rotate-0",
                    TILTS[i % TILTS.length],
                  )}
                  style={{
                    backgroundImage:
                      "radial-gradient(70% 45% at 50% 100%, rgb(92 90 255 / 0.16), transparent), linear-gradient(180deg, #10121b 0%, #090a10 100%)",
                    boxShadow:
                      "inset 0 1px 0 0 rgb(255 255 255 / 0.06), 0 30px 70px -40px rgb(0 0 0 / 0.9)",
                  }}
                >
                  <div className="flex flex-col gap-lg">
                    <div className="flex gap-[3px] text-gold" aria-hidden="true">
                      {Array.from({ length: 5 }, (_, s) => (
                        <StarIcon key={s} className="size-[0.875rem]" />
                      ))}
                    </div>
                    <blockquote className="heading-h6 text-balance leading-[1.35] text-ink">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                  </div>

                  <figcaption className="flex items-center gap-md border-t border-white/[0.08] pt-lg text-left">
                    {t.avatar ? (
                      <Avatar avatar={t.avatar} />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="grid size-11 shrink-0 place-items-center rounded-round bg-surface-800 text-small text-sub"
                      >
                        {t.name.slice(0, 1)}
                      </span>
                    )}
                    <span className="flex flex-col leading-tight">
                      <span className="text-small font-semibold text-ink">{t.name}</span>
                      <span className="text-[0.8125rem] text-sub">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
