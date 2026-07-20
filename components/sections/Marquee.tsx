import { MARQUEE_ITEMS } from "@/lib/data/site";

/** Infinite tech ticker — items rendered twice so the loop is seamless. */
export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[0, 1].map((pass) =>
          MARQUEE_ITEMS.map((item) => (
            <span
              key={`${pass}-${item.label}`}
              className={item.outline ? "marquee-item outline" : "marquee-item"}
            >
              {item.label} <span className="sep" />
            </span>
          ))
        )}
      </div>
    </div>
  );
}
