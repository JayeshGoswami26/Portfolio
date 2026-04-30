export default function Work() {
  return (
    <section className="section" id="work" data-screen-label="04 Work">
      <div className="section-num reveal">SECTION №03 · SELECTED WORK</div>
      <div className="work-intro">
        <h2 className="reveal">
          SELECTED<br />WORK <span className="blood">·</span> 2022→NOW
        </h2>
        <p className="reveal delay-1">
          A handful of the projects I&apos;ve shipped end-to-end —
          design, frontend, backend, deployment. More available on request.
        </p>
      </div>

      <article className="project reveal">
        <div className="project-num">01 / 04</div>
        <div className="project-info">
          <h3>KURO<br />COMMERCE</h3>
          <div className="project-tags">
            <span className="project-tag">NEXT.JS</span>
            <span className="project-tag">MONGODB</span>
            <span className="project-tag">STRIPE</span>
            <span className="project-tag">2025</span>
          </div>
          <p className="project-desc">
            Headless commerce platform for a Japanese streetwear label. Sub-second LCP,
            realtime inventory, and a CMS my client actually uses.
          </p>
        </div>
        <div className="project-visual">
          <div className="visual-inner" style={{ backgroundImage: "url('/assets/texture-purple.jpg')" }} />
          <div className="visual-meta">
            <span>CASE STUDY</span>
            <span className="blood">VIEW →</span>
          </div>
        </div>
      </article>

      <article className="project reveal">
        <div className="project-num">02 / 04</div>
        <div className="project-info">
          <h3>SHOGUN<br />DASH</h3>
          <div className="project-tags">
            <span className="project-tag">REACT</span>
            <span className="project-tag">NODE</span>
            <span className="project-tag">SOCKET.IO</span>
            <span className="project-tag">2024</span>
          </div>
          <p className="project-desc">
            Realtime ops dashboard for a logistics startup. 40k events/day, live map,
            role-based auth. Replaced three spreadsheets and a group chat.
          </p>
        </div>
        <div className="project-visual">
          <div className="visual-inner" style={{ backgroundImage: "url('/assets/texture-blue.jpg')" }} />
          <div className="visual-meta">
            <span>CASE STUDY</span>
            <span className="blood">VIEW →</span>
          </div>
        </div>
      </article>

      <article className="project reveal">
        <div className="project-num">03 / 04</div>
        <div className="project-info">
          <h3>YUREI<br />CHAT</h3>
          <div className="project-tags">
            <span className="project-tag">MERN</span>
            <span className="project-tag">AI</span>
            <span className="project-tag">WEBRTC</span>
            <span className="project-tag">2024</span>
          </div>
          <p className="project-desc">
            AI-augmented chat with semantic search, voice notes, and a
            custom message queue. Ships daily to 6k DAUs.
          </p>
        </div>
        <div className="project-visual">
          <div className="visual-inner" style={{ backgroundImage: "url('/assets/texture-ink.jpg')" }} />
          <div className="visual-meta">
            <span>CASE STUDY</span>
            <span className="blood">VIEW →</span>
          </div>
        </div>
      </article>

      <article className="project reveal">
        <div className="project-num">04 / 04</div>
        <div className="project-info">
          <h3>ONI<br />STUDIO</h3>
          <div className="project-tags">
            <span className="project-tag">NEXT.JS</span>
            <span className="project-tag">R3F</span>
            <span className="project-tag">SANITY</span>
            <span className="project-tag">2023</span>
          </div>
          <p className="project-desc">
            Portfolio site for a 3D motion studio. Threejs hero, headless CMS,
            editorial case studies. Shipped in 6 weeks.
          </p>
        </div>
        <div className="project-visual">
          <div className="visual-inner" style={{ backgroundImage: "url('/assets/texture-black.jpg')" }} />
          <div className="visual-meta">
            <span>CASE STUDY</span>
            <span className="blood">VIEW →</span>
          </div>
        </div>
      </article>

      <div className="principles reveal">
        <div className="principle">
          <div className="pnum">01</div>
          <div className="kanji">静</div>
          <h4>Quiet<br />code</h4>
          <p>
            A good codebase reads like a well-kept room. Clear names, no dead branches,
            nothing left behind. The next developer — often me — should know exactly where to cut.
          </p>
        </div>
        <div className="principle">
          <div className="pnum">02</div>
          <div className="kanji">速</div>
          <h4>Fast<br />first</h4>
          <p>
            Performance is the first feature. If it doesn&apos;t load in under a second on a
            mid-tier phone, it isn&apos;t shipped. Ship the smallest thing that holds its edge.
          </p>
        </div>
        <div className="principle">
          <div className="pnum">03</div>
          <div className="kanji">斬</div>
          <h4>One<br />strike</h4>
          <p>
            I make one clean cut per commit. No mixed concerns, no &quot;while I was in here&quot;.
            A reviewer should understand a change in thirty seconds.
          </p>
        </div>
      </div>
    </section>
  );
}
