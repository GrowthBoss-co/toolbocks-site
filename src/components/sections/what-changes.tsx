import { DotTrail } from "@/components/motion/dot-trail";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui-kit";
import { features } from "@/lib/content";

/**
 * The "What changes" header on the dark ground, with the field of dots the
 * cursor draws through behind it (see DotTrail).
 *
 * It used to introduce two bands and the wide Team Dashboard; those went, and
 * the all-features carousel now follows. The header stays because the dot
 * field is a moment Bahaa asked to keep, and it wants the void behind it, not
 * the carousel's cream. The field is the whole band, not the container, so the
 * path can run out to the edges the way it does on the reference.
 */
export function WhatChanges() {
  return (
    <section className="relative isolate bg-void">
      <DotTrail />
      <div className="container-main relative pb-section-main pt-section-main">
        <Reveal>
          <SectionHeader
            eyebrow={features.eyebrow}
            title={features.title}
            body={features.body}
          />
        </Reveal>
      </div>
    </section>
  );
}
