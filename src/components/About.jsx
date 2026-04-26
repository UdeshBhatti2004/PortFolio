import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
  animate,
} from "framer-motion";

/* ── Animated counter ── */
function Counter({ to, suffix = "", inView }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration: 1.8, ease: "easeOut" });
    const unsub = count.on("change", (v) => setDisplay(String(Math.round(v))));
    return () => { controls.stop(); unsub(); };
  }, [inView]);

  return <>{display}{suffix}</>;
}

/* ── Fade up ── */
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: 36, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 36, opacity: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Line reveal ── */
function LineReveal({ delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div
      ref={ref}
      className="h-px bg-white/10 w-full"
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
      style={{ originX: 0 }}
      transition={{ duration: 1.1, delay, ease: [0.76, 0, 0.24, 1] }}
    />
  );
}

/* ── Headline line ── */
function HeadlineLine({ text, delay, dim = false, revealed }) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "105%" }}
        animate={revealed ? { y: "0%" } : { y: "105%" }}
        transition={{ duration: 1.05, delay, ease: [0.76, 0, 0.24, 1] }}
        style={{ color: dim ? "rgba(255,255,255,0.18)" : "white" }}
      >
        {text}
      </motion.div>
    </div>
  );
}

/* ── Magnetic button ── */
function MagneticBtn({ href, children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  };
  const onLeave = () => {
    animate(x, 0, { duration: 0.5 });
    animate(y, 0, { duration: 0.5 });
  };
  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-flex items-center gap-2 text-[10px] tracking-[0.35em] uppercase text-white/60 border border-white/20 px-5 py-3 hover:bg-white hover:text-black transition-colors duration-300"
    >
      {children}
    </motion.a>
  );
}

const tags = [
  "BCA Graduate", "MERN Stack", "Self-Taught",
  "Design-Obsessed", "Rajkot → Anywhere", "Available For Hire",
];

const experience = [
  {
    role: "Frontend Developer Intern",
    company: "Dreamspot IT Academy",
    period: "Nov – Dec 2024",
    detail: "React · Tailwind · Component Systems",
  },
  {
    role: "Frontend Developer Intern",
    company: "Rao Information Technology",
    period: "Mar – Apr 2024",
    detail: "HTML · CSS · UI Bug Fixing · GitHub",
  },
];

const stats = [
  { to: 2,  suffix: "",   label: "Internships" },
  { to: 4,  suffix: "+",  label: "Projects Shipped" },
  { to: 1,  suffix: "st", label: "Hackathon Win" },
];

