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
    ];
  },

  // Inline Tailwind's atomic CSS into <head> instead of a render-blocking
  // <link> — removes the CSS round trip for first-time visitors (FCP/LCP win).
  experimental: {
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000, // 30 days — avoid re-validating optimized images
    deviceSizes: [390, 750, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
