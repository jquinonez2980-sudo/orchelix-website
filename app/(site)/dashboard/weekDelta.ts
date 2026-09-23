/* Week-over-week change for the Overview figures.

   A percentage on a small count is noise wearing a costume: 2 → 0 calls is
   "↓100%" in red, which reads as an outage when it's a quiet Tuesday. So
   when either week is under SMALL_COUNT the change is stated as a count
   ("2 fewer than last week") in a neutral tone. Percentages only appear once
   both weeks are big enough for one to mean something, and only a drop past
   DROP_ALERT_PCT is marked as a drop worth a look. */

export const SMALL_COUNT = 10;
export const DROP_ALERT_PCT = -25;

export type WeekDelta =
  | { kind: "count"; diff: number }
  | { kind: "pct"; value: number };

export type DeltaTone = "drop" | "neutral";

export function computeWeekDelta(
  cur: number,
  prev: number,
): { delta: WeekDelta; tone: DeltaTone } {
  if (cur < SMALL_COUNT || prev < SMALL_COUNT) {
    return { delta: { kind: "count", diff: cur - prev }, tone: "neutral" };
  }
  const pct = Math.round(((cur - prev) / prev) * 100);
  if (pct === 0) {
    return { delta: { kind: "count", diff: cur - prev }, tone: "neutral" };
  }
  return {
    delta: { kind: "pct", value: pct },
    tone: pct <= DROP_ALERT_PCT ? "drop" : "neutral",
  };
}
