import { useEffect, useState } from "react";
import { Aperture } from "lucide-react";
import Scramble from "./Scramble";
import { scrollToTarget } from "../lib/scroll";

const LINKS = [
  { label: "MANIFESTO", href: "#manifesto" },
  { label: "STACK", href: "#stack" },
  { label: "WORK", href: "#work" },
  { label: "CONTACT", href: "#contact" },
];

export default function Nav() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-[70] mix-blend-difference">
      <nav className="flex items-center justify-between px-5 py-5 text-white md:px-10">
        <button
          onClick={() => scrollToTarget(0)}
          data-cursor
          className="flex items-center gap-2.5"
        >
          <Aperture className="h-5 w-5" />
          <Scramble text="NFS®" className="font-mono text-sm font-medium tracking-[0.2em]" />
        </button>
        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => scrollToTarget(l.href)}
                data-cursor
                className="group relative font-mono text-[11px] tracking-[0.25em] opacity-80 transition-opacity hover:opacity-100"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          <span className="hidden sm:inline">REC</span>
          <span>{time}</span>
        </div>
      </nav>
    </header>
  );
}
