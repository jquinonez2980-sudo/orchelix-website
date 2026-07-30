/* Shared status/outcome/role pill — one semantic scale reused across the
   dashboard (Calls outcomes, Leads status, Team roles, Billing account
   status, Usage/Billing plan soft-limit status, Admin) instead of every
   page hand-rolling its own badge markup and color choice. */

export type BadgeTone = "neutral" | "positive" | "warning" | "negative" | "info";

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: "bg-surface-2 text-ink-3 border-line",
  positive: "bg-teal-50 text-teal-700 border-teal-200",
  warning: "bg-amber-50 text-amber-800 border-amber-200",
  negative: "bg-rose-50 text-rose-700 border-rose-200",
  info: "bg-navy-50 text-navy-600 border-navy-200",
};

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: BadgeTone;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${TONE_CLASSES[tone]}`}
    >
      {children}
    </span>
  );
}
