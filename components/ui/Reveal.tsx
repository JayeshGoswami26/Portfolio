"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type Ref } from "react";

interface RevealProps {
  as?: ElementType;
  className?: string;
  /** Stagger step — maps to .delay-1/.delay-2/.delay-3 (100ms each). */
  delay?: 0 | 1 | 2 | 3;
  children: ReactNode;
  /** Remaining props (href, id, …) are forwarded to the rendered element. */
  [prop: string]: unknown;
}

/** Fades content up once it scrolls into view (IntersectionObserver → .reveal.in). */
export default function Reveal({ as = "div", className, delay = 0, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const classes = ["reveal", delay ? `delay-${delay}` : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  const Tag = as;
  return (
    <Tag {...rest} ref={ref as Ref<never>} className={classes}>
      {children}
    </Tag>
  );
}
