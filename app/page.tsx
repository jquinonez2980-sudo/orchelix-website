import Nav from "./components/sections/Nav";
import Hero from "./components/sections/Hero";
import Trust from "./components/sections/Trust";
import Problem from "./components/sections/Problem";
import Solutions from "./components/sections/Solutions";
import HowItWorks from "./components/sections/HowItWorks";
import Why from "./components/sections/Why";
import ContactForm from "./components/sections/ContactForm";
import FinalCTA from "./components/sections/FinalCTA";
import Footer from "./components/sections/Footer";

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
