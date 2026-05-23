import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";

export const metadata: Metadata = {
  title: "Industries — Orchelix AI Consulting",
  description:
    "AI agents tuned to how your industry actually runs. Architecture, stone, kitchen & bath, field service, manufacturing, professional services — all served by one operator console.",
};

export default function IndustriesPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <IndHero />
        <DesignStone />
        <FieldService />
        <Manufacturing />
        <Professional />
        <IndFinalCTA />
      </main>
      <Footer />
    </>
  );
}

/* ─── Shared types ───────────────────────────────────────────────────────── */

type IndCard = {
  icon: React.ReactNode;
  tag?: string;
  title: string;
  role: string;
  body: string;
  chips: string[];
  core?: boolean;
};

/* ─── Hero ───────────────────────────────────────────────────────────────── */

const INDEX_ITEMS = [
  {
    num: "01",
    name: "Design & Stone Industries",
    sub: "Architecture, interiors, stone, kitchen & bath",
    href: "#cat-design-stone",
    featured: true,
  },
  {
    num: "02",
    name: "Field Service & Construction",
    sub: "Plumbing, HVAC, custom builders, home services",
    href: "#cat-field-service",
  },
  {
    num: "03",
    name: "Manufacturing & Distribution",
    sub: "Production lines and building-materials supply",
    href: "#cat-manufacturing",
  },
  {
    num: "04",
    name: "Professional & Service Businesses",
    sub: "Law, accounting, healthcare, real estate",
    href: "#cat-professional",
  },
];

