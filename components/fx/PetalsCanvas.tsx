"use client";

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  s: number;
  vy: number;
  ph: number;
  sway: number;
  rot: number;
  vr: number;
  c: string;
  a: number;
}

/** Ambient sakura petals drifting behind the page, steered by the mouse. */
export default function PetalsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let wind = 0;
    let mx = 0.5;
    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const COLORS = ["rgba(201,189,230,", "rgba(232,227,245,", "rgba(200,55,45,"];
    function spawn(anyY: boolean): Petal {
      return {
        x: Math.random() * (W || 1200),
        y: anyY ? Math.random() * (H || 800) : -20,
        s: 3 + Math.random() * 6,
        vy: 0.25 + Math.random() * 0.7,
        ph: Math.random() * Math.PI * 2,
        sway: 0.4 + Math.random() * 1.2,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.02,
        c: COLORS[Math.random() < 0.09 ? 2 : Math.random() < 0.5 ? 0 : 1],
        a: 0.16 + Math.random() * 0.3,
      };
    }
    const petals = Array.from({ length: 34 }, () => spawn(true));

    let rafId = 0;
    function tick(t: number) {
      rafId = requestAnimationFrame(tick);
      ctx!.clearRect(0, 0, W, H);
      wind += ((mx - 0.5) * 0.8 - wind) * 0.02;
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.vy;
        p.x += Math.sin(t * 0.001 + p.ph) * p.sway * 0.4 + wind;
        p.rot += p.vr;
        if (p.y > H + 20 || p.x < -30 || p.x > W + 30) petals[i] = spawn(false);
        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.rot + Math.sin(t * 0.0012 + p.ph) * 0.4);
        ctx!.fillStyle = p.c + p.a + ")";
        ctx!.beginPath();
        ctx!.ellipse(0, 0, p.s, p.s * 0.45, 0, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }
    }
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fx-petals" aria-hidden="true" />;
}
