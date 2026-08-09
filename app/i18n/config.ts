/* Locale configuration.

   `en` is the DEFAULT and is served unprefixed at the root (`/pricing`), not
   at `/en/pricing`. The site has SEO history on those URLs and moving them
   would throw it away. `es` is prefixed (`/es/pricing`), which is also where
   the previous hand-duplicated Spanish tree lived, so inbound links survive.

   proxy.ts rewrites unprefixed marketing paths to `/en/...` internally; the
   address bar keeps the clean URL. */

export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Marketing routes that exist in both languages, without a locale prefix. */
export const LOCALIZED_PATHS = [
  "/",
  "/pricing",
  "/solutions",
  "/how-it-works",
  "/industries",
  "/about",
  "/book",
  "/home-services",
  "/kitchen-bath",
  "/ai-receptionist",
  "/blog",
  "/acumen",
  "/missed-calls",
] as const;

/* Which paths actually have Spanish copy today.

   This exists so the site cannot serve English body text under a `/es/` URL.
   A wrong-language page that returns 200 is worse than one that does not
   exist: it tells a Spanish-speaking visitor the bilingual claim is decorative.
   Pages absent from this list are built for `en` only, and the language
   switcher sends visitors to the Spanish home rather than a dead end.

   Move a path in here the moment its catalogue entries land — and not before. */
export const TRANSLATED_PATHS = new Set<string>([
  "/",
  "/solutions",
  "/how-it-works",
  "/pricing",
  "/industries",
  "/about",
  "/book",
  "/home-services",
  "/kitchen-bath",
  "/ai-receptionist",
  "/blog",
  "/acumen",
  "/missed-calls",
]);

export function localesFor(path: string): Locale[] {
  return TRANSLATED_PATHS.has(path) ? [...LOCALES] : [DEFAULT_LOCALE];
}

/* Spanish URLs keep English slugs on purpose. Translated slugs double the
   routing surface and break every inbound link the moment a translation is
   revised; the visible language of the page is what matters, and `hreflang`
   tells crawlers the rest. The one exception is the pre-existing
   /es/recepcionista-ia landing page, which has its own history and is left
   alone. */
export function localizedHref(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? "/es" : `/es${path}`;
}

/* Strip the locale prefix from a pathname, returning the canonical path.

   `/en` has to be handled as well as `/es`, even though English is served
   unprefixed. During prerender of `/[locale]/pricing` the router reports the
   internal path — `/en/pricing`, the target proxy.ts rewrites to — so a
   version of this that only knew about `/es` failed to recognise every English
   page, and the language switcher shipped `/es` (the Spanish home) in the
   HTML before correcting itself on hydration. Crawlers and anyone who clicked
   early got the wrong destination. */
export function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}

/** The other locale, for the language switcher. */
export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "es" : "en";
}
