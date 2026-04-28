// import { useRef, useState, useEffect } from "react";
// import {
//   motion,
//   useInView,
//   useMotionValue,
//   useTransform,
//   animate,
//   AnimatePresence,
// } from "framer-motion";

// /* ── Cursor spotlight ── */
// function SpotlightCard({ children, className = "" }) {
//   const cardRef = useRef(null);
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const background = useTransform(
//     [mouseX, mouseY],
//     ([x, y]) =>
//       `radial-gradient(320px circle at ${x}px ${y}px, rgba(255,255,255,0.045), transparent 70%)`
//   );
//   const handleMouseMove = (e) => {
//     const rect = cardRef.current?.getBoundingClientRect();
//     if (!rect) return;
//     mouseX.set(e.clientX - rect.left);
//     mouseY.set(e.clientY - rect.top);
//   };
//   return (
//     <motion.div
//       ref={cardRef}
//       onMouseMove={handleMouseMove}
//       className={className}
//       style={{ background }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// const projects = [
//   {
//     index: "01",
//     title: "BuddyBell",
//     subtitle: "Chat & Video Call App",
//     description:
//       "Real-time chat and video calling with Stream SDK. JWT auth, friend management, RESTful APIs — built and deployed end-to-end as a solo MERN developer.",
//     tech: ["React JS", "Node.js", "Express", "MongoDB", "Stream SDK", "JWT"],
//     link: "https://buddybell.onrender.com/",
//     github: "https://github.com/UdeshBhatti2004",
//     year: "2024",
//     type: "Full Stack App",
//   },
//   {
//     index: "02",
//     title: "InvoicePro",
//     subtitle: "AI Invoicing Platform",
//     description:
//       "Full-stack invoicing SaaS with Google Gemini AI-generated content, Redis email automation, real-time analytics dashboards, PDF exports and role-based auth.",
//     tech: ["React", "RTK Query", "Node.js", "MongoDB", "Redis", "Gemini AI", "Recharts"],
//     link: "https://invoice-pro-delta.vercel.app/",
//     github: "https://github.com/UdeshBhatti2004",
//     year: "2024",
//     type: "SaaS Platform",
//   },
//   {
//     index: "03",
//     title: "React UI Kit",
//     subtitle: "Component Web App",
//     description:
//       "Dynamic responsive web application built with reusable React components. Focused on component architecture, Tailwind design systems and scalable UI patterns.",
//     tech: ["React JS", "Tailwind CSS"],
//     link: "#",
//     github: "https://github.com/UdeshBhatti2004",
//     year: "2024",
//     type: "Frontend",
//   },
//   {
//     index: "04",
//     title: "Web Templates",
//     subtitle: "HTML & CSS Collection",
//     description:
//       "Multiple responsive web templates with clean modern UI, cross-browser compatibility and pixel-perfect layouts built to production standards.",
//     tech: ["HTML", "CSS"],
//     link: "#",
//     github: "https://github.com/UdeshBhatti2004",
//     year: "2024",
//     type: "Frontend",
//   },
// ];

// /* ── Single expanded project row (after spread) ── */
// function ProjectRow({ project, i, totalSpread }) {
//   const [hovered, setHovered] = useState(false);
//   const isLive = project.link !== "#";

//   return (
//     <motion.div
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       className="relative group border-b border-white/[0.07] overflow-hidden"
//     >
//       <SpotlightCard className="relative">
//         {/* hover bg */}
//         <motion.div
//           className="absolute inset-0 bg-white/[0.025] pointer-events-none"
//           animate={{ opacity: hovered ? 1 : 0 }}
//           transition={{ duration: 0.3 }}
//         />

//         <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[80px_1fr_auto] items-stretch">
//           {/* Index */}
//           <div className="hidden lg:flex items-start justify-center pt-8 pb-8 border-r border-white/[0.07]">
//             <motion.span
//               className="text-[11px] tracking-[0.4em] uppercase"
//               animate={{ color: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)" }}
//               transition={{ duration: 0.3 }}
//               style={{ fontFamily: "var(--font-outfit)", writingMode: "vertical-rl" }}
//             >
//               {project.index}
//             </motion.span>
//           </div>

//           {/* Content */}
//           <div className="px-6 sm:px-10 py-8 flex flex-col gap-4">
//             <div className="flex items-center gap-3">
//               <span className="text-[9px] tracking-[0.4em] uppercase text-white/25" style={{ fontFamily: "var(--font-outfit)" }}>
//                 {project.type}
//               </span>
//               <span className="w-1 h-1 rounded-full bg-white/15" />
//               <span className="text-[9px] tracking-[0.4em] uppercase text-white/20" style={{ fontFamily: "var(--font-outfit)" }}>
//                 {project.year}
//               </span>
//             </div>

//             <div className="overflow-hidden">
//               <motion.h3
//                 className="leading-none"
//                 style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(36px, 5.5vw, 76px)", letterSpacing: "0.02em" }}
//                 animate={{ x: hovered ? 6 : 0 }}
//                 transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
//               >
//                 <span className="text-white">{project.title}</span>
//                 <span className="text-white/20 ml-3 text-[0.5em] tracking-wider" style={{ fontFamily: "var(--font-outfit)", fontWeight: 300 }}>
//                   {project.subtitle}
//                 </span>
//               </motion.h3>
//             </div>

//             <motion.p
//               className="text-white/40 text-sm leading-relaxed max-w-xl overflow-hidden"
//               style={{ fontFamily: "var(--font-outfit)" }}
//               animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
//               initial={{ height: 0, opacity: 0 }}
//               transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
//             >
//               {project.description}
//             </motion.p>

//             <motion.div className="flex flex-wrap gap-2" animate={{ opacity: hovered ? 1 : 0.4 }}>
//               {project.tech.map((t, ti) => (
//                 <motion.span
//                   key={ti}
//                   className="text-[9px] tracking-[0.28em] uppercase text-white/40 border border-white/[0.1] px-2.5 py-1"
//                   style={{ fontFamily: "var(--font-outfit)" }}
//                   animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 0 }}
//                   initial={{ opacity: 0.6 }}
//                   transition={{ duration: 0.3, delay: ti * 0.04 }}
//                 >
//                   {t}
//                 </motion.span>
//               ))}
//             </motion.div>
//           </div>

//           {/* Links */}
//           <div className="flex lg:flex-col items-center justify-end lg:justify-center gap-4 px-6 sm:px-8 py-6 lg:border-l border-white/[0.07]">
//             <motion.div
//               className="hidden lg:flex items-center justify-center w-12 h-12 border border-white/10 rounded-full"
//               animate={{ scale: hovered ? 1 : 0.85, opacity: hovered ? 1 : 0.3, borderColor: hovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)" }}
//               transition={{ duration: 0.3 }}
//             >
//               <motion.span className="text-white text-lg" animate={{ rotate: hovered ? -45 : 0 }} transition={{ duration: 0.3 }}>
//                 ↗
//               </motion.span>
//             </motion.div>
//             <div className="flex lg:flex-col gap-3 items-center">
//               {isLive && (
//                 <a href={project.link} target="_blank" rel="noreferrer"
//                   className="text-[9px] tracking-[0.35em] uppercase text-white/30 hover:text-white/70 transition-colors duration-300 whitespace-nowrap"
//                   style={{ fontFamily: "var(--font-outfit)" }}>
//                   Live ↗
//                 </a>
//               )}
//               <a href={project.github} target="_blank" rel="noreferrer"
//                 className="text-[9px] tracking-[0.35em] uppercase text-white/20 hover:text-white/50 transition-colors duration-300"
//                 style={{ fontFamily: "var(--font-outfit)" }}>
//                 Code ↗
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Bottom sweep */}
//         <motion.div
//           className="absolute bottom-0 left-0 h-[1px] bg-white/30"
//           animate={{ width: hovered ? "100%" : "0%" }}
//           transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
//         />
//       </SpotlightCard>
//     </motion.div>
//   );
// }

