"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { SmoothScroll } from "./smooth-scroll";
import { Noise, Vignette } from "@/components/ui/overlays";

const Cursor = dynamic(
  () => import("@/components/ui/cursor").then((m) => m.Cursor),
  { ssr: false }
);

export function ClientChrome({ children }: { children: React.ReactNode }) {
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (finePointer && !reducedMotion) {
      setEnhanced(true);
    }
  }, []);

  return (
    <>
      <SmoothScroll>{children}</SmoothScroll>
      {enhanced && <Cursor />}
      <Noise />
      <Vignette />
    </>
  );
}
