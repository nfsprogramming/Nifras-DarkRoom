import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Reel from "../components/Reel";
import { profile } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LINE_1 = "NIFRAS";
const LINE_2 = "DARKROOM";

interface Props {
  active: boolean;
}

export default function Hero({ active }: Props) {
  const root = useRef<HTMLElement>(null);
  const reel = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!active) return;
      if (reduced) {
        gsap.set("[data-hero-fade]", { autoAlpha: 1, y: 0 });
        gsap.set("[data-hero-char]", { yPercent: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        "[data-hero-fade]",
        { y: 26, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.09 },
        0.1
      ).fromTo(
        "[data-hero-char]",
        { yPercent: 120 },
        { yPercent: 0, duration: 1.1, stagger: 0.045 },
        0.25
      );
      gsap.fromTo(
        reel.current,
        { scale: 0.6, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 1.2, ease: "power3.out", delay: 0.4 }
      );
    },
    { scope: root, dependencies: [active, reduced] }
  );

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        reel.current,
        { rotate: 0 },
        {
          rotate: 720,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
      gsap.to("[data-hero-fade]", {
        y: -40,
        autoAlpha: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: root, dependencies: [reduced] }
  );

  const onMove = (e: ReactMouseEvent<HTMLElement>) => {
    const el = root.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const renderLine = (word: string, stroke: boolean) => (
    <span
      className="block text-[clamp(3.6rem,15vw,12.5rem)] leading-[0.88]"
      style={
        stroke
          ? { color: "transparent", WebkitTextStroke: "2px var(--accent)" }
          : undefined
      }
    >
      {word.split("").map((c, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.06em] -mb-[0.06em]">
          <span data-hero-char className="inline-block will-change-transform">
            {c}
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <section
      ref={root}
      id="top"
      onMouseMove={onMove}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-5 pb-8 pt-24 md:px-10"
    >
      <div className="safelight pointer-events-none absolute inset-0" aria-hidden />
      <Reel
        ref={reel}
        className="absolute right-[4vw] top-[16vh] z-0 h-40 w-40 text-[var(--accent)] opacity-70 md:h-64 md:w-64"
      />

      <div
        data-hero-fade
        className="relative z-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]"
      >
        <span>35MM — F/1.4</span>
        <span className="hidden md:inline">{profile.name}</span>
        <span>{profile.location}</span>
      </div>

      <div className="relative z-10 py-10">
        <p
          data-hero-fade
          className="mb-7 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)]"
        >
          {profile.role}
        </p>
        <h1 className="font-display uppercase">
          {renderLine(LINE_1, false)}
          {renderLine(LINE_2, true)}
        </h1>
        <p data-hero-fade className="mt-9 max-w-xl text-lg text-[var(--muted)] md:text-xl">
          I build{" "}
          <span className="font-serif italic text-[var(--fg)]">intelligent systems</span>{" "}
          the way photographers develop film — in total darkness, under red light, with{" "}
          <span className="font-serif italic text-[var(--fg)]">patience and precision.</span>
        </p>
      </div>

      <div
        data-hero-fade
        className="relative z-10 flex items-end justify-between pb-2"
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          <p>Scroll to develop</p>
          <div className="mt-3 h-px w-28 overflow-hidden bg-[var(--line)]">
            <div className="scroll-hint h-full w-1/3 bg-[var(--accent)]" />
          </div>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          EST. 2018 — ©2026
        </p>
      </div>
    </section>
  );
}
