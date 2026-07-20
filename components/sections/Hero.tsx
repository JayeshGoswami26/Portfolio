"use client";

import { useEffect, useRef } from "react";
import { HERO_SKILLS } from "@/lib/data/site";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic

/**
 * Mask-cut hero: a 400vh scroll runway drives the katana slicing the hannya
 * mask apart to reveal the face, with skill strips sweeping in during the cut.
 */
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);
  const katanaRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const sigilGlowRef = useRef<HTMLDivElement>(null);
  const sigilInnerRef = useRef<HTMLDivElement>(null);
  const sigilOuterRef = useRef<HTMLDivElement>(null);
  const kanjiRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    function updateHero() {
      const rect = hero!.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = clamp(-rect.top / total, 0, 1);

      // Phase breakdown:
      // 0.00 - 0.12  : title + mask intro (static)
      // 0.12 - 0.22  : katana descends (blade enters)
      // 0.22 - 0.55  : mask halves separate + face fades in + skills reveal
      // 0.55 - 0.80  : face scales slightly, mask halves move offscreen
      // 0.80 - 1.00  : everything fades out / title moves up

      // Title/eyebrow/subtitle fade out as the cut begins
      const introFade = clamp((progress - 0.1) / 0.15, 0, 1);
      const title = titleRef.current;
      if (title) {
        title.style.opacity = String(1 - introFade);
        title.style.transform = `translate(-50%, calc(-50% - ${introFade * 80}px))`;
      }
      if (eyebrowRef.current) eyebrowRef.current.style.opacity = String(1 - introFade);
      if (subtitleRef.current) subtitleRef.current.style.opacity = String(1 - introFade);
      if (scrollHintRef.current) {
        scrollHintRef.current.style.opacity = String(clamp(1 - progress * 4, 0, 1));
      }

      // Katana blade: grows from center outward between 0.12 - 0.28
      const katana = katanaRef.current;
      if (katana) {
        const bladeP = clamp((progress - 0.12) / 0.16, 0, 1);
        const bladeEase = ease(bladeP);
        katana.style.opacity =
          bladeP > 0 && progress < 0.62
            ? "1"
            : progress >= 0.62
              ? String(clamp(1 - (progress - 0.62) / 0.12, 0, 1))
              : "0";
        katana.style.height = bladeEase * 120 + "vh";
      }

      // Mask halves: split between 0.22 - 0.55
      const cutP = clamp((progress - 0.22) / 0.33, 0, 1);
      const cutEase = ease(cutP);
      const splitDist = cutEase * 55; // vw
      const rotate = cutEase * 6;
      const opacityMask = clamp(1 - (progress - 0.55) / 0.2, 0, 1);

      const left = leftRef.current;
      const right = rightRef.current;
      if (left && right) {
        left.style.transform = `translate(calc(-50% - ${splitDist}vw), -50%) rotate(-${rotate}deg)`;
        right.style.transform = `translate(calc(-50% + ${splitDist}vw), -50%) rotate(${rotate}deg)`;
        left.style.opacity = String(opacityMask);
        right.style.opacity = String(opacityMask);
      }

      // Face reveal: 0.25 - 0.7
      const face = faceRef.current;
      if (face) {
        const faceP = clamp((progress - 0.25) / 0.45, 0, 1);
        const faceEase = ease(faceP);
        const faceOut = clamp(1 - (progress - 0.78) / 0.15, 0, 1);
        face.style.opacity = String(faceEase * faceOut);
        const faceScale = lerp(1.15, 1.0, faceEase);
        face.style.transform = `translate(-50%, -50%) scale(${faceScale})`;
        face.style.filter = `grayscale(${lerp(0.7, 0.15, faceEase)}) contrast(${lerp(1.2, 1.05, faceEase)}) brightness(${lerp(0.5, 1, faceEase)})`;
      }

      // Sigil: rotate, scale
      const sigilOuter = sigilOuterRef.current;
      const sigilInner = sigilInnerRef.current;
      const sigilGlow = sigilGlowRef.current;
      if (sigilOuter && sigilInner && sigilGlow) {
        const sScale = 1 + progress * 0.5;
        sigilOuter.style.transform = `translate(-50%, -50%) scale(${sScale})`;
        sigilInner.style.transform = `translate(-50%, -50%) scale(${1 + progress * 0.3}) rotate(${progress * -45}deg)`;
        sigilOuter.style.opacity = String(clamp(1 - progress * 1.3, 0, 1));
        sigilInner.style.opacity = String(clamp(1 - progress * 1.3, 0, 1));
        sigilGlow.style.opacity = String(clamp(1 + progress * 0.6, 0.5, 1.6));
      }

      // Kanji watermark
      const kanjiWm = kanjiRef.current;
      if (kanjiWm) {
        kanjiWm.style.transform = `scale(${1 + progress * 0.4})`;
        kanjiWm.style.opacity = String(clamp(1 - progress * 1.5, 0, 1));
      }

      // Skills — reveal in sequence during the cut
      skillRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = 0.28 + i * 0.08;
        const end = start + 0.14;
        const p = clamp((progress - start) / (end - start), 0, 1);
        const pEase = ease(p);
        const exitP = clamp((progress - 0.78) / 0.15, 0, 1);
        const final = pEase * (1 - exitP);

        // direction-aware slide in
        const dirSign = i % 2 === 0 ? -1 : 1;
        const translateX = (1 - pEase) * 60 * dirSign;
        el.style.opacity = String(final);
        el.style.transform = `translateX(${translateX}px)`;
      });
    }

    let rafId: number | null = null;
    const schedule = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updateHero();
      });
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    updateHero();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero" data-screen-label="01 Hero — Mask Cut">
      <div className="hero-stage">
        {/* kanji watermark */}
        <div ref={kanjiRef} className="hero-kanji" aria-hidden="true">
          斬
        </div>

        {/* sigil */}
        <div ref={sigilGlowRef} className="hero-sigil" aria-hidden="true" />
        <div ref={sigilInnerRef} className="hero-sigil-ring" aria-hidden="true" />
        <div ref={sigilOuterRef} className="hero-sigil-ring outer" aria-hidden="true" />

        {/* face (revealed) */}
        <div ref={faceRef} className="hero-face" aria-hidden="true" />

        {/* mask halves */}
        <div ref={leftRef} className="hero-mask-half hero-mask-left" aria-hidden="true" />
        <div ref={rightRef} className="hero-mask-half hero-mask-right" aria-hidden="true" />

        {/* katana blade */}
        <div ref={katanaRef} className="hero-katana" aria-hidden="true" />

        {/* eyebrow */}
        <div ref={eyebrowRef} className="hero-eyebrow">
          <span>◆</span> MERN DEVELOPER <span>◆</span> CODE AS CRAFT <span>◆</span>
        </div>

        {/* skill strips (appear during cut) */}
        {HERO_SKILLS.map((skill, i) => (
          <div
            key={skill.mono}
            ref={(el) => {
              skillRefs.current[i] = el;
            }}
            className={`hero-skill hero-skill-${i + 1}`}
          >
            <span className="mono">{skill.mono}</span>
            {skill.parts.map((part, j) => (
              <span key={part}>
                {j > 0 && <span className="dot">·</span>}
                {part}
              </span>
            ))}
          </div>
        ))}

        {/* main title */}
        <div ref={titleRef} className="hero-title-wrap">
          <h1 className="hero-title">
            <span className="line">
              <span>JAYESH</span>
            </span>
            <span className="line">
              <span>GOSWAMI</span>
            </span>
          </h1>
        </div>

        {/* subtitle at bottom */}
        <div ref={subtitleRef} className="hero-subtitle">
          A MERN-STACK DEVELOPER / INDORE <span className="accent">●</span> IN
          <br />
          <span className="muted">BUILDING WEB INTERFACES WITH PRECISION AND INTENT</span>
          <span className="divider" />
        </div>

        {/* scroll hint */}
        <div ref={scrollHintRef} className="scroll-hint">
          <span>SCROLL — UNMASK</span>
          <span className="arrow" />
        </div>
      </div>
    </section>
  );
}
