import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import EsmiChat from "./EsmiChat";
import PublicVoicePreview from "./PublicVoicePreview";
import JsonLd from "@/app/components/JsonLd";
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

/* Converted from the `.esmi-dark` glassmorphism world to the Ruled Record on
   2026-08-08. Removed wholesale: aurora blobs, grid texture, ambient wave,
   cyan #00F0FF / purple #A855F7, backdrop-filter glass panels, 16px radii,
   glow shadows, and the `Eyebrow` helper (a craft-floor ban).

   Claims removed as unverified — see PRODUCT.md "Open / unverified":
   - "answers every call in under fifteen seconds" (pickup latency)
   - "Pickup: 1st ring — answered instantly" (the same claim, restated)
   - "<1m" from ring to CRM brief, and "pages ... in seconds"
   - French as a supported language
   - "SOC 2 in-progress"
   - "Canadian data residency" stated flatly — it is available on request
   The "Live signals" panel is gone too: it labelled four static capability
   strings as though they were telemetry. What replaces it is checkable. */

const SITE_URL = "https://www.orchelix.com";

export const metadata: Metadata = {
  title: "Try Esmi — Live AI Receptionist Demo",
  description:
    "Hear a real Esmi call, then talk to the same bilingual (EN/ES) agent yourself. See how it answers, qualifies, and books — and what it writes down afterwards.",
  alternates: { canonical: "/try-esmi" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Try Esmi — AI Receptionist Demo",
      item: `${SITE_URL}/try-esmi`,
    },
  ],
};

/* What a call produces. Every line is an artifact you can open afterwards —
   which is the point, and is checkable in a way "live signals" was not. */
const PRODUCES: [string, string][] = [
  ["Transcript", "Full text of both sides, in whichever language was spoken"],
  ["Reason", "Why the caller rang, written in their own words"],
  ["Disposition", "Booked, routed, answered, or closed — and by which rule"],
  ["Recording", "Kept under your retention rule, deleted on your schedule"],
  ["Handoff", "When a human takes over, they inherit the whole conversation"],
];

const HANDLES = [
  {
    title: "Books appointments end to end",
    desc: "Esmi reads your live calendar, offers the slots you actually have, books the visit, and sends a bilingual SMS confirmation — on the same call, with no staff handoff.",
    meta: "Calendar · SMS",
  },
  {
    title: "Qualifies new leads",
    desc: "It asks the questions your sales team would ask, scores the lead against your criteria, and writes a one-paragraph brief into your CRM before the caller hangs up.",
    meta: "Scoring · CRM",
  },
  {
    title: "Escalates urgency",
    desc: "When a caller is hurt, angry, or in real distress, Esmi recognises the signal in both languages and pages the right on-call person instead of taking a message.",
    meta: "Routing · On-call",
  },
];