function IndHero() {
  return (
    <section
      className="relative overflow-hidden px-6 pt-24 pb-20 sm:px-8 sm:pt-28 sm:pb-24 lg:px-10 lg:pt-[132px] lg:pb-[120px]"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 0%, rgba(20,184,166,0.08), transparent 60%),
            radial-gradient(circle at 1px 1px, rgba(10,37,64,0.05) 1px, transparent 1.5px)
          `,
          backgroundSize: "auto, 28px 28px",
          backgroundPosition: "center, 0 0",
          maskImage: "radial-gradient(ellipse 100% 80% at 50% 35%, black 30%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 100% 80% at 50% 35%, black 30%, transparent 90%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, var(--color-line) 30%, var(--color-line) 70%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* Copy */}
          <div>
            <span
              className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-teal-700)" }}
            >
              <span className="inline-block h-px w-[18px] bg-current opacity-70" />
              Industries we serve
            </span>

            <h1
              className="mt-7 mb-7 text-balance text-[40px] leading-[1.06] font-medium tracking-[-0.03em] sm:text-[56px] sm:leading-[1.04] lg:text-[64px] lg:leading-[1.02] lg:tracking-[-0.036em]"
              style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
            >
              AI agents that work across the industries that{" "}
              <span
                className="bg-gradient-to-br from-navy-600 via-teal-500 to-teal-400 bg-clip-text font-normal italic"
                style={{ WebkitTextFillColor: "transparent" }}
              >
                build, design, and serve
              </span>
              .
            </h1>

            <p
              className="max-w-[560px] text-[17px] leading-[1.72] sm:text-[18px]"
              style={{ color: "var(--color-ink-2)" }}
            >
              From the showroom to the slab yard, from the front desk to the
              field — Orchelix deploys multi-agent systems tuned to how your
              industry actually runs. Bilingual, around the clock, and with an
              audit trail your operators trust.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="/book"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[15px] font-medium text-white"
                style={{ background: "var(--color-navy-600)" }}
              >
                Book a demo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a
                href="#cat-design-stone"
                className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-[15px] font-medium"
                style={{ borderColor: "var(--color-line-strong)", color: "var(--color-ink)" }}
              >
                Explore industries
              </a>
            </div>
          </div>

          {/* Index panel */}
          <aside
            className="rounded-xl border p-6 lg:mt-4"
            style={{
              borderColor: "var(--color-line)",
              background: "var(--color-surface)",
            }}
            aria-label="Industry categories on this page"
          >
            <p
              className="mb-4 text-[11px] font-medium uppercase tracking-[0.16em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink-3)" }}
            >
              On this page
            </p>
            <div className="flex flex-col gap-1">
              {INDEX_ITEMS.map((item) => (
                <a
                  key={item.num}
                  href={item.href}
                  className="group flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-[var(--color-surface-2)]"
                  style={item.featured ? { background: "var(--color-surface-2)" } : {}}
                >
                  <span
                    className="mt-0.5 shrink-0 text-[11px] font-semibold tabular-nums"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--color-teal-600)" }}
                  >
                    {item.num}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span
                      className="block text-[14px] font-medium leading-snug"
                      style={{ color: "var(--color-ink)" }}
                    >
                      {item.name}
                    </span>
                    <span
                      className="mt-0.5 block text-[12px] leading-snug"
                      style={{ color: "var(--color-ink-3)" }}
                    >
                      {item.sub}
                    </span>
                  </span>
                  <svg
                    className="mt-1 shrink-0 opacity-30 transition-opacity group-hover:opacity-70"
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ─── Category section wrapper ───────────────────────────────────────────── */

function CatHead({
  num,
  label,
  h2,
  blurb,
  meta,
  isCore,
}: {
  num: string;
  label: string;
  h2: string;
  blurb: string;
  meta: string;
  isCore?: boolean;
}) {
  return (
    <div className="mb-10 grid gap-8 sm:grid-cols-2 lg:gap-16">
      <div>
        <div
          className="mb-4 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.15em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink-3)" }}
        >
          <span style={{ color: "var(--color-teal-600)" }}>{num}</span>
          {isCore && (
            <>
              <span className="inline-block h-px w-5 bg-current opacity-30" />
              <span style={{ color: "var(--color-teal-700)" }}>Core experience</span>
              <span className="inline-block h-px w-5 bg-current opacity-30" />
            </>
          )}
          {!isCore && <span className="inline-block h-px w-5 bg-current opacity-30" />}
          <span>{label}</span>
        </div>
        <h2
          className="text-[32px] leading-[1.1] font-medium tracking-[-0.025em] sm:text-[40px]"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
        >
          {h2}
        </h2>
      </div>
      <div>
        <p className="text-[16px] leading-[1.72]" style={{ color: "var(--color-ink-2)" }}>
          {blurb}
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: "var(--color-teal-500)" }}
          />
          <span className="text-[13px]" style={{ color: "var(--color-ink-3)" }}>
            {meta}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Industry card ──────────────────────────────────────────────────────── */

function Card({ card }: { card: IndCard }) {
  return (
    <article
      className="flex flex-col gap-4 rounded-xl border p-6"
      style={{
        borderColor: card.core ? "var(--color-teal-200)" : "var(--color-line)",
        background: card.core
          ? "linear-gradient(135deg, rgba(20,184,166,0.04) 0%, var(--color-surface) 60%)"
          : "var(--color-surface)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{ background: "var(--color-surface-2)", color: "var(--color-teal-600)" }}
        >
          {card.icon}
        </div>
        {card.tag && (
          <span
            className="rounded-full px-2.5 py-0.5 text-[11px] font-medium"
            style={{
              background: card.core ? "rgba(20,184,166,0.12)" : "var(--color-surface-2)",
              color: card.core ? "var(--color-teal-700)" : "var(--color-ink-2)",
            }}
          >
            {card.tag}
          </span>
        )}
      </div>
      <div>
        <h3
          className="text-[17px] font-semibold leading-snug"
          style={{ color: "var(--color-ink)" }}
        >
          {card.title}
        </h3>
        <p
          className="mt-0.5 text-[12px] font-medium uppercase tracking-[0.1em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-teal-600)" }}
        >
          {card.role}
        </p>
      </div>
      <p className="flex-1 text-[14px] leading-[1.7]" style={{ color: "var(--color-ink-2)" }}>
        {card.body}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {card.chips.map((chip) => (
          <span
            key={chip}
            className="rounded-md px-2 py-0.5 text-[11px] font-medium"
            style={{ background: "var(--color-surface-2)", color: "var(--color-ink-2)" }}
          >
            {chip}
          </span>
        ))}
      </div>
    </article>
  );
}

/* ─── 01 Design & Stone ──────────────────────────────────────────────────── */

const DESIGN_STONE_CARDS: IndCard[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18"/><path d="M5 21V8l7-5 7 5v13"/><path d="M9 21v-6h6v6"/><path d="M9 11h6"/>
      </svg>
    ),
    tag: "Featured",
    title: "Architecture & Design Firms",
    role: "Specifier calls · RFIs · consultant routing",
    body: "Esmi screens specifier calls, books site visits with the project file already pulled, and routes RFIs to the right principal — without interrupting deep work in the studio.",
    chips: ["Esmi", "Revenue-Ops", "RFI triage"],
    core: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/><circle cx="14.5" cy="14.5" r="1.5"/>
      </svg>
    ),
    tag: "Featured",
    title: "Interior Design Studios",
    role: "Showroom enquiries · sample requests · trade accounts",
    body: "Showroom enquiries that don't fall through the cracks. Sample requests logged, trade discounts honoured, and follow-up sequences written in your studio's voice — not a template.",
    chips: ["Esmi", "Sample log", "Trade CRM"],
    core: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7l9-4 9 4"/><path d="M3 7v10l9 4 9-4V7"/><path d="M3 7l9 4 9-4"/><path d="M12 11v10"/>
      </svg>
    ),
    tag: "Featured",
    title: "Stone Distribution",
    role: "Slab inventory · holds · freight quoting",
    body: "Slab availability checked across yards before the call ends. Hold requests confirmed in writing, freight quoted from your live carrier rates, and COIs sent before the truck moves.",
    chips: ["Slab API", "Holds & COI", "EN · ES"],
    core: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5h16v3l-5 11H9L4 8V5z"/><path d="M4 8h16"/><path d="M10 5l-1 3 3 11"/><path d="M14 5l1 3-3 11"/>
      </svg>
    ),
    tag: "Featured",
    title: "Stone & Quartz Fabrication",
    role: "Templates · drawings · install scheduling",
    body: "Templates booked, drawings approved, and installation slots confirmed without a single voicemail. Punch-list follow-through handled with photos and a signed acceptance attached to the job.",
    chips: ["Moraware", "Calendar", "Punch list"],
    core: true,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11h16v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8z"/><path d="M4 11V6a2 2 0 012-2h12a2 2 0 012 2v5"/><path d="M8 4v7"/><path d="M16 4v7"/><circle cx="12" cy="16" r="1.5"/>
      </svg>
    ),
    tag: "Featured",
    title: "Kitchen & Bath",
    role: "Showroom · deposits · supplier ETAs · install",
    body: "The showroom-to-install pipeline, fully tracked. Lead deposits collected, supplier ETAs surfaced as they change, and the homeowner is never the last to know about a delay.",
    chips: ["Esmi", "Deposits", "ETA digest"],
    core: true,
  },
];

function DesignStone() {
  return (
    <section
      id="cat-design-stone"
      className="px-6 py-20 sm:px-8 sm:py-24 lg:px-10"
      style={{ background: "var(--color-paper)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <CatHead
          num="01"
          label="Design & Stone Industries"
          h2="Where the slab meets the spec book."
          blurb="Our deepest playbooks live here. Designers, distributors, and fabricators all run on the same critical path — the right slab, the right template, the right install date. Orchelix agents keep that path honest end to end."
          meta="5 industries · 4-week pilot"
          isCore
        />

        {/* Core stripe */}
        <div
          className="mb-8 flex flex-wrap items-center gap-4 rounded-xl px-6 py-4"
          style={{
            background: "linear-gradient(90deg, var(--color-navy-600) 0%, var(--color-navy-700) 100%)",
          }}
        >
          <span
            className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ background: "rgba(20,184,166,0.2)", color: "var(--color-teal-300)" }}
          >
            Core experience
          </span>
          <p className="flex-1 text-[14px] leading-[1.6]" style={{ color: "rgba(248,250,252,0.8)" }}>
            The Esmi receptionist, the Revenue-Ops agents, and a custom slab-availability tool ship together as the{" "}
            <strong style={{ color: "#fff" }}>Design & Stone Pack</strong> — the fastest pilot we run.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {DESIGN_STONE_CARDS.map((card) => (
            <Card key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 02 Field Service & Construction ────────────────────────────────────── */

const FIELD_SERVICE_CARDS: IndCard[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3v6a4 4 0 004 4v4a3 3 0 003 3h2a2 2 0 002-2v-3"/><path d="M5 3h6"/><circle cx="19" cy="11" r="2"/>
      </svg>
    ),
    title: "Plumbing",
    role: "Emergency dispatch · scheduling",
    body: "After-hours floods reach an on-call tech in under sixty seconds — never a voicemail. Every job lands in your scheduling software with the right SKUs and access notes.",
    chips: ["ServiceTitan", "On-call"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M2 12h3"/><path d="M19 12h3"/>
        <path d="M4.9 4.9l2.1 2.1"/><path d="M17 17l2.1 2.1"/><path d="M4.9 19.1l2.1-2.1"/><path d="M17 7l2.1-2.1"/>
      </svg>
    ),
    title: "HVAC",
    role: "Maintenance contracts · seasonal demand",
    body: "Maintenance contracts that don't lapse. Seasonal tune-ups booked the week the weather turns, and invoices sent before the truck leaves the driveway.",
    chips: ["Contracts", "Auto-invoice"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20"/><path d="M4 20V9l8-5 8 5v11"/><path d="M9 20v-7h6v7"/><circle cx="12" cy="11" r="1"/>
      </svg>
    ),
    title: "Custom Home Building",
    role: "Subs · change orders · client comms",
    body: "Subcontractor coordination without the WhatsApp chaos. Change orders captured on the phone, summarized in your project tool, and signed by end of day.",
    chips: ["Procore", "Change orders"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12L12 4l9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>
      </svg>
    ),
    title: "Home Services",
    role: "Quoting · estimator notes · bilingual intake",
    body: "Quotes turned around the same hour. Bilingual intake, estimator notes captured by the agent, and a polite reminder cadence that books the second appointment.",
    chips: ["EN · ES", "Same-day"],
  },
];

function FieldService() {
  return (
    <section
      id="cat-field-service"
      className="px-6 py-20 sm:px-8 sm:py-24 lg:px-10"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <CatHead
          num="02"
          label="Field Service & Construction"
          h2="The dispatch desk that never goes home."
          blurb="After-hours emergencies, change orders shouted across a job site, seasonal demand swings — field-service operators win or lose on response time. Orchelix answers, qualifies, and dispatches before the next call even rings."
          meta="4 industries · 24/7 dispatch"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FIELD_SERVICE_CARDS.map((card) => (
            <Card key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 03 Manufacturing & Distribution ────────────────────────────────────── */

const MANUFACTURING_CARDS: IndCard[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18"/><path d="M3 21v-9l5 3v-6l5 3v-3l5 3v9"/>
        <path d="M8 21v-4"/><path d="M13 21v-4"/><path d="M18 21v-4"/>
      </svg>
    ),
    tag: "RFQ",
    title: "Manufacturing",
    role: "RFQ qualification · engineering routing · CRM",
    body: "Quote requests qualified against your real lead times, not a spreadsheet someone last touched in February. Engineering questions routed to the right desk — not the receptionist — with full context attached.",
    chips: ["RFQ intake", "Lead-time check", "Salesforce · HubSpot"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="8" width="13" height="11" rx="1"/><path d="M15 12h4l3 3v4h-7v-7z"/>
        <circle cx="6" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M5 8V5h7v3"/>
      </svg>
    ),
    tag: "ERP",
    title: "Building Materials Distribution",
    role: "Counter · will-call · delivery windows",
    body: "Counter calls answered before the third ring. Will-call holds, delivery windows, and credit-hold escalations — all logged to your ERP with the contractor's account already pulled up.",
    chips: ["Epicor · ECi", "Will-call", "Credit holds"],
  },
];

function Manufacturing() {
  return (
    <section
      id="cat-manufacturing"
      className="px-6 py-20 sm:px-8 sm:py-24 lg:px-10"
      style={{ background: "var(--color-paper)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <CatHead
          num="03"
          label="Manufacturing & Distribution"
          h2="Quoting that respects your real lead times."
          blurb="Counter calls, RFQs, will-call holds, credit-hold escalations — the work that keeps a plant or a yard moving. Orchelix sits in front of your ERP and answers in the language of your customers and your operators."
          meta="2 industries · ERP-native"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {MANUFACTURING_CARDS.map((card) => (
            <Card key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 04 Professional & Service ──────────────────────────────────────────── */

const PROFESSIONAL_CARDS: IndCard[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18"/><path d="M5 7h14"/><path d="M5 7l-2 6a4 4 0 008 0l-2-6"/>
        <path d="M19 7l-2 6a4 4 0 008 0l-2-6"/><path d="M8 21h8"/>
      </svg>
    ),
    tag: "Regulated",
    title: "Professional Services",
    role: "Lawyers · accountants · consultants",
    body: "Conflict checks before the conversation begins. New-client intake routed into the right partner's calendar, with the engagement letter queued for review — not lost in a voicemail queue overnight.",
    chips: ["Conflict check", "Clio · Karbon", "Intake"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8"/><path d="M8 12h8"/>
      </svg>
    ),
    tag: "HIPAA",
    title: "Healthcare & Medical Offices",
    role: "Bilingual scheduling · urgent routing · no-shows",
    body: "HIPAA-aware intake, bilingual scheduling, and no-show follow-ups that quietly recover revenue. Urgent calls reach the on-call clinician in under a minute, with the chart number ready.",
    chips: ["EN · ES", "EHR", "On-call"],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11l9-7 9 7"/><path d="M5 10v10h6v-6h2v6h6V10"/><path d="M8 14h2"/><path d="M14 14h2"/>
      </svg>
    ),
    tag: "Bilingual",
    title: "Real Estate & Property Management",
    role: "Maintenance tickets · tours · vendor close-out",
    body: "Maintenance tickets opened from a phone call, assigned to the right vendor, and closed with photos. Tour requests booked against the agent's real calendar — not their inbox.",
    chips: ["AppFolio · Yardi", "Tickets", "Tours"],
  },
];

const INFO_BAND = [
  {
    k: "Average pilot",
    v: "4 weeks",
    p: "From kickoff to first agent live on your numbers — including a senior consultant on the line.",
  },
  {
    k: "Languages",
    v: "EN · ES · FR",
    p: "Switch mid-call without prompting. French available across all industries on request.",
  },
  {
    k: "Don't see yours?",
    v: "We probably fit.",
    p: "If it has a phone, a pipeline, and a ledger, the agents can be tuned to it. Book a fit call.",
  },
];

function Professional() {
  return (
    <section
      id="cat-professional"
      className="px-6 py-20 sm:px-8 sm:py-24 lg:px-10"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <CatHead
          num="04"
          label="Professional & Service-Based Businesses"
          h2="The front desk, finally fluent."
          blurb="For firms where every call is either a billable conversation or a regulatory landmine. Orchelix handles intake with the calm of an experienced legal secretary, the discretion of a clinic front desk, and the diligence of a property manager."
          meta="3 industries · PIPEDA / HIPAA aware"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROFESSIONAL_CARDS.map((card) => (
            <Card key={card.title} card={card} />
          ))}
        </div>

        {/* Info band */}
        <div
          className="mt-12 grid gap-px rounded-2xl overflow-hidden sm:grid-cols-3"
          style={{ background: "var(--color-line)" }}
        >
          {INFO_BAND.map((cell) => (
            <div
              key={cell.k}
              className="px-8 py-8"
              style={{ background: "var(--color-paper)" }}
            >
              <div
                className="mb-1 text-[12px] font-medium uppercase tracking-[0.12em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--color-ink-3)" }}
              >
                {cell.k}
              </div>
              <div
                className="mb-2 text-[26px] font-semibold tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
              >
                {cell.v}
              </div>
              <p className="text-[14px] leading-[1.65]" style={{ color: "var(--color-ink-2)" }}>
                {cell.p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ──────────────────────────────────────────────────────────── */

function IndFinalCTA() {
  return (
    <section className="px-6 py-20 sm:px-8 sm:py-24 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div
          className="flex flex-col gap-10 rounded-2xl px-8 py-12 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16"
          style={{ background: "var(--color-navy-600)" }}
        >
          <div className="max-w-[540px]">
            <h3
              className="text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[34px]"
              style={{ fontFamily: "var(--font-display)", color: "#F8FAFC" }}
            >
              Start with one agent, in your industry, in two weeks.
            </h3>
            <p className="mt-4 text-[15px] leading-[1.72]" style={{ color: "rgba(248,250,252,0.7)" }}>
              A focused pilot, a senior consultant on the line, and a scorecard you can read on Monday morning. Add the next agent only when the first one has earned the room.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <a
              href="/book"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[15px] font-medium"
              style={{ background: "rgba(255,255,255,0.12)", color: "#F8FAFC", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              Talk to a consultant
            </a>
            <a
              href="/book"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-[15px] font-medium"
              style={{ background: "#F8FAFC", color: "var(--color-navy-600)" }}
            >
              Book a demo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
