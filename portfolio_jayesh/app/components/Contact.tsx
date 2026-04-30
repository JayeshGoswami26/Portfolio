export default function Contact() {
  return (
    <section className="contact" id="contact" data-screen-label="06 Contact">
      <div className="section-num reveal">SECTION №05 · CONTACT</div>
      <h2 className="contact-headline reveal">
        LET&apos;S<br />
        <span className="outline">BUILD</span><br />
        SOMETHING<br />
        <span className="accent">SHARP.</span>
      </h2>

      <a href="mailto:hello@jayeshpg.dev" className="contact-cta reveal delay-1">
        <span>START A PROJECT</span>
        <span className="arrow" />
      </a>

      <div className="contact-grid">
        <div className="contact-cell reveal">
          <div className="label">EMAIL</div>
          <div className="value">
            <a href="mailto:hello@jayeshpg.dev">hello@jayeshpg.dev</a>
          </div>
        </div>
        <div className="contact-cell reveal delay-1">
          <div className="label">PHONE</div>
          <div className="value">
            <a href="tel:+919000000000">+91 90 0000 0000</a>
          </div>
        </div>
        <div className="contact-cell reveal delay-2">
          <div className="label">SOCIAL</div>
          <div className="value">
            <a href="#">@jayeshpg</a><br />
            <a href="#">/in/jayeshpg</a>
          </div>
        </div>
        <div className="contact-cell reveal delay-3">
          <div className="label">AVAILABILITY</div>
          <div className="value">
            From Jun &apos;26<br />
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>2 slots open</span>
          </div>
        </div>
      </div>
    </section>
  );
}