function prettifyTenant(slug: string): string {
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function TryEsmiPage({
  searchParams,
}: {
  // Next 16: searchParams is a Promise. ?tenant=acme-hvac&company=Acme+HVAC
  searchParams: Promise<{ tenant?: string; company?: string }>;
}) {
  const sp = await searchParams;
  const tenantId = typeof sp.tenant === "string" && sp.tenant.trim() ? sp.tenant.trim() : undefined;
  const companyName =
    typeof sp.company === "string" && sp.company.trim()
      ? sp.company.trim()
      : tenantId
        ? prettifyTenant(tenantId)
        : undefined;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <Nav />
      <main id="main-content">
        {/* ── Opening: the recording leads ── */}
        <Section tone="field">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
            <div>
              {/* The `In production` StatusKey that sat here was a kicker —
                  a small-caps label above a heading — which DESIGN.md's No
                  Kicker Rule bans outright. The claim is true and worth
                  making, so it moves into the prose, which is where that
                  rule says context belongs. */}
              <PageTitle max="13ch">Hear Esmi take a call</PageTitle>

              <Prose size="1.0625rem" max="42ch" style={{ marginTop: "1.7rem" }}>
                Esmi is answering calls in production today. A real recording
                first, then the same agent live in a chat you can type into.
                No form, no scheduling — the product doing its job, and the
                record it leaves behind.
              </Prose>

              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Stamp href="/book">Book a pilot</Stamp>
                <QuietAction href="/solutions">See the agent stack</QuietAction>
              </div>

              {/* The whole page is "hear what calling sounds like" — the
                  actual number to dial belongs near the recording, not
                  buried in the close section at the bottom of the page. */}
              <a
                href="tel:+15615661066"
                className="lg-fig lg-quiet"
                style={{
                  display: "inline-block",
                  marginTop: "1.6rem",
                  fontSize: "0.8125rem",
                  letterSpacing: "0.05em",
                  color: "var(--lg-ink-2)",
                  textDecoration: "none",
                }}
              >
                Or call it yourself — +1 561 566 1066
              </a>
            </div>

            {/* The real artifact — a genuine recording, not a rendering of one. */}
            <div className="lg-margin-rule lg:pl-8">
              <PublicVoicePreview />
            </div>
          </div>
        </Section>

        {/* ── Live chat demo ── */}
        <Section tone="field-2" id="chat">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <div>
              <SectionTitle max="15ch">
                {companyName ? `Ask Esmi about ${companyName}` : "Now ask it yourself"}
              </SectionTitle>
              <Prose size="1rem" max="40ch" style={{ marginTop: "1.4rem" }}>
                {companyName
                  ? "This demo is configured with that business's hours, services, and booking rules — the same way a pilot would be."
                  : "This is the same agent that answers the phone, running against a sample business. Ask it for an appointment, in English or Spanish."}
              </Prose>
            </div>

            <EsmiChat tenantId={tenantId} companyName={companyName} />
          </div>
        </Section>

        {/* ── What a call produces ── */}
        <Section tone="field">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <SectionTitle max="16ch">What every call leaves behind</SectionTitle>
              <Prose size="1rem" max="42ch" style={{ marginTop: "1.4rem" }}>
                The conversation is the visible part. The record is the part
                that matters at month-end, in a dispute, or when an auditor
                asks what happened.
              </Prose>
            </div>
            <RuledList items={PRODUCES} labelWidth="8.5rem" />
          </div>
        </Section>

        {/* ── What it handles ── */}
        <Section tone="stock">
          <SectionTitle tone="stock" max="18ch">
            What Esmi handles
          </SectionTitle>
          <div className="mt-12">
            <EntryList tone="stock" entries={HANDLES} />
          </div>
        </Section>

        {/* ── How it is operated ── */}
        <Section tone="field-2" tight>
          <SectionTitle max="20ch">How Esmi is operated</SectionTitle>
          <div className="mt-10">
            <Band
              cols={4}
              items={[
                ["Languages", "English and Spanish, natively"],
                ["Privacy", "PIPEDA-aligned for Canadian operations"],
                ["Residency", "Data residency available on request"],
                ["Oversight", "Every action reversible by a person"],
              ]}
            />
          </div>
        </Section>

        {/* ── Close ── */}
        <Section tone="field-3" style={{ borderTop: "2px solid var(--lg-foil)" }}>
          <div className="grid items-end gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <SectionTitle scale="display" max="16ch">
                Put it on your own line
              </SectionTitle>
              <Prose size="1.0625rem" max="48ch" style={{ marginTop: "1.5rem" }}>
                Fourteen days, your real number, a senior consultant on the
                setup — and every call on the record from the first ring.
              </Prose>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
              <Stamp href="/book" size="1rem">
                Book a pilot
              </Stamp>
              <a
                href="tel:+15615661066"
                className="lg-fig lg-quiet"
                style={{
                  fontSize: "0.8125rem",
                  letterSpacing: "0.08em",
                  color: "var(--lg-ink-2)",
                  textDecoration: "none",
                }}
              >
                +1 561 566 1066
              </a>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
