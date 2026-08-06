import path from "node:path";
import type { NextConfig } from "next";

/**
 * The one page still served as the original static build. It lives in
 * `public/privacy.html` and keeps its clean `/privacy` URL via the rewrite
 * below.
 */
const LEGACY_PAGES = ["privacy"];

/**
 * The five feature pages retired on 2026-08-06. The site is deliberately a
 * single landing page plus a privacy policy now; purpose-built feature pages
 * will be written from scratch later rather than inherited from the pre-rebuild
 * design.
 *
 * They redirect instead of 404ing because all five were in Google's index and
 * listed in sitemap.xml, so real people still arrive on them from search and
 * would otherwise dead-end on a missing page.
 *
 * 307, not 308: a permanent redirect is cached by browsers indefinitely, and
 * these exact slugs are the obvious names for the eventual replacements, so they
 * have to stay reusable. Google reads a redirect-to-homepage as a soft 404 and
 * drops the URL, which is the wanted outcome; pulling them from sitemap.xml is
 * the other half of that.
 */
const RETIRED_PAGES = [
  "ai-power-dialer",
  "ai-sales-audit-generator",
  "lead-generation",
  "sales-cadence-software",
  "sales-reporting",
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
 * Deliberately NOT touched here: /twilio/* and /td/twilio/*. Twilio signs the
 * exact URL it was told to call and the app validates by rebuilding that URL, so
 * a signature is only valid for one hostname. Redirecting loses the POST;
 * proxying would arrive at a host that reconstructs a different URL and fails the
 * signature check — and the mutating callbacks are fail-closed, so it would fail
 * silently-but-hard. Those must be repointed at the source, by re-provisioning
 * the TwiML app. See LEGACY_APP_PROXIES below for the endpoints that CAN be
 * forwarded and why.
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

/**
 * GoHighLevel endpoints that get PROXIED to the app rather than redirected.
 *
 * The problem these solve: GHL stores our address in its own config, in an
 * unknown number of places — one Webhook action per workflow, and there are
 * dozens of workflows. Auditing them all by hand is error-prone, and a missed one
 * fails SILENTLY: hot leads simply stop arriving, with no error anywhere.
 *
 * These two can be forwarded because of HOW they authenticate:
 *
 *   /ghl/webhook            authenticated by the ?w= workspace id and ?k= secret
 *                           in the QUERY STRING, which a proxy preserves intact.
 *                           Nothing is bound to the hostname.
 *   /ghl/provider/delivery  no authentication at all; it just acknowledges.
 *
 * Contrast Twilio, which signs the exact URL — see the note above. The dividing
 * line is not "webhook vs not", it is "secret in the URL" (proxyable) versus
 * "signature over the URL" (not proxyable, ever).
 *
 * A rewrite, not a redirect: Vercel forwards the POST server-side and returns the
 * app's own response, so it works whether or not GHL follows redirects. GHL never
 * learns the address changed.
 *
 * This is a COMPATIBILITY SHIM for config already saved in GHL, not the intended
 * path. New workflows should point at the machine host directly. It does mean this
 * site sits in front of hot-lead ingest for those old URLs, so if MACHINE_HOST
 * ever changes, this constant has to change with it.
 *
 * NOT included: /ghl/oauth/callback. The app now builds its redirect_uri from the
 * machine host, so GHL only ever sends the browser there — the apex is never
 * involved in the OAuth round-trip. The new address does still have to be added to
 * the Marketplace app's allowed Redirect URLs, which is one field, not a hunt.
 */
const LEGACY_APP_PROXIES = [
  { source: "/ghl/webhook", destination: `${MACHINE_HOST}/ghl/webhook` },
  { source: "/ghl/provider/delivery", destination: `${MACHINE_HOST}/ghl/provider/delivery` },
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
    return [
      ...LEGACY_PAGES.map((slug) => ({
        source: `/${slug}`,
        destination: `/${slug}.html`,
      })),
      ...LEGACY_APP_PROXIES,
    ];
  },

  // 307, not 308, throughout: these hand off to another host or to the landing
  // page, and a permanent redirect gets cached by browsers indefinitely. If the
  // app's hostnames change again, or the retired slugs get reused by real feature
  // pages, we want to be able to change these rather than fight a cache we cannot
  // clear.
  async redirects() {
    return [
      ...LEGACY_APP_PATHS,
      ...RETIRED_PAGES.map((slug) => ({
        source: `/${slug}`,
        destination: "/",
      })),
    ].map((r) => ({ ...r, permanent: false }));
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
