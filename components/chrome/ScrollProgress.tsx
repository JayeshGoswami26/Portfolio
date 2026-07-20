"use client";

import { useEffect, useRef } from "react";

/** Thin blood-red page progress line pinned to the top edge. */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const bar = barRef.current;
      if (!bar) return;
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      bar.style.width = (p * 100).toFixed(2) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}
