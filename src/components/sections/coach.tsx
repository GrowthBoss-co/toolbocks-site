import { CheckIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/reveal";
import { DemoFrame } from "@/components/sections/demo-frame";
import { coach } from "@/lib/content";

/**
 * The AI Live Coach, with the real thing beside the copy.
 *
 * The right-hand panel is the dialer's live-call screen, embedded as-is from
 * public/demo/live-call.html. It is a self-contained snapshot of the app: its
 * own styles, fonts and scripts, and it runs a scripted call on sample data
 * (rings, connects, the transcript fills, the coach suggests). An iframe is the
 * only honest way to show 400KB of someone else's HTML without rewriting it,
 * and it keeps the demo's CSS from ever touching the page's.
 *
 * The file is served from our own origin, so the sandbox grants it nothing it
 * would not already have; the attribute is there so a future edit that swaps in
 * a third-party URL is not silently trusted. The demo calls /api/me on boot and
 * shrugs off the 404, and it makes no other request.
 *
 * The frame is rendered at desktop size and scaled down (see DemoFrame), so
 * the three-column live-call screen is what shows in the column, not the
 * demo's own stacked mobile layout with a scrollbar. Below lg it goes under
 * the copy at full width, still scaled.
 *
 * The section sits on the same cream as the walkthrough above it, with a
 * hairline between the two so they read as consecutive chapters rather than
 * one long page. The demo keeps its dark chrome inside a `.scheme-dark`
 * island, which is how the product stays the product on a light ground.
 */
export function Coach() {
  return (
    <section
      id="coach"
      className="scheme-cream relative isolate overflow-hidden bg-void"
      style={{ borderTop: "1px solid var(--track)" }}
    >
      <div className="container-main pb-section-main pt-section-main">
        {/* The copy keeps a fixed, readable column; the demo takes everything
            else and runs out into the right page margin (.bleed-right), so the
            frame grows without squeezing the text into more lines. Every pixel
            of frame width is legibility inside the scaled demo. */}
        <div className="grid grid-cols-1 items-center gap-4xl lg:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] lg:gap-5xl">
          <Reveal className="flex flex-col gap-xl">
            <p className="text-eyebrow">{coach.eyebrow}</p>
            <h2 className="max-w-[16ch] text-balance text-ink">{coach.title}</h2>
            <p className="text-large max-w-[54ch] text-soft-400">{coach.body}</p>

            <ul className="mt-sm flex flex-col gap-md">
              {coach.points.map((point) => (
                <li key={point} className="flex items-start gap-md">
                  <CheckIcon className="mt-[0.2rem] size-5 shrink-0 text-[var(--p-600)]" />
                  <span className="text-soft-200">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal y={40} className="bleed-right flex flex-col items-center gap-lg">
            <div className="scheme-dark lift-lg w-full overflow-hidden rounded-xlarge border border-white/[0.08] bg-[#050507]">
              <DemoFrame
                src="/demo/live-call.html"
                title="ToolBocks live call with the AI coach, running on sample data"
              />
            </div>
            <p className="text-small text-sub">{coach.demoNote}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
