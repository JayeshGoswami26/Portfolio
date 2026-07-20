import Reveal from "@/components/ui/Reveal";
import SectionNum from "@/components/ui/SectionNum";
import { JOURNEY, PRINCIPLES } from "@/lib/data/journey";

export default function JourneySection() {
  return (
    <section className="section" id="experience" data-screen-label="05 Journey">
      <SectionNum seal="歩" label="SECTION №04 · THE JOURNEY" />
      <div className="work-intro">
        <Reveal as="h2">
          THE
          <br />
          PATH <span className="blood">·</span> 道
        </Reveal>
        <Reveal as="p" delay={1}>
          Two dojos so far — agency floors and product war-rooms. Every station sharpened a
          different edge.
        </Reveal>
      </div>

      {JOURNEY.map((station) => (
        <Reveal as="article" key={station.num} className="project">
          <div className="project-num">{station.num}</div>
          <div className="project-info">
            <h3>
              {station.titleLines.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h3>
            <div className="project-tags">
              {station.tags.map((tag) => (
                <span key={tag} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
            <p className="project-desc">{station.description}</p>
          </div>
          <div className="project-visual">
            <div className="visual-inner" style={{ backgroundImage: `url('${station.texture}')` }} />
            <div className="visual-meta">
              <span>{station.metaRole}</span>
              <span className="blood">{station.metaBadge}</span>
            </div>
          </div>
        </Reveal>
      ))}

      {/* PRINCIPLES */}
      <Reveal className="principles">
        {PRINCIPLES.map((principle) => (
          <div key={principle.num} className="principle">
            <div className="pnum">{principle.num}</div>
            <div className="kanji">{principle.kanji}</div>
            <h4>
              {principle.titleLines.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </h4>
            <p>{principle.text}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
