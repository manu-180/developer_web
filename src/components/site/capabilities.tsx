"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { capabilities } from "@/lib/data";
import { cn } from "@/lib/utils";

export function CapabilitiesGrid() {
  return (
    <section
      id="capabilities"
      className="relative isolate border-t border-line/60 bg-bg py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1480px] px-5 md:px-10">
        <div className="mb-12 flex flex-col items-start gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-2xl flex-col gap-3">
            <span className="eyebrow">Capacidades · 003</span>
            <h2 className="h-display text-balance text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[0.95] tracking-[-0.03em]">
              Lo que aporto a la
              <br />
              <span className="h-display-italic text-accent">primera llamada.</span>
            </h2>
          </div>
          <p className="max-w-md text-[1rem] text-fg-muted text-pretty">
            Cubro toda la superficie técnico-creativa — desde el primer mood
            board hasta un stack de producción desplegado, observable y monitoreado.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-12 gap-3 md:gap-4">
          <BentoCard className="col-span-12 md:col-span-7 md:row-span-2 min-h-[420px]" cap={capabilities[0]}>
            <BuildCard />
          </BentoCard>
          <BentoCard className="col-span-12 md:col-span-5 min-h-[280px]" cap={capabilities[1]}>
            <GraphicsCard />
          </BentoCard>
          <BentoCard className="col-span-12 md:col-span-5 min-h-[280px]" cap={capabilities[2]}>
            <DesignCard />
          </BentoCard>
          <BentoCard className="col-span-12 md:col-span-4 min-h-[260px]" cap={capabilities[3]}>
            <PerfCard />
          </BentoCard>
          <BentoCard className="col-span-12 md:col-span-4 min-h-[260px]" cap={capabilities[4]}>
            <BackCard />
          </BentoCard>
          <BentoCard className="col-span-12 md:col-span-4 min-h-[260px]" cap={capabilities[5]}>
            <LeadCard />
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  className,
  cap,
  children,
}: {
  className?: string;
  cap: (typeof capabilities)[number];
  children: React.ReactNode;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-line/80 bg-bg-elev/40 p-6 transition-colors duration-500 hover:border-line-strong/80 md:p-8",
        className
      )}
    >
      {/* Animated artwork area */}
      <div className="relative flex-1 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-2xl border-b border-line/70 bg-bg-soft/40 md:-mx-8 md:-mt-8">
        {children}
      </div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-fg-faint">
            {cap.tag}
          </span>
          <h3 className="mt-1 h-sans-tight text-[1.4rem] md:text-[1.55rem] text-fg">
            {cap.title}
          </h3>
        </div>
        <ArrowOut />
      </div>
      <p className="mt-3 text-[0.93rem] leading-relaxed text-fg-muted text-pretty">
        {cap.body}
      </p>
    </motion.article>
  );
}

function ArrowOut() {
  return (
    <span
      aria-hidden
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line/80 text-fg transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink"
    >
      <svg width="12" height="12" viewBox="0 0 12 12">
        <path
          d="M3 9 L9 3 M5 3 L9 3 L9 7"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/* ---------------- INDIVIDUAL CARD ANIMATIONS ---------------- */

function BuildCard() {
  const lines = [
    { c: "const", t: " obra" },
    { c: "=", t: " await diseño.ingeniero({" },
    { c: "  intencion:", t: ' "sentir viva",' },
    { c: "  motion:", t: " physics.spring," },
    { c: "  build:", t: " produccion.primero," },
    { c: "  perf:", t: " { lcp: 0.9, cls: 0 }" },
    { c: "})", t: "" },
    { c: "// entregado", t: " 47 veces" },
  ];
  return (
    <div className="relative h-full min-h-[260px] w-full p-6 md:p-8">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 pb-4">
        <span className="h-2.5 w-2.5 rounded-full bg-fg-faint/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg-faint/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg-faint/60" />
        <span className="ml-3 font-mono text-[0.7rem] text-fg-faint">
          obra.ts — augustovega/sitio
        </span>
      </div>
      <pre className="font-mono text-[0.85rem] leading-relaxed text-fg-muted">
        {lines.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.08 * i, duration: 0.5 }}
            className="flex items-baseline gap-2"
          >
            <span className="select-none text-fg-faint/60 w-5 text-right">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="text-accent">{l.c}</span>
              <span>{l.t}</span>
            </span>
          </motion.div>
        ))}
      </pre>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg-elev/90 to-transparent" />
    </div>
  );
}

