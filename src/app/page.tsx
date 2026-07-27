import { Benefits } from "@/components/sections/benefits";
import { Features } from "@/components/sections/features";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Integrations } from "@/components/sections/integrations";
import { Mission } from "@/components/sections/mission";
import { Pricing } from "@/components/sections/pricing";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteNav } from "@/components/sections/site-nav";
import { Testimonials } from "@/components/sections/testimonials";
import { Values } from "@/components/sections/values";

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
      <main className="overflow-clip">
        <Hero />
        <Mission />
        <Features />
        <Benefits />
        <Integrations />
        <Testimonials />
        <Pricing />
        <Values />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
