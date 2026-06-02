import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "../../components/sections/Nav";
import Footer from "../../components/sections/Footer";
import JsonLd from "../../components/JsonLd";
import ArticleBody from "../ArticleBody";
import { getAllSlugs, getPost } from "../posts";

const SITE_URL = "https://www.orchelix.com";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified ?? post.datePublished,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
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
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={[articleJsonLd, breadcrumbJsonLd]} />
      <Nav />
      <main id="main-content" className="px-6 pt-24 pb-20 sm:px-8 sm:pt-28 sm:pb-24 lg:px-10 lg:pt-[132px] lg:pb-28">
        <article className="mx-auto max-w-[720px]">
          <nav className="mb-6" style={{ fontFamily: "var(--font-mono)" }}>
            <a
              href="/blog"
              className="text-[12px] font-medium uppercase tracking-[0.12em]"
              style={{ color: "var(--teal-700)" }}
            >
              ← All articles
            </a>
          </nav>

          <header className="mb-8">
            <div
              className="mb-4 flex items-center gap-3 text-[12px] font-medium tracking-[0.04em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
            >
              <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
              <span className="inline-block h-1 w-1 rounded-full bg-teal-500" />
              <span>{post.readingMinutes} min read</span>
            </div>
            <h1
              className="text-[34px] font-medium leading-[1.08] tracking-[-0.03em] sm:text-[44px]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              {post.title}
            </h1>
            <p
              className="mt-5 text-[19px] leading-[1.6]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
            >
              {post.description}
            </p>
          </header>

          <div
            aria-hidden="true"
            className="mb-8 h-px w-full"
            style={{ background: "var(--line)" }}
          />

          <ArticleBody body={post.body} />

          {/* Related / next steps */}
          <aside
            className="mt-14 rounded-[18px] border p-6 sm:p-7"
            style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}
          >
            <h2
              className="mb-4 text-[16px] font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              Keep reading
            </h2>
            <ul className="flex flex-col gap-2.5">
              {post.related.map((r) => (
                <li key={r.href}>
                  <a
                    href={r.href}
                    className="inline-flex items-center gap-1.5 text-[15px] font-medium"
                    style={{ fontFamily: "var(--font-display)", color: "var(--teal-700)" }}
                  >
                    {r.label}
                    <span>→</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </article>
      </main>
      <Footer />
    </>
  );
}
