import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(useGSAP);

const MESSAGES = [
  "LOADING EMULSION",
  "MIXING CHEMISTRY",
  "DEVELOPING NEGATIVE",
  "FIXING IMAGE",
];

interface Props {
  onReveal: () => void;
  onGone: () => void;
}

export default function Preloader({ onReveal, onGone }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const msg = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const state = { v: 0 };
      const tl = gsap.timeline();
      tl.to(state, {
        v: 100,
        duration: reduced ? 0.25 : 1.7,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counter.current)
            counter.current.textContent = String(Math.round(state.v)).padStart(3, "0");
          if (msg.current)
            msg.current.textContent =
              MESSAGES[
                Math.min(MESSAGES.length - 1, Math.floor((state.v / 100) * MESSAGES.length))
              ];
        },
      });
      tl.to(".pre-bar", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.5,
        stagger: 0.04,
        ease: "power3.inOut",
      }, "+=0.15");
      tl.to(root.current, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
      }, "-=0.15");
      tl.add(() => onReveal(), "-=0.6");
      tl.add(() => onGone());
    },
    { dependencies: [reduced] }
  );

  return (
    <div ref={root} className="fixed inset-0 z-[100]" aria-hidden>
      <div className="absolute inset-0 flex">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="pre-bar h-full flex-1 bg-[#0c0a08]" />
        ))}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <span ref={counter} className="font-display text-7xl text-[#ece4d4] md:text-8xl">
          000
        </span>
        <span
          ref={msg}
          className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#ff3d2e]"
        >
          {MESSAGES[0]}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ece4d4]/40">
          NFS Programming — AI Darkroom
        </span>
      </div>
    </div>
  );
}
