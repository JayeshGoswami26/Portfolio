import Reveal from "@/components/ui/Reveal";
import SectionNum from "@/components/ui/SectionNum";
import { STACK_ROWS } from "@/lib/data/stack";

export default function StackSection() {
  return (
    <section className="section" id="stack" data-screen-label="03 Stack">
      <SectionNum seal="刃" label="SECTION №02 · THE ARSENAL" />
      <div className="lane-gap" aria-hidden="true" />
      <div className="stack">
        <Reveal className="stack-heading">
          <h2>
            ARSENAL
            <br />
            <span className="accent">·</span> TOOLS
          </h2>
          <p>THE BLADE I CARRY. NO FLUFF — ONLY WHAT I&apos;VE SHIPPED IN PRODUCTION.</p>
        </Reveal>
        <div className="stack-list">
          {STACK_ROWS.map((row) => (
            <Reveal key={row.num} className="stack-row" delay={row.delay}>
              <div className="stack-num">{row.num}</div>
              <div className="stack-name">{row.name}</div>
              <div className="stack-tools">{row.tools}</div>
              <div className="stack-years">{row.years}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
