import { Sparkles } from "lucide-react";

// P2 per the Voice Studio build plan (docs/ESMI_DASHBOARD_UX.md Section
// 3.6) — real scenarios drive the same /voice/tools webhook path a live
// VAPI call hits, which is a bigger backend lift than this pass covers.
// Placeholder only, so the page's information architecture is right when
// that work starts.
export default function QualityStudioStub() {
  return (
    <div className="rounded-lg border border-dashed border-line bg-surface-2/40 p-6 text-center">
      <Sparkles className="mx-auto h-6 w-6 text-teal-500" strokeWidth={1.75} />
      <p className="mt-2 font-display text-sm font-semibold text-ink">
        Quality Studio
      </p>
      <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-ink-3">
        Practice calls without risking a real customer — coming soon. It will
        run your current draft voice, greeting, and knowledge base through
        real scenarios (new lead books, FAQ only, Spanish caller, after
        hours, escalation, reschedule).
      </p>
    </div>
  );
}
