"use client";

import { useEffect, useRef } from "react";
import { motion as Motion } from "framer-motion";

export default function Loader({ onComplete }) {
  const rafRef = useRef(null);

  useEffect(() => {
    const start = Date.now();
    const duration = 2200;

    const bar = document.getElementById("ldr-bar");

    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;

      if (bar) bar.style.width = `${eased * 100}%`;

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => onComplete?.(), 400);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  return (
    <Motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#080808]"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      
      <div className="flex flex-col items-center gap-6">

        
        <div className="relative w-52 h-72 overflow-hidden">
          <Motion.img
            src="/Udesh.png"
            alt="Udesh"
            className="w-full h-full object-cover object-[50%_20%]"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            style={{
              filter: "brightness(0.85) contrast(1.05)",
            }}
          />

          
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

          
          <Motion.div
            className="absolute left-0 right-0 h-[2px] bg-white/40"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        
        <div className="w-40 h-[1px] bg-white/15 relative overflow-hidden">
          <div
            id="ldr-bar"
            className="absolute left-0 top-0 bottom-0 bg-white"
            style={{ width: "0%" }}
          />
        </div>

        
        <p className="text-[10px] tracking-[0.4em] text-white/30">
          INITIALIZING EXPERIENCE
        </p>
      </div>
    </Motion.div>
  );
}