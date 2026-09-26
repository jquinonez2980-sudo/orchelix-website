import type { Metadata } from "next";
import { Globe, PenOff, Shirt } from "lucide-react";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import { Section, PageTitle, SectionTitle, Prose, Stamp, QuietAction } from "@/app/components/ledger";
import DropCard from "@/app/components/shop/DropCard";
import StudioTile from "@/app/components/shop/StudioTile";
import ProductShot from "@/app/components/shop/ProductShot";
import { allStyles, framesFor } from "@/app/lib/shopMedia";
import { getProduct } from "@/app/lib/products";

export const metadata: Metadata = {
  // The site layout's title template appends "| Orchelix".
  title: "Shop",
  description: "Drop 01: the Orchelix mark on the front, ORCHELIX.COM on the back. Tees in bone and black.",
};

/* The shop, set like an apparel label rather than a catalogue: one story
   (front is the mark, back is the address), the pieces you can buy now at
   full size, and what's next kept small and honest about not being for sale. */
const COUNT: Record<number, string> = { 1: "One", 2: "Two", 3: "Three", 4: "Four" };

export default function ShopPage() {
  const styles = allStyles();
  const drop = styles.filter((s) => s.available);
  const studio = styles.filter((s) => !s.available);
  const heroProduct = getProduct("ORX-D-U")!;

  return (
    <>
      <Nav />
      <main id="main-content">
        <Section tone="night" tight className="shop-hero">
          <div className="shop-hero__grid">
            <div>
              <PageTitle tone="night" max="12ch">
                Front is the mark. <span className="lg-glow-text">Back is the address.</span>
              </PageTitle>
              <Prose tone="night" size="1.0625rem" max="40ch" style={{ marginTop: "1.4rem" }}>
                Drop 01. Two tees in bone and black: the Orchelix ring on the chest, ORCHELIX.COM
                across the shoulders. One message per surface.
              </Prose>
              <div className="shop-hero__actions">
                <Stamp href="#drop-01">Shop Drop 01</Stamp>
                <QuietAction tone="night" href="#studio">
                  See what&rsquo;s next
                </QuietAction>
              </div>
            </div>
            <div className="shop-hero__shot">
              <ProductShot
                product={heroProduct}
                frame={framesFor(heroProduct.sku).front}
                alt="Drop Tee in black, front: a large ring mark"
                sizes="(max-width: 900px) 100vw, 45vw"
                priority
              />
            </div>
          </div>
        </Section>

        <section id="drop-01" className="lg-world shop-band">
          <div className="shop-wrap">
            <header className="shop-band__head">
              <SectionTitle max="14ch">Drop 01</SectionTitle>
              <p className="shop-band__note">
                {`${COUNT[drop.length] ?? drop.length} styles · Unisex and women’s fits · Ships from Toronto to Canada and the US`}
              </p>
            </header>
            <div className="drop-grid">
              {drop.map((s, i) => (
                <DropCard key={s.id} style={s} priority={i === 0} />
              ))}
            </div>
          </div>
        </section>

        <Section tone="night" className="shop-story">
          <SectionTitle tone="night" max="18ch">
            One message per surface.
          </SectionTitle>
          <div className="lg-glass shop-story__glass">
            <div className="shop-story__grid">
              {[
                { icon: <Shirt />, title: "Front: the mark", body: "The Orchelix ring at the chest or across it. Nothing else on the front." },
                { icon: <Globe />, title: "Back: the address", body: "ORCHELIX.COM across the shoulders, in capitals. The name never appears twice on one piece." },
                { icon: <PenOff />, title: "Never redrawn", body: "Every print is made from the official mark file, so the ring on your tee is the ring on the site." },
              ].map((item) => (
                <article key={item.title} className="lg-glass__item">
                  <span className="lg-badge" aria-hidden="true">
                    {item.icon}
                  </span>
                  <h3 className="shop-story__title">{item.title}</h3>
                  <p className="shop-story__body">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Section>

        {studio.length > 0 ? (
          <section id="studio" className="lg-world shop-band shop-band--studio">
            <div className="shop-wrap">
              <header className="shop-band__head">
                <SectionTitle max="14ch">In the studio</SectionTitle>
                <p className="shop-band__note">Next pieces. Shown here first, not for sale yet.</p>
              </header>
              <div className="studio-grid">
                {studio.map((s) => (
                  <StudioTile key={s.id} style={s} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