// /* ══════════════════════════════════════
//    MAIN COMPONENT
// ══════════════════════════════════════ */
// export default function Work() {
//   const sectionRef = useRef(null);
//   const isRevealed = useInView(sectionRef, { once: true, amount: 0.1 });

//   // phase: "idle" → "stacking" → "stacked" → "spreading" → "spread"
//   const [phase, setPhase] = useState("idle");
//   // how many cards have been dealt into the stack
//   const [dealtCount, setDealtCount] = useState(0);

//   useEffect(() => {
//     if (!isRevealed || phase !== "idle") return;

//     // Small delay after section reveal before dealing starts
//     const startDelay = setTimeout(() => {
//       setPhase("stacking");

//       // Deal cards one by one
//       let count = 0;
//       const dealInterval = setInterval(() => {
//         count += 1;
//         setDealtCount(count);
//         if (count >= projects.length) {
//           clearInterval(dealInterval);
//           setPhase("stacked");

//           // Pause on the full stack, then spread
//           setTimeout(() => {
//             setPhase("spreading");
//             setTimeout(() => setPhase("spread"), 900);
//           }, 700);
//         }
//       }, 380);

//       return () => clearInterval(dealInterval);
//     }, 600);

//     return () => clearTimeout(startDelay);
//   }, [isRevealed]);

