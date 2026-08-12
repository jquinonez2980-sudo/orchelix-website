/* Lightweight product analytics for top-tier funnel events.
   Uses Vercel Analytics when available; always no-ops safely. */

type EventName =
  | "hear_play"
  | "book_submit"
  | "get_started_submit"
  | "coach_save"
  | "call_review"
  | "lang_switch_dash";

export function track(event: EventName, props?: Record<string, string | number | boolean>) {
  try {
    if (typeof window === "undefined") return;
    /* dynamic import would be async; window.va is injected by @vercel/analytics */
    const va = (window as unknown as { va?: (c: string, e: string, p?: object) => void }).va;
    if (typeof va === "function") {
      va("event", event, props);
    }
  } catch {
    /* never break product flows for analytics */
  }
}
