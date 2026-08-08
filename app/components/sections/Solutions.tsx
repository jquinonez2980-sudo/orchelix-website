/* The stack, set as a ledger contents page. Esmi is live and carries the
   weight of a full entry; the other two are ruled lines with an honest
   status column. Three identical cards would flatten a real difference. */

import {
  Section,
  SectionTitle,
  EntryTitle,
  Prose,
  Stamp,
  QuietAction,
  StatusKey,
  RuledList,
  Band,
} from "@/app/components/ledger";
import { localizedHref, type Locale } from "@/app/i18n/config";
import type { Messages } from "@/app/i18n/messages/en";

export default function Solutions({ locale, t }: { locale: Locale; t: Messages }) {
  return (
    <Section id="solutions" tone="field-2">
      <div className="mb-12">
        <SectionTitle max="20ch">{t.home.stackTitle}</SectionTitle>
        <Prose size="1.0625rem" max="50ch" style={{ marginTop: "1.5rem" }}>
          {t.home.stackBody}
        </Prose>
      </div>

      {/* What every agent shares, whether it has shipped or not. Set across
          the page as a ruled band, not down it — the Esmi spec list below is
          a vertical ledger entry, and two identical devices in sequence would
          flatten the difference between "shared" and "what Esmi is". */}
      <div className="mb-24">
        <Band items={t.home.shared} />
      </div>

      {/* ── The shipped entry ── */}
      <article
        style={{ borderTop: "2px solid var(--lg-foil)", paddingTop: "2rem", display: "grid", gap: "2rem" }}
        className="lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-x-14"
      >
        <div>
          <div className="mb-4">
            <StatusKey>{t.common.inProduction}</StatusKey>
          </div>

          <SectionTitle as="h3" max="16ch">
            {t.home.esmiName}
          </SectionTitle>

          <Prose size="1rem" max="46ch" style={{ marginTop: "1.2rem" }}>
            {t.home.esmiBody}
          </Prose>

          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
            <Stamp href={localizedHref("/book", locale)} size="0.875rem">
              {t.common.bookPilot}
            </Stamp>
            <QuietAction href={localizedHref("/solutions", locale)}>
              {t.home.whatEsmiHandles}
            </QuietAction>
          </div>
        </div>

        {/* What one call produces — the artifact, not a feature list. */}
        <RuledList items={t.home.esmiProduces} topRule="var(--lg-hair)" />
      </article>

      {/* ── The unshipped entries ── */}
      <div className="mt-20">
        <p
          className="lg-fig"
          style={{
            fontSize: "0.625rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--lg-ink-3)",
            paddingBottom: "0.85rem",
            borderBottom: "1px solid var(--lg-rule)",
            margin: 0,
          }}
        >
          {t.common.inDevelopment}
        </p>

        {t.home.inDev.map((s) => (
          <article
            key={s.title}
            className="lg-row"
            style={{ gridTemplateColumns: "minmax(0,1fr)", padding: "1.9rem 0", gap: "0.7rem" }}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <EntryTitle size="1.25rem">{s.title}</EntryTitle>
              <span
                className="lg-fig"
                style={{
                  fontSize: "0.625rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--lg-ink-3)",
                }}
              >
                {s.scope}
              </span>
            </div>
            <Prose size="0.9375rem" max="62ch">
              {s.desc}
            </Prose>
          </article>
        ))}
      </div>
    </Section>
  );
}