//   const isSpread = phase === "spread";

//   return (
//     <section
//       id="work"
//       ref={sectionRef}
//       className="relative w-full bg-[#080808] text-white overflow-hidden"
//       style={{ fontFamily: "var(--font-outfit)" }}
//     >
//       {/* Cinematic curtain */}
//       <motion.div
//         className="absolute inset-0 z-50 bg-[#080808] pointer-events-none"
//         initial={{ scaleY: 1 }}
//         animate={isRevealed ? { scaleY: 0 } : { scaleY: 1 }}
//         style={{ transformOrigin: "top" }}
//         transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
//       />
//       <motion.div
//         className="absolute top-0 left-0 right-0 z-[60] h-[2px] bg-white/30"
//         initial={{ scaleX: 0 }}
//         animate={isRevealed ? { scaleX: 1 } : { scaleX: 0 }}
//         style={{ originX: 0 }}
//         transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
//       />

//       <div className="w-full h-px bg-white/[0.07]" />

//       {/* Watermark */}
//       <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none select-none" aria-hidden="true">
//         <span style={{
//           fontFamily: "var(--font-bebas)",
//           fontSize: "clamp(100px, 22vw, 280px)",
//           color: "rgba(255,255,255,0.018)",
//           letterSpacing: "0.05em",
//           lineHeight: 0.9,
//           whiteSpace: "nowrap",
//           display: "block",
//           paddingLeft: "1vw",
//         }}>
//           WORK
//         </span>
//       </div>

//       {/* Header */}
//       <motion.div
//         className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 md:px-16 pt-24 sm:pt-32 pb-10"
//         initial={{ opacity: 0 }}
//         animate={isRevealed ? { opacity: 1 } : {}}
//         transition={{ duration: 0.8, delay: 0.3 }}
//       >
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 sm:mb-20">
//           <div>
//             <motion.div
//               className="flex items-center gap-4 mb-5"
//               initial={{ opacity: 0, y: 20 }}
//               animate={isRevealed ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.8, delay: 0.5 }}
//             >
//               <span className="text-[10px] tracking-[0.45em] uppercase text-white/25">02</span>
//               <motion.div className="h-px bg-white/15"
//                 initial={{ width: 0 }}
//                 animate={isRevealed ? { width: 32 } : { width: 0 }}
//                 transition={{ duration: 0.7, delay: 0.65 }}
//               />
//               <span className="text-[10px] tracking-[0.45em] uppercase text-white/25">Selected Work</span>
//             </motion.div>

//             <div style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(48px, 9vw, 110px)", letterSpacing: "0.02em", lineHeight: 0.9 }}>
//               {["Things", "I've Built."].map((line, li) => (
//                 <div key={li} className="overflow-hidden">
//                   <motion.div
//                     initial={{ y: "105%" }}
//                     animate={isRevealed ? { y: "0%" } : {}}
//                     transition={{ duration: 1.0, delay: 0.55 + li * 0.12, ease: [0.76, 0, 0.24, 1] }}
//                     style={{ color: li === 1 ? "rgba(255,255,255,0.22)" : "white" }}
//                   >
//                     {line}
//                   </motion.div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <motion.p
//             className="text-white/30 text-sm leading-relaxed max-w-[260px] sm:text-right"
//             initial={{ opacity: 0, y: 20 }}
//             animate={isRevealed ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8, delay: 0.7 }}
//           >
//             Every project is deployed,<br />
//             real, and built to solve<br />
//             an actual problem.
//           </motion.p>
//         </div>
//       </motion.div>

//       {/* ══════════════════════════════
//           CARD STACK + SPREAD AREA
//       ══════════════════════════════ */}
//       <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 md:px-16">

