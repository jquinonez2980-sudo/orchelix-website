import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Orchelix AI Consulting collects, uses, and protects your personal information in compliance with PIPEDA.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main-content" style={{ fontFamily: "var(--font-display), ui-sans-serif, system-ui, sans-serif" }}>
        <section
          style={{
            background: "var(--surface-2)",
            padding: "80px 24px 64px",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <span
              style={{
                display: "inline-block",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--teal-600)",
                marginBottom: 16,
              }}
            >
              Legal
            </span>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                margin: "0 0 16px",
                color: "var(--ink)",
              }}
            >
              Privacy Policy
            </h1>
            <p style={{ color: "var(--ink-3)", fontSize: 14 }}>
              Effective date: {/* TODO: insert effective date */} June 1, 2026 · Last updated: June 1, 2026
            </p>
          </div>
        </section>

        <section style={{ padding: "64px 24px 100px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <Prose>
              <p>
                Orchelix AI Consulting Inc. (&quot;Orchelix&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website or use our services, in accordance with the <em>Personal Information Protection and Electronic Documents Act</em> (PIPEDA) and applicable provincial privacy legislation.
              </p>
              <p>
                By using our website or services, you consent to the practices described in this policy.
              </p>

              <h2>1. Who We Are</h2>
              <p>
                Orchelix AI Consulting Inc. is incorporated in Ontario, Canada. Our principal place of business is in the Greater Toronto Area, Ontario.
                {/* TODO: Add registered address */}
              </p>
              <p>
                <strong>Privacy Officer:</strong> {/* TODO: Insert name and contact email */}<br />
                <strong>Contact:</strong> {/* TODO: privacy@orhelix.com */}
              </p>

              <h2>2. Information We Collect</h2>
              <p>We collect information you provide directly, including:</p>
              <ul>
                <li><strong>Contact and booking information</strong> — name, email address, company name, phone number when you book a demo or contact us.</li>
                <li><strong>Chat and conversation data</strong> — messages you send to Esmi, our AI receptionist, including appointment requests and service inquiries.</li>
                <li><strong>Usage data</strong> — pages visited, referring URLs, browser type, IP address, and general geographic location (city/region level).</li>
              </ul>
              <p>We do not collect sensitive personal information (health data, financial account numbers, government IDs) unless explicitly required for a specific service and with your express consent.</p>

              <h2>3. How We Use Your Information</h2>
              <p>We use collected information to:</p>
              <ul>
                <li>Schedule and conduct sales demonstrations and consultations</li>
                <li>Provide and improve our AI agent services</li>
                <li>Send transactional communications (appointment confirmations, service updates)</li>
                <li>Respond to inquiries and provide customer support</li>
                <li>Analyze website usage to improve user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p>We do not sell your personal information to third parties.</p>

              <h2>4. Legal Basis for Processing</h2>
              <p>
                Under PIPEDA, we rely on your <strong>implied or express consent</strong> as our lawful basis for collecting and using personal information. You may withdraw consent at any time by contacting us, subject to legal and contractual restrictions.
              </p>

              <h2>5. Data Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              <ul>
                <li><strong>Service providers</strong> — third-party tools used to operate our services (e.g., scheduling software, cloud infrastructure, AI model providers). These parties are contractually bound to protect your data.</li>
                <li><strong>Legal requirements</strong> — when required by law, court order, or government authority.</li>
              </ul>
              <p>
                {/* TODO: List specific sub-processors — e.g., OpenAI, Railway, Vercel, Cal.com/Calendly */}
                A full list of our sub-processors is available upon request.
              </p>

              <h2>6. Data Retention</h2>
              <p>
                We retain personal information only as long as necessary for the purposes outlined in this policy, or as required by law. Chat conversation data is retained for {/* TODO: specify retention period */} 90 days by default. Client contract data is retained for 7 years per Canadian accounting regulations.
              </p>

              <h2>7. Data Residency</h2>
              <p>
                By default, data processed through our AI services may be processed on servers located in the United States or Canada. Canadian data residency is available upon request for enterprise clients. Please contact us to discuss your requirements.
              </p>

              <h2>8. Security</h2>
              <p>
                We implement industry-standard technical and organizational measures to protect your personal information, including encryption in transit (TLS), access controls, and regular security reviews. We are pursuing SOC 2 Type II certification, expected {/* TODO: confirm timeline */} Q4 2026.
              </p>

              <h2>9. Your Rights</h2>
              <p>Under PIPEDA, you have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Withdraw consent for certain uses</li>
                <li>File a complaint with the Office of the Privacy Commissioner of Canada</li>
              </ul>
              <p>
                To exercise any of these rights, contact our Privacy Officer at {/* TODO: privacy@orhelix.com */}.
              </p>

              <h2>10. Cookies and Tracking</h2>
              <p>
                We use essential cookies required for site functionality and, with your consent, analytics cookies to understand how visitors use our site. You may control cookie preferences through your browser settings.
              </p>

              <h2>11. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.
              </p>

              <h2>12. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. Material changes will be communicated via email (for clients) or prominent notice on this page. Continued use of our services constitutes acceptance of the revised policy.
              </p>

              <h2>13. Contact Us</h2>
              <p>
                For privacy-related questions or to exercise your rights:<br />
                {/* TODO: Add complete contact details */}
                <strong>Orchelix AI Consulting Inc.</strong><br />
                Privacy Officer: {/* TODO: Name */}<br />
                Email: {/* TODO: privacy@orhelix.com */}<br />
                Address: {/* TODO: Registered address, Ontario, Canada */}
              </p>
              <p>
                You also have the right to contact the Office of the Privacy Commissioner of Canada at{" "}
                <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer">www.priv.gc.ca</a>.
              </p>
            </Prose>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-display)",
        fontSize: 16,
        lineHeight: 1.75,
        color: "var(--ink-2)",
      }}
    >
      <style>{`
        .orchelix-prose h2 {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 600;
          letter-spacing: -0.018em;
          color: var(--ink);
          margin: 48px 0 12px;
          padding-top: 32px;
          border-top: 1px solid var(--line);
        }
        .orchelix-prose h2:first-of-type { margin-top: 0; border-top: none; padding-top: 0; }
        .orchelix-prose p { margin: 0 0 16px; }
        .orchelix-prose ul { margin: 0 0 16px; padding-left: 20px; }
        .orchelix-prose li { margin-bottom: 8px; }
        .orchelix-prose a { color: var(--teal-700); }
        .orchelix-prose strong { color: var(--ink); font-weight: 600; }
      `}</style>
      <div className="orchelix-prose">{children}</div>
    </div>
  );
}
