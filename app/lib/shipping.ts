/* Where the shop ships, and what it charges. One place, so the product page
   and the checkout API can never disagree.

   Orders ship from Toronto, Ontario, to Canada and the United States only.
   The buyer picks the destination on the product page; checkout then only
   accepts an address in that country and adds that country's flat rate.

   The amounts are in the product currency (CAD). They are PROPOSED
   (2026-09-26) from typical Canada Post tracked-packet prices for one tee,
   pending confirmation. Change them here and nowhere else. */

export const SHIPS_FROM = "Toronto, Ontario";

export const SHIPPING = {
  CA: { country: "Canada", to: "Canada", amount: 12, label: "Standard shipping, Canada" },
  US: { country: "United States", to: "the United States", amount: 18, label: "Standard shipping, United States" },
} as const;

export type ShipCountry = keyof typeof SHIPPING;

export const SHIP_COUNTRIES = Object.keys(SHIPPING) as ShipCountry[];

export function isShipCountry(value: unknown): value is ShipCountry {
  return typeof value === "string" && value in SHIPPING;
}
