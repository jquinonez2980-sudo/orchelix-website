import type { Metadata } from "next";
import Nav from "../components/sections/Nav";
import Footer from "../components/sections/Footer";
import JsonLd from "../components/JsonLd";
import { getSortedPosts } from "./posts";

const SITE_URL = "https://www.orchelix.com";

export const metadata: Metadata = {
  title: "Blog — AI Receptionists & AI Agents for Business",
  description:
    "Practical guides on AI receptionists, AI agents, and automating the front desk — pricing, comparisons, and how to put them to work in your business.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getSortedPosts();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog`,
    name: "Orchelix Blog",
    description: metadata.description,
    publisher: { "@id": `${SITE_URL}/#org` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.datePublished,
      description: p.description,
    })),
  };

  return (
    <>
      <JsonLd data={blogJsonLd} />
      <Nav />
      <main id="main-content" className="px-6 pt-24 pb-20 sm:px-8 sm:pt-28 sm:pb-24 lg:px-10 lg:pt-[132px] lg:pb-32">
        <div className="mx-auto max-w-[820px]">
          <header className="mb-12">
            <span
              className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
              style={{ fontFamily: "var(--font-mono)", color: "var(--teal-700)" }}
            >
              <span className="inline-block h-px w-[18px] bg-current opacity-70" />
              Resources
            </span>
            <h1
              className="mt-5 text-[40px] font-medium leading-[1.05] tracking-[-0.032em] sm:text-[52px]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              AI for the front desk, explained.
            </h1>
            <p
              className="mt-5 max-w-[600px] text-[18px] leading-[1.6]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
            >
              Guides on AI receptionists, AI agents, and automating customer
              conversations — written for business owners, not engineers.
            </p>
          </header>

          <div className="flex flex-col divide-y" style={{ borderColor: "var(--line)" }}>
            {posts.map((post) => (
              <article key={post.slug} className="py-8 first:pt-0">
                <a href={`/blog/${post.slug}`} className="group block">
                  <div
                    className="mb-3 flex items-center gap-3 text-[12px] font-medium tracking-[0.04em]"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
                  >
                    <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                    <span className="inline-block h-1 w-1 rounded-full bg-teal-500" />
                    <span>{post.readingMinutes} min read</span>
                  </div>
                  <h2
                    className="text-[24px] font-semibold leading-[1.18] tracking-[-0.02em] transition-colors group-hover:text-teal-700 sm:text-[28px]"
                    style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                  >
                    {post.title}
                  </h2>
                  <p
                    className="mt-3 text-[16px] leading-[1.6]"
                    style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
                  >
                    {post.description}
                  </p>
                  <span
                    className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium"
                    style={{ fontFamily: "var(--font-display)", color: "var(--teal-700)" }}
                  >
                    Read article
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
