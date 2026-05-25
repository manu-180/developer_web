"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { Magnetic } from "@/components/ui/magnetic";
import { WordsReveal, CharsReveal } from "@/components/ui/text-reveal";
import { site } from "@/lib/data";

const HeroShader = dynamic(
  () => import("@/components/three/hero-shader").then((m) => m.HeroShader),
  { ssr: false }
);

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] w-full overflow-hidden pt-24 md:pt-32"
    >
      {/* WebGL backdrop */}
      <HeroShader />

      {/* Subtle grid overlay */}
      <div className="pointer-events-none absolute inset-0 -z-[5] surface-grid opacity-[0.4]" />

      <div className="relative mx-auto flex min-h-[calc(100svh-6rem)] max-w-[1480px] flex-col justify-between gap-12 px-5 md:px-10">
        {/* Top row — status meta */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="flex items-center justify-between text-[0.72rem] font-mono uppercase tracking-[0.18em] text-fg-muted"
        >
          <div className="flex items-center gap-2">
            <span className="relative grid place-items-center">
              <span className="absolute h-2 w-2 rounded-full bg-accent animate-ping opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            <span>Disponible · T3 2026</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span>Video · 02:14</span>
            <span>Índice · 001</span>
          </div>
        </motion.div>

        {/* Headline block */}
        <div className="relative flex flex-1 items-center">
          <div className="w-full">
            <div className="h-display text-balance text-[clamp(2.6rem,7vw,7.5rem)] leading-[0.92] tracking-[-0.035em]">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <WordsReveal text="Ingeniero" delay={0.25} />
                <span className="h-display-italic text-accent">creativo</span>
              </div>
              <div className="mt-1 md:mt-2">
                <WordsReveal text="creando" delay={0.55} />{" "}
                <WordsReveal text="experiencias web" delay={0.7} className="text-fg" />
                <br className="hidden md:block" />
                <WordsReveal text="con movimiento." delay={0.85} className="text-fg-muted" />
              </div>
            </div>

            {/* Sub line */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8 }}
              className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-fg-muted text-pretty"
            >
              Soy {site.name}, ingeniero creativo independiente de{" "}
              <span className="text-fg">Buenos Aires</span>. Diseño y construyo sitios que se sienten
              vivos — combinando movimiento, 3D y un profundo respeto por el rendimiento.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <a href="#work" data-cursor="link" className="btn-pill btn-pill--solid">
                  Ver proyectos seleccionados
                  <span aria-hidden>→</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" data-cursor="link" className="btn-pill btn-pill--ghost">
                  <span className="relative grid h-2 w-2 place-items-center">
                    <span className="absolute h-2 w-2 rounded-full bg-accent animate-ping opacity-70" />
                    <span className="relative h-2 w-2 rounded-full bg-accent" />
                  </span>
                  Iniciar un proyecto
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>

        {/* Bottom meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="grid grid-cols-2 gap-6 border-t border-line/70 pt-6 pb-8 md:grid-cols-4 md:pb-10"
        >
          {[
            { k: "Lat. / Lon.", v: "−34.61 · −58.38" },
            { k: "Disciplina", v: "Ingeniería de Diseño" },
            { k: "Tecnologías", v: "Next · R3F · GLSL" },
            { k: "Video", v: "↘ 02:14" },
          ].map((cell) => (
            <div key={cell.k} className="flex flex-col gap-1">
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-fg-faint">
                {cell.k}
              </span>
              <span className="text-[0.95rem] text-fg">{cell.v}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Side rail — large vertical wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 rotate-90 origin-right font-mono text-[0.7rem] uppercase tracking-[0.4em] text-fg-faint xl:block"
      >
        Índice · 2017 → 2026 · Trabajos seleccionados
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[0.65rem] font-mono uppercase tracking-[0.25em] text-fg-faint"
      >
        <span>Desplazar</span>
        <span className="relative inline-block h-8 w-px overflow-hidden bg-line-strong">
          <motion.span
            className="absolute left-0 top-0 block h-2 w-full bg-accent"
            animate={{ y: [0, 24, 24], opacity: [1, 1, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </span>
      </motion.div>

      {/* Floating availability badge for the heroNAME signature */}
      <div className="pointer-events-none absolute right-5 top-32 hidden md:flex md:right-10 md:top-44 flex-col items-end gap-1">
        <CharsReveal
          text="A.V."
          delay={1.6}
          stagger={0.06}
          className="h-display text-5xl leading-none text-fg"
        />
        <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-fg-faint">
          ©2026
        </span>
      </div>
    </section>
  );
}