//         {/* ── STACKING PHASE: cards pile up in center ── */}
//         <AnimatePresence>
//           {!isSpread && (phase === "stacking" || phase === "stacked" || phase === "spreading") && (
//             <motion.div
//               key="stack"
//               className="relative flex items-center justify-center"
//               style={{ height: 220 }}
//               exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.4 } }}
//             >
//               {projects.map((project, i) => {
//                 const isDealt = i < dealtCount;
//                 // stack offset: each card sits slightly above the previous
//                 const stackOffset = i * -6;
//                 const stackScale  = 1 - i * 0.03;
//                 // during spreading, fan them out before exit
//                 const spreadX = phase === "spreading"
//                   ? (i - 1.5) * 160
//                   : 0;
//                 const spreadRotate = phase === "spreading"
//                   ? (i - 1.5) * 5
//                   : i * 0.8;

//                 return (
//                   <motion.div
//                     key={project.index}
//                     className="absolute w-full max-w-2xl"
//                     initial={{ y: -280, opacity: 0, scale: 0.9, rotate: -2 }}
//                     animate={isDealt ? {
//                       y: stackOffset,
//                       x: spreadX,
//                       opacity: 1,
//                       scale: stackScale,
//                       rotate: spreadRotate,
//                     } : { y: -280, opacity: 0, scale: 0.9, rotate: -2 }}
//                     transition={{
//                       y: { duration: 0.45, ease: [0.34, 1.26, 0.64, 1] },
//                       x: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
//                       opacity: { duration: 0.3 },
//                       scale: { duration: 0.45 },
//                       rotate: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
//                     }}
//                     style={{ zIndex: projects.length - i }}
//                   >
//                     {/* Stacked card face */}
//                     <div
//                       className="w-full border border-white/[0.12] bg-[#0e0e0e] px-7 py-5 flex items-center justify-between"
//                       style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}
//                     >
//                       <div className="flex items-center gap-5">
//                         <span style={{ fontFamily: "var(--font-bebas)", fontSize: 13, letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)" }}>
//                           {project.index}
//                         </span>
//                         <span style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(22px, 4vw, 36px)", letterSpacing: "0.04em", color: "white" }}>
//                           {project.title}
//                         </span>
//                         <span style={{ fontFamily: "var(--font-outfit)", fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
//                           {project.type}
//                         </span>
//                       </div>
//                       <span style={{ fontFamily: "var(--font-outfit)", fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
//                         {project.year}
//                       </span>
//                     </div>
//                   </motion.div>
//                 );
//               })}

//               {/* "tap to reveal" hint — shows when fully stacked */}
//               <AnimatePresence>
//                 {phase === "stacked" && (
//                   <motion.div
//                     className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
//                     initial={{ opacity: 0, y: 8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.4 }}
//                   >
//                     <motion.div
//                       className="w-px h-6 bg-white/20"
//                       animate={{ scaleY: [0, 1, 0] }}
//                       transition={{ duration: 1.0, repeat: Infinity }}
//                     />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* ── SPREAD PHASE: full list rows ── */}
//         <AnimatePresence>
//           {isSpread && (
//             <motion.div
//               key="list"
//               className="border-t border-white/[0.07]"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
//             >
//               {projects.map((project, i) => (
//                 <motion.div
//                   key={project.index}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.6, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
//                 >
//                   <ProjectRow project={project} i={i} />
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Footer */}
//       <motion.div
//         className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 md:px-16 py-12"
//         initial={{ opacity: 0 }}
//         animate={isSpread ? { opacity: 1 } : { opacity: 0 }}
//         transition={{ duration: 0.6, delay: 0.5 }}
//       >
//         <div className="flex items-center justify-between">
//           <p className="text-[10px] tracking-[0.35em] uppercase text-white/15">More on GitHub</p>
//           <a
//             href="https://github.com/UdeshBhatti2004"
//             target="_blank"
//             rel="noreferrer"
//             className="text-[10px] tracking-[0.35em] uppercase text-white/25 hover:text-white/60 transition-colors duration-300"
//           >
//             github.com/UdeshBhatti2004 ↗
//           </a>
//         </div>
//       </motion.div>

//       <div className="w-full h-px bg-white/[0.07]" />
//     </section>
//   );
// }


import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  animate,
  AnimatePresence,
} from "framer-motion";
;
/* ── Cursor spotlight ── */
function SpotlightCard({ children, className = "" }) {
  return <motion.div className={className}>{children}</motion.div>;
}