function GraphicsCard() {
  const r2 = (n: number) => Number(n.toFixed(2));
  return (
    <div className="relative h-full w-full">
      <motion.div
        className="absolute inset-0 grid place-items-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        <svg viewBox="-100 -100 200 200" width="100%" height="100%">
          {[...Array(14)].map((_, i) => {
            const a = (i / 14) * Math.PI * 2;
            return (
              <g key={i} transform={`rotate(${r2((i / 14) * 360)})`}>
                <line
                  x1="0"
                  y1="-70"
                  x2="0"
                  y2="-95"
                  stroke="rgb(var(--accent))"
                  strokeOpacity="0.4"
                />
                <circle
                  cx={r2(Math.cos(a) * 50)}
                  cy={r2(Math.sin(a) * 50)}
                  r="1.6"
                  fill="rgb(var(--accent))"
                />
              </g>
            );
          })}
          {/* Icosphere lines */}
          {[0, 20, 40, 60, 80, 100, 120, 140, 160].map((r) => (
            <ellipse
              key={r}
              cx="0"
              cy="0"
              rx="70"
              ry="22"
              transform={`rotate(${r})`}
              fill="none"
              stroke="rgb(245,244,238)"
              strokeOpacity="0.18"
            />
          ))}
        </svg>
      </motion.div>
      <div className="pointer-events-none absolute bottom-4 left-5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-fg-faint">
        GLSL · 1024 vértices · 120fps
      </div>
    </div>
  );
}

function DesignCard() {
  const swatches = [
    { c: "#0A0A0B", n: "tinta" },
    { c: "#F5F4EE", n: "crema" },
    { c: "#C8FF00", n: "lima" },
    { c: "#FF5A3C", n: "cálido" },
    { c: "#9AB7FF", n: "frío" },
  ];
  return (
    <div className="relative h-full w-full p-6 md:p-8">
      <div className="flex flex-col gap-3">
        {swatches.map((s, i) => (
          <motion.div
            key={s.c}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <span
              className="block h-7 w-7 rounded-md border border-line/70"
              style={{ background: s.c }}
            />
            <span className="font-mono text-[0.74rem] uppercase tracking-[0.16em] text-fg-muted">
              token / {s.n}
            </span>
            <span className="ml-auto font-mono text-[0.7rem] text-fg-faint">
              {s.c}
            </span>
          </motion.div>
        ))}
      </div>
      <span className="pointer-events-none absolute right-5 bottom-5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fg-faint">
        Figma → Tokens → CSS
      </span>

    </div>
  );
}

function PerfCard() {
  const [pct, setPct] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setPct(99);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const C = 2 * Math.PI * 56;

  return (
    <div ref={ref} className="relative grid h-full w-full place-items-center p-6">
      <svg width="160" height="160" viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r="56"
          stroke="rgb(var(--line-strong))"
          strokeWidth="6"
          fill="none"
        />
        <motion.circle
          cx="70"
          cy="70"
          r="56"
          stroke="rgb(var(--accent))"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={{ strokeDashoffset: C - (C * pct) / 100 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <text
          x="70"
          y="76"
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize="34"
          fill="rgb(245,244,238)"
        >
          {pct}
        </text>
      </svg>
      <span className="pointer-events-none absolute bottom-4 left-5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-fg-faint">
        Lighthouse · móvil
      </span>
    </div>
  );
}

function BackCard() {
  const logs = [
    "INFO  · edge-fn  · 200 · 38ms",
    "WARN  · cola     · reintento n=1",
    "INFO  · supabase · rls=ok",
    "INFO  · webhook  · stripe·pagado",
    "INFO  · sistema  · ↗ desplegado",
  ];
  return (
    <div className="relative h-full w-full p-6 md:p-8">
      <div className="font-mono text-[0.78rem] leading-relaxed text-fg-muted">
        {logs.map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            className="flex items-start gap-3"
          >
            <span className="text-fg-faint">{String(i + 1).padStart(2, "0")}</span>
            <span className={i === 4 ? "text-accent" : ""}>{l}</span>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
        <span className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-fg-faint">
          en vivo · /healthz · ok
        </span>
      </div>
    </div>
  );
}

function LeadCard() {
  const steps = [
    { label: "Resumen", w: "20%" },
    { label: "Dirección", w: "40%" },
    { label: "Desarrollo", w: "75%" },
    { label: "Entrega", w: "100%" },
  ];
  return (
    <div className="relative h-full w-full p-6 md:p-8">
      <div className="flex flex-col gap-4">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="w-16 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg-muted">
              {s.label}
            </span>
            <span className="relative h-px flex-1 bg-line-strong/70">
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: s.w }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.1, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 top-0 block h-px bg-accent"
              />
            </span>
            <span className="font-mono text-[0.66rem] text-fg-faint">{s.w}</span>
          </div>
        ))}
      </div>
      <span className="mt-6 block font-mono text-[0.66rem] uppercase tracking-[0.18em] text-fg-faint">
        4 semanas · 2 revisores · 1 autor
      </span>
    </div>
  );
}

