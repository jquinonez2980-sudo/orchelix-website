/* Shared status/outcome/role pill — one semantic scale reused across the
   dashboard (Calls outcomes, Leads status, Team roles, Billing account
   status, Usage/Billing plan soft-limit status, Admin) instead of every
   page hand-rolling its own badge markup and color choice.

   Converted to the Ruled Record 2026-08-08. Tones are written as explicit
   ledger tokens rather than Tailwind palette utilities, because this is the
   one file where status *semantics* live — leaving it to the blanket colour
   overrides in globals.css would make `positive` and `warning` both resolve
   to foil and destroy the distinction on an operating surface.

   The scale maps onto the call register's own vocabulary:
     positive → tick green   (ANSWERED)
     warning  → foil         (BOOKED / needs attention)
     negative → rule red     (ROUTED / failed)
     neutral  → ink 3        (CLOSED / inert)

   NOTE: the source scale had six tones; this world has four status colours.
   `info` and `violet` (voicemail) are held apart from `neutral` by ink tier
   and border weight rather than by hue — a real distinction, but a smaller
   one than before. If voicemail must keep its own colour, that is a
   design-system decision to take deliberately, not a token to invent here. */

export type BadgeTone = "neutral" | "positive" | "warning" | "negative" | "info" | "violet";

type ToneStyle = { color: string; background: string; borderColor: string };

const TONES: Record<BadgeTone, ToneStyle> = {
  neutral: {
    color: "var(--lg-ink-3)",
    background: "transparent",
    borderColor: "var(--lg-hair)",
  },
  positive: {
    color: "var(--lg-tick-text)",
    background: "rgba(47, 143, 107, 0.12)",
    borderColor: "rgba(47, 143, 107, 0.34)",
  },
  warning: {
    color: "var(--lg-foil)",
    background: "rgba(217, 162, 27, 0.10)",
    borderColor: "rgba(217, 162, 27, 0.34)",
  },
  negative: {
    color: "var(--lg-rule-text)",
    background: "rgba(180, 52, 42, 0.12)",
    borderColor: "var(--lg-rule-quiet)",
  },
  info: {
    color: "var(--lg-ink)",
    background: "transparent",
    borderColor: "var(--lg-hair)",
  },
  violet: {
    color: "var(--lg-ink-2)",
    background: "transparent",
    borderColor: "var(--lg-rule-quiet)",
  },
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
      className="lg-fig inline-flex items-center border px-2 py-0.5"
      style={{
        ...TONES[tone],
        fontSize: "0.625rem",
        letterSpacing: "0.11em",
        textTransform: "uppercase",
        borderRadius: 0,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
