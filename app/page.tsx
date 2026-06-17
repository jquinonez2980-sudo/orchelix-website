import dynamic from "next/dynamic";
import Nav from "./components/sections/Nav";
import Hero from "./components/sections/Hero";
import Trust from "./components/sections/Trust";
import Problem from "./components/sections/Problem";
import Solutions from "./components/sections/Solutions";
import HowItWorks from "./components/sections/HowItWorks";
import Why from "./components/sections/Why";
import FinalCTA from "./components/sections/FinalCTA";
import type { Metadata } from "next";

// Dynamically import below-fold "use client" components so their JS is split
// into separate chunks that are not included in the initial page bundle.
// SSR is preserved (ssr: true is the default) — only the browser JS is deferred.
const ContactForm = dynamic(() => import("./components/sections/ContactForm"));
const Footer = dynamic(() => import("./components/sections/Footer"));

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Trust />
        <Problem />
        <Solutions />
        <HowItWorks />
        <Why />
        <ContactForm />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
