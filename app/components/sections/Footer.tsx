import { localizedHref, otherLocale, type Locale } from "@/app/i18n/config";
import enMessages, { type Messages } from "@/app/i18n/messages/en";

/* Server component now — the locale arrives as a prop, so there is nothing to
   read from the client. The blog stays per-locale because the Spanish posts
   are a separate, hand-written set that was never machine-translated. */

/* Footer is a server component, so importing the English catalogue as a
   default costs nothing on the client. Routes under `app/(site)/` are
   English-only and rely on this. */
export default function Footer({
  locale = "en",
  t = enMessages,
}: {
  locale?: Locale;
  t?: Messages;
} = {}) {
  const L = (path: string) => localizedHref(path, locale);
  const other = otherLocale(locale);

  const columns = [
    {
      head: t.footer.products,
      links: [
        { label: t.footer.links.esmi, href: "/ai-receptionist" },
        /* /try-esmi was absent from the nav and from here both — the live
           product demo had no route in from the chrome at all. */
        { label: t.nav.tryEsmi, href: "/try-esmi" },
        { label: t.footer.links.revops, href: `${L("/solutions")}#agent-revops` },
        { label: t.footer.links.acumen, href: "/acumen" },
        { label: t.footer.links.industries, href: L("/industries") },
      ],
    },
    {
      head: t.footer.company,
      links: [
        { label: t.footer.links.howItWorks, href: L("/how-it-works") },
        { label: t.footer.links.pricing, href: L("/pricing") },
        { label: t.footer.links.about, href: L("/about") },
        { label: t.footer.links.blog, href: locale === "es" ? "/es/blog" : "/blog" },
        { label: t.footer.links.book, href: L("/book") },
      ],
    },
    {
      head: t.footer.trust,
      links: [
        { label: t.footer.links.privacy, href: "/privacy" },
        { label: t.footer.links.terms, href: "/terms" },
        { label: t.footer.links.pipeda, href: "/privacy" },
        { label: t.footer.links.security, href: "/privacy" },
      ],
    },
  ];

  const headStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: "0.625rem",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "var(--lg-ink-3)",
    paddingBottom: "0.8rem",
    marginBottom: "0.4rem",
    marginTop: 0,
    fontWeight: 500,
    borderBottom: "1px solid var(--lg-rule-quiet)",
  };

  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "0.9375rem",
    color: "var(--lg-ink-2)",
    textDecoration: "none",
    display: "block",
    padding: "0.42rem 0",
    width: "fit-content",
  };

  return (
    <footer
      className="lg-field lg-cloth"
      style={{ borderTop: "1px solid var(--lg-hair)" }}
    >
      {/* Brand flourish — the logo's helix motif repeated as a thin band,
          cropped down from the wide source image rather than stretched. */}
      <div style={{ width: "100%", height: 96, overflow: "hidden" }}>
        <img
          src="/helix-pattern.png"
          alt=""
          aria-hidden="true"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
        />
      </div>

      <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-x-12 gap-y-12 lg:grid-cols-[minmax(0,1.25fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <a href={L("/")} aria-label={t.nav.home} style={{ display: "inline-flex" }}>
              <img
                src="/orchelix-logo-full-color.png"
                alt={t.nav.home}
                width={128}
                height={45}
                style={{ display: "block", height: 32, width: "auto" }}
              />
            </a>

            <p
              className="lg-prose"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                lineHeight: 1.6,
                color: "var(--lg-ink-3)",
                maxWidth: "38ch",
                marginTop: "1.4rem",
                marginBottom: "1.6rem",
              }}
            >
              {t.footer.blurb}
            </p>

            <a
              href="tel:+15615661066"
              className="lg-fig lg-quiet"
              style={{
                fontSize: "0.8125rem",
                letterSpacing: "0.07em",
                color: "var(--lg-ink)",
                textDecoration: "none",
              }}
            >
              {t.common.phone}
            </a>
          </div>

          {columns.map((col) => (
            <nav key={col.head} aria-label={col.head}>
              <h2 style={headStyle}>{col.head}</h2>
              {col.links.map((l) => (
                <a key={l.label + l.href} href={l.href} className="lg-quiet" style={linkStyle}>
                  {l.label}
                </a>
              ))}
            </nav>
          ))}
        </div>

        <div
          className="lg-fig mt-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-3"
          style={{
            borderTop: "1px solid var(--lg-hair)",
            paddingTop: "1.5rem",
            fontSize: "0.6875rem",
            letterSpacing: "0.06em",
            color: "var(--lg-ink-3)",
          }}
        >
          <span>© {new Date().getFullYear()} {t.footer.rights}</span>
          <span className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="/privacy" className="lg-quiet" style={{ color: "inherit", textDecoration: "none" }}>
              {t.footer.privacyShort}
            </a>
            <a href="/terms" className="lg-quiet" style={{ color: "inherit", textDecoration: "none" }}>
              {t.footer.termsShort}
            </a>
            <a
              href={localizedHref("/", other)}
              className="lg-quiet"
              style={{ color: "inherit", textDecoration: "none" }}
              lang={other}
              hrefLang={other}
            >
              {t.meta.switchTo}
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
