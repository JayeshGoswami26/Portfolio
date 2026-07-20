export interface Project {
  slug: string;
  /** Ordinal, e.g. "01" — the card/detail count line is derived from it. */
  num: string;
  kanji: string;
  title: string;
  type: string;
  year: string;
  status: string;
  /** Role as shown on the detail page, e.g. "Solo Architect". */
  role: string;
  /** Full stack list for the detail page. */
  stack: string[];
  /** Public URL to see it live; empty/omitted → button hidden. */
  live?: string;
  github: string;

  /* Case study */
  tagline: string;
  problem: string;
  cut: string;
  result: string;
  /** Gallery — image paths; null renders a placeholder frame. */
  shots: (string | null)[];

  /* Landing card */
  titleLines: string[];
  /** Short tag set for the card (detail page shows full `stack`). */
  tags: string[];
  description: string;
  /** Card footer role line, e.g. "SOLO ARCHITECT · 2025". */
  cardRole: string;
  slotId: string;
  placeholder: string;
  image?: string;
  wide?: boolean;
  delay: 0 | 1 | 2 | 3;
}

export const PROJECTS: Project[] = [
  {
    slug: "aws-ec2-scheduler",
    num: "01",
    kanji: "雲",
    title: "AWS EC2 SCHEDULER",
    type: "MICROSERVICE",
    year: "2025",
    status: "Shipped",
    role: "Solo Architect",
    stack: ["Node.js", "NestJS", "AWS SDK", "IAM", "Cron", "REST"],
    github: "https://github.com/JayeshGoswami26",
    tagline:
      "An event-driven microservice that puts idle EC2 compute to sleep — and wakes it on schedule.",
    problem:
      "Cloud bills grow quietly. Dev and staging EC2 instances ran 24/7 while being used maybe 10 hours a day. The company needed automated start/stop lifecycles, controllable from an existing Java Spring Boot backend, without handing broad AWS credentials around.",
    cut:
      "I architected a standalone NestJS microservice owning all AWS interaction: IAM-scoped SDK access with least-privilege roles, cron-driven scheduling with per-instance calendars, and a secured REST surface consumed by the Spring Boot backend. Every action is idempotent and logged, so a missed tick never double-fires.",
    result:
      "Idle compute cost cut on schedule, zero manual instance babysitting, and a clean service boundary — the Java team consumes three endpoints and never touches AWS.",
    shots: ["/assets/project_AWS_1.jpg", null, null],
    titleLines: ["AWS EC2", "SCHEDULER"],
    tags: ["NODE.JS", "NESTJS", "AWS SDK", "CRON"],
    description:
      "Solo-architected event-driven microservice automating EC2 start/stop lifecycles — IAM-scoped SDK access, secured REST consumed by a Java Spring Boot backend. Cuts idle compute cost on a schedule.",
    cardRole: "SOLO ARCHITECT · 2025",
    slotId: "proj-aws",
    placeholder: "Drop AWS Scheduler screenshot",
    image: "/assets/project_AWS_1.jpg",
    wide: true,
    delay: 0,
  },
  {
    slug: "pmt",
    num: "02",
    kanji: "組",
    title: "PMT",
    type: "PLATFORM",
    year: "2025",
    status: "In production",
    role: "Full-Stack (solo)",
    stack: ["React", "Node", "WebSockets", "MongoDB", "Redux Toolkit"],
    github: "https://github.com/JayeshGoswami26",
    tagline: "A ClickUp-style project management platform, built alone — boards, roles, realtime.",
    problem:
      "The team juggled tasks across spreadsheets and chat. They needed one place for task boards, assignments, comments and status — with permissions that mirror the org and updates that appear without a refresh.",
    cut:
      "I designed the data model (projects → lists → tasks → comments), built the REST API with role-based access, and layered WebSocket events over it so every board mutation broadcasts to open clients. The React frontend uses optimistic updates with server reconciliation.",
    result:
      "Company-wide adoption as the internal PM tool. Boards stay live across the office, and the RBAC model held up as teams and roles grew.",
    shots: ["/assets/project_pmt_1.png", "/assets/project_pmt_2.png", null],
    titleLines: ["PMT"],
    tags: ["REACT", "NODE", "WEBSOCKETS", "MONGODB"],
    description:
      "ClickUp-style project management platform — task boards, assignments, comments, role-based access, realtime updates. Frontend, API and data model, built alone.",
    cardRole: "FULL-STACK · 2025",
    slotId: "proj-pmt",
    placeholder: "Drop PMT screenshot",
    image: "/assets/project_pmt_1.png",
    delay: 0,
  },
  {
    slug: "hrms",
    num: "03",
    kanji: "人",
    title: "HRMS",
    type: "PLATFORM",
    year: "2025",
    status: "Live in production",
    role: "Full-Stack (solo)",
    stack: ["React", "Node", "Redis", "JWT", "RBAC", "MongoDB"],
    github: "https://github.com/JayeshGoswami26",
    tagline: "A full HR platform — records, attendance, leave, dashboards — live in production.",
    problem:
      "HR ran on paper and scattered files: employee records, attendance registers, leave requests routed over email. Three different roles (Admin, HR, Employee) needed three different views of the same truth.",
    cut:
      "JWT auth with role-scoped routes and UI, employee CRUD with document uploads, attendance and leave workflows with approval chains, and dashboards per role. Redis caches the hot reads (org tree, attendance summaries) to keep dashboards instant.",
    result:
      "Deployed and running on a VPS in production. Leave approvals dropped from days of email ping-pong to same-day clicks.",
    shots: ["/assets/project_hrms_1.png", null, null],
    titleLines: ["HRMS"],
    tags: ["REACT", "NODE", "REDIS", "RBAC"],
    description:
      "Full-stack HR platform: employee records, attendance, leave and dashboards. JWT auth with Admin/HR/Employee roles, Redis caching — live in production on VPS.",
    cardRole: "FULL-STACK · 2025",
    slotId: "proj-hrms",
    placeholder: "Drop HRMS screenshot",
    image: "/assets/project_hrms_1.png",
    delay: 1,
  },
  {
    slug: "popil-ott",
    num: "04",
    kanji: "映",
    title: "POPIL",
    type: "OTT BACKEND",
    year: "2024",
    status: "Shipped",
    role: "Solo Backend + Admin",
    stack: ["NestJS", "AWS S3", "Payments", "MongoDB", "JWT"],
    github: "https://github.com/JayeshGoswami26",
    tagline:
      "The entire backend and admin panel for an OTT platform — movies, series, songs, subscriptions.",
    problem:
      "A streaming startup needed everything behind the play button: content catalog, media storage and delivery, subscription tiers, payments, and an admin panel to run it — on a solo-developer budget and timeline.",
    cut:
      "I built the NestJS API end to end: catalog models for movies/series/episodes/songs, S3-backed media storage with signed delivery, payment-gateway integration driving subscription state machines, and an admin panel for the content team to publish without touching code.",
    result:
      "A working OTT backend shipped by one developer — content team publishes daily, payments reconcile automatically, media serves from S3.",
    shots: ["/assets/project_popil_1.png", null, null],
    titleLines: ["POPIL"],
    tags: ["NESTJS", "AWS S3", "PAYMENTS", "MONGODB"],
    description:
      "Solo-built backend + admin panel for an OTT platform streaming movies, series and songs — subscription tiers, payment gateway integration, S3 media storage and delivery.",
    cardRole: "SOLO BACKEND · 2024",
    slotId: "proj-popil",
    placeholder: "Drop Popil screenshot",
    image: "/assets/project_popil_1.png",
    delay: 0,
  },
  {
    slug: "hupe-academy",
    num: "05",
    kanji: "学",
    title: "HUPE ACADEMY",
    type: "PLATFORM",
    year: "2025",
    status: "Shipped",
    role: "Full-Stack",
    stack: ["React", "Node", "MongoDB", "RBAC", "Analytics"],
    github: "https://github.com/JayeshGoswami26",
    tagline:
      "An academy management dashboard — courses, batches, students and fees in one command center.",
    problem:
      "The academy tracked students, batches and fee payments across separate registers and sheets. Double entries and missed fee follow-ups were routine, and nobody had a single view of how the academy was actually doing.",
    cut:
      "I put the batch at the center of the data model — students enroll into batches, batches belong to courses, attendance and fees hang off the enrollment. React dashboards carve role-based views for admin and front desk, dues surface automatically, and analytics roll enrollment and collections into one glanceable summary.",
    result:
      "Front-desk operations moved off paper. Enrollment, attendance and fee status are answered from one screen, and pending dues stopped slipping through the cracks.",
    shots: ["/assets/project_hupe_1.png", null, null],
    titleLines: ["HUPE", "ACADEMY"],
    tags: ["REACT", "NODE", "MONGODB", "DASHBOARD"],
    description:
      "Academy management dashboard — courses, batches, student enrollment, attendance and fee tracking, with role-based admin views and analytics at a glance.",
    cardRole: "FULL-STACK · 2025",
    slotId: "proj-hupe",
    placeholder: "Drop Hupe Academy screenshot",
    image: "/assets/project_hupe_1.png",
    delay: 1,
  },
  {
    slug: "image-cropper",
    num: "06",
    kanji: "切",
    title: "IMAGE CROPPER",
    type: "NPM PACKAGE",
    year: "2024",
    status: "Open source",
    role: "Open Source",
    stack: ["NPM", "React", "Next.js", "Canvas"],
    live: "https://www.npmjs.com/package/react-image-cropper-byjayesh",
    github: "https://github.com/JayeshGoswami26/React-Image-Cropper-By-Jayesh",
    tagline:
      "A published React/Next image cropper other developers install — custom dimensions, radius, framing.",
    problem:
      "Every project needs image cropping, and every existing package fought back: rigid aspect ratios, no border-radius preview, awkward Next.js SSR behavior. I kept rewriting the same wrapper.",
    cut:
      "So I packaged it. A React component with controlled crop dimensions, live border-radius and framing preview, canvas-based output, and SSR-safe mounting for Next. Published to npm with typed props and zero-config defaults.",
    result:
      "A sharp little tool on the public registry — install, drop in, crop. Used in my own production projects since, including the Rawat Organics client build.",
    shots: ["/assets/project_IMAGE_CROPPER_1.png", null, null],
    titleLines: ["IMAGE", "CROPPER"],
    tags: ["NPM", "REACT", "NEXT.JS"],
    description:
      "Published React/Next image cropper — custom dimensions, border radius and framing controls. A sharp little tool other developers install.",
    cardRole: "OPEN SOURCE",
    slotId: "proj-cropper",
    placeholder: "Drop Cropper demo screenshot",
    image: "/assets/project_IMAGE_CROPPER_1.png",
    delay: 0,
  },
  {
    slug: "maya-variant-generator",
    num: "07",
    kanji: "衣",
    title: "MAYA VARIANT GENERATOR",
    type: "PIPELINE TOOL",
    year: "2024",
    status: "Open source",
    role: "Open Source",
    stack: ["Maya", "Python", "FBX", "Pipeline"],
    github: "https://github.com/JayeshGoswami26/clothing-variant-generator",
    tagline: "A Maya plugin that refits clothing across character body types and batch-exports FBX.",
    problem:
      "Game character customization means every garment must fit every body type. Artists were manually refitting each clothing item per body — hours of repetitive lattice work per asset.",
    cut:
      "A Python plugin for Maya that takes a fitted garment, retargets it across the body-type set using stored deformation profiles, and batch-exports engine-ready FBX with consistent naming. One click replaces an afternoon.",
    result:
      "Asset variant time collapsed from hours to minutes, with consistent topology and naming the game engine ingests directly.",
    shots: ["/assets/project_MAYA_VARIANT_1.png", null, null],
    titleLines: ["MAYA VARIANT", "GENERATOR"],
    tags: ["MAYA", "PYTHON", "FBX"],
    description:
      "Maya plugin that auto-refits clothing across multiple character body types and batch-exports FBX — built for game character customization pipelines.",
    cardRole: "OPEN SOURCE",
    slotId: "proj-maya",
    placeholder: "Drop Maya plugin screenshot",
    image: "/assets/project_MAYA_VARIANT_1.png",
    delay: 1,
  },
  {
    slug: "rawat-organics",
    num: "08",
    kanji: "香",
    title: "RAWAT ORGANICS",
    type: "CLIENT WEBSITE",
    year: "2026",
    status: "In development",
    role: "Client Project — Full-Stack",
    stack: ["Next.js", "MongoDB", "Framer Motion", "Lenis", "JWT"],
    github: "https://github.com/JayeshGoswami26",
    tagline:
      "A premium brand site for an organic spice company — animated catalog, inquiry pipeline, admin panel.",
    problem:
      "Rawat Organics sells farm-fresh, chemical-free spices — with no digital presence to match the product. They needed a site as premium as the brand, a catalog they could update themselves, and visitor interest turned into inquiries they can actually track instead of lost emails.",
    cut:
      "Design-first Next.js: Framer Motion and Lenis smooth scroll over an App Router base, the catalog driven entirely from MongoDB so the client edits products — not code — and a JWT-secured admin panel with an inquiry inbox: search, pagination, new/read/replied status flow. Product imagery runs through my own npm package, react-image-cropper-byjayesh.",
    result:
      "A brand site that looks like the spices taste — and behind it an operations tool. The client manages the catalog and works the inquiry pipeline without touching a line of code.",
    shots: ["/assets/project_rawat_1.png", null, null],
    titleLines: ["RAWAT", "ORGANICS"],
    tags: ["NEXT.JS", "MONGODB", "FRAMER MOTION", "CLIENT"],
    description:
      "Client website for Rawat Organics, an organic spice brand — animated product catalog and detail pages, inquiry flow, and a JWT-secured admin panel. Built with Next.js, MongoDB and Lenis smooth scroll.",
    cardRole: "CLIENT PROJECT · 2026",
    slotId: "proj-rawat",
    placeholder: "Drop Rawat Organics screenshot",
    image: "/assets/project_rawat_1.png",
    wide: true,
    delay: 0,
  },
];

export const PROJECT_COUNT = String(PROJECTS.length).padStart(2, "0");

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
