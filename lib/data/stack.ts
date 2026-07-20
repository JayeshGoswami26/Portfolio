export interface StackRow {
  num: string;
  name: string;
  tools: string;
  years: string;
  delay: 0 | 1 | 2 | 3;
}

export const STACK_ROWS: StackRow[] = [
  {
    num: "[01]",
    name: "LANGUAGES",
    tools: "TypeScript · JavaScript ES6+",
    years: "CORE",
    delay: 0,
  },
  {
    num: "[02]",
    name: "FRONTEND",
    tools: "React · Next.js · Angular · Redux Toolkit · TanStack Query · Tailwind · GSAP · Three.js",
    years: "2+ YRS",
    delay: 1,
  },
  {
    num: "[03]",
    name: "BACKEND",
    tools: "Node · NestJS · Express · REST · GraphQL · WebSockets · Redis · JWT / RBAC",
    years: "2+ YRS",
    delay: 2,
  },
  {
    num: "[04]",
    name: "DATABASE",
    tools: "MongoDB · Mongoose · PostgreSQL",
    years: "2+ YRS",
    delay: 0,
  },
  {
    num: "[05]",
    name: "CLOUD",
    tools: "AWS EC2 · S3 · IAM · Docker · Nginx · PM2 · GitHub Actions · Vercel",
    years: "2 YRS",
    delay: 1,
  },
];
