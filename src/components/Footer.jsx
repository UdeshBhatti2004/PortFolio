import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const socials = [
  { label: "GitHub", href: "https://github.com/UdeshBhatti2004" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/udesh-bhatti-3508192aa/" },
  { label: "Message", href: "#contact" },
];

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const year = new Date().getFullYear();
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      setIstTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };

    updateClock();
    const id = setInterval(updateClock, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer
      ref={ref}
      className="relative w-full overflow-hidden bg-[#080808] text-white"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      <motion.div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), rgba(255,255,255,0.38), rgba(255,255,255,0.08), transparent)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      />

      <div className="relative z-10 px-5 sm:px-10 md:px-16 pt-10 sm:pt-14 pb-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <motion.div
              className="mb-3 flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-white/45"
                animate={{ scale: [1, 1.9, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.45, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[10px] 2xl:text-[13px] tracking-[0.42em] uppercase text-white/28">
                Final signal
              </span>
            </motion.div>

            <motion.h2
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(42px, 8vw, 118px)",
                lineHeight: 0.88,
                letterSpacing: "0.02em",
              }}
              initial={{ y: 28, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.22, ease: [0.76, 0, 0.24, 1] }}
            >
              Keep it sharp.
              <span
                className="block"
                style={{ color: "rgba(255,255,255,0.18)" }}
              >
                Ship with pulse.
              </span>
            </motion.h2>
          </div>

          <motion.div
            className="flex flex-wrap items-center gap-x-6 gap-y-4"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.42 }}
          >
            <div className="flex items-center gap-3 border border-white/[0.08] px-3 py-2">
              <span className="text-[9px] 2xl:text-[12px] tracking-[0.38em] uppercase text-white/20">
                IST
              </span>
              <span
                className="text-[13px] 2xl:text-[17px] tracking-[0.18em] text-white/62 tabular-nums"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {istTime}
              </span>
            </div>

            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("#") ? undefined : "_blank"}
                rel={social.href.startsWith("#") ? undefined : "noreferrer"}
                className="group relative text-[10px] 2xl:text-[13px] tracking-[0.34em] uppercase text-white/30 transition-colors hover:text-white/80"
              >
                {social.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-white/45 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-8 grid grid-cols-1 gap-3 border-t border-white/[0.055] pt-4 sm:grid-cols-3 sm:items-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="text-[10px] 2xl:text-[13px] tracking-[0.28em] uppercase text-white/30">
            (c) {year} Udesh Bhatti
          </span>

          <span className="text-[10px] 2xl:text-[13px] tracking-[0.28em] uppercase text-white/30 sm:text-center">
            Designed & developed by Udesh Bhatti
          </span>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="justify-self-start text-[10px] 2xl:text-[13px] tracking-[0.34em] uppercase text-white/30 transition-colors hover:text-white/80 sm:justify-self-end"
          >
            Back at top ↑
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
