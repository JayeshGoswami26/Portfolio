import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionNum from "@/components/ui/SectionNum";
import ImageSlot from "@/components/ui/ImageSlot";
import { PROJECTS, PROJECT_COUNT, type Project } from "@/lib/data/projects";

function TitleLines({ lines }: { lines: string[] }) {
  return (
    <h3>
      {lines.map((line, i) => (
        <span key={line}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
    </h3>
  );
}

function ProjectHead({ project }: { project: Project }) {
  return (
    <div className="phead">
      <div>
        <div className="pnum">
          {project.num} / {PROJECT_COUNT} — {project.type}
        </div>
        <TitleLines lines={project.titleLines} />
      </div>
      <span className="seal">{project.kanji}</span>
    </div>
  );
}

function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="project-tags">
      {tags.map((tag) => (
        <span key={tag} className="project-tag">
          {tag}
        </span>
      ))}
    </div>
  );
}

function ProjectFoot({ project }: { project: Project }) {
  return (
    <div className="pfoot">
      <span className="prole">{project.cardRole}</span>
      <a className="plink" href={project.github} target="_blank" rel="noopener">
        GITHUB →
      </a>
    </div>
  );
}

/** Stretched overlay — makes the whole card open the case study. */
function CardLink({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="pcard-link"
      aria-label={`${project.title} — open case study`}
    />
  );
}

function ProjectCard({ project }: { project: Project }) {
  const image = (
    <div className="pimg">
      <ImageSlot
        id={project.slotId}
        placeholder={project.placeholder}
        src={project.image}
        alt={`${project.titleLines.join(" ")} — project screenshot`}
      />
    </div>
  );

  if (project.wide) {
    return (
      <Reveal as="article" className="pcard pcard--wide" delay={project.delay}>
        <CardLink project={project} />
        <div className="pbody">
          <ProjectHead project={project} />
          <ProjectTags tags={project.tags} />
          <p className="pdesc">{project.description}</p>
          <ProjectFoot project={project} />
        </div>
        {image}
      </Reveal>
    );
  }

  return (
    <Reveal as="article" className="pcard" delay={project.delay}>
      <CardLink project={project} />
      <ProjectHead project={project} />
      <ProjectTags tags={project.tags} />
      <p className="pdesc">{project.description}</p>
      {image}
      <ProjectFoot project={project} />
    </Reveal>
  );
}

export default function WorkSection() {
  return (
    <section className="section section--laneleft" id="work" data-screen-label="04 Work">
      <div className="mist" style={{ top: "30%" }} aria-hidden="true" />
      <SectionNum seal="業" label="SECTION №03 · SELECTED WORK" />
      <div className="work-intro">
        <Reveal as="h2">
          SELECTED
          <br />
          WORK <span className="blood">·</span> 2024→NOW
        </Reveal>
        <Reveal as="p" delay={1}>
          Eight cuts — microservices, platforms, packages, pipelines and client work, each owned
          end-to-end.
        </Reveal>
      </div>

      <div className="pgrid">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.slotId} project={project} />
        ))}
      </div>
    </section>
  );
}
