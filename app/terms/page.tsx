import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing your use of the Orchelix website and AI agent services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p style={{ color: "var(--ink-2)", fontSize: 14 }}>
              Effective date: June 1, 2026 · Last updated: June 1, 2026
            </p>
          </div>
        </section>

        <section style={{ padding: "64px 24px 100px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <Prose>
              <p>
                These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website and services provided by Orchelix AI Consulting Inc. (&quot;Orchelix&quot;, &quot;we&quot;, &quot;us&quot;). By accessing our website or using our services, you agree to be bound by these Terms.
              </p>

              <h2>1. Services</h2>
              <p>
                Orchelix provides AI agent consulting and deployment services for revenue operations, including AI receptionist, lead qualification, and financial operations automation. Specific service terms, SLAs, and pricing are governed by your signed Service Agreement.
              </p>

              <h2>2. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Use our services for any unlawful purpose</li>
                <li>Attempt to reverse-engineer, scrape, or exploit our AI systems</li>
                <li>Misrepresent your identity or affiliation</li>
                <li>Interfere with the security or integrity of our platform</li>
              </ul>

              <h2>3. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, and software, is the property of Orchelix AI Consulting Inc. and is protected by Canadian and international intellectual property laws.
              </p>

              <h2>4. Disclaimer of Warranties</h2>
              <p>
                The website and its content are provided &quot;as is&quot; without warranty of any kind. We do not warrant that the site will be uninterrupted, error-free, or free of viruses or harmful components.
              </p>

              <h2>5. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law:
              </p>
              <p>
                <strong>(a) Cap on Liability.</strong> Orchelix&apos;s total cumulative liability to you for any and all claims arising out of or related to these Terms or the Services, regardless of the form of action or the basis of the claim (including contract, tort, negligence, or otherwise), shall not exceed the greater of: (i) the total fees paid by you to Orchelix in the twelve (12) months immediately preceding the event giving rise to the claim; or (ii) five hundred Canadian dollars (CAD $500).
              </p>
              <p>
                <strong>(b) Exclusion of Consequential Damages.</strong> In no event shall Orchelix, its directors, officers, employees, agents, or licensors be liable for any indirect, incidental, special, exemplary, consequential, or punitive damages of any kind, including but not limited to: loss of revenue or profits; loss of business or contracts; loss of anticipated savings; loss of data or corruption of data; loss of goodwill or reputation; or costs of procuring substitute services — even if Orchelix has been advised of the possibility of such damages or such damages were reasonably foreseeable.
              </p>
              <p>
                <strong>(c) Essential Basis.</strong> The parties acknowledge that the limitations of liability set out in this section reflect a reasonable and negotiated allocation of commercial risk between sophisticated parties and form an essential basis of the bargain between them. Orchelix would not provide the Services or enter into these Terms without the benefit of these limitations.
              </p>
              <p>
                <strong>(d) Exceptions.</strong> Nothing in these Terms limits or excludes Orchelix&apos;s liability for: (i) death or personal injury caused by Orchelix&apos;s negligence; (ii) fraud or fraudulent misrepresentation by Orchelix; or (iii) any other liability that cannot be excluded or limited under the laws of the Province of Ontario or the federal laws of Canada applicable therein, including applicable consumer protection legislation where it applies.
              </p>
              <p>
                <strong>(e) Jurisdiction Variance.</strong> Certain jurisdictions do not permit the exclusion of implied warranties or the limitation or exclusion of liability for incidental or consequential damages. If such laws apply to you, some or all of the limitations above may not apply, and you may have additional legal rights.
              </p>
              <p style={{ fontSize: 13, color: "var(--ink-3)", borderLeft: "3px solid var(--line)", paddingLeft: 14, marginTop: 8 }}>
                <em>This section has been drafted for legal review. The terms above are subject to the executed Service Agreement between Orchelix and the client, which governs in the event of any conflict. For questions, contact <a href="mailto:legal@orchelix.com">legal@orchelix.com</a>.</em>
              </p>

              <h2>6. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable therein. Disputes shall be resolved in the courts of Ontario.
              </p>

              <h2>7. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Material changes will be communicated with at least 30 days&apos; notice. Continued use after the effective date constitutes acceptance.
              </p>

              <h2>8. Contact</h2>
              <p>
                Questions about these Terms: <a href="mailto:legal@orchelix.com">legal@orchelix.com</a><br />
                Orchelix AI Consulting Inc., Greater Toronto Area, Ontario, Canada
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
    <div style={{ fontFamily: "var(--font-display)", fontSize: 16, lineHeight: 1.75, color: "var(--ink-2)" }}>
      <style>{`
        .orchelix-prose-t h2 { font-family:var(--font-display);font-size:22px;font-weight:600;letter-spacing:-0.018em;color:var(--ink);margin:48px 0 12px;padding-top:32px;border-top:1px solid var(--line); }
        .orchelix-prose-t h2:first-of-type{margin-top:0;border-top:none;padding-top:0;}
        .orchelix-prose-t p{margin:0 0 16px;}
        .orchelix-prose-t ul{margin:0 0 16px;padding-left:20px;}
        .orchelix-prose-t li{margin-bottom:8px;}
        .orchelix-prose-t a{color:var(--teal-700);}
        .orchelix-prose-t strong{color:var(--ink);font-weight:600;}
      `}</style>
      <div className="orchelix-prose-t">{children}</div>
    </div>
  );
}
