import type { Metadata } from "next";
import Link from "next/link";
import "./brand.css";
import CopyButton from "./CopyButton";
import { COLOURS, GRADIENTS, GROUPS, RULES, SITE, TYPE, url } from "./kit";

/* orchelix.com/brand — the public brand kit.

   For people (a designer, a printer, a partner) and for the bots that make
   Orchelix's social posts: every logo as a direct PNG link, drawn on the
   background it is made for, with the colours, type and rules underneath.
   /brand/kit.json carries the same list as data. Not indexed — it is a
   tool, not a page anyone should land on from search. */

export const metadata: Metadata = {
  title: "Brand kit — Orchelix",
  description: "Orchelix logos, colours and usage rules — every file as a direct link.",
  alternates: { canonical: "/brand" },
  robots: { index: false, follow: false },
};

const GROUND: Record<string, string> = {
  light: "bk-g--light",
  dark: "bk-g--dark",
  colour: "bk-g--colour",
  any: "bk-g--any",
};

export default function BrandKit() {
  const kitJson = `${SITE}/brand/kit.json`;
  return (
    <main id="main-content" className="bk">
      <header className="bk-hero">
        {/* Plain <img> on purpose here and below: the kit shows the exact
            published files, not optimized copies of them. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/files/orchelix-logo-night-gradient.svg" alt="Orchelix AI Consulting" className="bk-hero__logo" />
        <h1>Brand kit</h1>
        <p>
          Every Orchelix logo, ready to use. Pick the one made for your background, copy its link or download it.
          Colours, type and the few rules are at the bottom.
        </p>
        <div className="bk-bots">
          <p className="bk-bots__title">For AI tools and bots</p>
          <p>
            Give your bot this page, or the data version below. Every logo, colour and rule is listed with a direct
            link.
          </p>
          <div className="bk-bots__row">
            <code>{SITE}/brand</code>
            <CopyButton value={`${SITE}/brand`} />
          </div>
          <div className="bk-bots__row">
            <code>{kitJson}</code>
            <CopyButton value={kitJson} />
          </div>
        </div>
      </header>

      {GROUPS.map((g) => (
        <section key={g.id} className="bk-section" id={g.id}>
          <div className="bk-section__head">
            <h2>{g.title}</h2>
            <p>{g.note}</p>
          </div>
          <div className={`bk-grid ${g.id === "ring" || g.id === "profile" ? "bk-grid--small" : ""}`}>
            {g.assets.map((a) => (
              <article key={a.file} className="bk-card">
                <div className={`bk-g ${GROUND[a.on]}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/brand/files/${a.file}`} alt={a.name} loading="lazy" />
                </div>
                <div className="bk-card__body">
                  <h3>{a.name}</h3>
                  <p>{a.use}</p>
                  <p className="bk-meta">
                    {a.on === "any" ? "" : `For ${a.on === "colour" ? "colour / photo" : a.on} backgrounds · `}
                    {a.size}
                  </p>
                  <div className="bk-actions">
                    <a className="bk-btn bk-btn--primary" href={`/brand/files/${a.file}`} download>
                      Download
                    </a>
                    <CopyButton value={url(a.file)} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="bk-section" id="colours">
        <div className="bk-section__head">
          <h2>Colours</h2>
          <p>Tap a code to copy it.</p>
        </div>
        <div className="bk-swatches">
          {COLOURS.map((c) => (
            <div key={c.hex} className="bk-swatch">
              <span className="bk-swatch__chip" style={{ background: c.hex }} />
              <div>
                <p className="bk-swatch__name">{c.name}</p>
                <p className="bk-swatch__use">{c.use}</p>
                <CopyButton value={c.hex} label={c.hex} />
              </div>
            </div>
          ))}
        </div>
        <div className="bk-gradients">
          {GRADIENTS.map((g) => (
            <div key={g.name} className="bk-gradient">
              <span className="bk-gradient__bar" style={{ background: g.css }} />
              <p className="bk-swatch__name">{g.name}</p>
              <p className="bk-swatch__use">{g.use}</p>
              <code>{g.css}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="bk-section" id="type">
        <div className="bk-section__head">
          <h2>Type</h2>
          <p>Both are free Google Fonts.</p>
        </div>
        <div className="bk-type">
          {TYPE.map((t) => (
            <div key={t.family}>
              <p className={t.family === "Archivo" ? "bk-type__display" : "bk-type__body"}>{t.family}</p>
              <p className="bk-swatch__name">{t.role}</p>
              <p className="bk-swatch__use">{t.setting}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bk-section" id="rules">
        <div className="bk-section__head">
          <h2>Rules</h2>
        </div>
        <ol className="bk-rules">
          {RULES.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ol>
      </section>

      <footer className="bk-foot">
        <p>
          Orchelix AI Consulting · <Link href="/">orchelix.com</Link> · Questions: <a href="mailto:info@orchelix.com">info@orchelix.com</a>
        </p>
      </footer>
    </main>
  );
}
