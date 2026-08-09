import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly prefer clean URLs without trailing slashes (e.g. /es instead of /es/).
  // This is the modern Next.js App Router + Vercel recommendation for marketing/SaaS sites.
  // Matches our existing sitemap, all canonical tags, Nav/Footer language switcher, and internal links.
  // When a user or crawler hits /es/, Next.js + Vercel will 308 Permanent Redirect to /es.
  // The redirect is desirable for SEO (consolidates to the canonical form declared in metadata).
  trailingSlash: false,

  // Force apex domain (orchelix.com) to permanently redirect to www (www.orchelix.com) with 301.
  // This is more reliable than Vercel's default platform redirect (which uses 307).
  // The `has` condition targets only requests where the Host header is the apex domain.
  // Using statusCode: 301 gives a classic permanent redirect (preferred for SEO over 308 in many cases).
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'orchelix.com',
          },
        ],
        destination: 'https://www.orchelix.com/:path*',
        statusCode: 301,
      },
      // /agents has no dedicated page — /solutions is already the three-agent
      // hub (Esmi, Revenue-Ops, AcumenAI). Redirect rather than duplicate it.
      {
        source: '/agents',
        destination: '/solutions',
        statusCode: 301,
      },
      // The hand-written Spanish landing page that predated the i18n system.
      // /es/ai-receptionist is the same subject in the converted world and
      // carries the real Spanish catalogue, so the old slug forwards rather
      // than sitting alongside it as a second, worse copy.
      {
        source: '/es/recepcionista-ia',
        destination: '/es/ai-receptionist',
        statusCode: 301,
      },
    ];
  },

  // Inline Tailwind's atomic CSS into <head> instead of a render-blocking
  // <link> — removes the CSS round trip for first-time visitors (FCP/LCP win).
  experimental: {
    inlineCss: true,
  },

  /* Disable webpack's persistent filesystem cache for production builds.
   *
   * WHY: a corrupted pack file in `.next/cache/webpack` makes the build die
   * with `TypeError: Cannot read properties of undefined (reading 'length')`
   * inside `WasmHash._updateWithBuffer`, via
   * `[webpack.cache.PackFileCacheStrategy] Restoring failed for …`. Webpack
   * calls `hash.update(entry.hash)` on a deserialized snapshot entry whose
   * `hash` is undefined. Reproduced deliberately by truncating
   * `.next/cache/webpack/server-production/0.pack`. It is NOT a Node 24
   * incompatibility — webpack builds fine on 24.15.0.
   *
   * THE TRADE, measured on this repo: the cache is 234 MB and saves ~7s
   * (29s warm vs 36s cold). On Vercel that cache is also restored and
   * re-uploaded between deployments, so 234 MB of transfer plausibly costs
   * more than the 7s it saves — and a corrupted cache that gets restored
   * breaks every subsequent deploy until someone clears it by hand.
   * Seven seconds is cheap insurance against that.
   *
   * NOTE: `build` must keep `--webpack`. Turbopack was tried and only
   * generated /_not-found on Vercel (commit 7bd4cab); dropping the flag
   * reintroduces that. This hook only runs for the webpack builder, so it
   * does not affect `next dev`, which uses Turbopack. */
  webpack(config, { dev }) {
    if (!dev) config.cache = false;
    return config;
  },

  /* Empty on purpose. Next 16 errors on startup when a `webpack` config is
   * present with no `turbopack` config, on the assumption the webpack config
   * was meant to be migrated. Here it is deliberate and builder-specific:
   * `next dev` runs Turbopack and needs no configuration, while
   * `next build --webpack` needs the cache disabled above. Declaring this
   * empty object is the documented way to say "Turbopack is fine as-is". */
  turbopack: {},
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000, // 30 days — avoid re-validating optimized images
    deviceSizes: [390, 750, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
  },
  async headers() {
    return [
      {
        // Security headers applied to all routes.
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        // Public image assets served directly (not through /_next/image).
        // 1-day browser cache, 1-year CDN cache (Vercel strips s-maxage on revalidation).
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800" },
        ],
      },
      {
        // Favicons, icons, manifests — long-lived in CDN, short browser cache.
        source: "/:file(favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.webmanifest)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, s-maxage=2592000" },
        ],
      },
    ];
  },
};

export default nextConfig;
