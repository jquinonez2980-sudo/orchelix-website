const solutions = [
  {
    num: "01 / Revenue",
    title: "Revenue-Ops Agents",
    desc: "Qualify every lead, follow up on time, and close more deals. Sales and marketing agents that run the pipeline while your team runs the conversations that matter.",
    chips: ["Qualify", "Follow up", "Close"],
    foot: "Explore Revenue-Ops",
    href: "/solutions#agent-revops",
    teal: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5"/>
        <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4"/>
      </svg>
    ),
  },
  {
    num: "02 / Voice",
    title: "Virtual Receptionist & Call Automation",
    desc: "24/7 call handling that books appointments, routes the urgent calls, and sounds human in English and Spanish. Every call ends with a full transcript and a reason.",
    chips: ["24/7", "Smart routing", "EN · ES"],
    foot: "Meet Esmi",
    href: "/solutions#agent-esmi",
    teal: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 16.5v2.6a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.62 3.4 2 2 0 0 1 3.6 1.22h2.6a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L7.3 9a16 16 0 0 0 6 6l1.13-1.14a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.7a2 2 0 0 1 1.72 2.03Z"/>
      </svg>
    ),
  },
  {
    num: "03 / Finance",
    title: "Accounting & Finance OS",
    desc: "Automated bookkeeping, reconciliations, and a month-end close you can trust. Reliable financial operations — with a reviewable report on your bookkeeper's desk every morning.",
    chips: ["Bookkeeping", "Reconciliation", "Close"],
    foot: "See the Accounting OS",
    href: "/solutions#agent-finance",
    teal: false,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M3 9h18M9 3v18M13 13h4M13 17h4"/>
        <path d="M5.5 13.5l1 1 2-2M5.5 17.5l1 1 2-2"/>
      </svg>
    ),
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        {/* Section head */}
        <div style={{ display: "grid", gap: 18, maxWidth: 720, marginBottom: 80 }}>
          <Eyebrow navy>The agent stack</Eyebrow>
          <h2 style={sectionH2}>One system for the work that keeps a business running.</h2>
          <p style={sectionP}>Three agents, one operator console, one audit trail. Add the next one when you&apos;re ready.</p>
          <a
            href="/solutions"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 14,
              color: "var(--navy-600)",
              textDecoration: "none",
              marginTop: 4,
            }}
          >
            See all agents →
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <a
              key={s.num}
              href={s.href}
              className={`sol-card${i === 2 ? " sm:col-span-2 lg:col-span-1" : ""}`}
              style={{
                background:
                  "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(20,184,166,0.04), transparent 60%), linear-gradient(180deg, #FFFFFF 0%, #FCFCFD 100%)",
                border: "1px solid var(--line)",
                borderRadius: 18,
                padding: "36px 32px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                textDecoration: "none",
                color: "inherit",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top hairline reveal */}
              <div
                className="sol-hairline"
                style={{
                  position: "absolute",
                  left: 28,
                  right: 28,
                  top: 0,
                  height: 2,
                  background: "linear-gradient(90deg, var(--navy-600), var(--teal-500))",
                  borderRadius: "0 0 4px 4px",
                }}
              />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
                <div
                  style={{
                    position: "relative",
                    width: 48,
                    height: 48,
                    borderRadius: 13,
                    background: s.teal
                      ? "linear-gradient(135deg, var(--teal-50) 0%, #FFFFFF 100%)"
                      : "linear-gradient(135deg, var(--navy-50) 0%, #FFFFFF 100%)",
                    color: s.teal ? "var(--teal-700)" : "var(--navy-600)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid ${s.teal ? "var(--teal-100)" : "var(--navy-100)"}`,
                    boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 6px 12px -6px rgba(10,37,64,0.10)",
                  }}
                >
                  {s.icon}
                  <span
                    style={{
                      position: "absolute",
                      right: -3,
                      bottom: -3,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: s.teal ? "var(--navy-500)" : "var(--teal-500)",
                      opacity: s.teal ? 0.5 : 0.55,
                      boxShadow: s.teal
                        ? "0 0 12px 2px rgba(10,37,64,0.30)"
                        : "0 0 12px 2px rgba(20,184,166,0.45)",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontWeight: 500,
                    fontSize: 11,
                    lineHeight: 1,
                    letterSpacing: "0.18em",
                    color: "var(--ink-3)",
                    textTransform: "uppercase",
                  }}
                >
                  {s.num}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 22,
                  lineHeight: 1.25,
                  letterSpacing: "-0.022em",
                  margin: "4px 0 0",
                  color: "var(--ink)",
                }}
              >
                {s.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: 14.5,
                  lineHeight: 1.65,
                  color: "var(--ink-2)",
                  margin: 0,
                }}
              >
                {s.desc}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
                {s.chips.map(chip => (
                  <span
                    key={chip}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontWeight: 500,
                      fontSize: 11,
                      lineHeight: 1,
                      letterSpacing: "0.02em",
                      background: "var(--surface-2)",
                      color: "var(--ink-2)",
                      padding: "7px 11px",
                      borderRadius: 999,
                      border: "1px solid transparent",
                    }}
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div
                style={{
                  marginTop: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 13,
                  lineHeight: 1,
                  color: "var(--teal-700)",
                  letterSpacing: "-0.005em",
                  paddingTop: 12,
                  borderTop: "1px solid var(--line)",
                }}
              >
                {s.foot}
                <span className="sol-arrow">→</span>
              </div>
            </a>
          ))}
        </div>

        {/* Future tile */}
        <div
          className="mt-4 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7"
          style={{
            borderRadius: 16,
            padding: "26px 32px",
            background: "#fff",
            border: "1px solid var(--line)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: -60,
              top: -40,
              width: 220,
              height: 220,
              backgroundImage: "url('/orchelix-mark.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity: 0.04,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              flexShrink: 0,
              width: 44,
              height: 44,
              borderRadius: 11,
              background: "var(--surface-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--line)",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--navy-600)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="7" width="14" height="11" rx="3"/>
              <path d="M9 11h.01M15 11h.01M9 15h6M12 4v3"/>
              <circle cx="12" cy="3.2" r="0.9" fill="var(--teal-500)" stroke="none"/>
              <path d="M3 13h2M19 13h2"/>
            </svg>
          </div>
          <div style={{ flex: 1, display: "grid", gap: 6, position: "relative" }}>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: 17,
                lineHeight: 1.25,
                letterSpacing: "-0.012em",
                color: "var(--ink)",
              }}
            >
              Physical AI &amp; embodied agents
            </span>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: 1.55,
                color: "var(--ink-2)",
                margin: 0,
                maxWidth: 560,
              }}
            >
              The same orchestration layer, extended to humanoid integrations for in-person service environments.
            </p>
          </div>
          <span
            style={{
              flexShrink: 0,
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: 11,
              lineHeight: 1,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--teal-700)",
              background: "var(--teal-50)",
              padding: "9px 13px",
              borderRadius: 999,
              border: "1px solid var(--teal-100)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "var(--teal-500)",
                boxShadow: "0 0 0 3px rgba(20,184,166,0.18)",
                display: "inline-block",
              }}
            />
            On the roadmap · 2026
          </span>
        </div>
      </div>
    </section>
  );
}

function Eyebrow({ children, navy }: { children: React.ReactNode; navy?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontFamily: "var(--font-mono)",
        fontWeight: 500,
        fontSize: 11,
        lineHeight: 1,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: navy ? "var(--navy-500)" : "var(--teal-700)",
      }}
    >
      <span style={{ width: 18, height: 1, background: "currentColor", opacity: 0.7, display: "inline-block" }} />
      {children}
    </span>
  );
}

const sectionH2: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 600,
  fontSize: 46,
  lineHeight: 1.06,
  letterSpacing: "-0.028em",
  color: "var(--ink)",
  margin: 0,
};

const sectionP: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 400,
  fontSize: 18,
  lineHeight: 1.55,
  color: "var(--ink-2)",
  margin: 0,
  maxWidth: 620,
};
