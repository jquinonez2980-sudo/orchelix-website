import type { Locale } from "@/app/i18n/config";
import { POSTS, type Block, type Post } from "./en";
import { ES_POSTS, type EsPost } from "./es";

export type { Block, Post } from "./en";

/* One locale-aware view over two hand-written post sets.

   The Spanish posts are not translations of the English ones — they are a
   separate, smaller set with their own slugs and their own SEO history, and
   only three of them have an English counterpart. So this cannot be the
   `localizedHref` treatment the rest of the site uses: a post's alternate is
   a lookup, not a prefix, and most posts have none.

   `enSlug` on the Spanish posts already carried that pairing; this module is
   where it finally gets read for both directions. */

/** The shape both locales share, once the ES-only `enSlug` is set aside. */
export type AnyPost = Post | EsPost;

export function getPosts(locale: Locale): AnyPost[] {
  const set: AnyPost[] = locale === "es" ? ES_POSTS : POSTS;
  return [...set].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
}

export function getPost(locale: Locale, slug: string): AnyPost | undefined {
  return (locale === "es" ? (ES_POSTS as AnyPost[]) : (POSTS as AnyPost[])).find(
    (p) => p.slug === slug
  );
}

export function getSlugs(locale: Locale): string[] {
  return (locale === "es" ? ES_POSTS : POSTS).map((p) => p.slug);
}

/** The counterpart slug in the other locale, or undefined if there is none. */
export function counterpartSlug(locale: Locale, slug: string): string | undefined {
  if (locale === "es") return ES_POSTS.find((p) => p.slug === slug)?.enSlug;
  return ES_POSTS.find((p) => p.enSlug === slug)?.slug;
}

/** Canonical path for a post in its own locale. */
export function postHref(locale: Locale, slug: string): string {
  return locale === "es" ? `/es/blog/${slug}` : `/blog/${slug}`;
}
