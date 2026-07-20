export interface NavLink {
  idx: string;
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { idx: "01", label: "Manifesto", href: "/#manifesto" },
  { idx: "02", label: "Stack", href: "/#stack" },
  { idx: "03", label: "Work", href: "/#work" },
  { idx: "04", label: "Journey", href: "/#experience" },
  { idx: "05", label: "About", href: "/#about" },
  { idx: "06", label: "Contact", href: "/#contact" },
];

export const CONTACT = {
  email: "goswamijayesh54@gmail.com",
  phone: "+91 89053 10120",
  phoneHref: "tel:+918905310120",
  github: { label: "github/JayeshGoswami26", href: "https://github.com/JayeshGoswami26" },
  linkedin: { label: "/in/goswamijayesh", href: "https://linkedin.com/in/goswamijayesh" },
  base: "Indore, MP",
  baseNote: "IST · remote-ready",
};

export const MARQUEE_ITEMS: { label: string; outline: boolean }[] = [
  { label: "REACT", outline: false },
  { label: "NESTJS", outline: true },
  { label: "MONGODB", outline: false },
  { label: "NEXT.JS", outline: true },
  { label: "AWS", outline: false },
  { label: "TYPESCRIPT", outline: true },
];

export interface HeroSkill {
  mono: string;
  parts: string[];
}

export const HERO_SKILLS: HeroSkill[] = [
  { mono: "// 01 FRONTEND", parts: ["REACT", "NEXT"] },
  { mono: "// 02 BACKEND", parts: ["NODE", "NEST"] },
  { mono: "// 03 DATA", parts: ["MONGO", "POSTGRES"] },
  { mono: "// 04 CLOUD", parts: ["AWS", "DOCKER"] },
];
