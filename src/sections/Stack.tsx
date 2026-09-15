import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "../components/Magnetic";
import Scramble from "../components/Scramble";
import { deck, type Deck } from "../data/content";
import { scrollToTarget } from "../lib/scroll";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useIsMobile } from "../hooks/useIsMobile";
import { cn } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PEEK = 44;
const SCALE = 0.05;
const SCROLL_VH_PER_CARD = 90;

function DeckCard({
  d,
  i,
  total,
  staticMode,
}: {
  d: Deck;
  i: number;
  total: number;
  staticMode: boolean;
}) {
  return (
    <div
      ref={
        staticMode
          ? undefined
          : (el) => {
              (el as HTMLDivElement | null)?.setAttribute("data-deck-idx", String(i));
            }
      }
      data-deck-card
      data-cursor
      className={cn(
        "rounded-sm p-8 will-change-transform md:p-10",
        staticMode && "w-full"
      )}
      style={
        staticMode
          ? { background: d.tone, color: "#14110c" }
          : {
              background: d.tone,
              color: "#14110c",
              zIndex: total - i,
              transform: `translate(-50%, -50%) translateY(${i * PEEK}px) scale(${1 - i * SCALE})`,
            }
      }
    >
      {d.cta ? (
        <div className="flex min-h-[300px] flex-col items-start justify-center gap-8 md:min-h-[340px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em]">
            {d.index} — FINAL FRAME
          </p>
          <h3 className="font-display text-4xl uppercase leading-[0.95] md:text-6xl">
            {d.title}
          </h3>
          <Magnetic>
            <button
              onClick={() => scrollToTarget("#contact")}
              data-cursor
              className="inline-flex items-center gap-3 rounded-full bg-[#14110c] px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-[#ece4d4] transition-transform hover:scale-[1.03]"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </Magnetic>
        </div>
      ) : (
        <>
          <div className="flex items-baseline justify-between border-b border-black/15 pb-5">
            <h3 className="font-display text-3xl uppercase md:text-5xl">{d.title}</h3>
            <span className="font-mono text-xs opacity-60">{d.index}</span>
          </div>
          <ul className="mt-7 space-y-3.5">
            {d.items.map((it, k) => (
              <li
                key={it}
                className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.12em]"
              >
                <span>{it}</span>
                <span className="opacity-40">{String(k + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default function Stack() {
  const root = useRef<HTMLElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const staticMode = reduced || isMobile;
  const n = deck.length;

  useGSAP(
    () => {
      if (staticMode) return;
      const cards = Array.from(
        sticky.current?.querySelectorAll<HTMLElement>("[data-deck-card]") ?? []
      );
      if (cards.length === 0) return;

      const windows = deck.slice(0, n - 1).map((_, i) => ({
        s: 0.08 + i * 0.17,
        e: 0.2 + i * 0.17,
      }));

      const apply = (p: number) => {
        const H = sticky.current?.offsetHeight ?? window.innerHeight;
        let acc = 0;
        cards.forEach((card, j) => {
          const before = acc;
          let exitT = 0;
          if (j < n - 1) {
            const w = windows[j];
            exitT = gsap.utils.clamp(0, 1, (p - w.s) / (w.e - w.s));
            acc += exitT;
          }
          const effIdx = j - before;
          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            y: effIdx * PEEK - exitT * H * 1.25,
            rotation: exitT * (j % 2 === 0 ? -9 : 9),
            scale: 1 - effIdx * SCALE,
          });
        });
      };

      apply(0);
      ScrollTrigger.create({
        trigger: wrap.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => apply(self.progress),
        onLeaveBack: () => apply(0),
      });
    },
    { dependencies: [staticMode] }
  );

  return (
    <section ref={root} id="stack" data-section-theme="dark" className="relative">
      <div ref={wrap} style={{ height: staticMode ? undefined : `calc(100vh + ${n * SCROLL_VH_PER_CARD}vh)` }}>
        <div
          ref={sticky}
          className={cn(
            staticMode
              ? "flex flex-col px-5 py-28 md:px-10"
              : "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]",
              staticMode ? "mb-12" : "pointer-events-none absolute inset-x-0 top-0 px-5 pt-20 md:px-10"
            )}
          >
            <Scramble text="[02] — STACK" trigger="view" />
            <span className="hidden md:inline">
              {staticMode ? "CAPABILITIES, EXPOSED" : "SCROLL — CARDS DEVELOP ↓"}
            </span>
          </div>

          <div
            className={cn(
              staticMode
                ? "grid gap-6 md:grid-cols-2"
                : "relative h-[340px] w-full md:h-[380px]"
            )}
          >
            {deck.map((d, i) => (
              <div
                key={d.index}
                className={cn(!staticMode && "absolute left-1/2 top-1/2 w-[min(600px,88vw)]")}
              >
                <DeckCard d={d} i={i} total={n} staticMode={staticMode} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
