"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Renders children on the landing page only — the traveling scroll-katana and
 * corner chrome belong to the one-pager; subpages carry their own 3D viewer.
 */
export default function HomeChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <>{children}</>;
}
