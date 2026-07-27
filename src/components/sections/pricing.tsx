"use client";

import { useState } from "react";
import { CheckIcon, SparkleIcon } from "@/components/icons";
import { Button, SectionHeader } from "@/components/ui-kit";
import { DEMO_URL, pricing } from "@/lib/content";

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing">
      <div className="container-main pt-section-main pb-section-main">
        <div className="section-layout">
          <SectionHeader eyebrow={pricing.eyebrow} title={pricing.title} />

          <div className="flex flex-col items-stretch gap-3xl">
            {/* monthly / annual switch */}
            <div className="flex flex-col items-center gap-md">
              <div
                role="tablist"
                aria-label="Billing period"
                className="inline-flex items-center gap-xs rounded-large border border-flat-neutral bg-flat-neutral p-xs"
              >
                {(
                  [
                    { label: "Monthly", value: false },
                    { label: "Annual", value: true },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    role="tab"
                    aria-selected={annual === opt.value}
                    onClick={() => setAnnual(opt.value)}
                    className={`flex cursor-pointer items-center gap-sm rounded-medium px-lg py-sm text-small transition-colors duration-200 ${
                      annual === opt.value
                        ? "bg-surface-800 text-ink"
                        : "text-soft-400 hover:text-ink"
                    }`}
                  >
                    {opt.label}
                    {opt.value ? (
                      <span className="flex items-center gap-[0.375rem] rounded-xs bg-surface-700 py-[0.125rem] pl-xs pr-[0.125rem] text-[0.75rem] font-medium leading-normal whitespace-nowrap text-soft-400">
                        Save
                        <span className="rounded-xs bg-strong px-xs text-ink">
                          20%
                        </span>
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>

              {pricing.isPlaceholder ? (
                <p className="text-center text-small text-warning">
                  Placeholder prices. ToolBocks has no published pricing, so
                  every figure below is a layout stand-in.
                </p>
              ) : null}
            </div>

            <div className="relative grid grid-cols-1 gap-xl lg:grid-cols-3">
              {pricing.plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`surface-card relative flex flex-col justify-between gap-3xl overflow-hidden p-xl md:p-3xl ${
                    plan.popular
                      ? "shadow-[inset_0_0_0_1px_var(--p-500)]"
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
                      <h3 className="heading-h6">{plan.name}</h3>
                      {plan.popular ? (
                        <span className="flex items-center gap-xs rounded-small bg-primary-950 py-xs pl-sm pr-md text-ink">
                          <SparkleIcon className="size-5 text-primary-400" />
                          <span className="text-small">Popular</span>
                        </span>
                      ) : null}
                    </div>

                    <div className="flex flex-col gap-lg">
                      <p className="heading-h2">
                        {annual ? plan.annual : plan.monthly}
                        {plan.monthly !== "Custom" ? (
                          <span className="text-large text-sub">
                            {annual ? " /yr" : " /mo"}
                          </span>
                        ) : null}
                      </p>
                      <p className="text-soft-400">{plan.blurb}</p>
                    </div>

                    <ul className="grid gap-lg py-sm">
                      {plan.features.map((f) => (
                        <li key={f} className="flex gap-md">
                          <span className="shrink-0 self-start text-primary-400">
                            <CheckIcon className="size-6" />
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
      </div>
    </section>
  );
}
