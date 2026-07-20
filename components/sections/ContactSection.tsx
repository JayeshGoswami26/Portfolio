import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionNum from "@/components/ui/SectionNum";
import { CONTACT } from "@/lib/data/site";

export default function ContactSection() {
  return (
    <section className="contact" id="contact" data-screen-label="07 Contact">
      <SectionNum seal="縁" label="SECTION №06 · CONTACT" />
      <Reveal as="h2" className="contact-headline">
        LET&apos;S
        <br />
        <span className="outline">BUILD</span>
        <br />
        SOMETHING
        <br />
        <span className="accent">SHARP.</span>
      </Reveal>

      <Reveal delay={1}>
        <Link href="/contact" className="contact-cta">
          <span>START A PROJECT</span>
          <span className="arrow" />
        </Link>
      </Reveal>

      <div className="contact-grid">
        <Reveal className="contact-cell">
          <div className="label">EMAIL</div>
          <div className="value">
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </div>
        </Reveal>
        <Reveal className="contact-cell" delay={1}>
          <div className="label">PHONE</div>
          <div className="value">
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          </div>
        </Reveal>
        <Reveal className="contact-cell" delay={2}>
          <div className="label">SOCIAL</div>
          <div className="value">
            <a href={CONTACT.github.href} target="_blank" rel="noopener">
              {CONTACT.github.label}
            </a>
            <br />
            <a href={CONTACT.linkedin.href} target="_blank" rel="noopener">
              {CONTACT.linkedin.label}
            </a>
          </div>
        </Reveal>
        <Reveal className="contact-cell" delay={3}>
          <div className="label">BASE</div>
          <div className="value">
            {CONTACT.base}
            <br />
            <span className="faint">{CONTACT.baseNote}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
