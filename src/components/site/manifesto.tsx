"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { manifesto } from "@/lib/data";
import { WordsReveal } from "@/components/ui/text-reveal";

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-110%"]);

  return (
    <section
      id="index"
      ref={ref}
      className="relative isolate overflow-hidden border-t border-line/60"
    >
      {/* Massive horizontal scrolling wordmark band */}
      <div className="relative py-16 md:py-24">
        <motion.div
          style={{ x }}
          className="flex items-baseline gap-10 whitespace-nowrap h-display text-[clamp(4.5rem,14vw,12rem)] leading-[0.88] tracking-[-0.045em] text-fg/90 will-change-transform"
        >
          <span>Augusto</span>
          <span className="h-display-italic text-accent">/Vega/</span>
          <span>Ingeniero</span>
          <span className="h-display-italic text-fg-muted">creativo</span>
          <span>desde</span>
          <span>2017</span>
          <span>·</span>
        </motion.div>
      </div>

      {/* Manifesto editorial block */}
      <div className="mx-auto grid max-w-[1480px] grid-cols-12 gap-x-6 gap-y-10 px-5 pb-24 md:px-10 md:pb-32">
        <div className="col-span-12 md:col-span-3">
          <span className="eyebrow">{manifesto.eyebrow}</span>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-1">
            {manifesto.facts.map((f) => (
              <div key={f.k} className="flex flex-col">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-fg-faint">
                  {f.k}
                </span>
                <span className="text-[0.95rem] text-fg">{f.v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 md:pl-8 lg:pl-16">
          <div className="h-display text-balance text-[clamp(1.9rem,3.6vw,3.6rem)] leading-[1.06] tracking-[-0.02em]">
            {manifesto.body.map((line, i) => (
              <div key={i} className="block">
                <WordsReveal
                  text={line}
                  delay={i * 0.05}
                  stagger={0.025}
                  amount={0.3}
                  className={i === 1 ? "text-fg" : i === 3 ? "text-accent" : "text-fg-muted"}
                />
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="mt-10 flex items-center gap-6"
          >
            <div className="hairline w-32" />
            <span className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-fg-muted">
              {manifesto.signature}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
