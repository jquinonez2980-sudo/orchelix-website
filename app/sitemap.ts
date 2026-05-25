import { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://orchelix.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/about`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/solutions`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/pricing`,       lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/book`,          lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/try-esmi`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/how-it-works`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/industries`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/privacy`,       lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms`,         lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];
}
