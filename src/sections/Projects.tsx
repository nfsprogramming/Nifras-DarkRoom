import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Github } from "lucide-react";
import Scramble from "../components/Scramble";
import { projects, type Project } from "../data/content";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useIsMobile } from "../hooks/useIsMobile";
import { cn } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function sceneGradient(p: Project) {
  return `radial-gradient(120% 140% at 18% 8%, ${p.accent} 0%, transparent 52%), radial-gradient(110% 130% at 85% 92%, ${p.accent}88 0%, transparent 58%), linear-gradient(160deg, #1a150e 0%, #0c0a08 100%)`;
}

function FilmCard({
  p,
  i,
  vertical,
}: {
  p: Project;
  i: number;
  vertical: boolean;
}) {
  return (
    <article
      data-cursor
      className={cn("group relative shrink-0 select-none", vertical ? "w-full max-w-[560px]" : "w-[min(540px,80vw)]")}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[#16120d]">
        <div
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          style={{ background: sceneGradient(p) }}
        />
        <div className="dev-tint absolute inset-0 bg-[#ff3d2e] opacity-25 mix-blend-color transition-opacity duration-700 group-hover:opacity-0" />
        <div className="absolute inset-0 bg-black/45 transition-opacity duration-700 group-hover:opacity-0" />
        <div className="sprockets absolute inset-x-0 top-0 h-5 opacity-60" />
        <div className="sprockets absolute inset-x-0 bottom-0 h-5 opacity-60" />
        <span className="absolute right-4 top-7 font-display text-4xl text-[#ece4d4]/25 md:text-5xl">
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="absolute bottom-7 right-4 font-mono text-[9px] uppercase tracking-[0.25em] text-[#ece4d4]/60">
          FRAME {String(i + 1).padStart(2, "0")} — HOVER TO DEVELOP
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--accent)]">
            {p.tag} — {p.year}
          </p>
          <h3 className="mt-2 font-display text-2xl uppercase md:text-3xl">{p.title}</h3>
          <p className="mt-1.5 max-w-sm text-sm text-[var(--muted)]">{p.subtitle}</p>
        </div>
        <div className="flex shrink-0 gap-3">
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              data-cursor
              aria-label={`${p.title} on GitHub`}
              className="rounded-full border border-[var(--line)] p-2.5 text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--fg)]"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {p.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[var(--line)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]"
          >
            {t}
          </span>
        ))}
      </div>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.15em]">
        ▸ {p.metrics}
      </p>
    </article>
  );
}

export default function Projects() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const pinned = !reduced && !isMobile;

  useGSAP(
    () => {
      if (!pinned) return;
      const amount = () =>
        Math.max(1, (track.current?.scrollWidth ?? 0) - window.innerWidth);
      gsap.to(track.current, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${amount()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current)
              barRef.current.style.transform = `scaleX(${self.progress})`;
            if (countRef.current) {
              const idx = Math.min(
                projects.length,
                Math.floor(self.progress * projects.length) + 1
              );
              countRef.current.textContent = String(idx).padStart(2, "0");
            }
          },
        },
      });
    },
    { dependencies: [pinned] }
  );

  return (
    <section
      ref={root}
      id="work"
      data-section-theme="dark"
      className={cn("relative", pinned ? "h-screen overflow-hidden" : "py-28")}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pt-20 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)] md:px-10">
        <Scramble text="[03] — SELECTED WORK" trigger="view" />
        <div className="flex items-center gap-4">
          <span>
            <span ref={countRef}>01</span> / {String(projects.length).padStart(2, "0")}
          </span>
          <span className="hidden h-px w-32 bg-[var(--line)] md:block">
            <div
              ref={barRef}
              className="h-full w-full origin-left bg-[var(--accent)]"
              style={{ transform: "scaleX(0)" }}
            />
          </span>
        </div>
      </div>

      {pinned ? (
        <>
          <div className="flex h-full items-center">
            <div
              ref={track}
              className="flex w-max items-stretch gap-8 px-[6vw] pt-10 md:gap-14"
            >
              {projects.map((p, i) => (
                <FilmCard key={p.id} p={p} i={i} vertical={false} />
              ))}
            </div>
          </div>
          <p className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">
            Scroll — film strip
          </p>
        </>
      ) : (
        <div className="flex flex-col items-center gap-20 px-5 pt-24 md:px-10">
          {projects.map((p, i) => (
            <FilmCard key={p.id} p={p} i={i} vertical={true} />
          ))}
        </div>
      )}
    </section>
  );
}
