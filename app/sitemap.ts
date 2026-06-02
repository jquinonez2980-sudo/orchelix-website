import { MetadataRoute } from "next";
import { getSortedPosts } from "./blog/posts";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.orchelix.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const blogPosts: MetadataRoute.Sitemap = getSortedPosts().map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified ?? post.datePublished),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: BASE,                    lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/about`,         lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/solutions`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/ai-receptionist`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/blog`,          lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE}/pricing`,       lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/book`,          lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/try-esmi`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/how-it-works`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/industries`,    lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/privacy`,       lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms`,         lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/es`,            lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/es/recepcionista-ia`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ai-receptionist/hvac`,               lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ai-receptionist/dental`,             lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ai-receptionist/law-firm`,           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ai-receptionist/real-estate`,        lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ai-receptionist/residential-design`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ai-receptionist/stone-distribution`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ai-receptionist/stone-fabrication`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...blogPosts,
  ];
}
