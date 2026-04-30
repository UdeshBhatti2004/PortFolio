import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring_pos = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  const canUseCustomCursor =
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  useEffect(() => {
    if (!canUseCustomCursor) return;

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const loop = () => {
    
      if (dot.current) {
        dot.current.style.left = pos.current.x + "px";
        dot.current.style.top = pos.current.y + "px";
      }

      
      ring_pos.current.x += (pos.current.x - ring_pos.current.x) * 0.15;
      ring_pos.current.y += (pos.current.y - ring_pos.current.y) * 0.15;

      if (ring.current) {
        ring.current.style.left = ring_pos.current.x + "px";
        ring.current.style.top = ring_pos.current.y + "px";
      }

      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
    };
  }, [canUseCustomCursor]);

  if (!canUseCustomCursor) return null;

  return (
    <>
      <div
        ref={dot}
        className="fixed w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div
        ref={ring}
        className="fixed w-10 h-10 border border-white rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </>
  );
}