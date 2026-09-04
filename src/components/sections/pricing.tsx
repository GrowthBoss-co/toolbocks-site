import { CheckIcon, SparkleIcon } from "@/components/icons";
import { Button, SectionHeader } from "@/components/ui-kit";
import { DEMO_URL, pricing } from "@/lib/content";

/**
 * No tier publishes a figure, so there is no monthly/annual toggle: it would
 * switch between two identical values, and its "Save 20%" badge would claim a
 * discount against prices that do not exist. Dropping it also removed the only
 * state here, which is why this is no longer a client component. See the note on
 * `pricing` in `content.ts` for what to restore when real figures land.
 */
export function Pricing() {
  return (
    <section id="pricing" className="grain relative isolate bg-void">
      <div className="container-main pt-section-main pb-section-main">
        <div className="section-layout">
          <SectionHeader eyebrow={pricing.eyebrow} title={pricing.title} />

          <div className="relative grid grid-cols-1 gap-xl lg:grid-cols-3">
            {pricing.plans.map((plan) => (
              <div
                key={plan.name}
                // The popular plan replaces .surface-card's box-shadow rather
                // than adding to it, so the card's own hairline and drop have
                // to be restated here alongside the indigo ring — otherwise the
                // highlighted plan is the one card on the page with no edge.
                className={`surface-card relative flex flex-col justify-between gap-3xl overflow-hidden p-xl md:p-3xl ${
                  plan.popular
                    ? "shadow-[inset_0_0_0_1px_var(--p-500),inset_0_1px_0_0_rgb(255_255_255/0.10),0_40px_110px_-50px_rgb(0_0_0/0.95),0_0_120px_-60px_rgb(92_90_255/0.65)]"
                    : ""
                }`}
              >
                {plan.popular ? (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-[-12%] size-60 -translate-x-1/2 rounded-round bg-primary-500 blur-[50px]"
                    style={{ mixBlendMode: "plus-lighter" }}
                  />
                ) : null}

                <div className="relative flex flex-col gap-3xl">
                  <div className="flex min-h-8 items-center justify-between">
                    <h3 className="heading-h5">{plan.name}</h3>
                    {plan.popular ? (
                      <span className="flex items-center gap-xs rounded-round bg-primary-500/20 py-xs pl-sm pr-md text-ink">
                        <SparkleIcon className="size-5 text-primary-400" />
                        <span className="text-small">Popular</span>
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-col gap-lg">
                    <p className="heading-h3">{plan.price}</p>
                    <p className="text-soft-400">{plan.blurb}</p>
                  </div>

                  <ul className="grid gap-lg py-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-md">
                        <span className="shrink-0 self-start pt-1 text-lime">
                          <CheckIcon className="size-5" />
                        </span>
                        <span className="text-soft-400">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  href={DEMO_URL}
                  variant={plan.popular ? "primary" : "dark"}
                  className="relative w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
