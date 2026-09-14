import Stripe from "stripe";

let stripeClient: Stripe | null = null;

// Lazily constructed so the app can build and render pages (including /shop
// pages that never hit checkout) even before STRIPE_SECRET_KEY is set.
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Add it to .env.local — see .env.example."
    );
  }
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-06-20",
    });
  }
  return stripeClient;
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
