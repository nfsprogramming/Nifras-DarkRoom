import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Reveal from "../components/Reveal";
import Scramble from "../components/Scramble";
import { profile } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About() {
  const root = useRef<HTMLElement>(null);
  const ghost = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ghost.current,
        { yPercent: 24 },
        {
          yPercent: -24,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    },
    { scope: root, dependencies: [reduced] }
  );

  useGSAP(
    () => {
      gsap.fromTo(
        "[data-metric]",
        { y: 44, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: "[data-metric-grid]", start: "top 85%", once: true },
        }
      );
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      ref={root}
      id="manifesto"
      data-section-theme="paper"
      className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40"
    >
      <span
        ref={ghost}
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[22vw] uppercase leading-none text-[var(--fg)] opacity-[0.05]"
      >
        MANIFESTO
      </span>

      <div className="relative z-10">
        <div className="mb-12 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          <Scramble text="[01] — MANIFESTO" trigger="view" />
          <span className="hidden md:inline">WHO DEVELOPS THE MACHINES</span>
        </div>

        <Reveal
          as="h2"
          mode="words"
          className="max-w-5xl font-display text-[clamp(2.1rem,5.5vw,5rem)] uppercase leading-[0.95]"
        >
          {profile.manifesto}
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <p className="max-w-md text-base leading-relaxed text-[var(--muted)]">
            {profile.bio}
          </p>
          <p className="max-w-md font-serif text-xl italic leading-relaxed md:text-2xl">
            {profile.philosophy}
          </p>
        </div>

        <div
          data-metric-grid
          className="mt-24 grid grid-cols-2 gap-px bg-[var(--line)] md:grid-cols-4"
        >
          {profile.metrics.map((m, i) => (
            <div key={m.label} data-metric className="bg-[var(--bg)] p-6 md:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-8 font-display text-4xl md:text-5xl">{m.value}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em]">
                {m.label}
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">{m.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