const projects = [
  {
    index: "01",
    title: "BuddyBell",
    subtitle: "Chat & Video Call App",
    description:
      "Real-time chat and video calling with Stream SDK. JWT auth, friend management, RESTful APIs — built and deployed end-to-end as a solo MERN developer.",
    tech: ["React JS", "Node.js", "Express", "MongoDB", "Stream SDK", "JWT"],
    link: "https://buddybell.onrender.com/",
    github: "https://github.com/UdeshBhatti2004",
    year: "2024",
    type: "Full Stack App",
  },
  {
    index: "02",
    title: "InvoicePro",
    subtitle: "AI Invoicing Platform",
    description:
      "Full-stack invoicing SaaS with Google Gemini AI content, Redis email automation, real-time analytics dashboards, PDF exports and role-based auth.",
    tech: ["React", "RTK Query", "Node.js", "MongoDB", "Redis", "Gemini AI", "Recharts"],
    link: "https://invoice-pro-delta.vercel.app/",
    github: "https://github.com/UdeshBhatti2004",
    year: "2024",
    type: "SaaS Platform",
  },
  {
    index: "03",
    title: "React UI Kit",
    subtitle: "Component Web App",
    description:
      "Dynamic responsive web app built with reusable React components. Focused on component architecture, Tailwind design systems and scalable UI patterns.",
    tech: ["React JS", "Tailwind CSS"],
    link: "#",
    github: "https://github.com/UdeshBhatti2004",
    year: "2024",
    type: "Frontend",
  },
  {
    index: "04",
    title: "Web Templates",
    subtitle: "HTML & CSS Collection",
    description:
      "Multiple responsive web templates with clean modern UI, cross-browser compatibility and pixel-perfect layouts built to production standards.",
    tech: ["HTML", "CSS"],
    link: "#",
    github: "https://github.com/UdeshBhatti2004",
    year: "2024",
    type: "Frontend",
  },
];

