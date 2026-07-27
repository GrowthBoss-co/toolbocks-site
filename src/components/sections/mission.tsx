import { mission, stats } from "@/lib/content";

export function Mission() {
  return (
    <section>
      <div className="container-main pt-section-main pb-section-small">
        <div className="section-layout is-split">
          <p className="text-eyebrow">{mission.eyebrow}</p>
          <p className="heading-h3 max-w-[41ch] text-center text-ink">
            {mission.text}
          </p>

          {/* Real numbers off the live instance, standing in for Orizon's
              decorative background shape. */}
          <dl className="mt-2xl grid w-full grid-cols-2 gap-x-xl gap-y-3xl border-t border-line pt-3xl lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-sm text-center">
                <dt className="heading-h4 text-gradient order-1">{s.value}</dt>
                <dd className="text-small order-2 text-sub">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
