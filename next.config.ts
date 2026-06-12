import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
