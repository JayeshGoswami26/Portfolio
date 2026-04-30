export default function Hero() {
  return (
    <section className="hero" data-screen-label="01 Hero — Mask Cut">
      <div className="hero-stage">
        <div className="hero-kanji" aria-hidden="true">斬</div>

        <div className="hero-sigil" aria-hidden="true" />
        <div className="hero-sigil-ring" aria-hidden="true" />
        <div className="hero-sigil-ring outer" aria-hidden="true" />

        <div className="hero-face" aria-hidden="true" />

        <div className="hero-mask-half hero-mask-left" aria-hidden="true" />
        <div className="hero-mask-half hero-mask-right" aria-hidden="true" />

        <div className="hero-katana" aria-hidden="true" />

        <div className="hero-eyebrow">
          <span>◆</span> MERN DEVELOPER <span>◆</span> CODE AS CRAFT <span>◆</span>
        </div>

        <div className="hero-skill hero-skill-1">
          <span className="mono">// 01 FRONTEND</span>
          REACT<span className="dot">·</span>NEXT
        </div>
        <div className="hero-skill hero-skill-2">
          <span className="mono">// 02 BACKEND</span>
          NODE<span className="dot">·</span>EXPRESS
        </div>
        <div className="hero-skill hero-skill-3">
          <span className="mono">// 03 DATA</span>
          MONGO<span className="dot">·</span>POSTGRES
        </div>
        <div className="hero-skill hero-skill-4">
          <span className="mono">// 04 CRAFT</span>
          UI<span className="dot">·</span>UX<span className="dot">·</span>MOTION
        </div>

        <div className="hero-title-wrap">
          <h1 className="hero-title">
            <span className="line"><span>JAYESH</span></span>
            <span className="line"><span>GOSWAMI</span></span>
          </h1>
        </div>

        <div className="hero-subtitle">
          A MERN-STACK DEVELOPER / JAIPUR <span className="accent">●</span> IN<br />
          <span style={{ opacity: 0.5 }}>BUILDING WEB INTERFACES WITH PRECISION AND INTENT</span>
          <span className="divider" />
        </div>

        <div className="scroll-hint">
          <span>SCROLL — UNMASK</span>
          <span className="arrow" />
        </div>
      </div>
    </section>
  );
}
