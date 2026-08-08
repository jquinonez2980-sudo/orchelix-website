// Pure gate logic for the onboarding "Voice & greeting" step
// (docs/ESMI_DASHBOARD_UX.md Section 7 Step 3). No React/DOM dependency on
// purpose — see gate.test.ts, run via `node --test` (no test runner is set
// up in this repo yet; Node 24's built-in TS type-stripping runs this file
// directly, so this doesn't require adding one).

export type GateState = {
  voiceSelected: boolean;
  hasPreviewedOnce: boolean;
};

// Voice selection isn't a real blocker today — VOICE_CATALOG
// (app/dashboard/voice/VoiceStudio.tsx) has exactly one entry, pre-selected
// by default, so this is here for when a real picker ships, not because it
// currently withholds Continue.
export function canContinue(state: GateState): boolean {
  return state.voiceSelected && state.hasPreviewedOnce;
}

export const CONTINUE_DISABLED_TOOLTIP =
  "Preview your greeting once so you know how Esmi sounds";

export type PreviewOutcome = { ok: true } | { ok: false; error: string };

// Applied to `hasPreviewedOnce` on every preview attempt this session. A
// failed preview (ok: false) must never flip it to true — this is the "does
// a failed preview unlock Continue" invariant the spec calls out explicitly.
export function applyPreviewOutcome(hasPreviewedOnce: boolean, outcome: PreviewOutcome): boolean {
  if (outcome.ok) return true;
  return hasPreviewedOnce;
}
