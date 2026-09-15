import { useRef, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import gsap from "gsap";

interface Props {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function Magnetic({ children, strength = 0.35, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - r.left - r.width / 2) * strength,
      y: (e.clientY - r.top - r.height / 2) * strength,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.4)" });
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      {children}
    </div>
  );
}
