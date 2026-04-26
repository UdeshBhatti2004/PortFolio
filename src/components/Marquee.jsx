import { useRef } from "react";

const items = [
  "Full Stack Developer", "✦",
  "React · Node · MongoDB", "✦",
  "Scalable Architecture", "✦",
  "Pixel-Perfect UIs", "✦",
  "Turning Ideas Into Products", "✦",
  "Available For Hire", "✦",
];

export default function Marquee() {
  return (
    <div className="w-full  overflow-hidden bg-[#080808] border-y border-white/[0.07] py-2.5 relative">
      {/* fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-14 z-10 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-14 z-10 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={
              item === "✦"
                ? "text-white/18 text-sm flex-shrink-0"
                : "px-7 text-[10px] tracking-[0.35em] uppercase text-white/22 hover:text-white/55 transition-colors duration-300 whitespace-nowrap"
            }
            style={{ fontFamily: "var(--font-outfit)", fontWeight: 400 }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}