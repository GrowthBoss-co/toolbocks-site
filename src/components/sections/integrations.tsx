import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui-kit";
import { integrations } from "@/lib/content";

/* Lit from the top-left so a row of chips reads as physical objects on a dark
   floor rather than as flat holes punched in it. */
const CHIP_GRADIENT =
  "linear-gradient(135deg, var(--n-800), var(--n-900) 55%, var(--void))";

/** Two tracks of identical content so the loop has no seam. */
function Marquee({
  children,
  reverse,
  className,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`marquee-viewport relative flex overflow-hidden ${className ?? ""}`}>
      {[0, 1].map((k) => (
        <div
          key={k}
          aria-hidden={k === 1}
          className={`marquee-track items-center justify-around gap-lg pr-lg ${
            reverse ? "is-reverse" : ""
          }`}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export function Integrations() {
  return (
    <section id="integrations" className="grain relative isolate bg-abyss">
      <div className="container-main pt-section-main pb-section-main">
        <div className="section-layout is-integration">
          <Reveal>
            <SectionHeader
              eyebrow={integrations.eyebrow}
              title={integrations.title}
              body={integrations.body}
            />
          </Reveal>

          <div className="flex flex-col gap-lg">
            {/* row one: monogram chips */}
            <Marquee className="mx-auto w-[86%] md:w-[70%]">
              {integrations.brands.map((b) => (
                <span
                  key={b.name}
                  title={b.name}
                  className="lift grid aspect-square size-16 shrink-0 place-items-center rounded-full text-[0.8125rem] font-semibold tracking-tight text-soft-400"
                  style={{ backgroundImage: CHIP_GRADIENT }}
                >
                  {b.mark}
                </span>
              ))}
            </Marquee>

            {/* row two: names, travelling the other way */}
            <Marquee reverse className="mx-auto w-[92%] md:w-[56%]">
              {integrations.brands.map((b) => (
                <span
                  key={b.name}
                  className="shrink-0 whitespace-nowrap rounded-round border border-white/[0.08] px-lg py-sm text-small text-soft-400"
                  style={{ backgroundImage: CHIP_GRADIENT }}
                >
                  {b.name}
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
