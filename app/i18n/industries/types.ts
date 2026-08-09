/* Shape of a sector page's copy.

   `icon` and `eyebrow` were dropped in the 2026-08-08 conversion: the first
   drove a row of same-size icon + heading + text cards and the second was a
   kicker above the H1, both craft-floor bans. Slugs stay English in both
   locales, matching the policy in app/i18n/config.ts — translated slugs
   double the routing surface and break inbound links on every revision. */

export type IndustryEntry = { title: string; body: string };
export type IndustryFAQ = { q: string; a: string };

export type Industry = {
  slug: string;
  name: string;
  title: string;
  description: string;
  hero: { headline: string; sub: string };
  problems: IndustryEntry[];
  benefits: IndustryEntry[];
  faqs: IndustryFAQ[];
  schema: { serviceType: string; serviceDescription: string };
};
