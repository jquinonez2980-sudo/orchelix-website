import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import { Section, PageTitle, Prose, RuledList } from "@/app/components/ledger";

export const metadata: Metadata = {
  title: "Terms of Service | Orchelix",
  description: "Terms governing your use of the Orchelix website and AI agent services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Section tone="field" scene>
          <PageTitle max="14ch">Terms of service</PageTitle>
          <Prose size="1.0625rem" max="48ch" style={{ marginTop: "1.5rem" }}>
            These Terms govern access to the Orchelix website and services. By
            using either, you agree to them. Specific pilots and deployments are
            also governed by your signed Service Agreement.
          </Prose>
          <p
            className="lg-fig mt-4"
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--lg-ink-3)",
            }}
          >
            Effective June 1, 2026 · Updated August 12, 2026
          </p>
        </Section>

        <Section tone="stock">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <Prose size="1rem" max="42ch" tone="stock">
              Orchelix AI Consulting Inc. provides multi-agent systems for revenue
              operations — including Esmi, the virtual receptionist — deployed
              with senior consultants. Pricing, SLAs, and scope for a live
              deployment live in your Service Agreement.
            </Prose>
            <RuledList
              tone="stock"
              labelWidth="9rem"
              items={[
                ["Entity", "Orchelix AI Consulting Inc."],
                ["Canada", "Ontario — legal entity"],
                ["United States", "West Palm Beach, FL — service presence"],
                ["Contact", "legal@orchelix.com"],
                ["Law", "Province of Ontario & federal laws of Canada"],
                ["Venue", "Courts of Ontario"],
              ]}
            />
          </div>
        </Section>

        <Section tone="field">
          <LegalBlock title="Acceptable use">
            <p>You agree not to:</p>
            <ul>
              <li>Use our services for any unlawful purpose</li>
              <li>Attempt to reverse-engineer, scrape, or exploit our AI systems</li>
              <li>Misrepresent your identity or affiliation</li>
              <li>Interfere with the security or integrity of our platform</li>
            </ul>
          </LegalBlock>

          <LegalBlock title="Intellectual property">
            <p>
              All content on this website, including text, graphics, logos, and
              software, is the property of Orchelix AI Consulting Inc. and is
              protected by Canadian and international intellectual property laws.
            </p>
          </LegalBlock>

          <LegalBlock title="Disclaimer of warranties">
            <p>
              The website and its content are provided &quot;as is&quot; without
              warranty of any kind. We do not warrant that the site will be
              uninterrupted, error-free, or free of viruses or harmful components.
            </p>
          </LegalBlock>

          <LegalBlock title="Limitation of liability">
            <p>
              <strong>(a) Cap on Liability.</strong> Orchelix&apos;s total
              cumulative liability for any claims arising out of these Terms or
              the Services shall not exceed the greater of: (i) fees paid in the
              twelve months preceding the claim; or (ii) CAD $500.
            </p>
            <p>
              <strong>(b) Exclusion of Consequential Damages.</strong> Orchelix
              is not liable for indirect, incidental, special, exemplary,
              consequential, or punitive damages, including lost revenue,
              profits, data, or goodwill — even if advised of the possibility.
            </p>
            <p>
              <strong>(c) Essential Basis.</strong> These limits reflect a
              negotiated allocation of risk and are an essential basis of the
              bargain.
            </p>
            <p>
              <strong>(d) Exceptions.</strong> Nothing limits liability for death
              or personal injury caused by negligence, fraud, or liability that
              cannot be excluded under Ontario or federal Canadian law.
            </p>
            <p>
              <strong>(e) Jurisdiction Variance.</strong> Some jurisdictions do
              not allow these exclusions; where they apply to you, your rights
              may differ.
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--lg-ink-3)",
                borderLeft: "2px solid var(--lg-rule)",
                paddingLeft: "0.9rem",
                marginTop: "1rem",
              }}
            >
              Subject to the executed Service Agreement, which governs in
              conflict. Questions:{" "}
              <a href="mailto:legal@orchelix.com" style={{ color: "var(--lg-ink)" }}>
                legal@orchelix.com
              </a>
              .
            </p>
          </LegalBlock>

          <LegalBlock title="Changes">
            <p>
              We may modify these Terms with at least 30 days&apos; notice for
              material changes. Continued use after the effective date
              constitutes acceptance.
            </p>
          </LegalBlock>

          <LegalBlock title="Contact">
            <p>
              Orchelix AI Consulting Inc. · West Palm Beach, FL ·{" "}
              <a href="mailto:legal@orchelix.com" style={{ color: "var(--lg-ink)" }}>
                legal@orchelix.com
              </a>
            </p>
          </LegalBlock>
        </Section>
      </main>
      <Footer />
    </>
  );
}

function LegalBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        borderBottom: "1px solid var(--lg-hair)",
        padding: "2rem 0",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontStretch: "86%",
          fontWeight: 600,
          fontSize: "1.1875rem",
          letterSpacing: "-0.008em",
          textTransform: "uppercase",
          color: "var(--lg-ink)",
          margin: "0 0 1rem",
        }}
      >
        {title}
      </h2>
      <div
        className="lg-legal-prose"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
          lineHeight: 1.62,
          color: "var(--lg-ink-2)",
          maxWidth: "62ch",
        }}
      >
        <style>{`
          .lg-legal-prose p { margin: 0 0 0.9rem; }
          .lg-legal-prose ul { margin: 0 0 0.9rem; padding-left: 1.25rem; }
          .lg-legal-prose li { margin-bottom: 0.4rem; }
          .lg-legal-prose strong { color: var(--lg-ink); font-weight: 600; }
          .lg-legal-prose a { color: var(--lg-ink); }
        `}</style>
        {children}
      </div>
    </div>
  );
}
