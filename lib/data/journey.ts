export interface JourneyStation {
  num: string;
  titleLines: string[];
  tags: string[];
  description: string;
  texture: string;
  metaRole: string;
  metaBadge: string;
}

export const JOURNEY: JourneyStation[] = [
  {
    num: "NOW / 2025",
    titleLines: ["CARINA", "SOFTLABS"],
    tags: ["FULL STACK ENGINEER", "INDORE", "APR 2025 — PRESENT"],
    description:
      "Architected the AWS EC2 scheduling microservice, delivered a company-wide project management platform, and wired Redis caching, JWT/RBAC and WebSocket realtime across services on EC2 and VPS.",
    texture: "/assets/texture-purple.jpg",
    metaRole: "FULL STACK ENGINEER",
    metaBadge: "現 PRESENT",
  },
  {
    num: "2024 / 25",
    titleLines: ["VIRTUEAIDE"],
    tags: ["FRONTEND DEVELOPER", "RAJASTHAN", "MAR 2024 — APR 2025"],
    description:
      "Built responsive React/Next UIs serving 1,000+ daily users. Cut page loads ~15% and lifted Lighthouse scores ~20% via code-splitting and render optimization; turned Figma files into accessible component libraries.",
    texture: "/assets/texture-blue.jpg",
    metaRole: "FRONTEND DEVELOPER",
    metaBadge: "修 TRAINED",
  },
];

export interface Principle {
  num: string;
  kanji: string;
  titleLines: string[];
  text: string;
}

export const PRINCIPLES: Principle[] = [
  {
    num: "01",
    kanji: "静",
    titleLines: ["Quiet", "code"],
    text: "A good codebase reads like a well-kept room. Clear names, no dead branches, nothing left behind. The next developer — often me — should know exactly where to cut.",
  },
  {
    num: "02",
    kanji: "速",
    titleLines: ["Fast", "first"],
    text: "Performance is the first feature. If it doesn't load in under a second on a mid-tier phone, it isn't shipped. Ship the smallest thing that holds its edge.",
  },
  {
    num: "03",
    kanji: "斬",
    titleLines: ["One", "strike"],
    text: "I make one clean cut per commit. No mixed concerns, no \"while I was in here\". A reviewer should understand a change in thirty seconds.",
  },
];
