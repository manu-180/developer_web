"use client";

import { useEffect } from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let cancelled = false;
    let rafId = 0;
    type LenisInstance = {
      raf: (time: number) => void;
      destroy: () => void;
    };
    let lenis: LenisInstance | null = null;

    (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }) as unknown as LenisInstance;
      (window as unknown as { __lenis?: LenisInstance }).__lenis = lenis;

      function raf(time: number) {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      lenis?.destroy();
      (window as unknown as { __lenis?: unknown }).__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
