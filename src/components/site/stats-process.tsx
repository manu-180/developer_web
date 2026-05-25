"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { stats, process } from "@/lib/data";
import { cn } from "@/lib/utils";

export function StatsProcess() {
  return (
    <section
      id="process"
      className="relative isolate border-t border-line/60 bg-bg py-24 md:py-32"
    >
      <Stats />
      <Process />
    </section>
  );
}

function Stats() {
  return (
    <div className="mx-auto max-w-[1480px] px-5 md:px-10">
      <div className="mb-12 flex flex-col gap-3">
        <span className="eyebrow">En números · 004</span>
        <h2 className="h-display text-balance text-[clamp(2rem,4.4vw,3.6rem)] leading-[0.96] tracking-[-0.03em]">
          Nueve años.
          <span className="h-display-italic text-fg-muted"> Pruebas adjuntas.</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line/70 md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-start gap-2 bg-bg-elev/50 p-6 md:p-8"
          >
            <Counter to={s.num} suffix={s.suffix} />
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-fg-muted">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    function tick(t: number) {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span
      ref={ref}
      className="h-display text-[clamp(2.6rem,5vw,4.2rem)] leading-none tracking-[-0.03em] text-fg"
    >
      {n}
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });
  const lineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div className="mx-auto mt-24 max-w-[1480px] px-5 md:mt-32 md:px-10">
      <div className="mb-10 flex items-end justify-between gap-6">
        <h3 className="h-display text-[clamp(1.8rem,3.4vw,2.8rem)] leading-none tracking-[-0.025em]">
          Cómo funciona.
        </h3>
        <span className="hidden md:block font-mono text-[0.7rem] uppercase tracking-[0.18em] text-fg-faint">
          Paso · 04 de 04
        </span>
      </div>

      <div ref={ref} className="relative">
        {/* Track */}
        <div className="absolute left-[18px] top-2 bottom-2 hidden w-px bg-line-strong/70 md:block" />
        <motion.div
          style={{ height: lineY }}
          className="absolute left-[18px] top-2 hidden w-px bg-accent md:block"
        />

        <ul className="grid gap-6 md:gap-12">
          {process.map((step, i) => (
            <ProcessStep key={step.n} step={step} index={i} />
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProcessStep({
  step,
  index,
}: {
  step: (typeof process)[number];
  index: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid grid-cols-12 items-start gap-4 md:gap-8 md:pl-12"
    >
      {/* Node */}
      <span
        aria-hidden
        className={cn(
          "absolute left-0 top-2 hidden h-9 w-9 place-items-center rounded-full border md:grid",
          "border-line-strong/80 bg-bg text-fg font-mono text-[0.72rem]"
        )}
      >
        {step.n}
      </span>
      <div className="col-span-12 md:col-span-3 flex items-baseline gap-2">
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-fg-faint md:hidden">
          {step.n} /
        </span>
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-fg-muted">
          {step.dur}
        </span>
      </div>
      <h4 className="col-span-12 md:col-span-3 h-display text-[clamp(1.4rem,2vw,1.8rem)] leading-tight tracking-[-0.02em] text-fg">
        {step.title}
      </h4>
      <p className="col-span-12 md:col-span-6 text-[0.96rem] leading-relaxed text-fg-muted text-pretty">
        {step.body}
      </p>
    </motion.li>
  );
}
