import type { Metadata } from "next";
import type { ReactNode } from "react";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import {
  Section,
  PageTitle,
  SectionTitle,
  Prose,
  RuledList,
  Band,
  type Tone,
} from "@/app/components/ledger";

/* Privacy policy — rewritten 2026-09-11.

   What changed from the August version, and why:
   - It now says what the systems in this repo actually do. The contact and
     lead forms (Resend email, optional lead webhook), Meta lead-ad intake,
     Vercel Analytics, Clerk sign-in, the Stripe pilot link, dashboard push
     notifications, and the Esmi platform on Railway are each named.
   - It separates the two roles Orchelix plays. For visitors and prospects we
     decide what is collected; for the callers of a client business we
     process on that business's behalf. The old page blurred the two.
   - Call recording and the AI disclosure have their own section. Esmi
     answers lines in Florida, an all-party-consent state for recording, so
     the client's greeting and the notice it carries matter.
   - AcumenAI and its Google Workspace clause are gone with the product.

   This is plain-language drafting, not legal advice. Have counsel review it
   before it is relied on, and keep the service-provider list in step with
   the vendors actually in production. */

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Orchelix AI Consulting collects, uses, shares, and protects personal information — for website visitors, clients, and the people who call our clients — under PIPEDA and applicable US law.",
  alternates: { canonical: "/privacy" },
};

const EFFECTIVE = "September 11, 2026";

const TOC = [
  { href: "#privacy", label: "Summary" },
  { href: "#collect", label: "What we collect" },
  { href: "#calls", label: "Calls & AI" },
  { href: "#sharing", label: "Sharing" },
  { href: "#pipeda", label: "PIPEDA" },
  { href: "#security", label: "Security" },
  { href: "#rights", label: "Your rights" },
  { href: "#contact", label: "Contact" },
] as const;

/* A small heading inside a section — the label voice, above a block. */
function Label({ children, tone = "field" }: { children: ReactNode; tone?: Tone }) {
  return (
    <p
      className="lg-fig"
      style={{
        fontSize: "0.6875rem",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: tone === "stock" ? "var(--lg-ink-on-stock-2)" : "var(--lg-ink-3)",
        margin: "0 0 0.75rem",
      }}
    >
      {children}
    </p>
  );
}

