/* The Ruled Record — shared primitives.

   Every marketing page is built from these so the world stays one world.
   Before this file each page carried its own inline styles, which is how the
   site drifted in the first place. Add to these rather than restyling locally.

   Seed key 8a1b2873. See the direction contract in app/layout.tsx. */

import type { CSSProperties, ReactNode } from "react";

type Tone = "field" | "field-2" | "field-3" | "stock" | "stock-2";

const TONE_CLASS: Record<Tone, string> = {
  field: "lg-field lg-cloth",
  "field-2": "lg-field lg-cloth lg-cloth-2",
  "field-3": "lg-field lg-cloth lg-cloth-3",
  stock: "",
  "stock-2": "",
};

const TONE_STYLE: Record<Tone, CSSProperties> = {
  field: {},
  "field-2": {},
  "field-3": {},
  stock: { background: "var(--lg-stock)", color: "var(--lg-ink-on-stock)" },
  "stock-2": { background: "var(--lg-stock-2)", color: "var(--lg-ink-on-stock)" },
};

const isStock = (t: Tone) => t === "stock" || t === "stock-2";

export function inkFor(tone: Tone) {
  return isStock(tone) ? "var(--lg-ink-on-stock)" : "var(--lg-ink)";
}
export function ink2For(tone: Tone) {
  return isStock(tone) ? "var(--lg-ink-on-stock-2)" : "var(--lg-ink-2)";
}
export function hairFor(tone: Tone) {
  return isStock(tone) ? "rgba(16,36,58,0.14)" : "var(--lg-hair-2)";
}

