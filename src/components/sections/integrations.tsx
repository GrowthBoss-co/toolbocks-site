import { BrandMark } from "@/components/brand-icons";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui-kit";
import { integrations } from "@/lib/content";

/**
 * The stack, straight under the hero.
 *
 * Thirteen tiles, one per integration the app actually has, each with the
 * brand's mark, its name, and one line on what it does inside ToolBocks. The
 * role line is what makes this more than a logo wall: a buyer reads
 * "two-way sync" next to Salesforce and "call transcription" next to ElevenLabs
 * and knows what they are getting without opening a docs page.
 *
 * Marks are monochrome and take the tile's text colour, so the row reads as one
 * system rather than thirteen brand palettes fighting on a dark ground; the
 * brand's own colour arrives on hover, which is where a logo wall usually
 * starts anyway.
 */
export function Integrations() {
  return (
    <section id="integrations" className="grain relative isolate bg-abyss">
      <div className="container-main pb-section-main pt-section-small">
        <div className="flex flex-col gap-5xl">
          <Reveal>
            <SectionHeader
              eyebrow={integrations.eyebrow}
              title={integrations.title}
              body={integrations.body}
            />
          </Reveal>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-[repeat(13,minmax(0,1fr))] xl:gap-2">
            {integrations.brands.map((b, i) => (
              <Reveal
                as="li"
                key={b.name}
                delay={0.04 * i}
                y={18}
                className="group flex flex-col items-center gap-2.5 rounded-[0.875rem] border border-white/[0.07] bg-white/[0.02] px-2 py-4 text-center transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-primary-400/40 hover:bg-white/[0.04]"
              >
                <span className="grid size-11 place-items-center rounded-[0.75rem] bg-white/[0.04] text-soft-200 transition-colors duration-300 group-hover:text-ink">
                  <BrandMark slug={b.slug} className="size-6" />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[0.8125rem] font-medium leading-tight text-ink">{b.name}</span>
                  <span className="text-[0.6875rem] leading-snug text-sub">{b.role}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
