import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import StackSection from "@/components/sections/StackSection";
import Marquee from "@/components/sections/Marquee";
import WorkSection from "@/components/sections/WorkSection";
import JourneySection from "@/components/sections/JourneySection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import DividerSlash from "@/components/ui/DividerSlash";

export default function Home() {
  return (
    <main>
      <Hero />
      <DividerSlash left="THE MASK IS OFF" kanji="刃" right="DRAW THE BLADE" />
      <Manifesto />
      <StackSection />
      <Marquee />
      <WorkSection />
      <JourneySection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
