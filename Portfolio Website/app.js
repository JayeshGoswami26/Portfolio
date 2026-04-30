/* Scroll-driven hero + reveal observers */
(() => {
  'use strict';

  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic

  /* ---------- scroll progress ---------- */
  const bar = qs('.scroll-progress');
  const onScroll = () => {
    const h = document.documentElement;
    const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
    bar.style.width = (p * 100).toFixed(2) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- HERO scroll animation ---------- */
  const hero = qs('.hero');
  const stage = qs('.hero-stage');
  const left = qs('.hero-mask-left');
  const right = qs('.hero-mask-right');
  const face = qs('.hero-face');
  const katana = qs('.hero-katana');
  const title = qs('.hero-title-wrap');
  const subtitle = qs('.hero-subtitle');
  const eyebrow = qs('.hero-eyebrow');
  const skills = qsa('.hero-skill');
  const sigilOuter = qs('.hero-sigil-ring.outer');
  const sigilInner = qs('.hero-sigil-ring:not(.outer)');
  const sigilGlow = qs('.hero-sigil');
  const kanjiWm = qs('.hero-kanji');
  const scrollHint = qs('.scroll-hint');

  function updateHero() {
    const rect = hero.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const progress = clamp(-rect.top / total, 0, 1);

    // Phase breakdown:
    // 0.00 - 0.12  : title + mask intro (static)
    // 0.12 - 0.22  : katana descends (blade enters)
    // 0.22 - 0.55  : mask halves separate + face fades in + skills reveal
    // 0.55 - 0.80  : face scales slightly, mask halves move offscreen
    // 0.80 - 1.00  : everything fades out / title moves up

    // Title/eyebrow/subtitle fade out as the cut begins
    const introFade = clamp((progress - 0.10) / 0.15, 0, 1);
    if (title) {
      title.style.opacity = 1 - introFade;
      title.style.transform = `translate(-50%, calc(-50% - ${introFade * 80}px))`;
    }
    if (eyebrow) eyebrow.style.opacity = 1 - introFade;
    if (subtitle) subtitle.style.opacity = 1 - introFade;
    if (scrollHint) scrollHint.style.opacity = clamp(1 - progress * 4, 0, 1);

    // Katana blade: grows from center outward between 0.12 - 0.28
    const bladeP = clamp((progress - 0.12) / 0.16, 0, 1);
    const bladeEase = ease(bladeP);
    katana.style.opacity = bladeP > 0 && progress < 0.62 ? '1' : (progress >= 0.62 ? String(clamp(1 - (progress - 0.62) / 0.12, 0, 1)) : '0');
    katana.style.height = (bladeEase * 120) + 'vh';

    // Mask halves: split between 0.22 - 0.55
    const cutP = clamp((progress - 0.22) / 0.33, 0, 1);
    const cutEase = ease(cutP);
    const splitDist = cutEase * 55; // vw
    const rotate = cutEase * 6;
    const opacityMask = clamp(1 - (progress - 0.55) / 0.20, 0, 1);

    left.style.transform = `translate(calc(-50% - ${splitDist}vw), -50%) rotate(-${rotate}deg)`;
    right.style.transform = `translate(calc(-50% + ${splitDist}vw), -50%) rotate(${rotate}deg)`;
    left.style.opacity = opacityMask;
    right.style.opacity = opacityMask;

    // Face reveal: 0.25 - 0.7
    const faceP = clamp((progress - 0.25) / 0.45, 0, 1);
    const faceEase = ease(faceP);
    const faceOut = clamp(1 - (progress - 0.78) / 0.15, 0, 1);
    face.style.opacity = faceEase * faceOut;
    const faceScale = lerp(1.15, 1.0, faceEase);
    face.style.transform = `translate(-50%, -50%) scale(${faceScale})`;
    face.style.filter = `grayscale(${lerp(0.7, 0.15, faceEase)}) contrast(${lerp(1.2, 1.05, faceEase)}) brightness(${lerp(0.5, 1, faceEase)})`;

    // Sigil: rotate, scale
    if (sigilOuter) {
      const sScale = 1 + progress * 0.5;
      sigilOuter.style.transform = `translate(-50%, -50%) scale(${sScale})`;
      sigilInner.style.transform = `translate(-50%, -50%) scale(${1 + progress * 0.3}) rotate(${progress * -45}deg)`;
      sigilOuter.style.opacity = clamp(1 - progress * 1.3, 0, 1);
      sigilInner.style.opacity = clamp(1 - progress * 1.3, 0, 1);
      sigilGlow.style.opacity = clamp(1 + progress * 0.6, 0.5, 1.6);
    }

    // Kanji watermark
    if (kanjiWm) {
      kanjiWm.style.transform = `scale(${1 + progress * 0.4})`;
      kanjiWm.style.opacity = clamp(1 - progress * 1.5, 0, 1);
    }

    // Skills — reveal in sequence during the cut
    skills.forEach((el, i) => {
      const start = 0.28 + i * 0.08;
      const end = start + 0.14;
      const p = clamp((progress - start) / (end - start), 0, 1);
      const pEase = ease(p);
      const exitP = clamp((progress - 0.78) / 0.15, 0, 1);
      const final = pEase * (1 - exitP);

      // direction-aware slide in
      const dirSign = (i % 2 === 0) ? -1 : 1;
      const translateX = (1 - pEase) * 60 * dirSign;
      el.style.opacity = final;
      el.style.transform = `translateX(${translateX}px)`;
    });
  }

  let rafId = null;
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

  /* ---------- Section reveals ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

  qsa('.reveal').forEach(el => io.observe(el));

  /* ---------- Clock in nav ---------- */
  const clock = qs('.nav-clock');
  if (clock) {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      const ss = String(d.getSeconds()).padStart(2, '0');
      clock.textContent = `${hh}:${mm}:${ss} IST`;
    };
    tick();
    setInterval(tick, 1000);
  }
})();
