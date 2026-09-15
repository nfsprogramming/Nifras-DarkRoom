import { useEffect, useRef, useState } from "react";

const GLYPHS = "▓▒░<>/|=+*#%";

interface Props {
  text: string;
  className?: string;
  trigger?: "hover" | "view";
}

export default function Scramble({ text, className, trigger = "hover" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);
  const busy = useRef(false);

  const run = () => {
    if (busy.current) return;
    busy.current = true;
    let frame = 0;
    const total = 16;
    const id = setInterval(() => {
      frame += 1;
      const reveal = Math.floor((frame / total) * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        out +=
          i < reveal
            ? text[i]
            : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setDisplay(out);
      if (frame >= total) {
        clearInterval(id);
        setDisplay(text);
        busy.current = false;
      }
    }, 34);
  };

  useEffect(() => {
    if (trigger !== "view") return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger]);

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={trigger === "hover" ? run : undefined}
    >
      {display}
    </span>
  );
}
