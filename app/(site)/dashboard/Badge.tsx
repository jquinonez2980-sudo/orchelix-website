/* Shared status/outcome/role pill — one semantic scale reused across the
   dashboard (Calls outcomes, Leads status, Team roles, Billing account
   status, Usage/Billing plan soft-limit status, Admin) instead of every
   page hand-rolling its own badge markup and color choice.

   Single-accent Status Scale (DESIGN.md): foil marks attention / pending /
   the "AI moment" (booked). Everything else is separated by ink tier, border
   weight, and the label — never a second green or red hue. Green/red fills
   were retired 2026-08-12 so the product surface matches the marketing
   register's one-accent notation. */

export type BadgeTone = "neutral" | "positive" | "warning" | "negative" | "info" | "violet";

type ToneStyle = { color: string; background: string; borderColor: string };

const TONES: Record<BadgeTone, ToneStyle> = {
  neutral: {
    color: "var(--lg-ink-3)",
    background: "transparent",
    borderColor: "var(--lg-hair)",
  },
  /* Success / answered — ink on a quiet hair fill, not green. */
  positive: {
    color: "var(--lg-ink)",
    background: "var(--lg-hair-2)",
    borderColor: "var(--lg-hair)",
  },
  /* Attention / booked — the only foil-tinted state. Literal rather than a
     var() because there's no `--lg-foil-tint` token; kept in step with
     `--lg-foil` by hand. Cyan on the Esmi dashboard (was Orchelix magenta —
     this file is dashboard-only, never imported by /app, so it doesn't
     need the `.esmi-dashboard` scoping the shared token file uses). */
  warning: {
    color: "var(--lg-foil)",
    background: "rgba(0, 240, 255, 0.10)",
    borderColor: "rgba(0, 240, 255, 0.34)",
  },
  /* Failure / missed — heavier graphite rule, not red. */
  negative: {
    color: "var(--lg-ink)",
    background: "transparent",
    borderColor: "var(--lg-rule)",
  },
  info: {
    color: "var(--lg-ink)",
    background: "transparent",
    borderColor: "var(--lg-hair)",
  },
  /* Secondary inert state — same ink family, quieter border. */
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
