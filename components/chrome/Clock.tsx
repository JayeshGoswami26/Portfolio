"use client";

import { useEffect, useState } from "react";

/** Live HH:MM:SS IST readout for the bottom-right chrome corner. */
export default function Clock() {
  const [time, setTime] = useState("—:—:— IST");

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, "0");
      const mm = String(d.getMinutes()).padStart(2, "0");
      const ss = String(d.getSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss} IST`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="nav-clock">{time}</span>;
}
