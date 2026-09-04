import {
  SMOOTH_CONTENT,
  SMOOTH_WRAPPER,
  SmoothScroll,
} from "@/components/motion/smooth-scroll";
import { Benefits } from "@/components/sections/benefits";
import { Coach } from "@/components/sections/coach";
import { Features } from "@/components/sections/features";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Mission } from "@/components/sections/mission";
import { Pricing } from "@/components/sections/pricing";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import { System } from "@/components/sections/system";
import { Testimonials } from "@/components/sections/testimonials";
import { Walkthrough } from "@/components/sections/walkthrough";

export default function Home() {
  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-small focus:bg-surface-800 focus:px-lg focus:py-sm focus:text-ink"
      >
        Skip to content
      </a>
      <SiteNav />
      <SmoothScroll />
      {/* Everything the smoother translates lives in here. The nav stays out,
          because it is position: fixed and would otherwise move with the page. */}
      <div id={SMOOTH_WRAPPER}>
        <div id={SMOOTH_CONTENT}>
          <main className="overflow-clip">
            <Hero />
            <Mission />
            <Walkthrough />
            <Coach />
            <Features />
            <Benefits />
            <System />
            <Testimonials />
            <Pricing />
            <FinalCta />
          </main>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
