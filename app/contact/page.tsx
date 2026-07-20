import type { Metadata } from "next";

import KatanaViewer from "@/components/fx/KatanaViewer";
import ContactForm from "@/components/ui/ContactForm";
import { CONTACT } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Start a Project — Jayesh Puri Goswami",
  description:
    "Commission a blade — tell me what we're cutting. Name, email and a sharp brief; I reply within 24 hours.",
};

export default function ContactPage() {
  return (
    <main className="dp-section contact-page" data-screen-label="Contact Form">
      <div className="mist" style={{ top: "12%" }} aria-hidden="true" />
      <div className="section-num reveal in">
        <span className="seal">縁</span> COMMISSION A BLADE
      </div>
      <h1 className="contact-headline contact-headline--form">
        TELL ME
        <br />
        WHAT WE&apos;RE
        <br />
        <span className="accent">CUTTING.</span>
      </h1>

      <div className="form-grid">
        <ContactForm />

        <aside className="contact-aside">
          <div className="katana-stage">
            <KatanaViewer />
            <div className="hint">DRAG — ROTATE THE BLADE</div>
          </div>
          <div className="aside-cells">
            <div className="contact-cell">
              <div className="label">EMAIL</div>
              <div className="value">
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </div>
            </div>
            <div className="contact-cell">
              <div className="label">PHONE</div>
              <div className="value">
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </div>
            </div>
            <div className="contact-cell">
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
            </div>
            <div className="contact-cell">
              <div className="label">BASE</div>
              <div className="value">
                {CONTACT.base}
                <br />
                <span className="faint">{CONTACT.baseNote}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
