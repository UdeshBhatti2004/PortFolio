import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function FadeUp({ children, delay = 0, className = "",startAnimation }) {

 

  return (
    <motion.div  className={className}
      initial={{ y: 28, opacity: 0 }}
      animate={startAnimation ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.76, 0, 0.24, 1] }}
    >{children}</motion.div>
  );
}

function LineReveal({ delay = 0 ,startAnimation}) {
  return (
    <motion.div className="h-px bg-white/[0.07] w-full"
      initial={{ scaleX: 0 }} style={{ originX: 0 }}
      animate={startAnimation ? { scaleX: 1 } : {}}
      transition={{ duration: 1.0, delay, ease: [0.76, 0, 0.24, 1] }}
    />
  );
}

const skillGroups = [
  {
    id: "frontend", label: "Frontend", code: "01", description: "What the world sees",
    skills: [
      { name: "React JS",     note: "Hooks · Context · RTK Query" },
      { name: "JavaScript",   note: "ES6+ · Async · DOM" },
      { name: "HTML",         note: "Semantic & Accessible" },
      { name: "CSS",          note: "Animations · Layouts" },
      { name: "Tailwind CSS", note: "Utility-first UI" },
    ],
  },
  {
    id: "backend", label: "Backend", code: "02", description: "What keeps it running",
    skills: [
      { name: "Node.js",    note: "Server runtime" },
      { name: "Express.js", note: "REST APIs · Middleware" },
      { name: "JWT",        note: "Auth flows" },
      { name: "Redis",      note: "Cache · Queue" },
      { name: "Nodemailer", note: "Email pipelines" },
    ],
  },
  {
    id: "database", label: "Database", code: "03", description: "Where data lives",
    skills: [
      { name: "MongoDB",  note: "NoSQL · Aggregations" },
      { name: "Mongoose", note: "Schema · Validation" },
    ],
  },
  {
    id: "tools", label: "Tools & APIs", code: "04", description: "The ecosystem",
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

function SkillChip({ skill, delay = 0,startAnimation }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
        animate={startAnimation ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.45, delay }}
      className="relative cursor-default"
      style={{ display: "inline-flex" }}
    >
      {/* Accent Line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/50"
        animate={{
          scaleY: hovered ? 1 : 0,
          opacity: hovered ? 1 : 0,
        }}
        style={{ originY: 0.5 }}
        transition={{ duration: 0.2 }}
      />

      {/* Box */}
      <motion.div
        className="flex flex-col border px-4 py-1.5 relative overflow-hidden"
        animate={{
          borderColor: hovered
            ? "rgba(255,255,255,0.28)"
            : "rgba(255,255,255,0.1)",
          backgroundColor: hovered
            ? "rgba(255,255,255,0.04)"
            : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Top Row */}
        <div className="flex items-center gap-2.5">
          <motion.div
            className="w-1 h-1 rounded-full"
            animate={{
              scale: hovered ? 1.8 : 1,
              backgroundColor: hovered
                ? "rgba(255,255,255,0.8)"
                : "rgba(255,255,255,0.25)",
            }}
            transition={{ duration: 0.2 }}
          />

          <span
            className="text-[11px] sm:text-[12px] 2xl:text-[15px] tracking-[0.18em] uppercase"
            style={{
              fontFamily: "var(--font-outfit)",
              fontWeight: 500,
              color: hovered
                ? "rgba(255,255,255,0.9)"
                : "rgba(255,255,255,0.55)",
            }}
          >
            {skill.name}
          </span>
        </div>

        {/* EXPAND INSIDE */}
<motion.div
  initial={false}
  animate={
    hovered
      ? { opacity: 1, y: 0, height: "auto", marginTop: 4 }
      : { opacity: 0, y: -6, height: 0, marginTop: 0 }
  }
  transition={{ duration: 0.2 }}
  className="overflow-hidden"
>

  <span
    className="text-[10px] 2xl:text-[13px] text-white/30 tracking-wide block"
    style={{ fontFamily: "var(--font-outfit)" }}
  >
    {skill.note}
  </span>
</motion.div>
      </motion.div>
    </motion.div>
  );
}

function SkillGroup({ group, index, startAnimation }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={startAnimation ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.76, 0, 0.24, 1] }}
      className="py-7 sm:py-9 border-b border-white/[0.06]"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10 lg:gap-16">
        <div className="flex sm:flex-col gap-3 sm:gap-2 items-center sm:items-start flex-shrink-0 sm:w-36 sm:pt-1">
          <div className="flex items-center gap-2">
            <span className="text-[9px] 2xl:text-[12px] tracking-[0.45em] uppercase text-white/20"
              style={{ fontFamily: "var(--font-outfit)" }}>{group.code}</span>
            <span className="w-3 h-px bg-white/[0.14]" />
          </div>
          <span className="text-white/65 text-sm 2xl:text-lg font-medium tracking-wide"
            style={{ fontFamily: "var(--font-outfit)" }}>{group.label}</span>
          <span className="hidden sm:block text-[10px] 2xl:text-[13px] text-white/20 leading-relaxed"
            style={{ fontFamily: "var(--font-outfit)" }}>{group.description}</span>
        </div>

