import { useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy, Github, Linkedin, Send } from "lucide-react";
import Magnetic from "../components/Magnetic";
import Marquee from "../components/Marquee";
import Reveal from "../components/Reveal";
import Scramble from "../components/Scramble";
import { profile } from "../data/content";
import { scrollToTarget } from "../lib/scroll";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.socials.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      data-section-theme="dark"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-5 pb-6 pt-28 md:px-10"
    >
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
        <Scramble text="[04] — CONTACT" trigger="view" />
        <span className="hidden md:inline">DARKROOM OPEN — REPLIES WITHIN 24H</span>
      </div>

      <div className="py-16">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
          Have a negative worth developing?
        </p>
        <Reveal
          as="h2"
          mode="chars"
          className="font-display text-[clamp(3rem,11vw,10rem)] uppercase leading-[0.9]"
        >
          LET'S TALK
        </Reveal>
        <p className="mt-5 font-serif text-[clamp(1.4rem,3.5vw,2.8rem)] italic text-[var(--accent)]">
          something intelligent together.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-7">
          <Magnetic>
            <a
              href={`mailto:${profile.socials.email}`}
              data-cursor
              className="inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-[#0c0a08] transition-transform duration-300 hover:scale-[1.04]"
            >
              Say hello
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Magnetic>
          <button
            onClick={copy}
            data-cursor
            className="group inline-flex items-center gap-3 border-b border-[var(--line)] pb-1.5 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
          >
            {profile.socials.email}
            {copied ? (
              <Check className="h-3.5 w-3.5 text-[var(--accent)]" />
            ) : (
              <Copy className="h-3.5 w-3.5 opacity-60 transition-opacity group-hover:opacity-100" />
            )}
          </button>
        </div>
      </div>

      <div>
        <Marquee
          items={[
            "Available for high-impact AI systems",
            "Edge Intelligence",
            "Full-Stack Architecture",
            "Open Source",
          ]}
          className="border-y border-[var(--line)] py-4 font-display text-xl uppercase md:text-2xl"
        />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
          <div className="flex gap-6">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              data-cursor
              className="inline-flex items-center gap-2 transition-colors hover:text-[var(--fg)]"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor
              className="inline-flex items-center gap-2 transition-colors hover:text-[var(--fg)]"
            >
              <Linkedin className="h-3.5 w-3.5" />
              LinkedIn
            </a>
            {profile.socials.telegram && (
              <a
                href={profile.socials.telegram}
                target="_blank"
                rel="noreferrer"
                data-cursor
                className="inline-flex items-center gap-2 transition-colors hover:text-[var(--fg)]"
              >
                <Send className="h-3.5 w-3.5" />
                Telegram
              </a>
            )}
          </div>
          <p>© 2026 {profile.brand} — built in the dark</p>
          <button
            onClick={() => scrollToTarget(0)}
            data-cursor
            className="inline-flex items-center gap-2 transition-colors hover:text-[var(--fg)]"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
