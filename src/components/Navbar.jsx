import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [open, setOpen] = useState(false);
  const menuItems = [
  { label: "Work", id: "#work" },
  { label: "About", id: "#about" },
  { label: "Skills", id: "#skills" },
  { label: "Contact", id: "#contact" },
];

  return (
    <>
      {}
      <motion.div
        className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 md:px-10 py-6 z-50 body-font bg-black/30 backdrop-blur-md border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {}
        <p className="text-[11px] 2xl:text-[15px] tracking-[0.4em] uppercase text-white/60">
          UDESH
        </p>

        {}
        <div className="hidden md:flex gap-10">
          {menuItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.id}
              className="relative text-[11px] 2xl:text-[15px] tracking-[0.3em] uppercase text-white/40 hover:text-white"
              whileHover={{ y: -2 }}
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        {}
        <div className="flex items-center gap-6">
          {}
          <motion.div
            className="hidden md:flex items-center gap-2"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[10px] 2xl:text-[14px] tracking-[0.3em] uppercase text-white/40">
              Available
            </span>
          </motion.div>

          {}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-[11px] tracking-[0.3em] uppercase text-white/60"
          >
            MENU
          </button>
        </div>
      </motion.div>

      {}
      <AnimatePresence>
        {open && (
          <>
            {}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {}
           {}
<motion.div
  className="fixed top-0 left-0 h-full w-full bg-[#0a0a0a] z-50 flex body-font"
  initial={{ x: "-100%" }}
  animate={{ x: 0 }}
  exit={{ x: "-100%" }}
  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
>
  {}
  <div className="relative flex flex-col justify-center px-10 w-1/2">
    {}
    <button
      onClick={() => setOpen(false)}
      className="absolute top-6 left-10 text-sm tracking-widest text-white/50"
    >
      CLOSE
    </button>

    <div className="flex flex-col gap-8">
      {menuItems.map((item, i) => (
        <motion.a
          key={item.label}
          href={item.id}
          onClick={() => setOpen(false)}
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -40, opacity: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="text-3xl uppercase tracking-wide text-white/80 hover:text-white"
        >
          {item.label}
        </motion.a>
      ))}
    </div>

    {}
    <motion.div
      className="absolute bottom-10 left-10 flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ delay: 0.6 }}
    >
      <motion.span
        className="w-1.5 h-1.5 rounded-full bg-emerald-400"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
        Available for work
      </span>
    </motion.div>
  </div>

  {}
  <motion.div
    className="w-[1px] h-full bg-white/10"
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    transition={{ delay: 0.3, duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
    style={{ originY: 0 }}
  />

  {}
 {}
<div className="relative flex flex-col justify-between py-20 px-6 w-1/2 overflow-hidden">

  {}
  <motion.div
    className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.3, duration: 0.8 }}
  >
    <span
      className="text-[22vw] font-black text-white/[0.03] leading-none"
      style={{ fontFamily: "var(--font-bebas)" }}
    >
      UB
    </span>
  </motion.div>

  {}
  <motion.div
    className="flex items-center gap-2"
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
  >
    <span className="w-1 h-1 rounded-full bg-white/20" />
    <span className="text-[8px] tracking-[0.5em] uppercase text-white/25">2026</span>
  </motion.div>

  {}
  <motion.div className="flex flex-col gap-4 z-10">
    {[
      { num: "Fresher", label: "Yrs Exp" },
      { num: "100%", label: "Passion" },
    ].map(({ num, label }, i) => (
      <motion.div
        key={label}
        className="border border-white/8 px-4 py-3 flex items-center justify-between"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.35 + i * 0.1 }}
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/30">{label}</span>
        <span className="text-lg text-white/60 font-light" style={{ fontFamily: "var(--font-bebas)" }}>{num}</span>
      </motion.div>
    ))}
  </motion.div>

  {}
  <motion.div
    className="flex flex-col gap-2 z-10"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.7 }}
  >
    {[
      { label: "GitHub", href: "https://github.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
    ].map((s) => (
      <a
        key={s.label}
        href={s.href}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between border border-white/8 px-4 py-2.5 text-[9px] tracking-[0.35em] uppercase text-white/35 hover:border-white/30 hover:text-white/80 transition-all"
      >
        {s.label}
        <span className="text-white/20">↗</span>
      </a>
    ))}
  </motion.div>

</div>
</motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
