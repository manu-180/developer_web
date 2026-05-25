"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { work } from "@/lib/data";
import { cn } from "@/lib/utils";

export function WorkGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Horizontal translate
  const cardWidthVW = 65; // approx total span per card incl gap
  const totalCards = work.length;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [`0vw`, `-${cardWidthVW * (totalCards - 1) + 18}vw`]
  );

  const progressBar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const counter = useTransform(scrollYProgress, (v) =>
    String(Math.min(totalCards, Math.max(1, Math.floor(v * totalCards) + 1))).padStart(2, "0")
  );

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative bg-bg"
      style={{ height: `${totalCards * 110}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Section header */}
        <div className="relative z-10 mx-auto flex w-full max-w-[1480px] items-end justify-between px-5 pt-16 md:px-10 md:pt-20">
          <div className="flex flex-col gap-2">
            <span className="eyebrow">Trabajos seleccionados · 002</span>
            <h2 className="h-display text-[clamp(2.2rem,5vw,4.2rem)] leading-none tracking-[-0.03em]">
              La estantería.
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-4 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-fg-muted">
            <span>Arrastrar · desplazar</span>
            <motion.span className="text-accent">{counter}</motion.span>
            <span>/</span>
            <span>{String(totalCards).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="relative flex flex-1 items-center">
          <motion.div
            style={{ x }}
            className="flex items-center gap-8 pl-5 md:pl-10 will-change-transform"
          >
            {work.map((item, i) => (
              <ProjectCard key={item.name} item={item} index={i} />
            ))}
            <div className="w-[10vw] shrink-0" aria-hidden />
          </motion.div>
        </div>

        {/* Bottom progress rail */}
        <div className="relative z-10 mx-auto w-full max-w-[1480px] px-5 pb-12 md:px-10 md:pb-20">
          <div className="relative h-px w-full bg-line-strong/70">
            <motion.div
              style={{ width: progressBar }}
              className="absolute left-0 top-0 h-px bg-accent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  item,
  index,
}: {
  item: (typeof work)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 8).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(x * 30).toFixed(2)}px`);
    el.style.setProperty("--my", `${(y * 30).toFixed(2)}px`);
  }
  function onLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
    el.style.setProperty("--mx", `0px`);
    el.style.setProperty("--my", `0px`);
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="drag"
      className="group relative h-[64vh] w-[55vw] max-w-[820px] shrink-0 rounded-3xl border border-line/80 bg-bg-elev/60 p-1.5 transition-transform duration-300 ease-out"
      style={{
        transform:
          "perspective(1400px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
      }}
    >
      {/* Artwork */}
      <div
        className="relative h-[58%] w-full overflow-hidden rounded-2xl border border-line/70"
        style={{
          background: `radial-gradient(120% 100% at 0% 0%, ${item.accent}40 0%, transparent 60%), radial-gradient(120% 100% at 100% 100%, ${item.accent}28 0%, transparent 70%), linear-gradient(160deg, #161618 0%, #0c0c0d 100%)`,
        }}
      >
        {/* Generative artwork */}
        <ProjectArtwork accent={item.accent} index={index} />

        {/* Top meta on artwork */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-5 md:p-6">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-fg-faint">
            {item.n} · {item.year}
          </span>
          <span
            className="rounded-full border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] backdrop-blur-md"
            style={{
              borderColor: `${item.accent}66`,
              color: item.accent,
              background: `${item.accent}10`,
            }}
          >
            ↗ Ver caso
          </span>
        </div>

        {/* Floating artwork transform layer */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            transform: "translate3d(var(--mx, 0), var(--my, 0), 0)",
          }}
        />
      </div>

      {/* Card meta */}
      <div className="grid grid-cols-12 gap-3 px-2 pb-1 pt-5">
        <div className="col-span-7 flex flex-col gap-1">
          <h3 className="h-display text-[1.7rem] md:text-[2rem] leading-none tracking-[-0.02em]">
            {item.name}
          </h3>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg-faint">
            {item.client}
          </span>
        </div>
        <div className="col-span-5 flex flex-col items-end gap-1 text-right">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg-muted">
            {item.role}
          </span>
          <div className="flex flex-wrap justify-end gap-1.5">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line/80 bg-bg/70 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.15em] text-fg-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <p className="col-span-12 mt-2 text-[0.92rem] leading-relaxed text-fg-muted text-pretty">
          {item.blurb}
        </p>
      </div>

      {/* Number ghost */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -left-1 -top-8 h-display select-none text-[8rem] leading-none text-fg/[0.03]"
        )}
      >
        {item.n}
      </span>
    </div>
  );
}

function ProjectArtwork({ accent, index }: { accent: string; index: number }) {
  // Each project has a distinct procedural artwork
  if (index === 0) return <ArtGlobe accent={accent} />;
  if (index === 1) return <ArtFragrance accent={accent} />;
  if (index === 2) return <ArtCanvas accent={accent} />;
  if (index === 3) return <ArtData accent={accent} />;
  if (index === 4) return <ArtTerrain accent={accent} />;
  return <ArtWaveform accent={accent} />;
}

const r = (n: number, p = 2) => Number(n.toFixed(p));

