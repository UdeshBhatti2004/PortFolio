import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const canUseCustomCursor =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  useEffect(() => {
    if (!canUseCustomCursor) return;

    const move = (e) => {
      if (dot.current) {
        dot.current.style.left = e.clientX + "px";
        dot.current.style.top = e.clientY + "px";
      }

      setTimeout(() => {
        if (ring.current) {
          ring.current.style.left = e.clientX + "px";
          ring.current.style.top = e.clientY + "px";
        }
      }, 80);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [canUseCustomCursor]);

  if (!canUseCustomCursor) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dot}
        className="fixed w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[9999]
                   -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />

      {/* Ring */}
      <div
        ref={ring}
        className="fixed w-10 h-10 border border-white rounded-full pointer-events-none z-[9998]
                   -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ transition: "left 0.08s, top 0.08s" }}
      />
    </>
  );
}
