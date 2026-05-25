"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Magnetic } from "@/components/ui/magnetic";
import { site } from "@/lib/data";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], ["-12%", "8%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["8%", "-14%"]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative isolate overflow-hidden border-t border-line/60 py-28 md:py-40"
    >
      {/* Aurora background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 60% at 20% 30%, rgba(200,255,0,0.10) 0%, transparent 60%), radial-gradient(60% 80% at 80% 70%, rgba(154,183,255,0.06) 0%, transparent 60%), linear-gradient(180deg, #0a0a0b 0%, #0c0c0e 100%)",
        }}
      />

      <div className="mx-auto flex max-w-[1480px] flex-col items-center gap-12 px-5 md:px-10">
        <span className="eyebrow">Hablemos · 006</span>

        {/* Massive kinetic headline */}
        <motion.div
          style={{ x: x1 }}
          className="flex w-max items-baseline gap-6 h-display whitespace-nowrap text-[clamp(3rem,11vw,10rem)] leading-[0.88] tracking-[-0.04em] will-change-transform"
        >
          <span>¿Tenés algo</span>
          <Spark />
          <span className="h-display-italic text-accent">que</span>
        </motion.div>
        <motion.div
          style={{ x: x2 }}
          className="flex w-max items-baseline gap-6 h-display whitespace-nowrap text-[clamp(3rem,11vw,10rem)] leading-[0.88] tracking-[-0.04em] text-fg-muted will-change-transform"
        >
          <span>construyamos</span>
          <Arrow />
          <span className="text-fg">juntos?</span>
        </motion.div>

        {/* CTAs row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Magnetic strength={42}>
            <a
              href={`mailto:${site.email}`}
              data-cursor="link"
              className="btn-pill btn-pill--solid h-14 px-6 text-[1rem]"
            >
              {site.email}
              <span aria-hidden>↗</span>
            </a>
          </Magnetic>
          <Magnetic strength={32}>
            <a
              href={site.calendly}
              data-cursor="link"
              className="btn-pill btn-pill--ghost h-14 px-6 text-[1rem]"
            >
              Agendar reunión · 20 min
            </a>
          </Magnetic>
        </div>

        {/* Side notes */}
        <div className="mt-10 grid w-full grid-cols-2 gap-x-6 gap-y-6 border-t border-line/70 pt-8 md:grid-cols-4">
          <SideCell
            k="Reservas desde"
            v="Ago · 2026"
            note="2 de 3 lugares abiertos"
          />
          <SideCell k="Dónde" v={site.location} note="GMT-3 · ES / EN" />
          <SideCell k="Ideal para" v="Sitios de marca y producto" note="Motion de formato largo" />
          <SideCell k="Compromiso mín." v="3 semanas · USD 12k" note="Aproximadamente" />
        </div>
      </div>
    </section>
  );
}

function SideCell({ k, v, note }: { k: string; v: string; note?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-fg-faint">
        {k}
      </span>
      <span className="text-[1rem] text-fg">{v}</span>
      {note && (
        <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-fg-muted">
          ↳ {note}
        </span>
      )}
    </div>
  );
}

function Spark() {
  return (
    <svg viewBox="0 0 60 60" width="0.78em" height="0.78em" aria-hidden className="inline-block">
      <path
        d="M30 0 L34 24 L60 30 L34 36 L30 60 L26 36 L0 30 L26 24 Z"
        fill="rgb(var(--accent))"
      />
    </svg>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 80 60" width="0.92em" height="0.7em" aria-hidden className="inline-block">
      <path
        d="M0 30 L60 30 M40 6 L70 30 L40 54"
        stroke="rgb(var(--fg))"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
