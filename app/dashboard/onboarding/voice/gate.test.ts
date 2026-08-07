import assert from "node:assert/strict";
import { test } from "node:test";

import { applyPreviewOutcome, canContinue } from "./gate.ts";

test("disabled with no voice selected and no preview", () => {
  assert.equal(canContinue({ voiceSelected: false, hasPreviewedOnce: false }), false);
});

test("disabled with a voice selected but no preview yet", () => {
  assert.equal(canContinue({ voiceSelected: true, hasPreviewedOnce: false }), false);
});

test("enabled once a voice is selected and a preview has succeeded", () => {
  assert.equal(canContinue({ voiceSelected: true, hasPreviewedOnce: true }), true);
});

test("a successful preview outcome sets hasPreviewedOnce", () => {
  assert.equal(applyPreviewOutcome(false, { ok: true }), true);
});

test("a failed preview outcome does not unlock — false stays false", () => {
  assert.equal(applyPreviewOutcome(false, { ok: false, error: "502" }), false);
});

test("a failed preview outcome does not re-lock an already-earned unlock", () => {
  assert.equal(applyPreviewOutcome(true, { ok: false, error: "502" }), true);
});
