import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import {
  Section,
  PageTitle,
  SectionTitle,
  Prose,
  RuledList,
  Band,
} from "@/app/components/ledger";

export const metadata: Metadata = {
  title: "Privacy, PIPEDA & Security | Orchelix",
  description:
    "How Orchelix collects, uses, and protects personal information — PIPEDA alignment for Canadian operations, security practices, and your rights.",
  alternates: { canonical: "/privacy" },
};

const TOC = [
  { href: "#privacy", label: "Privacy policy" },
  { href: "#pipeda", label: "PIPEDA" },
  { href: "#security", label: "Security" },
  { href: "#rights", label: "Your rights" },
  { href: "#contact", label: "Contact" },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Section tone="field" id="privacy" style={{ scrollMarginTop: "5.5rem" }}>
          <PageTitle max="16ch">Privacy, PIPEDA &amp; security</PageTitle>
          <Prose size="1.0625rem" max="48ch" style={{ marginTop: "1.5rem" }}>
            Orchelix AI Consulting Inc. operates across Canada and the United
            States. This page is the trust record: how we handle personal
            information, how PIPEDA applies to Canadian operations, and how we
            protect systems that answer your phones.
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

          <nav aria-label="On this page" className="mt-10">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {TOC.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="lg-quiet"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStretch: "88%",
                      fontSize: "0.8125rem",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--lg-ink)",
                      textDecoration: "none",
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Section>

        <Section tone="stock">
          <SectionTitle tone="stock" max="18ch">
            Privacy policy
          </SectionTitle>
          <div className="mt-10 grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <Prose size="1rem" max="42ch" tone="stock">
              Orchelix AI Consulting Inc. (&quot;Orchelix&quot;, &quot;we&quot;,
              &quot;us&quot;) protects personal information when you visit our
              website or use our services. By using our site or services, you
              consent to the practices described here.
            </Prose>
            <RuledList
              tone="stock"
              labelWidth="9rem"
              items={[
                ["Who we are", "Orchelix AI Consulting Inc. — West Palm Beach, FL; serving Canada & the US"],
                ["Privacy Officer", "Jorge Quinonez — privacy@orchelix.com"],
                ["We do not sell", "Personal information is never sold to third parties"],
                ["Default residency", "Processing may occur in the US or Canada; Canadian residency on request"],
              ]}
            />
          </div>
        </Section>

        <Section tone="field">
          <SectionTitle max="20ch">What we collect &amp; why</SectionTitle>
          <div className="mt-10">
            <Band
              cols={3}
              items={[
                ["Contact", "Name, email, company, phone when you book or apply"],
                ["Conversations", "Messages and calls handled by Esmi for your business"],
                ["Usage", "Pages visited, referrer, browser, city-level location"],
              ]}
            />
          </div>
          <Prose size="1rem" max="56ch" style={{ marginTop: "2rem" }}>
            We use this information to run demos and pilots, provide AI agent
            services, send transactional notices, support clients, improve the
            site, and meet legal obligations. We do not collect health data,
            government IDs, or payment-card numbers unless a specific service
            requires them with express consent.
          </Prose>
        </Section>

        <Section tone="field-2" id="pipeda" style={{ scrollMarginTop: "5.5rem" }}>
          <SectionTitle max="14ch">PIPEDA</SectionTitle>
          <Prose size="1.0625rem" max="48ch" style={{ marginTop: "1.5rem" }}>
            For Canadian operations and personal information of individuals in
            Canada, we align with the{" "}
            <em>Personal Information Protection and Electronic Documents Act</em>{" "}
            (PIPEDA) and applicable provincial privacy legislation.
          </Prose>
          <div className="mt-10">
            <RuledList
              labelWidth="11rem"
              items={[
                ["Consent", "We rely on implied or express consent under PIPEDA; you may withdraw subject to legal limits"],
                ["Accountability", "A named Privacy Officer is accountable for this policy"],
                ["Purpose limit", "We collect only what the service needs and state those purposes"],
                ["Access & correction", "You may request access or correction of your personal information"],
                ["Complaints", "You may contact the Office of the Privacy Commissioner of Canada"],
              ]}
            />
          </div>
          <Prose size="0.9375rem" max="52ch" style={{ marginTop: "2rem" }}>
            Cross-border operations are real: US presence and Canadian clients
            both exist. We state that explicitly rather than mixing a Canadian
            privacy claim with US-only location signals.
          </Prose>
        </Section>

        <Section tone="stock" id="security" style={{ scrollMarginTop: "5.5rem" }}>
          <SectionTitle tone="stock" max="12ch">
            Security
          </SectionTitle>
          <Prose size="1.0625rem" max="48ch" tone="stock" style={{ marginTop: "1.5rem" }}>
            The audit trail is only useful if the systems behind it are
            protected. Controls in place today:
          </Prose>
          <div className="mt-10">
            <RuledList
              tone="stock"
              labelWidth="10rem"
              items={[
                ["Transit", "TLS encryption for data in transit"],
                ["Access", "Role-based access; tenant isolation by organization"],
                ["Secrets", "Platform secrets never reach the browser"],
                ["Review", "Regular security reviews of production systems"],
                ["Retention", "Call and chat retention under your configured rules"],
                ["Residency", "Canadian data residency available on request for enterprise"],
              ]}
            />
          </div>
          <Prose size="0.9375rem" max="52ch" tone="stock" style={{ marginTop: "2rem" }}>
            Formal third-party certifications are not claimed here until they
            are complete. Ask your consultant for the current control pack
            during a pilot.
          </Prose>
        </Section>

        <Section tone="field" id="rights" style={{ scrollMarginTop: "5.5rem" }}>
          <SectionTitle max="14ch">Sharing, retention &amp; rights</SectionTitle>
          <div className="mt-10 grid gap-x-14 gap-y-10 lg:grid-cols-2">
            <div>
              <p
                className="lg-fig"
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--lg-ink-3)",
                  marginBottom: "0.75rem",
                }}
              >
                Sub-processors
              </p>
              <RuledList
                labelWidth="8rem"
                items={[
                  ["Google Cloud", "Infrastructure & Workspace APIs (US)"],
                  ["Vercel", "Website hosting (US)"],
                  ["OpenAI", "Model inference (US)"],
                  ["Railway", "Backend API hosting (US)"],
                  ["Cal.com", "Scheduling where configured (US)"],
                ]}
              />
            </div>
            <div>
              <p
                className="lg-fig"
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--lg-ink-3)",
                  marginBottom: "0.75rem",
                }}
              >
                Your rights
              </p>
              <RuledList
                labelWidth="8rem"
                items={[
                  ["Access", "Request the personal information we hold"],
                  ["Correction", "Request fixes to inaccurate records"],
                  ["Withdraw", "Withdraw consent for certain uses"],
                  ["Delete", "Request deletion where law allows"],
                  ["Complain", "File with the Privacy Commissioner of Canada"],
                ]}
              />
            </div>
          </div>
          <Prose size="1rem" max="56ch" style={{ marginTop: "2rem" }}>
            Chat data is retained 90 days by default. Client contract data is
            retained 7 years where Canadian accounting rules require it.
            Google Workspace API data used by AcumenAI (when engaged) follows
            Google&apos;s Limited Use requirements and is never used for
            advertising.
          </Prose>
        </Section>

        <Section tone="field-3" id="contact" style={{ scrollMarginTop: "5.5rem" }}>
          <SectionTitle max="16ch">Contact the Privacy Officer</SectionTitle>
          <Prose size="1.0625rem" max="42ch" style={{ marginTop: "1.5rem" }}>
            Orchelix AI Consulting Inc.
            <br />
            Privacy Officer: Jorge Quinonez
            <br />
            <a href="mailto:privacy@orchelix.com" className="lg-quiet" style={{ color: "var(--lg-ink)" }}>
              privacy@orchelix.com
            </a>
            <br />
            West Palm Beach, FL · Serving South Florida, GTA Ontario &amp; North America
          </Prose>
          <Prose size="0.9375rem" max="48ch" style={{ marginTop: "1.25rem" }}>
            Office of the Privacy Commissioner of Canada:{" "}
            <a
              href="https://www.priv.gc.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="lg-quiet"
              style={{ color: "var(--lg-ink)" }}
            >
              priv.gc.ca
            </a>
          </Prose>
        </Section>
      </main>
      <Footer />
    </>
  );
}
