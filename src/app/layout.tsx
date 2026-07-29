import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://toolbocks.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "ToolBocks | AI Sales Engagement Platform and Power Dialer",
  description:
    "Power dialer, multi-channel cadences, lead sourcing, AI audits and proposals, and full pipeline reporting in one login. Built and battle-tested inside a real agency.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "ToolBocks",
    url: SITE_URL,
    title: "ToolBocks | The outbound platform built inside a real agency",
    description:
      "Dialer, cadences, lead gen, AI documents and reporting in one login. Not a demo product: it runs a real agency's outbound every day.",
    images: [
      {
        url: "/assets/og-image.jpg",
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
    images: ["/assets/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/assets/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/icon-192.png", type: "image/png", sizes: "192x192" },
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
      <body className="flex min-h-full flex-col">
        {children}
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
