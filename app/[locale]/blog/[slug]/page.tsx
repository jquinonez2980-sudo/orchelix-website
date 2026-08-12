import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import JsonLd from "@/app/components/JsonLd";
import ArticleBody from "@/app/components/blog/ArticleBody";
import { isLocale, localesFor, localizedHref, otherLocale } from "@/app/i18n/config";
import { getDictionary } from "@/app/i18n/dictionaries";
import { counterpartSlug, getPost, getSlugs, postHref } from "@/app/i18n/posts";
import { SITE_URL } from "@/app/shell";
import { Section, PageTitle, Prose, Stamp, QuietAction } from "@/app/components/ledger";

/* Article chrome converted 2026-08-08; the body is not.

   `ArticleBody` still renders the light world's long-form styling, which is
   why the article sits on a `stock` section: the cream ground is what those
   dark-ink tokens were written against, so the prose stays legible while it
   waits for its own pass. The teal accents inside it are the known remainder.

   Removed from the chrome: two `←`/`→` glyphs used as icons, an 18px rounded
   related-links card, and the teal rule under the header. */

export function generateStaticParams() {
  return localesFor("/blog").flatMap((locale) =>
    getSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const post = getPost(locale, slug);
  if (!post) return {};

  const self = postHref(locale, post.slug);
  const other = otherLocale(locale);
  const twin = counterpartSlug(locale, post.slug);

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: self,
      /* Only three of the Spanish posts have an English counterpart, so an
         alternates pair is emitted per post rather than per locale. Claiming
         a translation that does not exist is worse than claiming none. */
      ...(twin
        ? {
            languages: {
              [locale]: self,
              [other]: postHref(other, twin),
            },
          }
        : {}),
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}${self}`,
      title: post.title,
      description: post.description,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified ?? post.datePublished,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

function formatDate(iso: string, locale: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString(
    locale === "es" ? "es-419" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );
}

export default async function ArticlePage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const t = await getDictionary(locale);
  const p = t.pages.blog;
  const post = getPost(locale, slug);
  if (!post) notFound();

  const self = postHref(locale, post.slug);
  const url = `${SITE_URL}${self}`;
  const indexHref = localizedHref("/blog", locale);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    inLanguage: locale,
    image: `${SITE_URL}/og-image.jpg`,
    author: { "@type": "Organization", name: post.author, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#org` },
    keywords: post.keywords.join(", "),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: p.title, item: `${SITE_URL}${indexHref}` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={[articleJsonLd, breadcrumbJsonLd]} />
      <Nav locale={locale} t={t} />
      <main id="main-content">
        {/* ── Masthead ── */}
        <Section tone="field">
          <div style={{ maxWidth: "46rem" }}>
            <div className="mb-7">
              <QuietAction href={indexHref}>{p.allArticles}</QuietAction>
            </div>

            <div
              className="lg-fig lg-anchor flex flex-wrap items-baseline gap-x-6 gap-y-1"
              style={
                {
                  "--lg-anchor-w": "2px",
                  paddingTop: "1rem",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.13em",
                  textTransform: "uppercase",
                  color: "var(--lg-ink-3)",
                  marginBottom: "1.6rem",
                } as React.CSSProperties
              }
            >
              <time dateTime={post.datePublished}>{formatDate(post.datePublished, locale)}</time>
              <span>
                {post.readingMinutes} {p.readingSuffix}
              </span>
            </div>

            <PageTitle max="22ch">{post.title}</PageTitle>
            <Prose size="1.0625rem" max="56ch" style={{ marginTop: "1.6rem" }}>
              {post.description}
            </Prose>
          </div>
        </Section>

        {/* ── The article. Body styling is the light world's, deliberately —
             the stock ground is what it was written against. ── */}
        <Section tone="stock">
          <article style={{ maxWidth: "44rem" }}>
            <ArticleBody body={post.body} />

            {post.related.length > 0 && (
              <aside
                className="lg-anchor"
                style={{ "--lg-anchor-w": "2px", marginTop: "3.5rem" } as React.CSSProperties}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStretch: "86%",
                    fontWeight: 600,
                    fontSize: "1.0625rem",
                    letterSpacing: "-0.008em",
                    textTransform: "uppercase",
                    color: "var(--lg-ink-on-stock)",
                    margin: "1.4rem 0 0.4rem",
                  }}
                >
                  {p.keepReading}
                </h2>
                <ul className="m-0 list-none p-0">
                  {post.related.map((r) => (
                    <li
                      key={r.href}
                      style={{ borderBottom: "1px solid var(--lg-hair)" }}
                    >
                      <a
                        href={r.href}
                        className="lg-quiet"
                        style={{
                          display: "block",
                          padding: "0.95rem 0",
                          fontFamily: "var(--font-display)",
                          fontStretch: "88%",
                          fontWeight: 600,
                          fontSize: "0.9375rem",
                          letterSpacing: "0.04em",
                          color: "var(--lg-ink-on-stock)",
                          textDecoration: "none",
                        }}
                      >
                        {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </article>
        </Section>

        {/* ── Close ── */}
        <Section tone="field-3" style={{ borderTop: "2px solid var(--lg-foil)" }} tight>
          <div className="grid items-end gap-x-14 gap-y-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <Prose size="1.0625rem" max="46ch">
              {p.closeBody}
            </Prose>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
              <Stamp href="/try-esmi">{t.common.hearRealCall}</Stamp>
              <QuietAction href={localizedHref("/book", locale)}>
                {t.common.bookPilot}
              </QuietAction>
            </div>
          </div>
        </Section>
      </main>
      <Footer locale={locale} t={t} />
    </>
  );
}
