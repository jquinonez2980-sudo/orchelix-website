import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import JsonLd from "@/app/components/JsonLd";
import { isLocale, localesFor, localizedHref } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import { getPosts, postHref } from "@/app/i18n/posts";
import { SITE_URL } from "@/app/shell";
import {
  Section,
  PageTitle,
  SectionTitle,
  Prose,
  Stamp,
  QuietAction,
  PageVisual,
} from "@/app/components/ledger";
import blogVisual from "@/public/blog-visual.png";

/* Converted from the light world 2026-08-08 — index and article chrome only.
   Article bodies keep the previous long-form styling on purpose: a documented
   Read variant of Prose is its own piece of work and was scoped out of this
   pass.

   Removed here: a "Resources" kicker above the H1, a teal dot separator and
   two `→` glyphs used as icons, and a hover colour shift to teal. The index
   is now a ruled register of articles — date and reading time as tabular
   figures in the margin, which is what a dated list wants to be. */

export function generateStaticParams() {
  return localesFor("/blog").map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const p = (await getDictionary(locale)).pages.blog;
  return {
    title: p.title,
    description: p.description,
    alternates: {
      canonical: localizedHref("/blog", locale),
      languages: { en: "/blog", es: "/es/blog" },
    },
  };
}

function formatDate(iso: string, locale: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(
    locale === "es" ? "es-419" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
}

export default async function BlogIndexPage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const p = t.pages.blog;
  const posts = getPosts(locale);

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}${localizedHref("/blog", locale)}`,
    name: "Orchelix Blog",
    description: p.description,
    publisher: { "@id": `${SITE_URL}/#org` },
    inLanguage: locale,
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}${postHref(locale, post.slug)}`,
      datePublished: post.datePublished,
      description: post.description,
    })),
  };

  return (
    <>
      <JsonLd data={blogJsonLd} />
      <Nav locale={locale} t={t} />
      <main id="main-content">
        {/* ── Opening ── */}
        <Section tone="field">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] lg:items-start">
            <div>
              <PageTitle max="15ch">{p.heading}</PageTitle>
              <Prose size="1.0625rem" max="48ch" style={{ marginTop: "1.7rem" }}>
                {p.lede}
              </Prose>
            </div>
            <div className="flex flex-col items-end gap-8">
              <PageVisual src={blogVisual} max={300} />
              <div className="flex flex-wrap items-center gap-x-7 gap-y-4 lg:justify-end">
                <Stamp href={localizedHref("/book", locale)}>{t.common.bookPilot}</Stamp>
                <QuietAction href="/try-esmi">{t.common.hearRealCall}</QuietAction>
              </div>
            </div>
          </div>
        </Section>

        {/* ── The register of articles ── */}
        <Section tone="stock">
          <ol
            className="lg-anchor m-0 list-none p-0"
            style={{ "--lg-anchor-w": "2px" } as React.CSSProperties}
          >
            {posts.map((post, i) => (
              <li
                key={post.slug}
                className="lg-settle-item"
                style={
                  {
                    "--i": i,
                    borderBottom: "1px solid var(--lg-hair)",
                  } as React.CSSProperties
                }
              >
                <a
                  href={postHref(locale, post.slug)}
                  className="lg-quiet grid gap-x-10 gap-y-3 lg:grid-cols-[11rem_minmax(0,1fr)]"
                  style={{
                    padding: "1.9rem 0",
                    textDecoration: "none",
                    color: "var(--lg-ink-on-stock)",
                  }}
                >
                  <div
                    /* `content-start` matters: the wrapped lines sit in a grid
                       cell as tall as the article beside them, and without it
                       `align-content: stretch` spreads the date and the
                       reading time to the full height of that cell. */
                    className="lg-fig flex flex-wrap content-start items-baseline gap-x-4 gap-y-1"
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--lg-ink-on-stock-2)",
                    }}
                  >
                    <time dateTime={post.datePublished}>
                      {formatDate(post.datePublished, locale)}
                    </time>
                    <span>
                      {post.readingMinutes} {p.readingSuffix}
                    </span>
                  </div>

                  <div>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontStretch: "86%",
                        fontWeight: 600,
                        fontSize: "1.25rem",
                        letterSpacing: "-0.01em",
                        textTransform: "uppercase",
                        color: "var(--lg-ink-on-stock)",
                        margin: 0,
                      }}
                    >
                      {post.title}
                    </h2>
                    <Prose tone="stock" size="0.9375rem" max="64ch" style={{ marginTop: "0.6rem" }}>
                      {post.description}
                    </Prose>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </Section>

        {/* ── Close ── */}
        <Section tone="field-3" style={{ borderTop: "2px solid var(--lg-foil)" }}>
          <div className="grid items-end gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <SectionTitle scale="display" max="16ch">
                {p.closeHeading}
              </SectionTitle>
              <Prose size="1.0625rem" max="50ch" style={{ marginTop: "1.5rem" }}>
                {p.closeBody}
              </Prose>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
              <Stamp href="/try-esmi" size="1rem">
                {t.common.hearRealCall}
              </Stamp>
              <QuietAction href={localizedHref("/pricing", locale)}>
                {t.common.seePricing}
              </QuietAction>
            </div>
          </div>
        </Section>
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}
