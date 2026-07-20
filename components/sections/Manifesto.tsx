import Reveal from "@/components/ui/Reveal";
import SectionNum from "@/components/ui/SectionNum";

export default function Manifesto() {
  return (
    <section className="section section--laneright" id="manifesto" data-screen-label="02 Manifesto">
      <div className="mist" style={{ top: "10%" }} aria-hidden="true" />
      <SectionNum seal="道" label="SECTION №01 · MANIFESTO" />
      <Reveal as="h2" className="manifesto">
        I build <span className="kanji">斬</span> clean,
        <br />
        <span className="accent">fast</span> &amp; scalable
        <br />
        <span className="muted">web products —</span>
        <br />
        one <span className="ink">sharp</span> cut
        <br />
        at a <span className="ink">time.</span>
      </Reveal>
      <Reveal className="manifesto-sub" delay={1}>
        <div className="spacer" />
        <div className="note">
          2+ YEARS SHIPPING PRODUCTION MERN APPS — MICROSERVICES, REALTIME, PAYMENTS, AWS. I OWN
          PRODUCTS SOLO: BUSINESS LOGIC TO ADMIN PANELS TO DEPLOYS.
        </div>
      </Reveal>
    </section>
  );
}
