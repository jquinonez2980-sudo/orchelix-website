import Nav from "./components/sections/Nav";
import Hero from "./components/sections/Hero";
import Trust from "./components/sections/Trust";
import Solutions from "./components/sections/Solutions";
import HowItWorks from "./components/sections/HowItWorks";
import Why from "./components/sections/Why";
import FinalCTA from "./components/sections/FinalCTA";
import Footer from "./components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Trust />
        <Solutions />
        <HowItWorks />
        <Why />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
