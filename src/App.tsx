import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import { setLenis } from "./lib/scroll";
import Cursor from "./components/Cursor";
import Grain from "./components/Grain";
import Nav from "./components/Nav";
import Preloader from "./components/Preloader";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Stack from "./sections/Stack";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Marquee from "./components/Marquee";
import { marqueeTop } from "./data/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Phase = "loading" | "reveal" | "ready";

export default function App() {
  const [phase, setPhase] = useState<Phase>("loading");
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useGSAP(() => {
    const lenis = new Lenis({ lerp: 0.09 });
    lenisRef.current = lenis;
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
      lenisRef.current = null;
    };
  }, []);

  useGSAP(
    () => {
      const lenis = lenisRef.current;
      if (!lenis) return;
      if (phase === "loading") {
        lenis.stop();
      } else {
        lenis.start();
        requestAnimationFrame(() => ScrollTrigger.refresh());
      }
    },
    { dependencies: [phase] }
  );

  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>("[data-section-theme]");
    const triggers = sections.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 60%",
        onToggle: (self) => {
          if (self.isActive) {
            document.body.dataset.theme = el.dataset.sectionTheme ?? "dark";
          }
        },
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div className="min-h-screen">
      <Cursor />
      <Grain />
      <ScrollProgress />
      {phase !== "ready" && (
        <Preloader
          onReveal={() => setPhase("reveal")}
          onGone={() => setPhase("ready")}
        />
      )}
      <Nav />
      <main>
        <Hero active={phase !== "loading"} />
        <Marquee
          items={marqueeTop}
          className="border-y border-[var(--line)] py-3.5 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]"
        />
        <About />
        <Stack />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
