import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─── helpers ─────────────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.div ref={ref} className={className}
      initial={{ y: 24, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.76, 0, 0.24, 1] }}
    >{children}</motion.div>
  );
}

/* ─── data ─────────────────────────────────────────────────────────────── */
const channels = [
  { label: "Email",      value: "yourname@gmail.com",       href: "mailto:yourname@gmail.com" },
  { label: "LinkedIn",   value: "linkedin.com/in/yourname", href: "https://linkedin.com/in/yourname" },
  { label: "GitHub",     value: "github.com/yourname",      href: "https://github.com/yourname" },
  { label: "Twitter / X",value: "@yourhandle",              href: "https://x.com/yourhandle" },
];

/* ─── channel icon map ─────────────────────────────────────────────────── */
const icons = {
  Email: (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <rect x="2" y="4" width="12" height="9" rx="1"/><path d="M2 5l6 5 6-5"/>
    </svg>
  ),
  LinkedIn: (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <rect x="2" y="2" width="12" height="12" rx="2"/><path d="M5 8h6M5 5.5h3M5 10.5h4"/>
    </svg>
  ),
  GitHub: (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 2C4.69 2 2 4.69 2 8c0 2.65 1.72 4.9 4.1 5.69.3.06.41-.13.41-.28v-1c-1.67.36-2.02-.81-2.02-.81-.27-.69-.67-.87-.67-.87-.55-.37.04-.37.04-.37.6.04.92.62.92.62.54.92 1.41.65 1.76.5.05-.39.21-.65.38-.8-1.33-.15-2.73-.67-2.73-2.97 0-.65.23-1.19.62-1.61-.06-.15-.27-.76.06-1.59 0 0 .5-.16 1.65.62a5.7 5.7 0 011.5-.2c.51 0 1.02.07 1.5.2 1.15-.78 1.65-.62 1.65-.62.33.83.12 1.44.06 1.59.39.42.62.96.62 1.61 0 2.31-1.4 2.82-2.74 2.97.22.19.41.55.41 1.11v1.64c0 .16.11.34.41.28A6.002 6.002 0 0014 8c0-3.31-2.69-6-6-6z"/>
    </svg>
  ),
  "Twitter / X": (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M3 3l10 5-10 5V3zM3 8h5"/>
    </svg>
  ),
};

/* ─── ChannelRow ───────────────────────────────────────────────────────── */
function ChannelRow({ ch, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.a
      href={ch.href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay, ease: [0.76, 0, 0.24, 1] }}
      className="relative flex items-center justify-between py-[13px] border-b border-white/[0.055] overflow-hidden no-underline"
      style={{ textDecoration: "none" }}
    >
      {/* hover fill */}
      <motion.div className="absolute inset-0"
        animate={{ backgroundColor: hov ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0)" }}
        transition={{ duration: 0.18 }}
      />
      {/* left accent bar */}
      <motion.div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/50"
        animate={{ scaleY: hov ? 1 : 0, opacity: hov ? 1 : 0 }}
        style={{ originY: 0.5 }}
        transition={{ duration: 0.2 }}
      />

      {/* left: icon + label — indents on hover */}
      <motion.div className="relative flex items-center gap-2.5"
        animate={{ x: hov ? 10 : 0 }}
        transition={{ duration: 0.28, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          className="w-[26px] h-[26px] border flex items-center justify-center flex-shrink-0"
          animate={{
            borderColor: hov ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.1)",
            backgroundColor: hov ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0)",
            color: hov ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.4)",
          }}
          transition={{ duration: 0.2 }}
        >
          {icons[ch.label]}
        </motion.div>
        <motion.span
          className="text-[10px] tracking-[0.36em] uppercase"
          style={{ fontFamily: "var(--font-outfit)" }}
          animate={{ color: hov ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.38)" }}
          transition={{ duration: 0.2 }}
        >
          {ch.label}
        </motion.span>
      </motion.div>

      {/* right: value + arrow */}
      <div className="relative flex items-center gap-2.5">
        <motion.span
          className="text-[11px] tracking-[0.04em]"
          style={{ fontFamily: "var(--font-outfit)" }}
          animate={{ color: hov ? "rgba(255,255,255,0.42)" : "rgba(255,255,255,0.16)" }}
          transition={{ duration: 0.2 }}
        >
          {ch.value}
        </motion.span>
        <motion.span
          className="text-[13px]"
          animate={{
            x: hov ? 3 : 0, y: hov ? -3 : 0,
            color: hov ? "rgba(255,255,255,0.52)" : "rgba(255,255,255,0.14)",
          }}
          transition={{ duration: 0.24, ease: [0.76, 0, 0.24, 1] }}
        >↗</motion.span>
      </div>
    </motion.a>
  );
}

