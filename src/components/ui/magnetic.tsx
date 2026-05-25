"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  strength?: number;
  as?: "div" | "span";
  children: React.ReactNode;
};

export function Magnetic({
  children,
  className,
  strength = 28,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let active = false;
    let visible = false;
    let listening = false;

    function onMove(e: MouseEvent) {
      if (!el || !visible) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(x, y);
      const max = Math.max(r.width, r.height) * 1.1;
      if (dist > max) {
        tx = 0;
        ty = 0;
        if (active && Math.abs(cx) < 0.1 && Math.abs(cy) < 0.1) {
          active = false;
        }
      } else {
        const f = (1 - dist / max) * strength;
        tx = (x / dist || 0) * f;
        ty = (y / dist || 0) * f;
        active = true;
      }
    }

    function loop() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (el) {
        el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    }

    function onLeave() {
      tx = 0;
      ty = 0;
    }

    function attach() {
      if (listening) return;
      listening = true;
      window.addEventListener("mousemove", onMove, { passive: true });
      el!.addEventListener("mouseleave", onLeave, { passive: true });
      raf = requestAnimationFrame(loop);
    }

    function detach() {
      if (!listening) return;
      listening = false;
      window.removeEventListener("mousemove", onMove);
      el!.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      // Reset transform when out of view
      if (el) el.style.transform = "";
      tx = ty = cx = cy = 0;
      active = false;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible = entry.isIntersecting;
          if (visible) attach();
          else detach();
        }
      },
      { rootMargin: "20% 0px", threshold: 0 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      detach();
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={cn("inline-block will-change-transform", className)}
      {...rest}
    >
      {children}
    </div>
  );
}
