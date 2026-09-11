/* The Ruled Record — shared primitives.

   Every marketing page is built from these so the world stays one world.
   Before this file each page carried its own inline styles, which is how the
   site drifted in the first place. Add to these rather than restyling locally.

   Seed key 8a1b2873. See the direction contract in app/layout.tsx. */

import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";

/* Six tones. `night` was added 2026-09-11 so the page can alternate dark and
   light bands; it is a step on this ladder, not a theme, and it is the only
   mechanism by which anything on this surface goes dark. */
export type Tone = "field" | "field-2" | "field-3" | "stock" | "stock-2" | "night";

const TONE_CLASS: Record<Tone, string> = {
  field: "lg-field lg-cloth",
  "field-2": "lg-field lg-cloth lg-cloth-2",
  "field-3": "lg-field lg-cloth lg-cloth-3",
  stock: "",
  "stock-2": "",
  /* `.lg-night` redeclares the whole `--lg-*` family on the band element.
     That is deliberately all it takes: the three helpers below keep handing
     back the same variable names they hand back on every light tone, and the
     cascade resolves them dark inside this subtree. */
  night: "lg-night",
};

const TONE_STYLE: Record<Tone, CSSProperties> = {
  field: {},
  "field-2": {},
  "field-3": {},
  stock: { background: "var(--lg-stock)", color: "var(--lg-ink-on-stock)" },
  "stock-2": { background: "var(--lg-stock-2)", color: "var(--lg-ink-on-stock)" },
  /* Ground and ink both come from the class, so nothing is set inline here —
     an inline background would have to be repeated by every future caller
     that wants a night band for a reason the ladder has not met yet. */
  night: {},
};

const isStock = (t: Tone) => t === "stock" || t === "stock-2";

/** True where the band paints a dark ground. Primitives that choose a
    treatment rather than a colour — which artwork, which ruling weight —
    ask this; anything choosing a colour must go through the helpers. */
export const isNight = (t: Tone) => t === "night";

/* The three ink helpers. A call site never names a colour: it names a tone
   and gets a variable, and on `night` that variable has already been
   retargeted by `.lg-night` on the band above it. This is why adding the
   sixth tone changed no call site — inkFor("night") and inkFor("field") both
   return `var(--lg-ink)`, and the band decides what that is. */
export function inkFor(tone: Tone) {
  return isStock(tone) ? "var(--lg-ink-on-stock)" : "var(--lg-ink)";
}
export function ink2For(tone: Tone) {
  return isStock(tone) ? "var(--lg-ink-on-stock-2)" : "var(--lg-ink-2)";
}
/** The quietest ink that is still text — column heads, terms, meta, dated
    margins. Four primitives below open-coded this same ternary, and three
    call sites outside this file reached for `--lg-rule` instead, which is a
    ruling colour and composited to 2.9:1 as text. Named once, it is the
    thing a call site asks for and the thing the audit can check. */
export function ink3For(tone: Tone) {
  return isStock(tone) ? "var(--lg-ink-on-stock-2)" : "var(--lg-ink-3)";
}
export function hairFor(tone: Tone) {
  /* Graphite hair on every tone — navy alpha was a pre-rebrand leftover. */
  return isStock(tone) ? "var(--lg-hair)" : "var(--lg-hair-2)";
}