/* ─── FormField ────────────────────────────────────────────────────────── */
function FormField({ label, as: Tag = "input", extra, onChange, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative mb-[18px]">
      <div className="flex items-center justify-between mb-[7px]">
        <motion.span
          className="text-[9px] tracking-[0.4em] uppercase"
          style={{ fontFamily: "var(--font-outfit)" }}
          animate={{ color: focused ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.2)" }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
        {extra}
      </div>
      <div className="relative">
        <Tag
          {...props}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent border-b border-white/[0.09] text-white/75 placeholder-white/[0.14] py-1.5 pb-2.5 text-[13px] tracking-[0.04em] outline-none transition-colors duration-200 focus:text-white/90 focus:border-white/35 resize-none"
          style={{ fontFamily: "var(--font-outfit)", caretColor: "rgba(255,255,255,0.55)" }}
        />
        {/* animated bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-white/50"
          animate={{ width: focused ? "100%" : "0%" }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
    </div>
  );
}



/* ─── Main ─────────────────────────────────────────────────────────────── */
export default function Contact() {
  const sectionRef = useRef(null);
  const isRevealed = useInView(sectionRef, { once: true, amount: 0 });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | error | sending | sent
  const [shake, setShake] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const msgLen = form.message.length;
  const totalChars = Object.values(form).reduce((a, v) => a + v.length, 0);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      setShake(true);
      setStatus("error");
      setTimeout(() => { setShake(false); setStatus("idle"); }, 2200);
      return;
    }
    setStatus("sending");
    // ↓ Replace with your EmailJS / Formspree / API call
    setTimeout(() => setStatus("sent"), 900);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#080808] text-white overflow-hidden"
      style={{ fontFamily: "var(--font-outfit)" }}
    >
      {/* Top rule */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-10 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,.18) 40%,rgba(255,255,255,.05) 100%)" }}
        initial={{ opacity: 0 }}
        animate={isRevealed ? { opacity: 1 } : {}}
        transition={{ duration: 1.2 }}
      />
      <div className="w-full h-px bg-white/[0.06]" />

      {/* Watermark — TOP LEFT matching every other section */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <span style={{
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(90px, 20vw, 260px)",
          color: "rgba(255,255,255,0.016)",
          letterSpacing: "0.05em",
          lineHeight: 0.88,
          whiteSpace: "nowrap",
          display: "block",
          paddingLeft: "1vw",
        }}>CONTACT</span>
      </div>

      

      <div className="relative z-10 w-full px-5 sm:px-10 md:px-16 pt-24 sm:pt-32 pb-16 sm:pb-24">

        {/* ── Eyebrow + heading — full width above grid ── */}
        <FadeUp delay={0.1} className="mb-9 sm:mb-12">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <span className="text-[10px] tracking-[0.45em] uppercase text-white/20">05</span>
            <motion.div className="h-px bg-white/13"
              initial={{ width: 0 }}
              animate={isRevealed ? { width: 24 } : { width: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />
            <span className="text-[10px] tracking-[0.45em] uppercase text-white/20">Contact</span>
          </motion.div>

          <div style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(52px, 9.5vw, 120px)",
            letterSpacing: "0.01em", lineHeight: 0.87,
          }}>
            {["Let's", "Build."].map((line, li) => (
              <div key={li} className="overflow-hidden">
                <motion.div
                  initial={{ y: "105%" }}
                  animate={isRevealed ? { y: "0%" } : {}}
                  transition={{ duration: 1.0, delay: 0.5 + li * 0.12, ease: [0.76, 0, 0.24, 1] }}
                  style={{ color: li === 1 ? "rgba(255,255,255,0.16)" : "white" }}
                >{line}</motion.div>
              </div>
            ))}
          </div>

          {/* Availability pill */}
          <motion.div
            className="inline-flex items-center gap-2 border border-white/10 px-3 py-1.5 mt-5"
            initial={{ opacity: 0, y: 8 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.85 }}
          >
            <motion.div
              className="w-[5px] h-[5px] rounded-full bg-white/50"
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="text-[9px] tracking-[0.38em] uppercase text-white/35">
              Open to work — currently available
            </span>
          </motion.div>
        </FadeUp>

        {/* ── Two-col grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* LEFT: sub-copy + channels */}
          <FadeUp delay={0.2}>
            <p className="text-[13px] text-white/35 leading-[1.75] tracking-[0.02em] max-w-xs mb-7">
              Have a project in mind, a role to fill, or just want to say hello? Pick a channel or drop a message — I reply to everything.
            </p>

            <div className="border-t border-white/[0.055]">
              {channels.map((ch, i) => (
                <ChannelRow key={ch.label} ch={ch} delay={0.5 + i * 0.07} />
              ))}
            </div>
          </FadeUp>

          {/* RIGHT: form */}
          <FadeUp delay={0.3}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] tracking-[0.44em] uppercase text-white/22"
                style={{ fontFamily: "var(--font-outfit)" }}>
                Drop a message
              </span>
              <div className="flex-1 h-px bg-white/[0.07]" />
            </div>

            {/* Name + Email row */}
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Name" name="name" placeholder="Your name"
                value={form.name} onChange={handleChange} maxLength={60} />
              <FormField label="Email" type="email" name="email" placeholder="you@email.com"
                value={form.email} onChange={handleChange} />
            </div>

            <FormField label="Subject" name="subject" placeholder="What's it about?"
              value={form.subject} onChange={handleChange} maxLength={80} />

            <FormField
              label="Message"
              as="textarea"
              name="message"
              placeholder="Tell me about your project or idea…"
              value={form.message}
              onChange={handleChange}
              rows={4}
              maxLength={500}
              extra={
                <span className="text-[9px] transition-colors duration-200"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: msgLen > 0 ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.13)",
                  }}>
                  {msgLen} / 500
                </span>
              }
            />

            {/* Submit row */}
            {status !== "sent" && (
              <div className="flex items-center gap-3 mt-[18px]">
                <motion.button
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  animate={shake ? { x: [-5, 5, -5, 5, 0] } : { x: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex-1 relative border py-[13px] text-[10px] tracking-[0.44em] uppercase overflow-hidden"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    background: "transparent",
                    cursor: status === "sending" ? "default" : "pointer",
                    opacity: status === "sending" ? 0.5 : 1,
                    borderColor: status === "error"
                      ? "rgba(255,100,100,0.4)"
                      : "rgba(255,255,255,0.16)",
                    color: status === "error"
                      ? "rgba(255,140,140,0.7)"
                      : "rgba(255,255,255,0.6)",
                  }}
                  whileHover={status === "idle"
                    ? { borderColor: "rgba(255,255,255,0.36)", color: "rgba(255,255,255,0.9)" }
                    : {}}
                  whileTap={{ scale: 0.99 }}
                >
                  {/* slide-in hover fill */}
                  <motion.div
                    className="absolute inset-0 bg-white/[0.04]"
                    initial={{ x: "-101%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.38, ease: [0.76, 0, 0.24, 1] }}
                  />
                  <span className="relative">
                    {status === "idle"    && "Send Message →"}
                    {status === "sending" && "Sending…"}
                    {status === "error"   && "Fill required fields"}
                  </span>
                </motion.button>

                <span className="text-[9px] tracking-[0.2em] text-white/18 whitespace-nowrap"
                  style={{ fontFamily: "var(--font-outfit)" }}>
                  {totalChars} chars
                </span>
              </div>
            )}

            {/* Success */}
            {status === "sent" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-[18px] flex items-center gap-3 border border-white/10 px-4 py-3"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <motion.div
                  className="w-[5px] h-[5px] rounded-full bg-white/50 flex-shrink-0"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-[9px] tracking-[0.3em] uppercase text-white/40">
                  Sent — I'll reply within 24 hrs
                </span>
              </motion.div>
            )}
          </FadeUp>
        </div>

        {/* ── Footer ── */}
        <FadeUp delay={0.35} className="mt-14 sm:mt-16">
          <div className="h-px bg-white/[0.06] mb-5" />
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-white/35"
                animate={{ scale: [1, 1.5, 1], opacity: [0.35, 0.75, 0.35] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/22">
                Available for new projects
              </span>
            </div>
            <span className="text-[10px] tracking-[0.28em] uppercase text-white/12">
              © 2025 · Crafted with intent
            </span>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
