import Clock from "@/components/chrome/Clock";

/** Fixed HUD-style corner labels framing the viewport. */
export default function ChromeCorners() {
  return (
    <>
      <div className="chrome-corner chrome-tl">
        <span className="dot">●</span> LIVE / PORTFOLIO v2.0
        <br />
        22°43′09″N 75°50′14″E
      </div>
      <div className="chrome-corner chrome-tr">
        INDEX — 01 / 07
        <br />
        EST. 2023
      </div>
      <div className="chrome-corner chrome-bl">
        SCROLL TO UNMASK
        <br />↓ ↓ ↓
      </div>
      <div className="chrome-corner chrome-br">
        <Clock />
        <br />
        INDORE / IN
      </div>
    </>
  );
}
