import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div ref={ref} className={className}
      initial={{ y: 32, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.76, 0, 0.24, 1] }}
    >{children}</motion.div>
  );
}

function LineReveal({ delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div ref={ref} className="h-px bg-white/10 w-full"
      initial={{ scaleX: 0 }} style={{ originX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration: 1.0, delay, ease: [0.76, 0, 0.24, 1] }}
    />
  );
}

const skillGroups = [
  {
    id: "frontend",
    label: "Frontend",
    code: "01",
    description: "What the world sees",
    skills: [
      { name: "React JS",     note: "Hooks · Context · RTK Query" },
      { name: "JavaScript",   note: "ES6+ · Async · DOM" },
      { name: "HTML",         note: "Semantic & Accessible" },
      { name: "CSS",          note: "Animations · Layouts" },
      { name: "Tailwind CSS", note: "Utility-first UI" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    code: "02",
    description: "What keeps it running",
    skills: [
      { name: "Node.js",    note: "Server runtime" },
      { name: "Express.js", note: "REST APIs · Middleware" },
      { name: "JWT",        note: "Auth flows" },
      { name: "Redis",      note: "Cache · Queue" },
      { name: "Nodemailer", note: "Email pipelines" },
    ],
  },
  {
    id: "database",
    label: "Database",
    code: "03",
    description: "Where data lives",
    skills: [
      { name: "MongoDB",  note: "NoSQL · Aggregations" },
      { name: "Mongoose", note: "Schema · Validation" },
    ],
  },
  {
    id: "tools",
    label: "Tools & APIs",
    code: "04",
    description: "The ecosystem",
    skills: [
      { name: "Git",           note: "Version control" },
      { name: "GitHub",        note: "Repos · Collaboration" },
      { name: "Postman",       note: "API testing" },
      { name: "Google Gemini", note: "AI integration" },
      { name: "Stream SDK",    note: "Realtime chat & video" },
      { name: "Recharts",      note: "Data visualisation" },
    ],
  },
];

function SkillChip({ skill, delay = 0 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleClick = () => setIsExpanded(prev => !prev);
  return (
    <motion.div
      onClick={handleClick}
      onPointerEnter={() => setIsExpanded(true)}
      onPointerLeave={() => setIsExpanded(false)}
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay, ease: [0.76, 0, 0.24, 1] }}
      className="relative cursor-default"
      style={{ display: "inline-flex" }}
    >
      <motion.div
        className="flex flex-col border px-4 py-2.5 relative overflow-hidden"
        animate={{
          borderColor: isExpanded ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
          backgroundColor: isExpanded ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.22 }}
      >
        <div className="flex items-center gap-2.5">
          <motion.div
            className="w-1 h-1 rounded-full flex-shrink-0"
            animate={{
              scale: isExpanded ? 1.8 : 1,
              backgroundColor: isExpanded ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.25)",
            }}
            transition={{ duration: 0.22 }}
          />
          <span
            className="text-[11px] sm:text-[12px] tracking-[0.18em] uppercase whitespace-nowrap transition-colors duration-200"
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 500,
              color: isExpanded ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)",
            }}
          >
            {skill.name}
          </span>
        </div>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={isExpanded
            ? { height: "auto", opacity: 1, marginTop: 6 }
            : { height: 0, opacity: 0, marginTop: 0 }}
          transition={{ duration: 0.25, ease: [0.76, 0, 0.24, 1] }}
          className="overflow-hidden"
        >
          <span
            className="text-[10px] text-white/30 tracking-wide whitespace-nowrap block"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {skill.note}
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/50"
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}

function SkillGroup({ group, index }) {
  const ref = useRef(null);
  return (
    <motion.div ref={ref} className="mt-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] tracking-[0.2em] text-white/40" style={{ fontFamily: "var(--font-outfit)" }}>
          {group.code}
        </span>
        <span className="text-[13px] tracking-[0.15em] uppercase text-white/70" style={{ fontFamily: "var(--font-outfit)" }}>
          {group.label}
        </span>
        <span className="text-[10px] tracking-[0.1em] text-white/20" style={{ fontFamily: "var(--font-outfit)" }}>
          — {group.description}
        </span>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {group.skills.map((skill, i) => (
          <SkillChip key={skill.name} skill={skill} delay={i * 0.04} />
        ))}
      </div>
    </motion.div>
  );
}

