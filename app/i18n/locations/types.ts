/* Shape of a metro page's copy.

   Local pages earn their place or they are doorway pages. Google's guidance
   on scaled content is explicit: near-duplicate pages differing only by a
   swapped city name are spam, and the algorithmic penalty lands on the
   whole directory, not the offending page. So this type has no "city name"
   slot to interpolate into shared boilerplate. Every field below is written
   per metro, and the two that carry the local proof — `phoneContext` and
   `sectors` — cannot be filled in without knowing something true about the
   place.

   Claims policy, inherited from the 2026-08 honesty pass: nothing here may
   assert a client count, a named customer, or a statistic we have not
   verified. Specificity comes from facts about the market (area codes, the
   sector mix, the language reality of the phone), not from invented
   traction. */

export type LocationSector = { name: string; body: string };
export type LocationFAQ = { q: string; a: string };

export type LocationPage = {
  slug: string;
  /** Display name, as a local would say it. */
  name: string;
  /** "Florida" / "Ontario" — used in the title and the schema's region. */
  region: string;
  regionCode: string;
  country: "US" | "CA";
  /** Area codes a caller from this metro most likely dials from. */
  areaCodes: string[];
  title: string;
  description: string;
  hero: { headline: string; sub: string };
  /** Why the phone behaves the way it does in this specific market. */
  phoneContext: { title: string; body: string }[];
  /** The sector mix that actually generates inbound calls here. */
  sectors: LocationSector[];
  faqs: LocationFAQ[];
  schema: { serviceDescription: string };
};
