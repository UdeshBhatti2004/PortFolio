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
      {/* NAVBAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 md:px-10 py-6 z-50 body-font bg-black/30 backdrop-blur-md border-b border-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* LOGO */}
        <p className="text-[11px] 2xl:text-[15px] tracking-[0.4em] uppercase text-white/60">
          UDESH
        </p>

        {/* DESKTOP MENU */}
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

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">
          {/* AVAILABLE (DESKTOP) */}
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

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-[11px] tracking-[0.3em] uppercase text-white/60"
          >
            MENU
          </button>
        </div>
      </motion.div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <>
            {/* OVERLAY */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* SIDE PANEL */}
            <motion.div
              className="fixed top-0 left-0 h-full w-full md:w-[50%] bg-[#0a0a0a] z-50 flex flex-col justify-center px-10 body-font"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-6 right-8 text-sm tracking-widest text-white/50"
              >
                CLOSE
              </button>

              {/* MENU ITEMS */}
              <div className="flex flex-col gap-8">
                {menuItems.map((item, i) => (
                  <motion.a
                    key={item}
                    href="#"
                    onClick={() => setOpen(false)}
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -40, opacity: 0 }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.5,
                      ease: [0.76, 0, 0.24, 1],
                    }}
                    className="text-3xl md:text-5xl uppercase tracking-wide text-white/80 hover:text-white"
                  >
                    {item}
                  </motion.a>
                ))}
              </div>

              {/* AVAILABLE (MOBILE) */}
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

              {/* BOTTOM LINE */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute bottom-20 left-10 right-10 h-[1px] bg-white/10 origin-left"
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
