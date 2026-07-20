"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, type NavLink } from "@/lib/data/site";

const CASE_LINKS: NavLink[] = [
  { idx: "←", label: "All Work", href: "/#work" },
  { idx: "✦", label: "Start a Project", href: "/contact" },
];

const CONTACT_LINKS: NavLink[] = [
  { idx: "←", label: "Home", href: "/" },
  { idx: "業", label: "Work", href: "/#work" },
];

export default function Nav() {
  const pathname = usePathname();

  let links = NAV_LINKS;
  let meta = "FULL-STACK · MERN";
  if (pathname.startsWith("/work")) {
    links = CASE_LINKS;
    meta = "CASE STUDY";
  } else if (pathname.startsWith("/contact")) {
    links = CONTACT_LINKS;
    meta = "START A PROJECT";
  }

  return (
    <nav className="nav">
      <div className="nav-brand">
        <Link href="/">
          <span className="brand-kanji">侍</span>JAYESH.PG
        </Link>
      </div>
      <div className="nav-links">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <span className="idx">{link.idx}</span>
            {link.label}
          </Link>
        ))}
      </div>
      <div className="nav-meta">{meta}</div>
    </nav>
  );
}
