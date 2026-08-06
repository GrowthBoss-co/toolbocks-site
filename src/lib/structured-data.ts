import { AGENCY_URL, SITE_URL } from "@/lib/content";

/**
 * JSON-LD for the landing page, as a single @graph so the nodes can reference
 * each other by @id instead of repeating themselves.
 *
 * Deliberately absent, and each for a reason:
 *
 * - **aggregateRating / Review.** The testimonial cards show five gold stars, but
 *   those stars are decoration: no one in them was asked for a numeric rating.
 *   Emitting a rating nobody gave would be fabricated data, and Google treats
 *   invented review markup as a manual-action offence, not a warning.
 *
 * - **FAQPage.** Google requires FAQ markup to describe an FAQ that is actually
 *   visible on the page. There is no FAQ section on the landing page, so marking
 *   one up would be a guideline violation. Adding a real FAQ section is the
 *   prerequisite, and it is a genuine rich-result opportunity once it exists.
 *
 * - **Offers on the SoftwareApplication.** Pricing reads "Custom" on purpose, so
 *   there is no price to state. An Offer with a made-up number is worse than no
 *   Offer at all.
 *
 * - **BreadcrumbList.** A single-page site has no hierarchy to describe.
 */
export function buildStructuredData() {
  const org = `${SITE_URL}/#organization`;
  const site = `${SITE_URL}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: "ToolBocks",
        url: SITE_URL,
        description:
          "AI sales engagement platform: power dialer, multi-channel cadences, lead sourcing, AI audits and pipeline reporting.",
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/assets/icon-512.png`,
          width: 512,
          height: 512,
        },
        // ToolBocks is a product of the agency, not a separate company, and the
        // legal entity on the privacy policy is Growth Boss Marketing Corp.
        parentOrganization: {
          "@type": "Organization",
          name: "Growth Boss Marketing Corp.",
          url: AGENCY_URL,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "2030 Bristol Circle, Suite 201",
          addressLocality: "Oakville",
          addressRegion: "ON",
          addressCountry: "CA",
        },
      },
      {
        "@type": "WebSite",
        "@id": site,
        url: SITE_URL,
        name: "ToolBocks",
        publisher: { "@id": org },
        inLanguage: "en-CA",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        name: "ToolBocks",
        url: SITE_URL,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "Outbound sales platform combining a power dialer, multi-channel cadences, lead sourcing, AI-generated audits and proposals, and pipeline reporting in one login.",
        publisher: { "@id": org },
        featureList: [
          "Power dialer with live call coaching",
          "Multi-channel outbound cadences",
          "Lead sourcing and enrichment",
          "AI-generated sales audits and proposals",
          "Pipeline and rep performance reporting",
        ],
      },
    ],
  };
}
