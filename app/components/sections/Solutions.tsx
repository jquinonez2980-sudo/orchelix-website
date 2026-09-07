/* The stack, set as a ledger contents page. Esmi is live and carries the
   weight of a full entry; the other two are ruled lines with an honest
   status column. SpotlightCard hover on agent entries (React Bits). */

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
import SpotlightCard from "@/app/components/react-bits/SpotlightCard";

export default function Solutions({ locale, t }: { locale: Locale; t: Messages }) {
  return (
    <Section id="solutions" tone="field-2">
      <div className="mb-12">
        <SectionTitle max="20ch">{t.home.stackTitle}</SectionTitle>
        <Prose size="1.0625rem" max="50ch" style={{ marginTop: "1.5rem" }}>
          {t.home.stackBody}
        </Prose>
      </div>

      <div className="mb-24">
        <Band items={t.home.shared} />
      </div>

      <SpotlightCard
        className="rounded-[14px] border border-[color:var(--lg-hair)] bg-[color:var(--lg-field)]"
        spotlightColor="rgba(13, 92, 99, 0.14)"
        style={{ borderTop: "2px solid var(--lg-foil)" }}
      >
        <article
          style={{ padding: "2rem", display: "grid", gap: "2rem" }}
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

          <RuledList items={t.home.esmiProduces} topRule="var(--lg-hair)" />
        </article>
      </SpotlightCard>

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
          <SpotlightCard
            key={s.title}
            className="rounded-[10px]"
            spotlightColor="rgba(13, 92, 99, 0.10)"
            style={{
              padding: "1.9rem 1rem",
              marginTop: "0.35rem",
              borderBottom: "1px solid var(--lg-hair)",
            }}
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
            <Prose size="0.9375rem" max="62ch" style={{ marginTop: "0.7rem" }}>
              {s.desc}
            </Prose>
          </SpotlightCard>
        ))}
      </div>
    </Section>
  );
}
