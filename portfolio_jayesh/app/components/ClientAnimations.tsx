'use client';

import { useEffect } from 'react';

export default function ClientAnimations() {
  useEffect(() => {
    const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    /* ---- Scroll progress bar ---- */
    const bar = document.querySelector<HTMLElement>('.scroll-progress');
    const onScroll = () => {
      if (!bar) return;
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      bar.style.width = (p * 100).toFixed(2) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---- Hero scroll animation ---- */
    const hero = document.querySelector<HTMLElement>('.hero');
    const left = document.querySelector<HTMLElement>('.hero-mask-left');
    const right = document.querySelector<HTMLElement>('.hero-mask-right');
    const face = document.querySelector<HTMLElement>('.hero-face');
    const katana = document.querySelector<HTMLElement>('.hero-katana');
    const titleWrap = document.querySelector<HTMLElement>('.hero-title-wrap');
    const subtitle = document.querySelector<HTMLElement>('.hero-subtitle');
    const eyebrow = document.querySelector<HTMLElement>('.hero-eyebrow');
    const skills = Array.from(document.querySelectorAll<HTMLElement>('.hero-skill'));
    const sigilOuter = document.querySelector<HTMLElement>('.hero-sigil-ring.outer');
    const sigilInner = document.querySelector<HTMLElement>('.hero-sigil-ring:not(.outer)');
    const sigilGlow = document.querySelector<HTMLElement>('.hero-sigil');
    const kanjiWm = document.querySelector<HTMLElement>('.hero-kanji');
    const scrollHint = document.querySelector<HTMLElement>('.scroll-hint');

    function updateHero() {
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = clamp(-rect.top / total, 0, 1);

      const introFade = clamp((progress - 0.10) / 0.15, 0, 1);
      if (titleWrap) {
        titleWrap.style.opacity = String(1 - introFade);
        titleWrap.style.transform = `translate(-50%, calc(-50% - ${introFade * 80}px))`;
      }
      if (eyebrow) eyebrow.style.opacity = String(1 - introFade);
      if (subtitle) subtitle.style.opacity = String(1 - introFade);
      if (scrollHint) scrollHint.style.opacity = String(clamp(1 - progress * 4, 0, 1));

      const bladeP = clamp((progress - 0.12) / 0.16, 0, 1);
      const bladeEase = ease(bladeP);
      if (katana) {
        katana.style.opacity =
          bladeP > 0 && progress < 0.62
            ? '1'
            : progress >= 0.62
            ? String(clamp(1 - (progress - 0.62) / 0.12, 0, 1))
            : '0';
        katana.style.height = bladeEase * 120 + 'vh';
      }

      const cutP = clamp((progress - 0.22) / 0.33, 0, 1);
      const cutEase = ease(cutP);
      const splitDist = cutEase * 55;
      const rotate = cutEase * 6;
      const opacityMask = clamp(1 - (progress - 0.55) / 0.20, 0, 1);
      if (left) {
        left.style.transform = `translate(calc(-50% - ${splitDist}vw), -50%) rotate(-${rotate}deg)`;
        left.style.opacity = String(opacityMask);
      }
      if (right) {
        right.style.transform = `translate(calc(-50% + ${splitDist}vw), -50%) rotate(${rotate}deg)`;
        right.style.opacity = String(opacityMask);
      }

      const faceP = clamp((progress - 0.25) / 0.45, 0, 1);
      const faceEase = ease(faceP);
      const faceOut = clamp(1 - (progress - 0.78) / 0.15, 0, 1);
      if (face) {
        face.style.opacity = String(faceEase * faceOut);
        const faceScale = lerp(1.15, 1.0, faceEase);
        face.style.transform = `translate(-50%, -50%) scale(${faceScale})`;
        face.style.filter = `grayscale(${lerp(0.7, 0.15, faceEase)}) contrast(${lerp(1.2, 1.05, faceEase)}) brightness(${lerp(0.5, 1, faceEase)})`;
      }

      if (sigilOuter && sigilInner && sigilGlow) {
        const sScale = 1 + progress * 0.5;
        sigilOuter.style.transform = `translate(-50%, -50%) scale(${sScale})`;
        sigilInner.style.transform = `translate(-50%, -50%) scale(${1 + progress * 0.3}) rotate(${progress * -45}deg)`;
        sigilOuter.style.opacity = String(clamp(1 - progress * 1.3, 0, 1));
        sigilInner.style.opacity = String(clamp(1 - progress * 1.3, 0, 1));
        sigilGlow.style.opacity = String(clamp(1 + progress * 0.6, 0.5, 1.6));
      }

      if (kanjiWm) {
        kanjiWm.style.transform = `scale(${1 + progress * 0.4})`;
        kanjiWm.style.opacity = String(clamp(1 - progress * 1.5, 0, 1));
      }

      skills.forEach((el, i) => {
        const start = 0.28 + i * 0.08;
        const end = start + 0.14;
        const p = clamp((progress - start) / (end - start), 0, 1);
        const pEase = ease(p);
        const exitP = clamp((progress - 0.78) / 0.15, 0, 1);
        const final = pEase * (1 - exitP);
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
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    updateHero();

    /* ---- Section reveals ---- */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    /* ---- Live IST clock ---- */
    const clock = document.querySelector<HTMLElement>('.nav-clock');
    let clockInterval: ReturnType<typeof setInterval> | null = null;
    if (clock) {
      const tick = () => {
        const d = new Date();
        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');
        const ss = String(d.getSeconds()).padStart(2, '0');
        clock.textContent = `${hh}:${mm}:${ss} IST`;
      };
      tick();
      clockInterval = setInterval(tick, 1000);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      io.disconnect();
      if (clockInterval) clearInterval(clockInterval);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
