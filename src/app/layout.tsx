import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import Script from "next/script";
import { SITE_URL } from "@/lib/content";
import { buildStructuredData } from "@/lib/structured-data";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

/**
 * GA4 measurement ID. Read from the environment rather than hardcoded so the
 * property can change without a code edit, and so preview deployments stay out
 * of production analytics unless the variable is set for them too.
 *
 * Unset means no analytics script is emitted at all, which is the correct
 * default: a broken or empty ID would still cost every visitor the request.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const viewport: Viewport = {
  // Tints mobile browser chrome. site.webmanifest already carries the same
  // value, but the manifest only applies once installed as an app.
  themeColor: "#010D2E",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ToolBocks | AI Sales Engagement Platform and Power Dialer",
  // Kept under 160 characters so Google shows it whole; the previous version ran
  // to 162 and had its last few words clipped.
  description:
    "Power dialer, multi-channel cadences, lead sourcing, AI audits, and full pipeline reporting in one login. Built and battle-tested inside a real agency.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "ToolBocks",
    locale: "en_CA",
    url: SITE_URL,
    title: "ToolBocks | The outbound platform built inside a real agency",
    description:
      "Dialer, cadences, lead gen, AI documents and reporting in one login. Not a demo product: it runs a real agency's outbound every day.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolBocks, AI sales engagement platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolBocks | The outbound platform built inside a real agency",
    description:
      "Dialer, cadences, lead gen, AI documents and reporting in one login.",
    images: ["/assets/og-image.png"],
  },
  // Smallest first: browsers pick the closest match rather than the first one
  // they can use, but a wrong order still costs a needless 512px decode for a
  // 16px tab. All five are generated from the logo mark by `npm run brand`.
  icons: {
    icon: [
      { url: "/assets/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/assets/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/assets/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/assets/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <head>
        {/* Organization + WebSite + SoftwareApplication. See structured-data.ts
            for what is deliberately NOT emitted here and why: no invented review
            ratings, no FAQ markup without a visible FAQ, no priced Offer. */}
        <script
          type="application/ld+json"
          // The value is built from our own constants, never user input.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildStructuredData()),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        {children}

        {/* GA4. `afterInteractive` rather than blocking: analytics must never sit
            on the critical path of a page whose Core Web Vitals we care about.
            Renders nothing at all when NEXT_PUBLIC_GA_ID is unset. */}
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
            </Script>
          </>
        ) : null}

        {/* GrowthHub review tool. Inert for normal visitors: it only activates
            when the page is framed inside GrowthHub, so it stays in production.
            Framing is permitted by the frame-ancestors CSP in next.config.ts,
            which replaced X-Frame-Options for exactly this. */}
        <script
          src="https://growthhub.growthboss.co/review-embed.js"
          defer
        />
      </body>
    </html>
  );
}
