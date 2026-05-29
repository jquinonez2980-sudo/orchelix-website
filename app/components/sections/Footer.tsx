import Image from "next/image";

const columns = [
  {
    h: "Agents",
    links: [
      { label: "Virtual Receptionist", href: "/solutions" },
      { label: "Sales & Marketing",    href: "/solutions" },
      { label: "Accounting OS",        href: "/solutions" },
      { label: "Industries",            href: "/industries" },
    ],
  },
  {
    h: "Company",
    links: [
      { label: "Contact",    href: "/#contact" },
      { label: "Pricing",    href: "/pricing" },
      { label: "Try Esmi",   href: "/try-esmi" },
      { label: "Book a demo", href: "/book" },
    ],
  },
  {
    h: "Trust",
    links: [
      { label: "Privacy Policy",   href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "PIPEDA",           href: "/privacy" },
      { label: "Security",         href: "/privacy" },
    ],
  },
];

export default function Footer({ theme = "light" }: { theme?: "light" | "dark" }) {
  const dark = theme === "dark";
  const c = dark
    ? {
        bg: "#080C16",
        border: "rgba(255,255,255,0.10)",
        text: "rgba(234,242,255,0.66)",
        accent: "#00F0FF",
        iconBg: "rgba(255,255,255,0.05)",
        iconBorder: "rgba(255,255,255,0.12)",
        legalDot: "rgba(234,242,255,0.30)",
        logoFilter: "brightness(0) invert(1)" as const,
      }
    : {
        bg: "var(--surface-2)",
        border: "var(--line)",
        text: "var(--ink-2)",
        accent: "var(--teal-700)",
        iconBg: "#fff",
        iconBorder: "var(--line)",
        legalDot: "var(--ink-4)",
        logoFilter: undefined,
      };

  return (
    <footer
      id="about"
      style={{
        position: "relative",
        background: c.bg,
        borderTop: `1px solid ${c.border}`,
        overflow: "hidden",
      }}
      className="px-6 pb-8 pt-20 sm:px-8 sm:pt-24 lg:px-10 lg:pt-24"
    >
      {/* Subtle helix watermark — via next/image so it gets AVIF/WebP */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: -120,
          bottom: -120,
          width: 420,
          height: 420,
          pointerEvents: "none",
          maskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 70%)",
        }}
      >
        <Image
          src={dark ? "/orchelix-mark-light.png" : "/orchelix-mark.png"}
          alt=""
          width={420}
          height={420}
          quality={50}
          style={{ opacity: dark ? 0.06 : 0.04, objectFit: "contain" }}
        />
      </div>

      {/* Top hairline accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 1,
          background: dark
            ? "linear-gradient(90deg, transparent 0%, rgba(0,240,255,0.5) 30%, rgba(168,85,247,0.5) 70%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, var(--teal-200) 30%, var(--navy-300) 70%, transparent 100%)",
          opacity: dark ? 0.55 : 0.4,
        }}
      />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-14">
          {/* Brand column */}
          <div>
            <a href="/" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
              <Image
                src="/orchelix-lockup-horizontal.png"
                alt="Orchelix AI Consulting"
                width={170}
                height={42}
                style={{ height: 42, width: "auto", filter: c.logoFilter }}
              />
            </a>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: 1.65,
                color: c.text,
                margin: "20px 0 24px",
                maxWidth: 360,
              }}
            >
              AI agents for SMEs, professional firms, and service organizations
              across North America. West Palm Beach, FL · South Florida · GTA
              Ontario · remote across the US and Canada.
            </p>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: dark ? "#00F0FF" : "var(--teal-500)",
                  boxShadow: dark ? "0 0 0 3px rgba(0,240,255,0.22)" : "0 0 0 3px rgba(20,184,166,0.18)",
                  display: "inline-block",
                  animation: "pulse 2.4s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  fontSize: 11,
                  lineHeight: 1,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: c.text,
                }}
              >
                Now booking Q3 pilots
              </span>
            </div>

            <div style={{ marginTop: 16 }}>
              <a
                href="tel:+15615661066"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  fontSize: 13,
                  lineHeight: 1,
                  letterSpacing: "0.04em",
                  color: c.accent,
                  textDecoration: "none",
                }}
              >
                (561) 566-1066
              </a>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <a
                href="https://instagram.com/orchelix"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Orchelix on Instagram"
                className="social-icon-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  border: `1px solid ${c.iconBorder}`,
                  color: c.text,
                  background: c.iconBg,
                  textDecoration: "none",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/orchelix-ai-consulting"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Orchelix on LinkedIn"
                className="social-icon-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  border: `1px solid ${c.iconBorder}`,
                  color: c.text,
                  background: c.iconBg,
                  textDecoration: "none",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.h}>
              <h3
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  fontSize: 11,
                  lineHeight: 1,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: c.text,
                  margin: "0 0 22px",
                }}
              >
                {col.h}
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gap: 12,
                }}
              >
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        fontSize: 14,
                        lineHeight: 1,
                        color: c.text,
                        textDecoration: "none",
                        transition: "color 180ms var(--ease-standard)",
                      }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal row */}
        <div
          className="mt-16 flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between"
          style={{
            borderTop: `1px solid ${c.border}`,
            fontFamily: "var(--font-mono)",
            fontWeight: 500,
            fontSize: 11.5,
            lineHeight: 1,
            letterSpacing: "0.02em",
            color: c.text,
          }}
        >
          <span>© 2026 Orchelix AI Consulting Inc. · West Palm Beach, FL.</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 16 }}>
            <a href="/privacy" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
            <span aria-hidden="true" style={{ width: 3, height: 3, borderRadius: "50%", background: c.legalDot, display: "inline-block" }} />
            <a href="/terms" style={{ color: "inherit", textDecoration: "none" }}>Terms</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