const anchor = { scrollMarginTop: "5.5rem" } as const;

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main-content" data-surface="site">
        {/* ── Opening ── */}
        <Section tone="field" scene id="privacy" style={anchor}>
          <PageTitle max="16ch">Privacy policy</PageTitle>
          <Prose size="1.0625rem" max="52ch" style={{ marginTop: "1.5rem" }}>
            Orchelix AI Consulting Inc. builds AI agents that answer phones,
            qualify leads, and book appointments for other businesses. This page
            explains what personal information we handle, why, who else touches
            it, and what you can ask us to do with it — in plain language.
          </Prose>
          <p
            className="lg-fig"
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--lg-ink-3)",
              margin: "1.25rem 0 0",
            }}
          >
            Effective {EFFECTIVE} · Canada &amp; United States
          </p>

          <nav aria-label="On this page" className="mt-10">
            <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-3 p-0">
              {TOC.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="lg-quiet"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontStretch: "var(--lg-stretch)",
                      fontWeight: "var(--lg-w-ui)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.12em",
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

          <div className="mt-14">
            <Band
              cols={4}
              items={[
                ["We never sell it", "Personal information is not sold, rented, or used for advertising"],
                ["Calls are recorded", "Esmi records and transcribes calls for the business you called"],
                ["You can ask", "For access, correction, or deletion — privacy@orchelix.com"],
                ["Two countries", "Canadian company (Ontario), US operations (Florida)"],
              ]}
            />
          </div>
        </Section>

        {/* ── Who we are, and the two roles ── */}
        <Section tone="stock">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <SectionTitle tone="stock" max="14ch">
                Who we are
              </SectionTitle>
              <Prose tone="stock" size="1rem" max="44ch" style={{ marginTop: "1.4rem" }}>
                &quot;Orchelix&quot;, &quot;we&quot;, and &quot;us&quot; mean
                Orchelix AI Consulting Inc. We play two different roles, and
                which one applies depends on who you are.
              </Prose>
            </div>
            <RuledList
              tone="stock"
              labelWidth="10rem"
              items={[
                [
                  "Visitors & prospects",
                  "When you browse orchelix.com, book a pilot, or contact us, we decide what is collected and why. This policy governs that information.",
                ],
                [
                  "Our clients",
                  "When a business signs up for Esmi or another agent, we hold its account details and the settings it configures. This policy and the client's agreement with us both apply.",
                ],
                [
                  "People who call our clients",
                  "When you call or message a business that uses Esmi, we process the conversation on that business's behalf and under its instructions. That business is responsible for telling you how it uses your information; we help it honour your requests.",
                ],
                ["Company", "Orchelix AI Consulting Inc. — incorporated in Ontario, Canada"],
                ["US operations", "West Palm Beach, Florida"],
                ["Privacy Officer", "Jorge Quiñonez — privacy@orchelix.com"],
              ]}
            />
          </div>
        </Section>

        {/* ── What we collect ── */}
        <Section tone="field" id="collect" style={anchor}>
          <SectionTitle max="20ch">What we collect, and why</SectionTitle>
          <div className="mt-10 grid gap-x-14 gap-y-12 lg:grid-cols-2">
            <div>
              <Label>Information you give us</Label>
              <RuledList
                labelWidth="8.5rem"
                items={[
                  [
                    "Forms",
                    "Name, email, company, phone, the use case you pick, and your message — when you book a pilot or contact us. Used to reply, schedule, and prepare a proposal.",
                  ],
                  [
                    "Ad forms",
                    "If you submit a lead form on Facebook or Instagram, Meta passes us the fields you entered so we can call you back.",
                  ],
                  [
                    "Client accounts",
                    "Name, work email, business name, and team members, for the dashboard. Sign-in is handled by Clerk.",
                  ],
                  [
                    "Payment",
                    "The pilot fee is paid through Stripe. Stripe receives your card details; we see only the confirmation, amount, and contact details.",
                  ],
                  [
                    "Business setup",
                    "Hours, services, pricing ranges, FAQs, and calendar connections a client gives Esmi so it can answer for them.",
                  ],
                ]}
              />
            </div>
            <div>
              <Label>Information collected as the service runs</Label>
              <RuledList
                labelWidth="8.5rem"
                items={[
                  [
                    "Calls",
                    "Caller phone number, the recording, a transcript, the reason for the call, and the outcome — booked, routed, answered, or closed.",
                  ],
                  [
                    "Messages",
                    "Text messages and web-chat conversations Esmi sends or receives for a client, including the demo chat on this site.",
                  ],
                  [
                    "Appointments",
                    "The name, time, and details needed to place a booking on the client's calendar.",
                  ],
                  [
                    "Site analytics",
                    "Pages viewed, referring site, device and browser type, and country — through Vercel Analytics, which sets no cookies and does not follow you to other sites.",
                  ],
                  [
                    "Security logs",
                    "IP address and request details our hosting keeps briefly to run and protect the service.",
                  ],
                  [
                    "Notifications",
                    "If a client turns on dashboard alerts, a browser push subscription so we can deliver them.",
                  ],
                ]}
              />
            </div>
          </div>
          <Prose size="1rem" max="64ch" style={{ marginTop: "2.5rem" }}>
            We use this information to run the service a client has asked for,
            answer and follow up on inquiries, schedule and bill, secure our
            systems, fix problems, and meet legal obligations. We do not ask for
            health information, government ID numbers, or card numbers, and we
            ask clients not to configure Esmi to collect them.
          </Prose>
        </Section>

        {/* ── Calls, recording, and AI ── */}
        <Section tone="field-2" id="calls" style={anchor}>
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <SectionTitle max="14ch">Calls, recording &amp; AI</SectionTitle>
              <Prose size="1rem" max="44ch" style={{ marginTop: "1.4rem" }}>
                Esmi is an AI assistant, not a person. It answers in English or
                Spanish (French where a client adds it), and every conversation
                is written down so the business can review what happened.
              </Prose>
            </div>
            <RuledList
              labelWidth="9rem"
              items={[
                [
                  "Disclosure",
                  "Esmi can open each call by saying it is an AI assistant and that the call is recorded. The client chooses the greeting and is responsible for giving the notice its location requires — some places, including Florida, require the consent of everyone on the call.",
                ],
                [
                  "Language models",
                  "To understand callers and reply, conversation text is processed by AI model providers under contract with us. They process it to produce a response; we do not permit it to be sold or used for advertising.",
                ],
                [
                  "Human control",
                  "The client can review, correct, override, or delete any record, and can transfer a caller to a person.",
                ],
                [
                  "Retention",
                  "Recordings and transcripts are kept for the period the client configures, then deleted. See Retention below for defaults.",
                ],
              ]}
            />
          </div>
        </Section>

        {/* ── Sharing ── */}
        <Section tone="field" id="sharing" style={anchor}>
          <SectionTitle max="20ch">Who we share it with</SectionTitle>
          <Prose size="1rem" max="60ch" style={{ marginTop: "1.4rem" }}>
            We share personal information only with the business a conversation
            belongs to, with the service providers below that help us run
            Orchelix, and when the law requires it. If Orchelix is ever merged
            or sold, information would transfer under the same protections, and
            we would tell clients first.
          </Prose>
          <div className="mt-10 grid gap-x-14 gap-y-12 lg:grid-cols-2">
            <div>
              <Label>Service providers</Label>
              <RuledList
                labelWidth="8.5rem"
                items={[
                  ["Vercel", "Website hosting and cookieless analytics (US)"],
                  ["Railway", "Hosting for the Esmi platform and its data (US)"],
                  ["Google Cloud", "Infrastructure, and calendar access where a client connects it (US)"],
                  ["OpenAI", "Language-model processing of conversation text (US)"],
                  ["Resend", "Delivery of form notifications and transactional email (US)"],
                  ["Clerk", "Dashboard sign-in and account security (US)"],
                  ["Stripe", "Payment processing for the pilot fee (US)"],
                  ["Meta", "Lead forms you choose to submit on Facebook or Instagram (US)"],
                  ["Telephony & voice", "Carriers and voice providers that connect calls, send texts, and produce Esmi's speech (US)"],
                ]}
              />
            </div>
            <div>
              <Label>What they may do with it</Label>
              <Prose size="0.9375rem" max="48ch">
                Each provider receives only what its job needs and is bound by
                contract to use it for that job alone. None of them may sell it
                or use it to advertise to you. Calendar providers a client
                connects — Google, Microsoft 365, Calendly, or Acuity — receive
                the appointment details needed to book.
              </Prose>
              <Prose size="0.9375rem" max="48ch" style={{ marginTop: "1rem" }}>
                When a client connects Google services, our use of information
                received from Google APIs follows the Google API Services User
                Data Policy, including its Limited Use requirements.
              </Prose>
            </div>
          </div>
        </Section>

        {/* ── PIPEDA and cross-border ── */}
        <Section tone="stock" id="pipeda" style={anchor}>
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <SectionTitle tone="stock" max="14ch">
                PIPEDA &amp; where data lives
              </SectionTitle>
              <Prose tone="stock" size="1rem" max="44ch" style={{ marginTop: "1.4rem" }}>
                For people in Canada we follow the{" "}
                <em>Personal Information Protection and Electronic Documents Act</em>{" "}
                (PIPEDA) and provincial privacy law where it applies. In the United
                States we follow the federal and state laws that apply to us.
              </Prose>
            </div>
            <RuledList
              tone="stock"
              labelWidth="10rem"
              items={[
                ["Accountability", "A named Privacy Officer answers for this policy"],
                ["Consent", "We rely on your express or implied consent, which you may withdraw, subject to legal and contractual limits"],
                ["Limited purpose", "We collect only what the service needs, for the purposes stated here"],
                [
                  "Cross-border",
                  "Most of our providers store and process data in the United States, so information about Canadians may be accessible to US authorities under US law. Canadian data residency is available to clients on request.",
                ],
                ["Complaints", "You may contact the Office of the Privacy Commissioner of Canada at priv.gc.ca"],
              ]}
            />
          </div>
        </Section>

        {/* ── Security and retention ── */}
        <Section tone="field" id="security" style={anchor}>
          <SectionTitle max="18ch">Security &amp; retention</SectionTitle>
          <div className="mt-10 grid gap-x-14 gap-y-12 lg:grid-cols-2">
            <div>
              <Label>How we protect it</Label>
              <RuledList
                labelWidth="8rem"
                items={[
                  ["In transit", "Encrypted with TLS"],
                  ["Access", "Role-based, with each client's data isolated to its own organization"],
                  ["Secrets", "Platform keys stay on the server and never reach the browser"],
                  ["Review", "Production systems are reviewed regularly"],
                  ["Incidents", "If a breach puts you at real risk of significant harm, we will notify you and the regulators the law requires"],
                ]}
              />
              <Prose size="0.9375rem" max="48ch" style={{ marginTop: "1.5rem" }}>
                No system is perfectly secure, and we do not claim third-party
                certifications we have not completed. Clients can ask for our
                current controls during a pilot.
              </Prose>
            </div>
            <div>
              <Label>How long we keep it</Label>
              <RuledList
                labelWidth="8rem"
                items={[
                  ["Calls & texts", "For the period the client sets, then deleted"],
                  ["Web chat", "90 days by default"],
                  ["Inquiries", "As long as the conversation is active, and up to two years after, unless you ask us to delete sooner"],
                  ["Client accounts", "For the life of the account, then deleted or anonymized"],
                  ["Contracts & billing", "Seven years, as Canadian tax and accounting rules require"],
                ]}
              />
            </div>
          </div>
        </Section>

        {/* ── Rights, cookies, children, changes ── */}
        <Section tone="field-2" id="rights" style={anchor}>
          <SectionTitle max="16ch">Your rights &amp; choices</SectionTitle>
          <div className="mt-10 grid gap-x-14 gap-y-12 lg:grid-cols-2">
            <div>
              <RuledList
                labelWidth="8rem"
                items={[
                  ["Access", "Ask what personal information we hold about you and how it has been used"],
                  ["Correction", "Ask us to fix anything inaccurate or incomplete"],
                  ["Deletion", "Ask us to delete it, where the law and our obligations allow"],
                  ["Withdraw", "Withdraw consent to a use, or unsubscribe from any email"],
                  ["Complain", "To us first, and to the Privacy Commissioner of Canada or your state regulator"],
                ]}
              />
              <Prose size="0.9375rem" max="48ch" style={{ marginTop: "1.5rem" }}>
                Email privacy@orchelix.com. We will confirm who you are, then
                answer within 30 days. If you called one of our clients, you can
                ask that business directly or ask us — we will pass your request
                to the business and help it respond.
              </Prose>
            </div>
            <RuledList
              labelWidth="8rem"
              items={[
                [
                  "Cookies",
                  "The public site sets no advertising or tracking cookies. The dashboard uses the essential cookies Clerk needs to keep you signed in.",
                ],
                [
                  "Children",
                  "Our services are for businesses. We do not knowingly collect information from children under 16; if we learn we have, we delete it.",
                ],
                [
                  "Changes",
                  "When this policy changes, we update the date at the top. If a change is material, we tell clients by email before it takes effect.",
                ],
              ]}
            />
          </div>
        </Section>

        {/* ── Contact ── */}
        <Section tone="field-3" id="contact" style={anchor}>
          <SectionTitle max="16ch">Contact the Privacy Officer</SectionTitle>
          <div className="mt-8">
            <RuledList
              labelWidth="9rem"
              items={[
                ["Privacy Officer", "Jorge Quiñonez"],
                [
                  "Email",
                  <a
                    key="email"
                    href="mailto:privacy@orchelix.com"
                    className="lg-quiet"
                    style={{ color: "var(--lg-ink)" }}
                  >
                    privacy@orchelix.com
                  </a>,
                ],
                [
                  "Phone",
                  <a key="tel" href="tel:+15615661066" className="lg-quiet" style={{ color: "var(--lg-ink)" }}>
                    +1 561 566 1066
                  </a>,
                ],
                ["Canada", "Orchelix AI Consulting Inc., Ontario"],
                ["United States", "West Palm Beach, Florida"],
                [
                  "Regulator",
                  <a
                    key="opc"
                    href="https://www.priv.gc.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lg-quiet"
                    style={{ color: "var(--lg-ink)" }}
                  >
                    Office of the Privacy Commissioner of Canada — priv.gc.ca
                  </a>,
                ],
              ]}
            />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
