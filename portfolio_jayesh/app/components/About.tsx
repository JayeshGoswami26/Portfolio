export default function About() {
  return (
    <section className="dragon-section" id="about" data-screen-label="05 About">
      <div className="dragon-bg" aria-hidden="true" />
      <div className="dragon-content">
        <div>
          <div className="section-num reveal">SECTION №04 · ABOUT</div>
          <h2 className="about-headline reveal">
            I&apos;M<br />
            <span className="accent">JAYESH.</span><br />
            I BUILD<br />
            THE WEB.
          </h2>
        </div>
        <div className="about-body reveal delay-1">
          <p>
            I&apos;m a MERN-stack developer based in Jaipur. I&apos;ve spent the last five years
            shipping production web apps — some for agencies, most for founders who needed
            someone to hold the whole stack in their head.
          </p>
          <p className="pull">
            &quot;Discipline is choosing between what you want now and what you want most.&quot;
          </p>
          <p>
            I take small teams and small ideas seriously. I&apos;d rather ship a sharp
            MVP in four weeks than a bloated beta in four months. When I&apos;m not at
            the keyboard, I&apos;m training, reading, or drinking coffee too black for
            most people.
          </p>
          <p>
            Currently open for contract and full-time from <strong>June 2026</strong>.
          </p>
          <div className="about-stats">
            <div className="about-stat">
              <div className="about-stat-num">40<span className="small">+</span></div>
              <div className="about-stat-label">PROJECTS<br />SHIPPED</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-num">5<span className="small">yr</span></div>
              <div className="about-stat-label">YEARS IN<br />PRODUCTION</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-num">100<span className="small">%</span></div>
              <div className="about-stat-label">CLIENTS<br />RETURNED</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