export default function About() {
  const sectionRef = useRef(null);
  const tagsRef = useRef(null);
  const tagsInView = useInView(tagsRef, { once: true, amount: 0.1 });

  /* ── Cinematic reveal: triggers when section enters viewport ── */
  const isRevealed = useInView(sectionRef, { once: true, amount: 0.08 });

  /* ── Parallax on the watermark text ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
const watermarkY = useTransform(scrollYProgress, [0, 1], ["-60%", "60%"]);
const contentY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative mt-[100vh]  z-20  w-full bg-[#080808] text-white min-h-[140vh]"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <motion.div
        className="absolute inset-0 z-50 bg-[#080808] origin-top pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={isRevealed ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
        style={{ transformOrigin: "top" }}
      />

      {/* ── Thin accent line that shoots across first ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-[60] h-[2px] bg-white/30"
        initial={{ scaleX: 0 }}
        animate={isRevealed ? { scaleX: 1 } : { scaleX: 0 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.0 }}
      />

      {/* ── Section top border ── */}
    

      {/* ── Parallax watermark ── */}
      <motion.div
        className="absolute top-14 left-0 w-full overflow-hidden pointer-events-none select-none"
        style={{ y: watermarkY }}
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(100px, 22vw, 280px)",
            color: "rgba(255,255,255,0.022)",
            letterSpacing: "0.05em",
            lineHeight: 0.9,
            whiteSpace: "nowrap",
            display: "block",
            paddingLeft: "1vw",
          }}
        >
          ABOUT
        </span>
      </motion.div>

      {/* ── Floating dots ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/[0.06]"
            style={{ top: `${15 + i * 13}%`, right: `${6 + (i % 3) * 4}%` }}
            animate={{ opacity: [0.06, 0.2, 0.06] }}
            transition={{ duration: 3 + i * 0.6, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* ════════════════════════════════════════
          CONTENT — scales up from 96% as
          curtain lifts
      ════════════════════════════════════════ */}
      <motion.div
  style={{ y: contentY }}
  className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 md:px-16 py-24 sm:py-32"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={isRevealed ? { scale: 1, opacity: 1 } : { scale: 0.96, opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
      >

        {/* ── Section label ── */}
        <motion.div
          className="flex items-center gap-4 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="text-[10px] tracking-[0.45em] uppercase text-white/25">01</span>
          <motion.div
            className="h-px bg-white/15"
            initial={{ width: 0 }}
            animate={isRevealed ? { width: 32 } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.76, 0, 0.24, 1] }}
          />
          <span className="text-[10px] tracking-[0.45em] uppercase text-white/25">Who I Am</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* ══ LEFT ══ */}
          <div>
            {/* Headline — triggered by isRevealed, not scroll */}
            <div
              className="leading-none mb-8"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(52px, 9.5vw, 116px)",
                letterSpacing: "0.02em",
              }}
            >
              <HeadlineLine text="Not just"   delay={0.55} revealed={isRevealed} />
              <HeadlineLine text="a student." delay={0.68} revealed={isRevealed} dim />
              <HeadlineLine text="A builder." delay={0.81} revealed={isRevealed} />
            </div>

            <LineReveal delay={0.3} />

            {/* Para 1 */}
            <FadeUp delay={0.32}>
              <p className="mt-7 text-white/50 text-sm sm:text-[15px] leading-[1.9] max-w-[440px]">
                I'm{" "}
                <span className="text-white/80 font-medium">Udesh Bhatti</span>
                {" "}— a BCA graduate from Rajkot. I didn't wait for a syllabus
                to tell me what to build. While college was still covering
                the basics, I was deep into the MERN stack — shipping real
                apps, completing internships, and teaching myself everything
                from JWT auth to Redis caching and AI integrations.
              </p>
            </FadeUp>

            {/* Para 2 */}
            <FadeUp delay={0.40}>
              <p className="mt-5 text-white/30 text-sm sm:text-[15px] leading-[1.9] max-w-[440px]">
                I obsess over the details others skip — the micro-interaction
                that makes a UI feel alive, the API response time that nobody
                notices until it's slow, the loading state that turns
                frustration into patience. That's not something they grade
                you on. It's just who I am.
              </p>
            </FadeUp>

            {/* CTAs */}
            <FadeUp delay={0.48}>
              <div className="mt-10 flex items-center gap-5 flex-wrap">
                <MagneticBtn href="https://github.com/UdeshBhatti2004">
                  GitHub ↗
                </MagneticBtn>
                <motion.a
                  href="https://www.linkedin.com/in/udesh-bhatti-3508192aa/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] tracking-[0.35em] uppercase text-white/35 hover:text-white/70 transition-colors duration-300"
                  whileHover={{ x: 3 }}
                >
                  LinkedIn ↗
                </motion.a>
              </div>
            </FadeUp>
          </div>

          {/* ══ RIGHT ══ */}
          <div className="flex flex-col gap-10">

            {/* ── Stats ── */}
            <div className="grid grid-cols-3 divide-x divide-white/[0.07]">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  className="px-5 sm:px-7 py-3 flex flex-col gap-2"
                  initial={{ opacity: 0, y: 24 }}
                  animate={isRevealed ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.7 + i * 0.1,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                >
                  <p
                    className="text-white leading-none tabular-nums"
                    style={{
                      fontFamily: "var(--font-bebas)",
                      fontSize: "clamp(42px, 6vw, 72px)",
                      letterSpacing: "0.01em",
                    }}
                  >
                    <Counter to={s.to} suffix={s.suffix} inView={isRevealed} />
                  </p>
                  <p className="text-[10px] tracking-[0.32em] uppercase text-white/25 leading-snug">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <LineReveal delay={0.2} />

            {/* ── Experience ── */}
            <div>
              <FadeUp delay={0.15}>
                <p className="text-[10px] tracking-[0.4em] uppercase text-white/20 mb-5">
                  Experience
                </p>
              </FadeUp>

              <div className="relative pl-4">
                <div className="absolute left-0 top-2 bottom-2 w-px bg-white/[0.07]" />

                {experience.map((exp, i) => (
                  <FadeUp key={i} delay={0.2 + i * 0.1}>
                    <motion.div
                      className="relative mb-6 last:mb-0 pl-5"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="absolute left-[-5px] top-[7px] w-[5px] h-[5px] rounded-full bg-white/20"
                        whileHover={{ scale: 2, backgroundColor: "rgba(255,255,255,0.6)" }}
                        transition={{ duration: 0.2 }}
                      />
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-white/75 text-sm font-medium leading-snug">
                            {exp.role}
                          </p>
                          <p className="text-white/35 text-xs mt-0.5">{exp.company}</p>
                          <p className="text-white/20 text-[10px] tracking-widest mt-1 uppercase">
                            {exp.detail}
                          </p>
                        </div>
                        <span className="text-[10px] tracking-[0.2em] text-white/20 whitespace-nowrap mt-0.5 flex-shrink-0">
                          {exp.period}
                        </span>
                      </div>
                    </motion.div>
                  </FadeUp>
                ))}
              </div>

              {/* Hackathon badge */}
              <FadeUp delay={0.4}>
                <motion.div
                  className="mt-6 flex items-center gap-3 border border-white/[0.08] px-4 py-3 relative overflow-hidden"
                  whileHover={{ borderColor: "rgba(255,255,255,0.22)" }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/[0.03]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.55 }}
                  />
                  <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase whitespace-nowrap relative z-10">
                    Achievement
                  </span>
                  <span className="w-px h-3 bg-white/10 flex-shrink-0" />
                  <span className="text-white/55 text-[11px] leading-snug relative z-10">
                    Runner-up — Ignite 2025 Hackathon
                    <span className="text-white/22"> · Charusat University, Anand</span>
                  </span>
                </motion.div>
              </FadeUp>
            </div>

            <LineReveal delay={0.35} />

            {/* ── Tags ── */}
            <motion.div ref={tagsRef} className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={tagsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.76, 0, 0.24, 1] }}
                  whileHover={{ borderColor: "rgba(255,255,255,0.28)", color: "rgba(255,255,255,0.65)" }}
                  className="text-[10px] tracking-[0.3em] uppercase text-white/28 border border-white/[0.08] px-3 py-1.5 cursor-default transition-colors duration-300"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

          </div>
        </div>
      </motion.div>

      <div className="w-full h-px bg-white/[0.07]" />
    </section>
  );
}