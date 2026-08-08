import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import JsonLd from "@/app/components/JsonLd";
import { getSortedEsPosts } from "./es-posts";

const SITE_URL = "https://www.orchelix.com";

export const metadata: Metadata = {
  title: "Blog — Recepcionista con IA | Orchelix",
  description:
    "Artículos y guías sobre recepcionistas con IA, automatización de llamadas y agentes de IA para negocios. En español.",
  alternates: {
    canonical: "/es/blog",
    languages: {
      "en-US": "/blog",
      "es-ES": "/es/blog",
      "x-default": "/blog",
    },
  },
};

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function EsBlogIndex() {
  const posts = getSortedEsPosts();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/es/blog#blog`,
    name: "Blog de Orchelix — Recepcionista con IA",
    description:
      "Artículos y guías sobre recepcionistas con IA para pequeñas y medianas empresas.",
    url: `${SITE_URL}/es/blog`,
    inLanguage: "es",
    publisher: { "@id": `${SITE_URL}/#org` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/es/blog/${p.slug}`,
      datePublished: p.datePublished,
      inLanguage: "es",
    })),
  };

  return (
    <>
      <JsonLd data={blogJsonLd} />
      <Nav />
      <main
        id="main-content"
        className="px-6 pt-24 pb-20 sm:px-8 sm:pt-28 sm:pb-24 lg:px-10 lg:pt-[132px] lg:pb-28"
      >
        <div className="mx-auto max-w-[720px]">
          <header className="mb-12">
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--teal-600)",
                margin: "0 0 14px",
              }}
            >
              Blog · Español
            </p>
            <h1
              className="text-[38px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[52px]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)", margin: 0 }}
            >
              Recursos sobre<br />recepcionistas con IA
            </h1>
            <p
              className="mt-5 text-[18px] leading-[1.6]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
            >
              Guías prácticas para negocios que quieren contestar más llamadas y perder menos prospectos.
            </p>
          </header>

          <div
            aria-hidden="true"
            className="mb-10 h-px w-full"
            style={{ background: "var(--line)" }}
          />

          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 0 }}>
            {posts.map((post, i) => (
              <li
                key={post.slug}
                style={{
                  borderBottom: "1px solid var(--line)",
                  paddingTop: i === 0 ? 0 : 28,
                  paddingBottom: 28,
                }}
              >
                <a
                  href={`/es/blog/${post.slug}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    className="mb-2 flex items-center gap-2.5"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.04em",
                      color: "var(--ink-3)",
                    }}
                  >
                    <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                    <span className="inline-block h-1 w-1 rounded-full bg-teal-500" />
                    <span>{post.readingMinutes} min de lectura</span>
                  </div>
                  <h2
                    className="text-[20px] font-semibold leading-[1.25] tracking-[-0.018em] sm:text-[22px]"
                    style={{ fontFamily: "var(--font-display)", color: "var(--ink)", margin: "0 0 8px" }}
                  >
                    {post.title}
                  </h2>
                  <p
                    className="text-[15px] leading-[1.6]"
                    style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)", margin: 0 }}
                  >
                    {post.description}
                  </p>
                  <span
                    className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium"
                    style={{ fontFamily: "var(--font-display)", color: "var(--teal-700)" }}
                  >
                    Leer artículo →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div
            className="mt-12 rounded-[14px] border p-6"
            style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}
          >
            <p
              className="text-[14px]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)", margin: "0 0 10px" }}
            >
              ¿Prefieres leer en inglés?
            </p>
            <a
              href="/blog"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 14,
                color: "var(--teal-700)",
                textDecoration: "none",
              }}
            >
              Ver todos los artículos en inglés →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
