import React from "react";

const items = [
  {
    title: "Senior consultants, not a help desk.",
    desc: "Every deployment is led by a senior operator you can call by name. No tier-one tickets, no 48-hour reply windows.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/>
        <circle cx="10" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: "Bilingual from day one.",
    desc: "Every agent speaks English and Spanish natively, with French available as an add-on — the languages your North American customers actually use.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
      </svg>
    ),
  },
  {
    title: "PIPEDA-aligned. SOC 2 in progress.",
    desc: "Operator-grade controls, retention rules, and an audit trail your clients' auditors will actually accept. Data residency by request.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: "Human-in-the-loop, always.",
    desc: "Approve, override, or coach any agent in one click. You decide what gets automated — and what still waits for you.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
        <path d="M19 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/>
        <path d="m17 8 2 2 4-4"/>
      </svg>
    ),
  },
];

export default function Why() {
  return (
    <section id="why" className="py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div style={{ display: "grid", gap: 18, maxWidth: 720, marginBottom: 80 }}>
          <Eyebrow navy>Why Orchelix</Eyebrow>
          <h2 style={sectionH2}>Built like a consultancy. Priced like software.</h2>
          <p style={sectionP}>
            Every deployment ships with a senior consultant, real operator controls, and the kind of audit trail your clients&apos; auditors actually accept.
          </p>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{
            border: "1px solid var(--line)",
            borderRadius: 20,
            background: "#fff",
            overflow: "hidden",
            boxShadow: "0 1px 0 rgba(10,37,64,0.02)",
          }}
        >
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            const hasRightAtLg = i % 2 === 0;
            const hasBottomAtLg = i < 2;

            return (
              <div
                key={i}
                className={[
                  /* mobile: bottom border on all but last */
                  !isLast ? "border-b border-[var(--line)]" : "",
                  /* lg: right border on left-column items */
                  hasRightAtLg ? "lg:border-r" : "",
                  /* lg: bottom border only on first row; override mobile border-b on later rows */
                  hasBottomAtLg ? "lg:border-b" : "lg:border-b-0",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  display: "grid",
                  gridTemplateColumns: "44px 1fr",
                  gap: 18,
                  alignItems: "start",
                  padding: "36px 36px",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: 46,
                    height: 46,
                    borderRadius: 13,
                    background: "linear-gradient(135deg, var(--teal-50) 0%, #FFFFFF 100%)",
                    color: "var(--teal-700)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--teal-100)",
                    boxShadow:
                      "0 1px 0 rgba(255,255,255,0.9) inset, 0 6px 12px -6px rgba(20,184,166,0.18)",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                  <span
                    style={{
                      position: "absolute",
                      right: -3,
                      bottom: -3,
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "var(--teal-500)",
                      opacity: 0.55,
                      boxShadow: "0 0 10px 2px rgba(20,184,166,0.40)",
                      display: "inline-block",
                    }}
                  />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: 18,
                      lineHeight: 1.3,
                      letterSpacing: "-0.014em",
                      margin: "0 0 8px",
                      color: "var(--ink)",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 400,
                      fontSize: 14.5,
                      lineHeight: 1.6,
                      color: "var(--ink-2)",
                      margin: 0,
                      maxWidth: 460,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
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
