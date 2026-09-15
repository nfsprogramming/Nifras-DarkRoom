import { createElement, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "../lib/utils";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Props {
  children: string;
  as?: string;
  mode?: "chars" | "words";
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function Reveal({
  children,
  as = "div",
  mode = "words",
  className,
  delay = 0,
  stagger,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const units = el.querySelectorAll<HTMLElement>("[data-unit]");
      if (reduced) {
        gsap.set(units, { yPercent: 0 });
        return;
      }
      gsap.fromTo(
        units,
        { yPercent: 120 },
        {
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
          stagger: stagger ?? (mode === "chars" ? 0.035 : 0.055),
          delay,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    },
    { dependencies: [reduced, children] }
  );

  const Tag = as;

  const units =
    mode === "chars"
      ? Array.from(children)
      : children.split(/(\s+)/).filter((w) => w.length > 0);

  const nodes = units.map((u, i) =>
    /^\s+$/.test(u) ? (
      <span key={i}> </span>
    ) : (
      <span
        key={i}
        className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
      >
        <span data-unit className="inline-block will-change-transform">
          {u}
        </span>
      </span>
    )
  );

  return createElement(Tag, { ref, className: cn("reveal", className) }, nodes);
}
