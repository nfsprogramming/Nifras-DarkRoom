import { forwardRef } from "react";

const ANGLES = [0, 60, 120, 180, 240, 300];

const Reel = forwardRef<SVGSVGElement, { className?: string }>(
  function Reel({ className }, ref) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 100 100"
        fill="none"
        className={className}
        aria-hidden
      >
        <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2" />
        {ANGLES.map((a) => {
          const rad = (a * Math.PI) / 180;
          const cx = 50 + 29 * Math.cos(rad);
          const cy = 50 + 29 * Math.sin(rad);
          return (
            <circle
              key={a}
              cx={cx}
              cy={cy}
              r="9"
              stroke="currentColor"
              strokeWidth="2"
            />
          );
        })}
      </svg>
    );
  }
);

export default Reel;
