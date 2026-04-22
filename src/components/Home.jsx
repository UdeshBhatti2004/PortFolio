import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";

/* ─── Letter-by-letter reveal ─── */
function SplitReveal({ text, delay = 0, className = "", style = {} }) {
  return (
    <span className={`inline-flex ${className}`} style={style} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ lineHeight: 0.88 }}>
          <motion.span
            className="inline-block"
            initial={{ y: "115%", skewY: 3 }}
            animate={{ y: "0%", skewY: 0 }}
            transition={{ duration: 1.05, delay: delay + i * 0.06, ease: [0.76, 0, 0.24, 1] }}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        </span>
      ))}
    </span>
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
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      className="relative w-full h-screen bg-[#080808] overflow-hidden text-white"
      style={{ fontFamily: "'Bebas Neue', sans-serif", cursor: "none" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes marq { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .marq { animation: marq 20s linear infinite; }

        @keyframes scanpan { 0%{background-position:0 0} 100%{background-position:0 200px} }
        .scan {
          background: repeating-linear-gradient(
            to bottom, transparent 0, transparent 2px,
            rgba(255,255,255,0.018) 2px, rgba(255,255,255,0.018) 4px
          );
          animation: scanpan 6s linear infinite;
        }

        /* Make sure html/body don't create extra scroll */
        html, body { overflow: hidden; }
      `}</style>

      {/* ── PHOTO ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ x: imgX, y: imgY, scale: 1.06 }}
      >
        <img
          src="/Udesh.png"
          alt="Udesh Bhatti"
          className="w-full h-full object-cover object-top"
          style={{ filter: "brightness(0.5) contrast(1.08)" }}
        />
        <div className="scan absolute inset-0 pointer-events-none opacity-50" />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 38%, transparent 28%, rgba(8,8,8,0.8) 100%)" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, #080808 0%, rgba(8,8,8,0.35) 30%, transparent 65%)" }} />
        {/* stronger left/right fade on mobile so text stays readable */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(8,8,8,0.85) 0%, transparent 30%, transparent 70%, rgba(8,8,8,0.85) 100%)" }} />
      </motion.div>

      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ══════════════════════════════════════════
          NAME ROW  —  Udesh  |  face  |  Bhatti
          • Mobile  (<640px) : stacked, centered, smaller font
          • Tablet  (640-1024): side by side, 18vw
          • Desktop (>1024px) : 3-col grid, 15.5vw
      ══════════════════════════════════════════ */}

      {/* ── MOBILE: stacked name ── */}
      <div
        className="flex sm:hidden absolute inset-x-0 z-10 flex-col items-center justify-center gap-0"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        <SplitReveal
          text="Udesh"
          delay={0.4}
          className="font-black text-white"
          style={{ fontSize: "clamp(64px, 22vw, 120px)", letterSpacing: "-0.02em", lineHeight: 0.88 }}
        />
        <SplitReveal
          text="Bhatti"
          delay={0.58}
          className="font-black text-white"
          style={{ fontSize: "clamp(64px, 22vw, 120px)", letterSpacing: "-0.02em", lineHeight: 0.88 }}
        />
      </div>

      {/* ── TABLET + DESKTOP: side by side ── */}
      <div
        className="hidden sm:grid absolute inset-x-0 z-10 w-full items-center px-2"
        style={{
          top: "50%",
          transform: "translateY(-52%)",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        {/* LEFT — UDESH */}
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

        {/* CENTER — face shows through */}
        <div />

        {/* RIGHT — BHATTI */}
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

      {/* ── BOTTOM LEFT ── */}
      <div className="absolute bottom-10 left-5 sm:left-10 md:left-14 z-20 max-w-[280px] sm:max-w-sm">

        {/* rotating punchy line */}
        <div className="h-5 overflow-hidden mb-1">
          <AnimatePresence mode="wait">
            <motion.p
              key={tagIdx}
              className="text-[9px] sm:text-[10px] tracking-[0.4em] sm:tracking-[0.45em] uppercase text-white/50"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              {tags[tagIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          className="text-xs sm:text-sm text-white/55 leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          I don't just write code —<br />
          <span className="text-white/80 font-medium">
            I craft experiences that are fast,
            <br />scalable &amp; impossible to ignore.
          </span>
        </motion.p>

        <motion.button
          className="mt-4 sm:mt-6 flex items-center gap-2 sm:gap-3 border border-white/30 px-4 sm:px-5 py-2.5 sm:py-3 text-[10px] sm:text-[11px] tracking-[0.3em] sm:tracking-[0.35em] uppercase text-white/70 hover:bg-white hover:text-black transition-all duration-300"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          View My Work <span>↗</span>
        </motion.button>
      </div>

      {/* ── SCROLL — hidden on small screens ── */}
      <motion.div
        className="hidden sm:flex absolute right-6 md:right-10 bottom-10 sm:bottom-14 z-20 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span
          className="text-[9px] tracking-[0.4em] uppercase text-white/25"
          style={{ fontFamily: "'DM Sans', sans-serif", writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <div className="relative w-px h-12 sm:h-14 bg-white/10 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-white/60"
            animate={{ height: ["0%", "100%", "0%"], top: ["0%", "0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* ── MARQUEE ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-30 border-t border-white/[0.07] py-2 sm:py-2.5 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <div className="flex whitespace-nowrap marq">
          {Array(2)
            .fill([
              "FULL STACK DEVELOPER", "✦",
              "REACT · NODE · NEXT.JS", "✦",
              "SCALABLE ARCHITECTURE", "✦",
              "PIXEL-PERFECT UIs", "✦",
              "TURNING IDEAS INTO PRODUCTS", "✦",
              "AVAILABLE FOR HIRE", "✦",
            ])
            .flat()
            .map((t, i) => (
              <span
                key={i}
                className="mx-4 sm:mx-6 text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.35em] uppercase text-white/20"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {t}
              </span>
            ))}
        </div>
      </motion.div>
    </div>
  );
}