<div className="flex flex-wrap items-start gap-2 sm:gap-2.5 flex-1">
          {group.skills.map((skill, si) => (
            <SkillChip
              key={skill.name}
              skill={skill}
              delay={index * 0.06 + si * 0.05}
              startAnimation={startAnimation}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills({startAnimation}) {
  const isRevealed = startAnimation;
  const totalSkills = skillGroups.reduce((a, g) => a + g.skills.length, 0);

  return (
    <section
      id="skills"
      className="relative w-full bg-[#080808] text-white overflow-hidden"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      {/* Top rule — fades in */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-10 h-[1px]"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.06) 100%)",
        }}
        initial={{ opacity: 0 }}
        animate={startAnimation ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
      />

      <div className="w-full h-px bg-white/[0.06]" />

      {/* Watermark */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <span style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(100px, 22vw, 300px)",
          color: "rgba(255,255,255,0.016)",
          letterSpacing: "0.05em",
          lineHeight: 0.9,
          whiteSpace: "nowrap",
          display: "block",
          paddingLeft: "1vw",
          paddingTop: "4vw",
        }}>SKILLS</span>
      </div>

      <motion.div
        className="relative z-10 w-full px-5 sm:px-10 md:px-16 pt-24 sm:pt-32 pb-16 sm:pb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={startAnimation ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div>
            <motion.div
              className="flex items-center gap-4 mb-5"
              initial={{ opacity: 0, y: 16 }}
              animate={startAnimation ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <span className="text-[10px] tracking-[0.45em] uppercase text-white/25">03</span>
              <motion.div className="h-px bg-white/15"
                initial={{ width: 0 }}
                animate={startAnimation ? { width: 28 } : { width: 0 }}
                transition={{ duration: 0.7, delay: 0.65 }}
              />
              <span className="text-[10px] tracking-[0.45em] uppercase text-white/25">Stack</span>
            </motion.div>

            <div style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(44px, 9vw, 150px)",
              letterSpacing: "0.02em",
              lineHeight: 0.9,
            }}>
              {["What I", "Work With."].map((line, li) => (
                <div key={li} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "105%" }}
                    animate={startAnimation ? { y: "0%" } : {}}
                    transition={{ duration: 1.0, delay: 0.55 + li * 0.13, ease: [0.76, 0, 0.24, 1] }}
                    style={{ color: li === 1 ? "rgba(255,255,255,0.18)" : "white" }}
                  >{line}</motion.div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className="flex items-end gap-8 sm:gap-10"
            initial={{ opacity: 0, y: 16 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {[
              { val: `${totalSkills}+`, label: "Technologies" },
              { val: `${skillGroups.length}`,  label: "Categories" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span style={{
                  fontFamily: "var(--font-bebas)",
                  fontSize: "clamp(34px, 5vw, 88px)",
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                  color: "white",
                }}>{s.val}</span>
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/25">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <LineReveal delay={0.3} startAnimation={startAnimation} />

        <FadeUp delay={0.4} startAnimation={startAnimation}>
          <p className="text-[10px] 2xl:text-[13px] tracking-[0.35em] uppercase text-white/20 mt-5 mb-2"
            style={{ fontFamily: "var(--font-outfit)" }}>
            ↳ hover any skill to expand
          </p>
        </FadeUp>

        <div className="mt-4">
          {skillGroups.map((group, i) => (
            <SkillGroup key={group.id} group={group} index={i} startAnimation={startAnimation} />
          ))}
        </div>

        <FadeUp delay={0.2} className="mt-12 sm:mt-14" startAnimation={startAnimation}>
          <div className="flex items-center justify-between flex-wrap gap-3 mt-5">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-white/35"
                animate={{ scale: [1, 1.55, 1], opacity: [0.35, 0.75, 0.35] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[10px] 2xl:text-[13px] tracking-[0.32em] uppercase text-white/25">
                Always learning — currently exploring TypeScript & Next JS
              </span>
            </div>
            <span className="text-[10px] 2xl:text-[13px] tracking-[0.3em] uppercase text-white/15"
              style={{ fontFamily: "var(--font-outfit)" }}>
              v2026.04
            </span>
          </div>
        </FadeUp>
      </motion.div>
    </section>
  );
}
