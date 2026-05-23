const steps = [
  {
    n: "1",
    title: "Map the workflow.",
    desc: "A senior consultant sits with your team and writes the workflow we'll automate first.",
  },
  {
    n: "2",
    title: "Deploy in 14 days.",
    desc: "Your first agent goes live in your tools — phone, inbox, CRM, ledger — with a scorecard you can read on Monday morning.",
  },
  {
    n: "3",
    title: "Audit every action.",
    desc: "Every call, email, and reconciled line is logged. Approve, override, or coach in one click.",
  },
  {
    n: "4",
    title: "Scale on your timeline.",
    desc: "Add the next agent when the first one has earned the room. Same console. Same consultant.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="py-20 sm:py-24 lg:py-32"
      style={{
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(10,37,64,0.025), transparent 70%), var(--surface-2)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div style={{ display: "grid", gap: 18, maxWidth: 720, marginBottom: 80 }}>
          <Eyebrow>How Orchelix works</Eyebrow>
          <h2 style={sectionH2}>Designed for owners, not just engineers.</h2>
          <p style={sectionP}>
            A focused two-week pilot, one workflow instrumented end-to-end, and only expand once you can see it earning its keep.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <div key={i} style={{ position: "relative", paddingRight: 16 }}>
              {/* Connector line — desktop only */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block"
                  style={{
                    position: "absolute",
                    top: 18,
                    left: 60,
                    right: -16,
                    height: 1,
                    background:
                      "linear-gradient(90deg, var(--line-strong) 0%, var(--line-strong) 50%, transparent 100%)",
                  }}
                />
              )}

              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "#fff",
                  color: "var(--navy-600)",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  fontSize: 14,
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--line)",
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.8) inset, 0 1px 2px rgba(10,37,64,0.05)",
                  marginBottom: 22,
                  position: "relative",
                }}
              >
                {step.n}
              </div>

              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 18,
                  lineHeight: 1.3,
                  letterSpacing: "-0.012em",
                  margin: "0 0 8px",
                  color: "var(--ink)",
                }}
              >
                {step.title}
              </h4>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: "var(--ink-2)",
                  margin: 0,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
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
        color: "var(--teal-700)",
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
