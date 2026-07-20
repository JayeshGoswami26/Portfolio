import Reveal from "@/components/ui/Reveal";
import SectionNum from "@/components/ui/SectionNum";

const STATS = [
  { num: "2", suffix: "+", label: ["YEARS IN", "PRODUCTION"] },
  { num: "40", suffix: "+", label: ["REPOS ON", "GITHUB"] },
  { num: "1K", suffix: "+", label: ["DAILY USERS", "SERVED"] },
];

export default function AboutSection() {
  return (
    <section className="dragon-section" id="about" data-screen-label="06 About">
      <div className="red-sun" aria-hidden="true" />
      <div className="dragon-bg" aria-hidden="true" />
      <div className="dragon-content">
        <div>
          <SectionNum seal="心" label="SECTION №05 · ABOUT" />
          <Reveal as="h2" className="about-headline">
            I&apos;M
            <br />
            <span className="accent">JAYESH.</span>
            <br />
            I BUILD
            <br />
            THE WEB.
          </Reveal>
        </div>
        <Reveal className="about-body" delay={1}>
          <p>
            I&apos;m a full-stack MERN developer from Indore. In the last 2+ years I&apos;ve shipped
            production apps end to end — an AWS microservice that trims cloud bills, a company-wide
            project platform, an OTT backend with payments, an HR system running live on a VPS.
          </p>
          <p className="pull">
            &quot;I own products solo — from business logic to admin panels to deploys.&quot;
          </p>
          <p>
            Currently a Full Stack Engineer at Carina Softlabs, and finishing my MCA at Jain
            University. Off the keyboard I&apos;m usually deep in 3D — Three.js scenes and Maya
            pipelines.
          </p>

          <div className="about-stats">
            {STATS.map((stat) => (
              <div key={stat.num} className="about-stat">
                <div className="about-stat-num">
                  {stat.num}
                  <span className="small">{stat.suffix}</span>
                </div>
                <div className="about-stat-label">
                  {stat.label[0]}
                  <br />
                  {stat.label[1]}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
