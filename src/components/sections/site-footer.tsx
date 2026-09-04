import Image from "next/image";
import { ToolBocksLogo } from "@/components/icons";
import { AGENCY_URL, footer } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="grain relative isolate border-t border-white/[0.08] bg-void">
      <div className="container-main pb-section-tiny pt-section-small">
        <div className="grid grid-cols-1 gap-y-5xl lg:grid-cols-2">
          <div className="flex flex-col items-start gap-[1.25rem]">
            <ToolBocksLogo />
            <p className="max-w-[32em] text-soft-400">{footer.tagline}</p>
            <a
              href={AGENCY_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Growth Boss"
              className="transition-opacity duration-200 hover:opacity-80"
            >
              <Image
                src="/assets/gb-logo-white.png"
                alt="Growth Boss"
                width={95}
                height={22}
              />
            </a>
          </div>

          <div className="flex justify-start gap-4xl lg:justify-end lg:gap-7xl">
            {footer.columns.map((col) => (
              <div key={col.heading}>
                <h2 className="mb-lg font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-sub">{col.heading}</h2>
                <ul className="flex flex-col gap-md">
                  {col.links.map((l) => {
                    const external = l.href.startsWith("http");
                    return (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          {...(external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                          className="flex items-center gap-sm text-[0.875rem] text-ink opacity-70 transition-opacity duration-200 hover:opacity-100"
                        >
                          {l.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6xl flex flex-col gap-sm border-t border-white/[0.08] pt-2xl text-small text-soft-400 md:flex-row md:items-center md:justify-between">
          <span>{footer.legal.copyright}</span>
          <span>{footer.legal.address}</span>
        </div>
      </div>
    </footer>
  );
}
