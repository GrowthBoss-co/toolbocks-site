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

const SECURITY_HEADERS = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
];

const nextConfig: NextConfig = {
  output: "standalone",
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
