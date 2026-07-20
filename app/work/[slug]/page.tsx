import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Reveal from "@/components/ui/Reveal";
import KatanaViewer from "@/components/fx/KatanaViewer";
import { PROJECTS, PROJECT_COUNT, getProject } from "@/lib/data/projects";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study — Jayesh Puri Goswami`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = PROJECTS.findIndex((p) => p.slug === slug);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <>
      <header className="dp-hero" data-screen-label="Case Study Hero">
        <div className="mist" style={{ top: "20%" }} aria-hidden="true" />
        <div className="dp-hero-info">
          <div className="dp-type">
            <span className="seal">{project.kanji}</span> {project.type} · {project.num} /{" "}
            {PROJECT_COUNT}
          </div>
          <h1 className="dp-title">
            {project.title.split(" ").map((word, i) => (
              <span key={`${word}-${i}`}>
                {i > 0 && <br />}
                {word}
              </span>
            ))}
          </h1>
          <p className="dp-tagline">{project.tagline}</p>
          <div className="project-tags">
            {project.stack.map((tech) => (
              <span key={tech} className="project-tag">
                {tech}
              </span>
            ))}
          </div>
          <div className="dp-meta">
            <div className="cell">
              <div className="label">ROLE</div>
              <div className="val">{project.role}</div>
            </div>
            <div className="cell">
              <div className="label">YEAR</div>
              <div className="val">{project.year}</div>
            </div>
            <div className="cell">
              <div className="label">STATUS</div>
              <div className="val">{project.status}</div>
            </div>
          </div>
          <div className="dp-actions">
            {project.live && (
              <a className="contact-cta" href={project.live} target="_blank" rel="noopener">
                <span>VIEW LIVE</span>
                <span className="arrow" />
              </a>
            )}
            <a className="contact-cta" href={project.github} target="_blank" rel="noopener">
              <span>GITHUB</span>
              <span className="arrow" />
            </a>
          </div>
        </div>
        <div className="katana-stage">
          <KatanaViewer />
          <div className="hint">DRAG — ROTATE THE BLADE</div>
        </div>
      </header>

      <main className="dp-section">
        <Reveal className="dp-block">
          <h3>
            <span className="k">問</span>THE PROBLEM
          </h3>
          <p>{project.problem}</p>
        </Reveal>
        <Reveal className="dp-block">
          <h3>
            <span className="k">刀</span>THE CUT
          </h3>
          <p>{project.cut}</p>
        </Reveal>
        <Reveal className="dp-block">
          <h3>
            <span className="k">果</span>THE RESULT
          </h3>
          <p>{project.result}</p>
        </Reveal>
        <Reveal className="dp-block">
          <h3>
            <span className="k">見</span>IN PICTURES
          </h3>
          <div className="dp-shots">
            {project.shots.map((shot, i) => (
              <div className="shot" key={`${project.slug}-shot-${i}`}>
                {shot ? (
                  <Image
                    src={shot}
                    alt={`${project.title} — screenshot ${i + 1}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div className="image-slot">
                    <span className="cap">
                      <span className="mark">◆</span>
                      More shots soon
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
        <div className="dp-nav">
          <Link href={`/work/${prev.slug}`}>← PREV CUT</Link>
          <Link href="/#work">ALL WORK 業</Link>
          <Link href={`/work/${next.slug}`}>NEXT CUT →</Link>
        </div>
      </main>
    </>
  );
}
