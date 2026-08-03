import path from "node:path";
import type { NextConfig } from "next";

/**
 * The six pages that still ship as the original static build. They live in
 * `public/` and keep their live clean URLs via the rewrites below, so this
 * branch replaces the home page only and no existing URL 404s.
 */
const LEGACY_PAGES = [
  "ai-power-dialer",
  "ai-sales-audit-generator",
  "lead-generation",
  "sales-cadence-software",
  "sales-reporting",
  "privacy",
];

/**
 * toolbocks.com used to be the ToolBox app, not this site. Two kinds of URL are
 * still in the world pointing at the apex, and both have to keep working now
 * that Vercel answers here instead of Railway.
 *
 * APP_HOST — where humans go now. Bookmarks of /login and deep links into the
 * SPA at /app/... belong here.
 *
 * MACHINE_HOST — the app's own Railway hostname, which is what its
 * WEBHOOK_BASE_URL is set to. The links below were generated from the apex
 * BEFORE that split and are sitting in places we cannot edit: /unsub in
 * prospects' inboxes, /rec and /vm written into GoHighLevel timelines. They are
 * tokenised against the instance's SERVER_SECRET, so a redirect that preserves
 * the path still validates. A dead /unsub link is a CASL/CAN-SPAM problem, not
 * a broken page, which is why these are not optional.
 *
 * Deliberately NOT redirected: /twilio/*, /td/twilio/*, /ghl/*, /crm/*. Those
 * are signed POST webhooks — the signature covers the exact URL, and providers
 * do not reliably follow redirects for them, so a redirect here would look like
 * a fix while still failing. Those are repointed at the source instead, by
 * re-provisioning Twilio and re-pasting the webhook URL in GHL.
 */
const APP_HOST = "https://app.toolbocks.com";
const MACHINE_HOST = "https://growth-boss-toolbox-production.up.railway.app";

/** Paths the app owns that may still be addressed at the apex. */
const LEGACY_APP_PATHS = [
  { source: "/login", destination: `${APP_HOST}/login` },
  { source: "/app", destination: `${APP_HOST}/app` },
  { source: "/app/:path*", destination: `${APP_HOST}/app/:path*` },
  // Tokenised links already sent out. These go to the MACHINE host, not the app
  // host: that is where the instance answers them, and it stays put even if the
  // human front door moves again.
  { source: "/unsub/:path*", destination: `${MACHINE_HOST}/unsub/:path*` },
  { source: "/rec/:path*", destination: `${MACHINE_HOST}/rec/:path*` },
  { source: "/vm/:path*", destination: `${MACHINE_HOST}/vm/:path*` },
];

const SECURITY_HEADERS = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Replaces X-Frame-Options: SAMEORIGIN, which blocked the GrowthHub review
  // tool from framing the site. X-Frame-Options has no usable way to allow one
  // specific third-party origin (ALLOW-FROM is dead in Chrome and Safari), and
  // leaving it alongside a CSP would still block in any browser that honours it,
  // so it is removed rather than kept. frame-ancestors is its modern equivalent
  // and takes precedence where both are sent.
  //
  // This is the only directive here on purpose: CSP directives are opt-in, so it
  // restricts who may frame the site and nothing else. Adding `default-src` or
  // `script-src` later would need every inline Next script accounted for.
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self' https://growthhub.growthboss.co",
  },
];

const nextConfig: NextConfig = {
  // `standalone` exists only for the Dockerfile's self-host path, which copies
  // `.next/standalone` and runs `node server.js`. Vercel does not need it and
  // Vercel's own docs say not to set it there, so keep it off during Vercel
  // builds (VERCEL=1) and leave the Docker build unchanged.
  output: process.env.VERCEL ? undefined : "standalone",

  // A stray lockfile in the home directory otherwise gets inferred as the
  // workspace root, which breaks module resolution in surprising ways.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },

  // Replaces vercel.json's `cleanUrls: true`, which does not apply to a
  // Next.js project.
  async rewrites() {
    return LEGACY_PAGES.map((slug) => ({
      source: `/${slug}`,
      destination: `/${slug}.html`,
    }));
  },

  // 307, not 308: these hand off to another host, and a permanent redirect gets
  // cached by browsers indefinitely. If the app's hostnames ever change again we
  // want to be able to change these, not fight a cache we cannot clear.
  async redirects() {
    return LEGACY_APP_PATHS.map((r) => ({ ...r, permanent: false }));
  },

  // Carried over from the static site's vercel.json.
  async headers() {
    return [
      { source: "/(.*)", headers: SECURITY_HEADERS },
      {
        source: "/assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
