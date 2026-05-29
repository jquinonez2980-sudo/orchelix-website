const costs = [
  {
    title: "Calls that go unanswered.",
    desc: "After-hours and overflow calls turn into voicemails — and voicemails turn into customers who booked with whoever picked up first.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.5 16.5v2.6a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.62 3.4 2 2 0 0 1 3.6 1.22h2.6a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L7.3 9a16 16 0 0 0 6 6l1.13-1.14a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.7a2 2 0 0 1 1.72 2.03Z"/>
        <path d="m17 2 5 5M22 2l-5 5"/>
      </svg>
    ),
  },
  {
    title: "Follow-up that arrives late.",
    desc: "A lead waits a day for a callback. By the time someone replies, the decision is already made and the quote is already signed.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 7v5l3.5 2"/>
      </svg>
    ),
  },
  {
    title: "A month-end that drags.",
    desc: "Reconciliations stretch out for weeks, so you're steering the business on last month's numbers instead of this morning's.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="17" rx="2"/>
        <path d="M3 9h18M8 2v4M16 2v4"/>
        <path d="m9 14 2 2 4-4"/>
      </svg>
    ),
  },
  {
    title: "Your best people on busywork.",
    desc: "The people you hired for judgment spend their days on data entry, chasing paperwork, and re-keying the same numbers between tools.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M5.5 21a6.5 6.5 0 0 1 13 0"/>
      </svg>
    ),
  },
];

export default function Problem() {
  return (
    <section id="problem" className="py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div style={{ display: "grid", gap: 18, maxWidth: 760, marginBottom: 80 }}>
          <Eyebrow>The cost of manual ops</Eyebrow>
          <h2 style={sectionH2}>The work gets done. It&apos;s everything that slips while you do it.</h2>
          <p style={sectionP}>
            Manual operations rarely fail loudly. They leak &mdash; a call that goes to
            voicemail, a follow-up that waits a day, a close that drags a week &mdash;
            until growth quietly stalls and no one can point to exactly why.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4"
          style={{
            border: "1px solid var(--line)",
            borderRadius: 20,
            background: "var(--line)",
            overflow: "hidden",
            boxShadow: "0 1px 0 rgba(10,37,64,0.02)",
          }}
        >
          {costs.map((c, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                padding: "34px 30px",
                background: "#fff",
              }}
            >
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 13,
                  background: "linear-gradient(135deg, var(--navy-50) 0%, #FFFFFF 100%)",
                  color: "var(--navy-600)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--navy-100)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 6px 12px -6px rgba(10,37,64,0.10)",
                }}
              >
                {c.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 17,
                  lineHeight: 1.3,
                  letterSpacing: "-0.014em",
                  margin: 0,
                  color: "var(--ink)",
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: "var(--ink-2)",
                  margin: 0,
                }}
              >
                {c.desc}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: 18,
            lineHeight: 1.5,
            letterSpacing: "-0.012em",
            color: "var(--ink)",
            margin: "40px auto 0",
            maxWidth: 680,
            textAlign: "center",
          }}
        >
          None of this is a people problem. It&apos;s an operating-model problem &mdash;{" "}
          <span style={{ color: "var(--teal-700)" }}>and that&apos;s exactly what an agent stack is built to fix.</span>
        </p>
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
        color: "var(--navy-500)",
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
