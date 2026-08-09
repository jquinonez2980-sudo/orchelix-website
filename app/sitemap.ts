import { MetadataRoute } from "next";
import { getPosts, postHref } from "@/app/i18n/posts";
import { LOCALES, LOCALIZED_PATHS, TRANSLATED_PATHS, localizedHref } from "@/app/i18n/config";
import { INDUSTRY_SLUGS } from "@/app/i18n/industries";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.orchelix.com";

/* Localized marketing entries are generated from the same source of truth the
   router and the language switcher use, so the sitemap cannot drift out of
   sync with what actually exists. A page only gains a Spanish entry — and an
   `alternates` pair — once its catalogue lands in TRANSLATED_PATHS. */
function localizedEntries(now: Date): MetadataRoute.Sitemap {
  return LOCALIZED_PATHS.flatMap((path) => {
    const translated = TRANSLATED_PATHS.has(path);
    const enUrl = `${BASE}${path === "/" ? "" : path}`;
    const esUrl = `${BASE}${localizedHref(path, "es")}`;

    const languages = translated ? { en: enUrl, es: esUrl } : undefined;
    const priority = path === "/" ? 1.0 : path === "/book" || path === "/pricing" ? 0.9 : 0.8;

    const entries: MetadataRoute.Sitemap = [
      {
        url: enUrl,
        lastModified: now,
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority,
        ...(languages ? { alternates: { languages } } : {}),
      },
    ];

    if (translated) {
      entries.push({
        url: esUrl,
        lastModified: now,
        changeFrequency: path === "/" ? "weekly" : "monthly",
        priority,
        alternates: { languages },
      });
    }

    return entries;
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /* Both locales' posts, from the same module the routes prerender from.
     The Spanish set is separate rather than translated, so it is enumerated
     rather than derived from the English slugs. */
  const blogPosts: MetadataRoute.Sitemap = LOCALES.flatMap((l) =>
    getPosts(l).map((post) => ({
      url: `${BASE}${postHref(l, post.slug)}`,
      lastModified: new Date(post.dateModified ?? post.datePublished),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [
    /* Localized marketing pages, derived from the routing config. */
    ...localizedEntries(now),

    /* Everything outside the locale segment — English-only today. */
    { url: `${BASE}/try-esmi`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/acumen`,        lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/missed-calls`,  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    /* /kitchen-bath and /home-services moved into the locale segment on
       2026-08-08 and are emitted by localizedEntries() above, with their
       Spanish alternates. Listing them here as well would duplicate them. */
    { url: `${BASE}/privacy`,       lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/terms`,         lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/es/recepcionista-ia`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    /* Sector pages, derived from the same slug list the route prerenders
       from, in every locale that has the parent's copy. Hardcoding them here
       is how the sitemap and the router drifted apart before. */
    ...INDUSTRY_SLUGS.flatMap((slug) =>
      LOCALES.filter((l) => l === "en" || TRANSLATED_PATHS.has("/ai-receptionist")).map((l) => ({
        url: `${BASE}${localizedHref(`/ai-receptionist/${slug}`, l)}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      }))
    ),
    ...blogPosts,
  ];
}