/** A full-bleed section in one of the world's five tones. */
export function Section({
  tone = "field",
  id,
  children,
  className = "",
  style,
  tight,
}: {
  tone?: Tone;
  id?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  tight?: boolean;
}) {
  return (
    /* `lg-world` marks the ledger surface regardless of tone. The pale stock
       tones carry no `lg-field` class, so without this they would inherit the
       legacy teal focus ring that still serves /dashboard and /try-esmi. */
    <section
      id={id}
      className={`lg-world ${TONE_CLASS[tone]} ${className}`}
      style={{ ...TONE_STYLE[tone], ...style }}
    >
      <div
        className={`mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10 ${
          tight ? "py-14 lg:py-20" : "py-20 lg:py-28"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

/** Page-opening headline. Condensed caps — the ledger's column-head voice. */
export function PageTitle({
  children,
  tone = "field",
  max = "18ch",
}: {
  children: ReactNode;
  tone?: Tone;
  max?: string;
}) {
  return (
    <h1
      style={{
        fontFamily: "var(--font-display)",
        fontStretch: "82%",
        fontWeight: 700,
        fontSize: "clamp(2.5rem, 5.4vw, 4.25rem)",
        lineHeight: 0.96,
        letterSpacing: "-0.028em",
        textTransform: "uppercase",
        color: inkFor(tone),
        maxWidth: max,
        textWrap: "balance",
        margin: 0,
      }}
    >
      {children}
    </h1>
  );
}

/* `as` exists so a heading that is semantically an h3 can still carry the
   canonical headline size. Without it the alternative is re-declaring the
   clamp inline, which is how the type ramp drifted in the first place.

   `scale="display"` borrows the Display clamp for a heading that has to
   anchor rather than divide — the page's closing call. Both clamps are
   canonized in DESIGN.md, so this stays inside the closed ramp; it is the
   one place a section heading is allowed to reach display scale. */
export function SectionTitle({
  children,
  tone = "field",
  max = "20ch",
  as: Tag = "h2",
  scale = "headline",
}: {
  children: ReactNode;
  tone?: Tone;
  max?: string;
  as?: "h2" | "h3";
  scale?: "headline" | "display";
}) {
  const display = scale === "display";
  return (
    <Tag
      style={{
        fontFamily: "var(--font-display)",
        fontStretch: "82%",
        fontWeight: 700,
        fontSize: display
          ? "clamp(2.5rem, 5.4vw, 4.25rem)"
          : "clamp(1.85rem, 3.2vw, 2.9rem)",
        lineHeight: display ? 0.94 : 1.02,
        letterSpacing: display ? "-0.028em" : "-0.022em",
        textTransform: "uppercase",
        color: inkFor(tone),
        maxWidth: max,
        margin: 0,
      }}
    >
      {children}
    </Tag>
  );
}

export function EntryTitle({
  children,
  tone = "field",
  size = "1.1875rem",
}: {
  children: ReactNode;
  tone?: Tone;
  size?: string;
}) {
  return (
    <h3
      style={{
        fontFamily: "var(--font-display)",
        fontStretch: "86%",
        fontWeight: 600,
        fontSize: size,
        letterSpacing: "-0.008em",
        textTransform: "uppercase",
        color: inkFor(tone),
        margin: 0,
      }}
    >
      {children}
    </h3>
  );
}

/** Body copy. Literata, measured to stay inside a readable line length. */
export function Prose({
  children,
  tone = "field",
  size = "1rem",
  max = "58ch",
  style,
}: {
  children: ReactNode;
  tone?: Tone;
  size?: string;
  max?: string;
  style?: CSSProperties;
}) {
  return (
    <p
      className="lg-prose"
      style={{
        fontFamily: "var(--font-body)",
        fontSize: size,
        lineHeight: 1.62,
        color: ink2For(tone),
        maxWidth: max,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </p>
  );
}

/** The stamp. Reserved for the primary action — keep it scarce. */
export function Stamp({
  href,
  children,
  size = "0.9375rem",
}: {
  href: string;
  children: ReactNode;
  size?: string;
}) {
  return (
    <a
      href={href}
      className="lg-stamp lg-foil-surface inline-flex items-center whitespace-nowrap"
      style={{
        fontFamily: "var(--font-display)",
        fontStretch: "88%",
        fontWeight: 700,
        fontSize: size,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#2A1D02",
        padding: "0.95rem 1.7rem",
        textDecoration: "none",
      }}
    >
      {children}
    </a>
  );
}

/** Secondary action — a rule that draws in from the left on hover. */
export function QuietAction({
  href,
  children,
  tone = "field",
}: {
  href: string;
  children: ReactNode;
  tone?: Tone;
}) {
  return (
    <a
      href={href}
      className="lg-quiet"
      style={{
        fontFamily: "var(--font-display)",
        fontStretch: "88%",
        fontWeight: 600,
        fontSize: "0.9375rem",
        letterSpacing: "0.04em",
        color: inkFor(tone),
        textDecoration: "none",
      }}
    >
      {children}
    </a>
  );
}

/** A keyed status marker — the register legend's device, reused. */
export function StatusKey({
  children,
  color = "var(--lg-foil)",
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <span className="lg-fig inline-flex items-baseline gap-2">
      <span
        aria-hidden="true"
        style={{ width: 14, height: 2, background: color, transform: "translateY(-0.25em)" }}
      />
      <span
        style={{
          fontSize: "0.625rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color,
        }}
      >
        {children}
      </span>
    </span>
  );
}

/** A vertical ruled register: label left, value right, one entry per row. */
export function RuledList({
  items,
  tone = "field",
  labelWidth = "9rem",
  topRule = "var(--lg-rule)",
}: {
  items: [string, ReactNode][];
  tone?: Tone;
  labelWidth?: string;
  topRule?: string;
}) {
  return (
    <dl className="lg-fig m-0" style={{ borderTop: `1px solid ${topRule}` }}>
      {items.map(([term, def]) => (
        <div
          key={term}
          className="lg-row"
          style={{
            gridTemplateColumns: `${labelWidth} minmax(0,1fr)`,
            padding: "0.8rem 0",
            borderBottomColor: hairFor(tone),
          }}
        >
          <dt
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: isStock(tone) ? "var(--lg-ink-on-stock-2)" : "var(--lg-ink-3)",
            }}
          >
            {term}
          </dt>
          <dd
            style={{
              margin: 0,
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              color: inkFor(tone),
            }}
          >
            {def}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** A ruled band read across the page — label stacked above value. */
export function Band({
  items,
  tone = "field",
  cols = "lg:grid-cols-5",
}: {
  items: [string, ReactNode][];
  tone?: Tone;
  cols?: string;
}) {
  return (
    <dl
      className={`lg-fig lg-band m-0 grid grid-cols-2 sm:grid-cols-3 ${cols}`}
      style={{ borderTop: "1px solid var(--lg-rule)" }}
    >
      {items.map(([term, def]) => (
        <div key={term} style={{ padding: "1.1rem 1.1rem 1.2rem 0" }}>
          <dt
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: isStock(tone) ? "var(--lg-ink-on-stock-2)" : "var(--lg-ink-3)",
              marginBottom: "0.5rem",
            }}
          >
            {term}
          </dt>
          <dd
            style={{
              margin: 0,
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              lineHeight: 1.45,
              color: ink2For(tone),
            }}
          >
            {def}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Stacked ruled entries — a heading and a paragraph per row. */
export function EntryList({
  entries,
  tone = "field",
  columns = 1,
}: {
  entries: { title: string; desc: string; meta?: string }[];
  tone?: Tone;
  columns?: 1 | 2;
}) {
  return (
    <div
      className={`grid gap-x-14 ${columns === 2 ? "sm:grid-cols-2" : ""}`}
      style={{ borderTop: "2px solid var(--lg-rule)" }}
    >
      {entries.map((e) => (
        <article
          key={e.title}
          className="lg-row"
          style={{
            gridTemplateColumns: "minmax(0,1fr)",
            padding: "1.6rem 0",
            gap: "0.5rem",
            borderBottomColor: hairFor(tone),
          }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
            <EntryTitle tone={tone} size="1.0625rem">
              {e.title}
            </EntryTitle>
            {e.meta ? (
              <span
                className="lg-fig"
                style={{
                  fontSize: "0.625rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: isStock(tone) ? "var(--lg-ink-on-stock-2)" : "var(--lg-ink-3)",
                }}
              >
                {e.meta}
              </span>
            ) : null}
          </div>
          <Prose tone={tone} size="0.9375rem" max="60ch">
            {e.desc}
          </Prose>
        </article>
      ))}
    </div>
  );
}
