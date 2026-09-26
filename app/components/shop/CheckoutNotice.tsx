"use client";

import { useSearchParams } from "next/navigation";

/* Stripe sends the buyer back to the product page with ?checkout=success
   (paid) or ?checkout=canceled (left checkout, nothing charged). */
export default function CheckoutNotice() {
  const state = useSearchParams().get("checkout");
  if (state === "success") {
    return (
      <p className="pdp__notice" data-state="success" role="status">
        Payment received. Thank you, your order is in.
      </p>
    );
  }
  if (state === "canceled") {
    return (
      <p className="pdp__notice" data-state="canceled" role="status">
        Checkout canceled. Nothing was charged.
      </p>
    );
  }
  return null;
}