// Detect touch capability for adaptive hint
function useIsTouch() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(window.matchMedia("(hover: none)").matches || "ontouchstart" in window);
    };
    checkTouch();
    const mq = window.matchMedia("(hover: none)");
    const handler = () => checkTouch();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isTouch;
}

function Skills() {
  const isTouch = useIsTouch();
  const sectionRef = useRef(null);
  const isRevealed = useInView(sectionRef, { once: true, amount: 0.08 });
  const totalSkills = skillGroups.reduce((a, g) => a + g.skills.length, 0);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full bg-[#080808] text-white overflow-hidden"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      {/* Cinematic curtain */}
      <motion.div
        className="absolute inset-0 z-50 bg-[#080808] pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={isRevealed ? { scaleY: 0 } : { scaleY: 1 }}
        style={{ transformOrigin: "top" }}
        transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
      />
      <motion.div
        className="absolute top-0 left-0 right-0 z-[60] h-[2px] bg-white/30"
        initial={{ scaleX: 0 }}
        animate={isRevealed ? { scaleX: 1 } : { scaleX: 0 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      />

      <div className="w-full h-px bg-white/[0.07]" />

      {/* Watermark */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <span style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(100px, 22vw, 280px)",
          color: "rgba(255,255,255,0.018)",
          letterSpacing: "0.05em",
          lineHeight: 0.9,
          whiteSpace: "nowrap",
          display: "block",
          paddingLeft: "1vw",
        }}>SKILLS</span>
      </div>

      {/* Floating dots — same as About & Work */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/[0.06]"
            style={{ top: `${12 + i * 16}%`, right: `${5 + (i % 3) * 5}%` }}
            animate={{ opacity: [0.06, 0.18, 0.06] }}
            transition={{ duration: 3 + i * 0.7, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 md:px-16 pt-24 sm:pt-32 pb-16 sm:pb-24">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div>
            <motion.div
              className="flex items-center gap-4 mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="text-[10px] tracking-[0.45em] uppercase text-white/25">03</span>
              <motion.div className="h-px bg-white/15"
                initial={{ width: 0 }}
                animate={isRevealed ? { width: 32 } : { width: 0 }}
                transition={{ duration: 0.7, delay: 0.65 }}
              />
              <span className="text-[10px] tracking-[0.45em] uppercase text-white/25">Stack</span>
            </motion.div>

            <div style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(44px, 9vw, 110px)",
              letterSpacing: "0.02em",
              lineHeight: 0.9,
            }}>
              {["What I", "Work With."].map((line, li) => (
                <div key={li} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "105%" }}
                    animate={isRevealed ? { y: "0%" } : {}}
                    transition={{ duration: 1.0, delay: 0.55 + li * 0.13, ease: [0.76, 0, 0.24, 1] }}
                    style={{ color: li === 1 ? "rgba(255,255,255,0.22)" : "white" }}
                  >{line}</motion.div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className="flex items-end gap-8 sm:gap-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {[
              { val: `${totalSkills}+`, label: "Technologies" },
              { val: `${skillGroups.length}`, label: "Categories" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(34px, 5vw, 56px)",
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                  color: "white",
                }}>{s.val}</span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/25">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <LineReveal delay={0.3} />

        {/* Hint */}
        <FadeUp delay={0.4}>
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/20 mt-5 mb-2">
            ↳ {isTouch ? "tap" : "hover"} any skill to expand
          </p>
        </FadeUp>

        {/* Groups */}
        <div className="mt-4">
          {skillGroups.map((group, i) => (
            <SkillGroup key={group.id} group={group} index={i} />
          ))}
        </div>

        {/* Footer */}
        <FadeUp delay={0.2} className="mt-12 sm:mt-14">
          <LineReveal />
          <div className="flex items-center justify-between flex-wrap gap-3 mt-5">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-white/30"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[10px] tracking-[0.32em] uppercase text-white/25">
                Always learning — currently exploring TypeScript & Docker
              </span>
            </div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/15"
              style={{ fontFamily: "var(--font-outfit)" }}>
              v2025.04
            </span>
          </div>
        </FadeUp>

      </div>

      <div className="w-full h-px bg-white/[0.07]" />
    </section>
  );
}

