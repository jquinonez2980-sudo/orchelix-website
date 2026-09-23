import assert from "node:assert/strict";
import { test } from "node:test";
import { computeWeekDelta } from "./weekDelta.ts";

test("small counts report a count difference, never a percentage", () => {
  assert.deepEqual(computeWeekDelta(0, 2), {
    delta: { kind: "count", diff: -2 },
    tone: "neutral",
  });
  // prior week big, this week small — still a count, still neutral
  assert.deepEqual(computeWeekDelta(4, 11), {
    delta: { kind: "count", diff: -7 },
    tone: "neutral",
  });
  assert.deepEqual(computeWeekDelta(3, 0).delta, { kind: "count", diff: 3 });
});

test("equal weeks read as no change", () => {
  assert.deepEqual(computeWeekDelta(0, 0).delta, { kind: "count", diff: 0 });
  assert.deepEqual(computeWeekDelta(40, 40).delta, { kind: "count", diff: 0 });
});

test("large counts report a percentage", () => {
  assert.deepEqual(computeWeekDelta(30, 20), {
    delta: { kind: "pct", value: 50 },
    tone: "neutral",
  });
});

test("only a meaningful drop is toned as a drop", () => {
  assert.equal(computeWeekDelta(18, 20).tone, "neutral"); // -10%
  assert.equal(computeWeekDelta(15, 20).tone, "drop"); // -25%
  assert.equal(computeWeekDelta(10, 40).tone, "drop"); // -75%
});

test("a sub-1% move falls back to the count", () => {
  assert.deepEqual(computeWeekDelta(400, 401).delta, { kind: "count", diff: -1 });
});
