import type { Messages } from "@/app/i18n/messages/en";
import { localizedHref, type Locale } from "@/app/i18n/config";
import {
  Section,
  PageTitle,
  SectionTitle,
  Prose,
  Stamp,
  QuietAction,
  RuledList,
  Band,
  EntryList,
} from "@/app/components/ledger";

/* Shared body for the vertical landing pages (/home-services, /kitchen-bath).

   Converted from the light world 2026-08-08. Removed wholesale, each a
   craft-floor or DESIGN.md ban rather than a taste call:

   - the `eyebrow` prop — a kicker above the H1 (No Kicker Rule);
   - the `gradientWord` prop — gradient text, and set in italic serif inside
     a display heading besides;
   - a radial-gradient wash and a dot-grid texture under the hero;
   - three identical rounded cards with a big coloured number on each, which
     is the same-size-icon-heading-text row the craft floor bans, and the
     numbers were fabricated (see the catalogue comment in en.ts);
   - `01 / 02 / 03 / 04` step numbering (No Kicker Rule);
   - 18px and 24px corner radii, and card shadows (No Float Rule);
   - a `📞` emoji and two `→` arrows used as icons (Unicode glyph ban);
   - a centered hero, which is the layout this world exists to refuse.

   The page is now the same stack of ruled bands as every other marketing
   route, and both verticals compose from one shape so they cannot drift
   apart again. Motion comes from the primitives — Rule on each block's
   anchor, Settle on its rows — so there is nothing per-page to tune. */

type Vertical = Messages["pages"]["verticals"]["homeServices"];

export default function VerticalPage({
  v,
  t,
  locale,
}: {
  v: Vertical;
  t: Messages;
  locale: Locale;
}) {
  return (
    <main id="main-content">
      {/* ── Opening: the offer, and the facts that qualify it ── */}
      <Section tone="field" scene>
        {/* Centered rather than bottom-aligned: the right column here is a
            data block, not the short action group the other pages put there,
            and end-alignment left a viewport-tall void beside the headline. */}
        <div className="grid gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center">
          <div>
            <PageTitle max="15ch">{v.heading}</PageTitle>
            <Prose size="1.0625rem" max="46ch" style={{ marginTop: "1.7rem" }}>
              {v.lede}
            </Prose>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Stamp href={localizedHref("/book", locale)}>{t.common.bookPilot}</Stamp>
              <QuietAction href="/try-esmi">{t.common.hearRealCall}</QuietAction>
            </div>
          </div>

          {/* Reads across, so it does not double the axis of the ruled list
              further down the page. */}
          <Band items={v.facts} cols={2} />
        </div>
      </Section>

      {/* ── What the phone costs ── */}
      <Section tone="stock">
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <SectionTitle tone="stock" max="14ch">
            {v.slipsHeading}
          </SectionTitle>
          <EntryList tone="stock" entries={v.slips} />
        </div>
      </Section>

      {/* ── How the call goes ── */}
      <Section tone="field-2">
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <SectionTitle max="12ch">{v.callHeading}</SectionTitle>
          <RuledList items={v.call} labelWidth="7rem" />
        </div>
      </Section>

      {/* ── Close ── */}
      <Section tone="field-3" style={{ borderTop: "2px solid var(--lg-foil)" }}>
        <div className="grid items-end gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <SectionTitle scale="display" max="16ch">
              {v.closeHeading}
            </SectionTitle>
            <Prose size="1.0625rem" max="50ch" style={{ marginTop: "1.5rem" }}>
              {v.closeBody}
            </Prose>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
            <Stamp href={localizedHref("/book", locale)} size="1rem">
              {t.common.bookPilot}
            </Stamp>
            <QuietAction href={localizedHref("/pricing", locale)}>
              {t.common.seePricing}
            </QuietAction>
          </div>
        </div>
      </Section>
    </main>
  );
}