/** A full-bleed section in one of the world's five tones. */
export function Section({
  tone = "field",
  id,
  children,
  className = "",
  style,
  tight,
  scene,
}: {
  tone?: Tone;
  id?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  tight?: boolean;
  scene?: boolean;
}) {
  return (
    /* `lg-world` marks the ledger surface regardless of tone. The pale stock
       tones carry no `lg-field` class, so without this they would inherit the
       legacy teal focus ring that still serves /dashboard and /try-esmi. */
    <section
      id={id}
      /* One reveal block per section — the One Moment Rule made structural.
         RevealObserver marks this on entry and the data blocks inside key
         their Rule and Settle off it. */
      data-lg-reveal=""
      className={`lg-world ${TONE_CLASS[tone]} ${scene ? "lg-scene" : ""} ${className}`.trim()}
      style={{ ...TONE_STYLE[tone], ...style }}
    >
      <div
        className={`mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10 ${
          scene ? "py-24 lg:py-36" : tight ? "py-14 lg:py-20" : "py-20 lg:py-28"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

/** Page-opening headline. Wide, light caps — the site's one display voice. */
/* The decorative visual in a page's opening column.

   Six pages carried this as a hand-written <img> with `width: 100%` and no
   reserved box, which had two consequences worth naming because they are the
   reason this component exists:

   1. The picture had no dimensions, so the browser could not reserve space
      for it. It appeared whenever its PNG finished arriving and shoved the
      CTA row beneath it down the page — the layout shift was the animation.
   2. Nothing resized them. `about-visual.png` is a 1.2MB, 971px-wide PNG
      being painted into a 320px box.

   `<Image>` with a static import fixes both: Next reads the intrinsic size at
   build time (so the ratio can't be typed in wrong, the way the Nav lockup's
   was), reserves the box, and serves a variant matched to `max`. The blur
   placeholder is what makes the settle honest — the box holds the picture's
   own colours from the first frame, so the motion lands real content rather
   than fading up an empty rectangle.

   `alt=""` + `aria-hidden` is deliberate and inherited: these carry no
   information the surrounding copy doesn't already state. */
export function PageVisual({
  src,
  max,
}: {
  src: StaticImageData;
  /* Also the layout cap. `width: 100%` means the picture is never wider than
     this, so it doubles as the `sizes` hint — no media query needed. */
  max: number;
}) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      placeholder="blur"
      /* Above the fold, so lazy would defer a picture that is already on
         screen. Not `preload` either — that queue belongs to the heading,
         which is the LCP element and the thing worth reading first. */
      loading="eager"
      sizes={`${max}px`}
      className="lg-settle-media"
      style={{ width: "100%", maxWidth: max, height: "auto" }}
    />
  );
}

/** A still that follows the band it sits in.

    Two of the marketing stills were shot under both lights and shipped as a
    day/night pair. They used to be chosen at runtime by a client component
    reading the Inscription scene's theme store — which meant a
    `"use client"` boundary, a `useSyncExternalStore` subscription, and a
    hydration flip, all to answer a question the markup already knows the
    answer to. The band's tone is the answer. This is a server component and
    picks the plate at render.

    Same reason as `inkFor`: a call site states the tone, not the artwork. */
export function TonePlate({
  day,
  night,
  alt,
  max,
  tone = "field",
}: {
  day: StaticImageData;
  night: StaticImageData;
  alt: string;
  max: number;
  tone?: Tone;
}) {
  return <Plate src={isNight(tone) ? night : day} alt={alt} max={max} />;
}

/** A named editorial still. Unlike PageVisual, this carries an alt. */
export function Plate({
  src,
  alt,
  max,
}: {
  src: StaticImageData;
  alt: string;
  max: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      placeholder="blur"
      sizes={`${max}px`}
      className="lg-settle-media"
      style={{ width: "100%", maxWidth: max, height: "auto" }}
    />
  );
}

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
    /* The registration-mark frame that sat around every page title is gone
       (2026-09-11) — four drawn plus signs read as a targeting reticle. */
    <h1
      className="lg-poster"
      style={{
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
        fontStretch: "var(--lg-stretch)",
        fontWeight: "var(--lg-w-display)",
        /* Same clamps as `.lg-poster` and the headline step, brought down
           with the move to wide, light caps. */
        fontSize: display
          ? "clamp(1.9rem, 4.6vw, 3.5rem)"
          : "clamp(1.5rem, 2.7vw, 2.4rem)",
        lineHeight: display ? 1.08 : 1.12,
        letterSpacing: "var(--lg-track-display)",
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
        fontStretch: "var(--lg-stretch)",
        fontWeight: "var(--lg-w-title)",
        fontSize: size,
        letterSpacing: "var(--lg-track-title)",
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
      /* Allowed to wrap. At the wide setting a long Spanish label ("Empieza
         un piloto de 14 días") runs past 400px, and a nowrap button pushed
         three pages sideways at 375px. `max-w-full` + a balanced wrap keeps
         it one line wherever it fits and two even lines where it does not. */
      className="lg-stamp lg-foil-surface inline-flex max-w-full items-center justify-center text-center"
      style={{
        fontFamily: "var(--font-display)",
        fontStretch: "var(--lg-stretch)",
        fontWeight: "var(--lg-w-ui)",
        fontSize: size,
        letterSpacing: "0.12em",
        lineHeight: 1.35,
        textWrap: "balance",
        textTransform: "uppercase",
        /* Same role as the Nav stamps: text ON the accent, not beside it.
           `--lg-foil-ink` is 6.42:1 on the magenta; `--lg-ink` would be
           2.1:1. Third and last hardcoded white from the rebrand. */
        color: "var(--lg-foil-ink)",
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
        fontStretch: "var(--lg-stretch)",
        fontWeight: "var(--lg-w-ui)",
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
    <dl
      className="lg-fig lg-anchor m-0"
      style={{ "--lg-anchor-w": "1px", "--lg-anchor-c": topRule } as CSSProperties}
    >
      {items.map(([term, def], i) => (
        <div
          key={term}
          className="lg-row lg-settle-item"
          style={{
            "--i": i,
            gridTemplateColumns: `${labelWidth} minmax(0,1fr)`,
            padding: "0.8rem 0",
            borderBottomColor: hairFor(tone),
          } as CSSProperties}
        >
          <dt
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: ink3For(tone),
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

/* `cols` is the lg column count, not a class string.

   It used to take an arbitrary Tailwind class, which meant the grid and the
   vertical ruling could disagree: the ruling lives in `.lg-band` CSS keyed
   on `nth-child`, and it had no way to know what the caller had asked for.
   A count keeps them in step and emits `data-cols` for the stylesheet. The
   union is closed to the counts the CSS actually rules. */
const BAND_COLS: Record<2 | 3 | 4 | 5, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

/** A ruled band read across the page — label stacked above value. */
export function Band({
  items,
  tone = "field",
  cols = 5,
}: {
  items: [string, ReactNode][];
  tone?: Tone;
  cols?: 2 | 3 | 4 | 5;
}) {
  return (
    <dl
      data-cols={cols}
      className={`lg-fig lg-band lg-anchor m-0 grid grid-cols-2 sm:grid-cols-3 ${BAND_COLS[cols]}`}
      style={{ "--lg-anchor-w": "1px" } as CSSProperties}
    >
      {items.map(([term, def], i) => (
        <div
          key={term}
          className="lg-settle-item"
          style={{ "--i": i, padding: "1.1rem 1.1rem 1.2rem 0" } as CSSProperties}
        >
          <dt
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: ink3For(tone),
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

/* Disclosure rows. The native marker is removed and drawn instead: a foil
   rule that extends when the row opens (`.lg-summary`).

   Lifted out of /pricing, where it was inline, because two more pages now
   need it and per-page copies of a component are how the site drifted
   before. /pricing renders through this now too. */
export function Disclosure({
  items,
  tone = "field",
}: {
  items: { q: string; a: string }[];
  tone?: Tone;
}) {
  return (
    <div className="lg-anchor" style={{ "--lg-anchor-w": "2px" } as CSSProperties}>
      {items.map((f, i) => (
        <details
          key={f.q}
          className="lg-settle-item"
          style={{
            "--i": i,
            borderBottom: `1px solid ${hairFor(tone)}`,
            padding: "1.1rem 0",
          } as CSSProperties}
        >
          <summary
            className="lg-summary"
            style={{
              fontFamily: "var(--font-display)",
              fontStretch: "var(--lg-stretch)",
              fontWeight: "var(--lg-w-ui)",
              fontSize: "1rem",
              letterSpacing: "0.005em",
              color: inkFor(tone),
              cursor: "pointer",
            }}
          >
            {f.q}
          </summary>
          <Prose tone={tone} size="0.9375rem" max="72ch" style={{ marginTop: "0.85rem" }}>
            {f.a}
          </Prose>
        </details>
      ))}
    </div>
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
      className={`lg-anchor grid gap-x-14 ${columns === 2 ? "sm:grid-cols-2" : ""}`}
      style={{ "--lg-anchor-w": "2px" } as CSSProperties}
    >
      {entries.map((e, i) => (
        <article
          key={e.title}
          className="lg-row lg-settle-item"
          style={{
            "--i": i,
            gridTemplateColumns: "minmax(0,1fr)",
            padding: "1.6rem 0",
            gap: "0.5rem",
            borderBottomColor: hairFor(tone),
          } as CSSProperties}
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
                  color: ink3For(tone),
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
