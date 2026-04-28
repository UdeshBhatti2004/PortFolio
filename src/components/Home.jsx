import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";

import Marquee from "./Marquee";

/* ─── Letter-by-letter reveal ─── */
function SplitReveal({ text, delay = 0, className = "", style = {} }) {
  return (
    <span
      className={`inline-flex ${className}`}
      style={style}
      aria-label={text}
    >
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ lineHeight: 0.88 }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%", skewY: 3 }}
            animate={{ y: "0%", skewY: 0 }}
            transition={{
              duration: 1.05,
              delay: delay + i * 0.06,
              ease: [0.76, 0, 0.24, 1],
            }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function MobileScrollHint() {
  return (
    <motion.button
      type="button"
      onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
      className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-white/35"
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 1.15, ease: [0.76, 0, 0.24, 1] }}
      aria-label="Scroll to explore the portfolio"
    >
      <span className="text-[8px] tracking-[0.32em] uppercase">
        Scroll
      </span>
      <span className="relative flex h-5 w-px justify-center bg-white/10">
        <motion.span
          className="absolute top-0 h-1.5 w-1.5 rounded-full bg-white/50"
          animate={{ y: [0, 14, 0], opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </motion.button>
  );
}

export default function Hero() {
  const containerRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const imgX = useTransform(mx, [-1, 1], [-12, 12]);
  const imgY = useTransform(my, [-1, 1], [-7, 7]);

  const onMouseMove = (e) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const onLeave = () => {
    animate(mx, 0, { duration: 1.2 });
    animate(my, 0, { duration: 1.2 });
  };

  const tags = [
    "I BUILD THE WEB.",
    "I SHIP FAST.",
    "I THINK IN SYSTEMS.",
    "I OBSESS OVER DETAIL.",
  ];

  const [tagIdx, setTagIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTagIdx((i) => (i + 1) % tags.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* ─── MOBILE LAYOUT ─── */}
      <div
        className="relative flex sm:hidden sticky top-0 flex-col w-full h-[100svh] bg-[#080808] text-white overflow-hidden"
       style={{ fontFamily: "var(--font-bebas)" }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Photo — top portion */}
        <div className="relative w-full" style={{ height: "44svh" }}>
          <img
            src="/Udesh.png"
            alt="Udesh Bhatti"
            className="w-full h-full object-cover object-[50%_20%] mt-8"
            style={{
              filter: "brightness(0.85) contrast(1.05)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        </div>

        {/* Name — below photo */}
        <div className="flex flex-col items-center  z-10 px-2">
          <SplitReveal
            text="Udesh"
            delay={0.4}
            className="font-black text-white"
            style={{
              fontSize: "clamp(56px, 19vw, 108px)",
              letterSpacing: "-0.01em",
              lineHeight: 0.88,
            }}
          />
          <SplitReveal
            text="Bhatti"
            delay={0.58}
            className="font-black text-white"
            style={{
              fontSize: "clamp(56px, 19vw, 108px)",
              letterSpacing: "-0.01em",
              lineHeight: 0.88,
            }}
          />
        </div>

        {/* Bottom info */}
        <div className="px-5 mt-3 pb-14 z-10 flex flex-col items-center text-center">
          <div className="mb-2 flex items-center justify-center gap-3 relative ">
            <div className="h-5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={tagIdx}
                  className="text-[9px] tracking-[0.4em] uppercase text-white/50"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                >
                  {tags[tagIdx]}
                </motion.p>
              </AnimatePresence>
            </div>
  
            
          </div>

          <motion.p className="text-xs text-white/55 leading-relaxed">
            I don't just write code —<br />
            <span className="text-white/80 font-medium">
              I craft experiences that are fast,
              <br />
              scalable &amp; impossible to ignore.
            </span>
          </motion.p>

          <motion.button className="mt-4 flex items-center gap-2 border border-white/30 px-4 py-2.5 text-[10px] tracking-[0.3em] uppercase text-white/70 hover:bg-white hover:text-black transition-colors">
            View My Work ↗
          </motion.button>
        </div>

        <div className="absolute bottom-16 right-5 z-20 sm:hidden">
  <MobileScrollHint />
</div>

        <div className="mt-auto w-full">
          <Marquee />
        </div>
      </div>

      {/* ─── DESKTOP LAYOUT (unchanged) ─── */}
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onLeave}
        className="relative hidden sticky top-0 sm:flex w-full h-screen bg-[#080808] overflow-hidden text-white"
        style={{ fontFamily: "var(--font-bebas)" }}
      >
        {/* Photo */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ x: imgX, y: imgY, scale: 1.06 }}
        >
          <img
            src="/Udesh.png"
            alt="Udesh Bhatti"
            className="w-full h-full object-cover object-top"
            style={{
              filter: "brightness(0.85) contrast(1.05)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 70%, transparent 95%)",
              maskImage:
                "linear-gradient(to bottom, black 0%, black 70%, transparent 95%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/70" />
        </motion.div>

        {/* Navbar */}
        <Navbar />

        {/* Desktop name */}
        <div
          className="absolute inset-x-0 z-10 w-full items-center px-2 grid"
          style={{
            top: "50%",
            transform: "translateY(-52%)",
            gridTemplateColumns: "1fr 1fr 1fr",
          }}
        >
          <div className="flex justify-start pl-2 md:pl-3">
            <SplitReveal
              text="Udesh"
              delay={0.4}
              className="font-black text-white"
              style={{
                fontSize: "clamp(60px, 15.5vw, 240px)",
                letterSpacing: "0.02em",
                lineHeight: 0.88,
              }}
            />
          </div>

          <div />

          <div className="flex justify-end pr-2 md:pr-3">
            <SplitReveal
              text="Bhatti"
              delay={0.58}
              className="font-black text-white"
              style={{
                fontSize: "clamp(60px, 15.5vw, 240px)",
                letterSpacing: "0.02em",
                lineHeight: 0.88,
              }}
            />
          </div>
        </div>

        {/* Bottom left */}
        <div className="absolute bottom-12 left-10 md:left-14 z-20 max-w-sm">
          <div className="h-5 overflow-hidden mb-1">
            <AnimatePresence mode="wait">
              <motion.p
                key={tagIdx}
                className="text-[10px] tracking-[0.45em] uppercase text-white/50"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
              >
                {tags[tagIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p className="text-sm text-white/55 leading-relaxed">
            I don't just write code —<br />
            <span className="text-white/80 font-medium">
              I craft experiences that are fast,
              <br />
              scalable &amp; impossible to ignore.
            </span>
          </motion.p>

          <motion.button className="mt-6 flex items-center gap-3 border border-white/30 px-5 py-3 text-[11px] tracking-[0.35em] uppercase text-white/70 hover:bg-white hover:text-black transition-colors">
            View My Work ↗
          </motion.button>
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute right-6 md:right-10 bottom-14 z-20 flex flex-col items-center gap-2">
          <span className="text-[9px] tracking-[0.4em] uppercase text-white/25">
            Scroll
          </span>
          <div className="w-px h-14 bg-white/10" />
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full z-20">
  <Marquee />
</div>
      </div>
      
    </>
  );
}