/* ── Expanded project row ── */
function ProjectRow({ project, i }) {
  const [hovered, setHovered] = useState(false);
  const isLive = project.link !== "#";

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative border-b border-white/[0.07] overflow-hidden"
    >
      <SpotlightCard className="relative">
        <motion.div
          className="absolute inset-0 bg-white/[0.025] pointer-events-none"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[80px_1fr_auto] items-stretch">
          {/* Index col - desktop only */}
          <div className="hidden lg:flex items-start justify-center pt-8 pb-8 border-r border-white/[0.07]">
            <motion.span
              className="text-[11px] tracking-[0.4em] uppercase"
              animate={{ color: hovered ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)" }}
              transition={{ duration: 0.3 }}
              style={{ fontFamily: "var(--font-outfit)", writingMode: "vertical-rl" }}
            >
              {project.index}
            </motion.span>
          </div>

          {/* Content */}
          <div className="px-5 sm:px-10 py-6 sm:py-8 flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="lg:hidden text-[9px] tracking-[0.3em] uppercase text-white/20"
                style={{ fontFamily: "var(--font-outfit)" }}>{project.index}</span>
              <span className="text-[9px] tracking-[0.4em] uppercase text-white/25"
                style={{ fontFamily: "var(--font-outfit)" }}>{project.type}</span>
              <span className="w-1 h-1 rounded-full bg-white/15" />
              <span className="text-[9px] tracking-[0.4em] uppercase text-white/20"
                style={{ fontFamily: "var(--font-outfit)" }}>{project.year}</span>
            </div>

            <div className="overflow-hidden">
              <motion.h3
                className="leading-none"
                style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(32px, 5vw, 100px)", letterSpacing: "0.02em" }}
                animate={{ x: hovered ? 6 : 0 }}
                transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              >
                <span className="text-white">{project.title}</span>
                <span
                  className="hidden sm:inline text-white/20 ml-3 text-[0.5em] tracking-wider"
                  style={{ fontFamily: "var(--font-outfit)", fontWeight: 300 }}
                >
                  {project.subtitle}
                </span>
              </motion.h3>
            </div>

            <motion.p
              className="text-white/40 text-sm leading-relaxed max-w-xl overflow-hidden"
              style={{ fontFamily: "var(--font-outfit)" }}
              animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
              initial={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            >
              {project.description}
            </motion.p>

            <motion.div className="flex flex-wrap gap-2" animate={{ opacity: hovered ? 1 : 0.4 }}>
              {project.tech.map((t, ti) => (
                <motion.span
                  key={ti}
                  className="text-[9px] tracking-[0.28em] uppercase text-white/40 border border-white/[0.1] px-2.5 py-1"
                  style={{ fontFamily: "var(--font-outfit)" }}
                  animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0.6 }}
                  transition={{ duration: 0.3, delay: ti * 0.04 }}
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Links */}
          <div className="flex lg:flex-col items-center justify-end lg:justify-center gap-4 px-5 sm:px-8 py-4 lg:py-6 lg:border-l border-white/[0.07]">
            <motion.div
              className="hidden lg:flex items-center justify-center w-12 h-12 border border-white/10 rounded-full"
              animate={{ scale: hovered ? 1 : 0.85, opacity: hovered ? 1 : 0.3, borderColor: hovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.span className="text-white text-lg" animate={{ rotate: hovered ? -45 : 0 }} transition={{ duration: 0.3 }}>
                ↗
              </motion.span>
            </motion.div>
            <div className="flex lg:flex-col gap-3 items-center">
              {isLive && (
                <a href={project.link} target="_blank" rel="noreferrer"
                  className="text-[9px] tracking-[0.35em] uppercase text-white/30 hover:text-white/70 transition-colors duration-300 whitespace-nowrap"
                  style={{ fontFamily: "var(--font-outfit)" }}>
                  Live ↗
                </a>
              )}
              <a href={project.github} target="_blank" rel="noreferrer"
                className="text-[9px] tracking-[0.35em] uppercase text-white/20 hover:text-white/50 transition-colors duration-300"
                style={{ fontFamily: "var(--font-outfit)" }}>
                Code ↗
              </a>
            </div>
          </div>
        </div>

        {/* Bottom sweep */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1px] bg-white/30"
          animate={{ width: hovered ? "100%" : "0%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        />
      </SpotlightCard>
    </motion.div>
  );
}

/* ══ MAIN ══ */
export default function Work({onComplete}) {
  const sectionRef = useRef(null);
const isRevealed = useInView(sectionRef, { once: true, amount: 0.3 });

  // "idle" → "stacking" → "stacked" → "spreading" → "spread"
  const [phase, setPhase]       = useState("idle");
  const [dealtCount, setDealtCount] = useState(0);

  useEffect(() => {
    if (!isRevealed || phase !== "idle") return;
    const t = setTimeout(() => {
      setPhase("stacking");
      let count = 0;
      const iv = setInterval(() => {
        count++;
        setDealtCount(count);
        if (count >= projects.length) {
          clearInterval(iv);
          setPhase("stacked");
       setTimeout(() => {
  setPhase("spreading");

  setTimeout(() => {
    setPhase("spread");

    if (onComplete) onComplete(); 
  }, 900);

}, 700);
        }
      }, 400);
      return () => clearInterval(iv);
    }, 500);
    return () => clearTimeout(t);
  }, [isRevealed,phase]);

  const isSpread    = phase === "spread";
  const isSpreading = phase === "spreading";
  const showStack   = phase === "stacking" || phase === "stacked" || phase === "spreading";

  return (
    <section
      id="work"
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
        }}>WORK</span>
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 px-5 sm:px-10 md:px-16 pt-24 sm:pt-32 pb-10"
        initial={{ opacity: 0 }}
        animate={isRevealed ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div>
            <motion.div
              className="flex items-center gap-4 mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="text-[10px] tracking-[0.45em] uppercase text-white/25">02</span>
              <motion.div className="h-px bg-white/15"
                initial={{ width: 0 }}
                animate={isRevealed ? { width: 32 } : { width: 0 }}
                transition={{ duration: 0.7, delay: 0.65 }}
              />
              <span className="text-[10px] tracking-[0.45em] uppercase text-white/25">Selected Work</span>
            </motion.div>

            <div style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(44px, 9vw, 110px)", letterSpacing: "0.02em", lineHeight: 0.9 }}>
              {["Things", "I've Built."].map((line, li) => (
                <div key={li} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "105%" }}
                    animate={isRevealed ? { y: "0%" } : {}}
                    transition={{ duration: 1.0, delay: 0.55 + li * 0.12, ease: [0.76, 0, 0.24, 1] }}
                    style={{ color: li === 1 ? "rgba(255,255,255,0.22)" : "white" }}
                  >{line}</motion.div>
                </div>
              ))}
            </div>
          </div>

          <motion.p
            className="text-white/30 text-sm leading-relaxed max-w-[240px] sm:text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Every project is deployed,<br />
            real, and built to solve<br />
            an actual problem.
          </motion.p>
        </div>
      </motion.div>

      {/* ══════════════════════════════════
          STACK ANIMATION AREA
      ══════════════════════════════════ */}
      <div className="relative z-10 w-full px-5 sm:px-10 md:px-16 w-full">

        {/* STACKING / SPREADING */}
        <AnimatePresence>
          {showStack && (
            <motion.div
              key="stack-area"
              className="relative w-full"
              /* tall enough to hold stack + breathing room */
              style={{ minHeight: 180 }}
              exit={{
                opacity: 0,
                y: -24,
                transition: { duration: 0.35, ease: [0.76, 0, 0.24, 1] },
              }}
            >
              {projects.map((project, i) => {
                const isDealt = i < dealtCount;

                /* vertical stack offset — top card is highest */
                const stackY      = (projects.length - 1 - i) * 7;   // earlier cards sit lower
                const stackScaleX = 1 - (projects.length - 1 - i) * 0.025;

                /* spreading: fan vertically downward */
                const spreadY = isSpreading ? i * 88 : stackY;

                return (
                  <motion.div
                    key={project.index}
                    className="absolute left-0 right-0"
                    style={{ zIndex: i + 1 }}           /* last card on top */
                    initial={{ y: -260, opacity: 0, scaleX: 0.88 }}
                    animate={
                      isDealt
                        ? {
                            y: spreadY,
                            opacity: 1,
                            scaleX: isSpreading ? 1 : stackScaleX,
                            transition: {
                              y:       { duration: isSpreading ? 0.55 : 0.42, ease: isSpreading ? [0.76, 0, 0.24, 1] : [0.34, 1.2, 0.64, 1] },
                              scaleX:  { duration: 0.4 },
                              opacity: { duration: 0.28 },
                            },
                          }
                        : { y: -260, opacity: 0, scaleX: 0.88 }
                    }
                  >
                    {/* ── Card face ── */}
                    <div
                      className="w-full border border-white/[0.13] bg-[#0d0d0d] flex items-center justify-between gap-4 flex-wrap"
                      style={{
                        padding: "20px 28px",
                        boxShadow: "0 12px 48px rgba(0,0,0,0.7)",
                      }}
                    >
                      {/* left */}
                      <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                        <span style={{ fontFamily: "var(--font-bebas)", fontSize: 11, letterSpacing: "0.35em", color: "rgba(255,255,255,0.22)", textTransform: "uppercase" }}>
                          {project.index}
                        </span>
                        <span style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(26px, 5vw, 48px)", letterSpacing: "0.03em", color: "white" }}>
                          {project.title}
                        </span>
                        <span className="hidden sm:inline" style={{ fontFamily: "var(--font-outfit)", fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.28)", textTransform: "uppercase" }}>
                          {project.type}
                        </span>
                      </div>
                      {/* right */}
                      <span style={{ fontFamily: "var(--font-outfit)", fontSize: 10, letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
                        {project.year}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {/* breathing pulse line when fully stacked */}
              <AnimatePresence>
                {phase === "stacked" && (
                  <motion.div
                    className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
                    style={{ bottom: -40 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="w-px bg-white/25"
                      animate={{ height: [8, 20, 8] }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SPREAD — full interactive rows */}
        <AnimatePresence>
          {isSpread && (
            <motion.div
              key="list"
              className="border-t border-white/[0.07]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {projects.map((project, i) => (
                <motion.div
                  key={project.index}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: i * 0.09, ease: [0.76, 0, 0.24, 1] }}
                >
                  <ProjectRow project={project} i={i} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.div
        className="relative z-10 w-full px-5 sm:px-10 md:px-16 py-10"
        animate={{ opacity: isSpread ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <p className="text-[10px] tracking-[0.35em] uppercase text-white/15">More on GitHub</p>
          <a
            href="https://github.com/UdeshBhatti2004"
            target="_blank"
            rel="noreferrer"
            className="text-[10px] tracking-[0.35em] uppercase text-white/25 hover:text-white/60 transition-colors duration-300"
          >
            github.com/UdeshBhatti2004 ↗
          </a>
        </div>
      </motion.div>

      <div className="w-full h-px bg-white/[0.07]" />
    </section>
  );
}