function ArtGlobe({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 600 400" className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="glb-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.4" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="300" cy="220" r="180" fill="url(#glb-g)" />
        {[...Array(12)].map((_, i) => (
          <ellipse
            key={i}
            cx="300"
            cy="220"
            rx={180 - i * 6}
            ry={r((180 - i * 6) * 0.32)}
            fill="none"
            stroke={accent}
            strokeOpacity={r(0.18 + (i % 3) * 0.06)}
            transform={`rotate(${i * 12} 300 220)`}
          />
        ))}
        {[...Array(80)].map((_, i) => (
          <circle
            key={`p-${i}`}
            cx={r(300 + Math.cos(i) * (140 + ((i * 17) % 60)))}
            cy={r(220 + Math.sin(i * 1.3) * (60 + ((i * 11) % 40)))}
            r="1.2"
            fill={accent}
            opacity={r(0.6 + ((i * 13) % 10) / 25)}
          />
        ))}
      </svg>
      <div className="absolute bottom-5 left-5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg-muted">
        Buques rastreados · 14.082
      </div>
    </div>
  );
}

function ArtFragrance({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 600 400" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="ff" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(36)].map((_, i) => (
          <path
            key={i}
            d={`M ${20 + i * 16} 80 C ${100 + i * 12} ${200 + (i % 3) * 20}, ${200 + i * 8} ${320 - (i % 4) * 30}, ${560 - i * 6} ${220 + (i % 5) * 10}`}
            stroke={accent}
            strokeOpacity={r(0.08 + (i % 5) * 0.04)}
            fill="none"
            strokeWidth={i % 4 === 0 ? 1 : 0.5}
          />
        ))}
        <text
          x="40"
          y="370"
          fill="rgb(245,244,238)"
          fontFamily="ui-serif, Georgia"
          fontStyle="italic"
          fontSize="42"
          opacity="0.8"
        >
          Nº 04 / Víspera
        </text>
      </svg>
    </div>
  );
}

function ArtCanvas({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 600 400" className="absolute inset-0 h-full w-full">
        <g stroke={accent} strokeOpacity="0.45" fill="none">
          {[...Array(7)].map((_, r) =>
            [...Array(11)].map((__, c) => {
              const x = 60 + c * 50;
              const y = 50 + r * 50;
              return (
                <g key={`${r}-${c}`}>
                  <circle cx={x} cy={y} r="3" fill={accent} opacity={(r + c) % 3 === 0 ? 0.9 : 0.25} />
                </g>
              );
            })
          )}
        </g>
        <g stroke={accent} strokeWidth="1.4" strokeLinecap="round" fill="none">
          <path d="M60 250 Q 200 100, 360 220 T 540 200" opacity="0.85" />
          <path d="M60 320 Q 220 230, 380 300 T 540 280" opacity="0.5" />
        </g>
        <rect x="380" y="60" width="160" height="56" rx="10" fill="rgb(10,10,11)" stroke={accent} strokeOpacity="0.4" />
        <text
          x="396"
          y="94"
          fill={accent}
          fontFamily="ui-monospace, monospace"
          fontSize="14"
        >
          $ desplegar edge
        </text>
      </svg>
    </div>
  );
}

function ArtData({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 600 400" className="absolute inset-0 h-full w-full">
        <g>
          {[...Array(40)].map((_, i) => {
            const h = r(30 + Math.abs(Math.sin(i * 0.45)) * 220);
            return (
              <rect
                key={i}
                x={40 + i * 13}
                y={r(360 - h)}
                width="6"
                height={h}
                fill={accent}
                opacity={r(0.2 + (i % 5) * 0.12)}
              />
            );
          })}
        </g>
        <line x1="40" x2="560" y1="360" y2="360" stroke="rgb(245,244,238)" strokeOpacity="0.2" />
        <text x="40" y="50" fill="rgb(245,244,238)" fontFamily="ui-monospace, monospace" fontSize="14" opacity="0.7">
          T1 · 26 — Informe LP
        </text>
        <text x="40" y="70" fill={accent} fontFamily="ui-serif" fontStyle="italic" fontSize="22" opacity="0.95">
          + 38,4% NAV
        </text>
      </svg>
    </div>
  );
}

function ArtTerrain({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 600 400" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="trn" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.32" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[...Array(16)].map((_, i) => {
          const pts: number[] = [];
          for (let x = 0; x <= 600; x += 30) {
            const y = r(
              200 + Math.sin((x + i * 30) * 0.022) * (30 + i * 6) - i * 12
            );
            pts.push(x, y);
          }
          const d = pts
            .map((v, idx) => (idx % 2 === 0 ? (idx === 0 ? "M" : "L") + v : v))
            .join(" ");
          return (
            <path
              key={i}
              d={d}
              stroke={accent}
              strokeOpacity={r(0.1 + (i / 16) * 0.5)}
              fill={i === 15 ? "url(#trn)" : "none"}
            />
          );
        })}
      </svg>
    </div>
  );
}

function ArtWaveform({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 600 400" className="absolute inset-0 h-full w-full">
        <g>
          {[...Array(120)].map((_, i) => {
            const h = r(6 + Math.abs(Math.sin(i * 0.32) * Math.cos(i * 0.11)) * 180);
            return (
              <rect
                key={i}
                x={20 + i * 5}
                y={r(200 - h / 2)}
                width="2"
                height={h}
                fill={accent}
                opacity={r(0.3 + (i % 3) * 0.2)}
                rx="1"
              />
            );
          })}
        </g>
        <text
          x="40"
          y="370"
          fill="rgb(245,244,238)"
          fontFamily="ui-serif"
          fontStyle="italic"
          fontSize="40"
          opacity="0.85"
        >
          Lado A · ∞
        </text>
      </svg>
    </div>
  );
}
