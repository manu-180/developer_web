"use client";

import { testimonials } from "@/lib/data";

export function Testimonials() {
  // Split into two rows for the dual marquee
  const half = Math.ceil(testimonials.length / 2);
  const row1 = [...testimonials.slice(0, half), ...testimonials.slice(0, half)];
  const row2 = [...testimonials.slice(half), ...testimonials.slice(half)];

  return (
    <section
      aria-label="Testimonios"
      className="relative isolate border-t border-line/60 bg-bg py-24 md:py-32 overflow-hidden"
    >
      <div className="mx-auto mb-12 max-w-[1480px] px-5 md:mb-16 md:px-10">
        <div className="flex flex-col gap-3">
          <span className="eyebrow">Testimonios · 005</span>
          <h2 className="h-display text-balance text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.96] tracking-[-0.03em]">
            La gente con la que trabajé
            <br />
            <span className="h-display-italic text-fg-muted">dice cosas lindas.</span>
          </h2>
        </div>
      </div>

      {/* Row 1 */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-bg to-transparent" />
        <div className="flex w-max gap-6 marquee-track whitespace-normal pr-6">
          {row1.map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 (reverse) */}
      <div className="relative mt-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-bg to-transparent" />
        <div className="flex w-max gap-6 marquee-track-rev whitespace-normal pr-6">
          {row2.map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} variant="mute" />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  t,
  variant = "default",
}: {
  t: (typeof testimonials)[number];
  variant?: "default" | "mute";
}) {
  return (
    <figure
      className={`shrink-0 w-[420px] md:w-[520px] rounded-2xl border border-line/80 ${
        variant === "mute" ? "bg-bg-soft/40" : "bg-bg-elev/60"
      } p-6 md:p-8 flex flex-col gap-6`}
    >
      <span aria-hidden className="h-display text-5xl leading-none text-accent">
        &ldquo;
      </span>
      <blockquote className="text-[1.02rem] leading-relaxed text-fg text-pretty">
        {t.quote}
      </blockquote>
      <figcaption className="mt-auto flex items-center justify-between gap-4 border-t border-line/70 pt-4">
        <div>
          <div className="text-[0.95rem] text-fg">{t.name}</div>
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg-faint">
            {t.role}
          </div>
        </div>
        <Initials name={t.name} />
      </figcaption>
    </figure>
  );
}

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span className="grid h-10 w-10 place-items-center rounded-full border border-line-strong/80 bg-bg text-[0.78rem] text-fg">
      {initials}
    </span>
  );
}
