import { RepeatIcon, ScalesIcon, UserCheckIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { benefits } from "@/lib/content";

/**
 * Three benefits, centred, drawn in as you arrive.
 *
 * The header sits alone in the middle. From it a single thread drops, splits
 * into a crossbar, and three short stems fall from the bar into three icon
 * tiles; each tile then lifts its title and body into place. Everything is
 * driven by the one `.is-in` class the Reveal wrapper toggles, with staggered
 * transition delays, so the choreography is pure CSS and rewinds if the
 * section leaves and returns. Below md the crossbar goes and the three columns
 * stack, each with its own stem.
 *
 * Timing. The whole sequence lands in about 1.4s on desktop and 1.2s on a
 * phone, and something is moving from the first frame. It used to hold for a
 * full second before the first stem fell (waiting for a crossbar that phones
 * never show) and finish two and a half seconds after the section arrived,
 * which read as the section failing to load rather than as an entrance. The
 * wait before the stems is a CSS variable set per breakpoint, so the phone
 * skips the crossbar's share of it.
 *
 * The tiles carry the logo's gradient, the same one that rings the dashboard
 * in the hero, which is how the brand colour shows up here without a fourth
 * hue joining the page.
 */
const icons = [ScalesIcon, RepeatIcon, UserCheckIcon];

const GRADIENT = "linear-gradient(135deg, #2dd4ff 0%, #6a5cff 48%, #d946ef 100%)";

/** Running order, in ms. Stems start at `--stem-wait` (set per breakpoint below). */
const T = {
  crossbar: 220,
  stemStagger: 110,
  tile: 120,
  title: 220,
  body: 300,
} as const;

const stemDelay = (i: number, extra: number) =>
  `calc(var(--stem-wait) + ${i * T.stemStagger + extra}ms)`;

export function Benefits() {
  return (
    <section id="benefits" className="grain relative isolate overflow-hidden bg-abyss">
      {/* The ground fades into the void below, the way the hero fades into the
          mission, so the two sections read as one run rather than two stripes. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent to-void"
      />
      <div className="relative container-main pb-section-main pt-section-main">
        <Reveal className="flex flex-col items-center gap-xl text-center">
          <p className="text-eyebrow">{benefits.eyebrow}</p>
          <h2 className="text-gradient max-w-[22ch] text-balance">{benefits.title}</h2>
        </Reveal>

        <Reveal
          y={0}
          className="mt-3xl flex flex-col items-center [--stem-wait:260ms] md:[--stem-wait:480ms]"
        >
          {/* the thread down from the header */}
          <span
            aria-hidden="true"
            className="block h-16 w-px origin-top scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [.is-in_&]:scale-y-100"
            style={{ background: "linear-gradient(180deg, var(--p-500), var(--p-200))" }}
          />
          {/* the crossbar, desktop only */}
          <span
            aria-hidden="true"
            className="hidden h-px w-[66.666%] origin-center scale-x-0 bg-white/[0.14] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:block [.is-in_&]:scale-x-100"
            style={{ transitionDelay: `${T.crossbar}ms` }}
          />

          <ul className="grid w-full grid-cols-1 gap-3xl md:grid-cols-3 md:gap-xl">
            {benefits.items.map((item, i) => {
              const Icon = icons[i];
              return (
                <li key={item.title} className="flex flex-col items-center text-center">
                  <span
                    aria-hidden="true"
                    className="block h-10 w-px origin-top scale-y-0 bg-white/[0.14] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] [.is-in_&]:scale-y-100"
                    style={{ transitionDelay: stemDelay(i, 0) }}
                  />
                  <span
                    aria-hidden="true"
                    className="relative mt-1 grid size-16 place-items-center rounded-[1.125rem] p-px opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [transform:translateY(10px)_scale(0.92)] [.is-in_&]:opacity-100 [.is-in_&]:[transform:none]"
                    style={{ background: GRADIENT, transitionDelay: stemDelay(i, T.tile) }}
                  >
                    <span
                      className="pointer-events-none absolute -inset-3 -z-10 rounded-[1.5rem] opacity-35 blur-xl"
                      style={{ background: GRADIENT }}
                    />
                    <span className="grid size-full place-items-center rounded-[calc(1.125rem-1px)] bg-[#0b0b12] text-ink">
                      <Icon className="size-7" />
                    </span>
                  </span>
                  <h3
                    className="heading-h5 mt-xl max-w-[18ch] text-balance opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [transform:translateY(12px)] [.is-in_&]:opacity-100 [.is-in_&]:[transform:none]"
                    style={{ transitionDelay: stemDelay(i, T.title) }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-md max-w-[34ch] text-soft-400 opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [transform:translateY(12px)] [.is-in_&]:opacity-100 [.is-in_&]:[transform:none]"
                    style={{ transitionDelay: stemDelay(i, T.body) }}
                  >
                    {item.body}
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
