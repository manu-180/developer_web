"use client";

import { useEffect, useRef } from "react";

type Mode = "idle" | "link" | "drag";

const LINK_SELECTOR =
  'a, button, [data-cursor="link"], [role="button"], input, textarea, select, label';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let rafId = 0;
    let mode: Mode = "idle";
    let hidden = true;
    let lastHoverCheck = 0;

    const setMode = (next: Mode) => {
      if (next === mode) return;
      mode = next;
      ring.dataset.mode = next;
      dot.dataset.mode = next;
    };

    const setHidden = (h: boolean) => {
      if (h === hidden) return;
      hidden = h;
      ring.dataset.hidden = h ? "1" : "0";
      dot.dataset.hidden = h ? "1" : "0";
    };

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      if (hidden) setHidden(false);

      // Throttle hover-state detection to ~60fps to avoid hot paths
      const now = e.timeStamp;
      if (now - lastHoverCheck < 16) return;
      lastHoverCheck = now;

      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest('[data-cursor="drag"]')) setMode("drag");
      else if (t.closest(LINK_SELECTOR)) setMode("link");
      else setMode("idle");
    }

    function onLeave() {
      setHidden(true);
    }
    function onEnter() {
      setHidden(false);
    }

    function loop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dot!.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      ring!.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave, { passive: true });
    window.addEventListener("mouseenter", onEnter, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        data-mode="idle"
        data-hidden="1"
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[120] hidden md:block"
      />
      <div
        ref={ringRef}
        aria-hidden
        data-mode="idle"
        data-hidden="1"
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[119] hidden md:block"
      />
    </>
  );
}
