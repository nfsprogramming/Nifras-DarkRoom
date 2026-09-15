import type { CSSProperties } from "react";
import { cn } from "../lib/utils";

interface Props {
  items: string[];
  className?: string;
  reverse?: boolean;
  duration?: number;
}

export default function Marquee({ items, className, reverse, duration = 24 }: Props) {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <span key={i} className="flex items-center whitespace-nowrap">
          <span className="px-6">{it}</span>
          <span className="text-[var(--accent)]">✕</span>
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn("marquee relative overflow-hidden", className)}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div className={cn("marquee-track flex w-max", reverse && "marquee-reverse")}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
