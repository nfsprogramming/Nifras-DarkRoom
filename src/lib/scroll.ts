import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToTarget(target: string | number) {
  if (lenis) {
    lenis.scrollTo(target as never, { duration: 1.4 });
    return;
  }
  if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
}
