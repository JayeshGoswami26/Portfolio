import Nav from './components/Nav';
import ChromeCorners from './components/ChromeCorners';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Stack from './components/Stack';
import MarqueeSection from './components/MarqueeSection';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ClientAnimations from './components/ClientAnimations';

export default function Home() {
  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <ChromeCorners />
      <Nav />

      <Hero />

      <div className="divider-slash">
        <span>END OF INVOCATION</span>
        <span className="kanji">×</span>
        <span>BEGIN SECTION 01</span>
      </div>

      <Manifesto />
      <Stack />
      <MarqueeSection />
      <Work />
      <About />
      <Contact />
      <Footer />

      <ClientAnimations />
    </>
  );
}
