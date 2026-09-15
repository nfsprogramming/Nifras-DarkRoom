import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    const dx = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement).closest("[data-cursor]");
      gsap.to(ring, {
        scale: hit ? 2.1 : 1,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[120] hidden [@media(pointer:fine)]:block"
    >
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border border-white mix-blend-difference"
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
      />
    </div>
  );
}
