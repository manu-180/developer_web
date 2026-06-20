"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/data";

function formatTime(tz: string): string {
  try {
    return new Date().toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: tz,
    });
  } catch {
    return "--:--:--";
  }
}

export function Footer() {
  const [time, setTime] = useState("");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setTime(formatTime(site.tz));

    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;

    let interval: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (interval !== null) return;
      setTime(formatTime(site.tz));
      interval = setInterval(() => setTime(formatTime(site.tz)), 1000);
    };
    const stop = () => {
      if (interval === null) return;
      clearInterval(interval);
      interval = null;
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) start();
          else stop();
        }
      },
      { threshold: 0 }
    );
    io.observe(el);

    const onVisibility = () => {
      if (document.hidden) stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <footer
      ref={ref}
      className="relative isolate border-t border-line/60 bg-bg pt-16 md:pt-24"
    >
      <div className="mx-auto max-w-[1480px] px-5 md:px-10">
        {/* Top grid */}
        <div className="grid grid-cols-12 gap-y-10 gap-x-6 pb-16">
          {/* Brand col */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
            <span className="eyebrow">Notas finales · 007</span>
            <p className="max-w-md text-[1.05rem] leading-relaxed text-fg-muted text-pretty">
              Tomo dos proyectos más este año. Si el tuyo es uno de ellos,
              escribime una línea.
            </p>
            <a
              href={`mailto:${site.email}`}
              data-cursor="link"
              className="mt-2 inline-flex items-center gap-2 text-[0.96rem] text-fg underline-offset-4 hover:underline"
            >
              {site.email}
              <span aria-hidden>↗</span>
            </a>
          </div>

          {/* Sitemap */}
          <FooterCol title="Mapa del sitio">
            {site.nav.map((n) => (
              <FootLink key={n.href} href={n.href}>
                {n.label}
              </FootLink>
            ))}
          </FooterCol>

          {/* Social */}
          <FooterCol title="En otros lados">
            {site.social.map((s) => (
              <FootLink key={s.label} href={s.href} external>
                {s.label}
              </FootLink>
            ))}
          </FooterCol>

          {/* Now */}
          <FooterCol title="Ahora">
            <Cell k="Hora" v={time || "--:--:--"} mono />
            <Cell k="Ciudad" v="Buenos Aires" />
            <Cell k="Clima" v="14º · despejado" />
          </FooterCol>
        </div>

        {/* Mega wordmark */}
        <div className="overflow-hidden">
          <div className="-mx-2 select-none">
            <div className="h-display text-fg leading-[0.78] tracking-[-0.06em] text-[clamp(3.6rem,14vw,13rem)]">
              AUGUSTO
            </div>
            <div className="h-display-italic flex items-baseline justify-between text-accent leading-[0.78] tracking-[-0.06em] text-[clamp(3.6rem,14vw,13rem)]">
              <span>vega</span>
              <span className="h-display text-fg-muted text-[clamp(1rem,1.4vw,1.6rem)] tracking-[0.18em] uppercase font-sans">
                © 2017–2026
              </span>
            </div>
          </div>
        </div>

        {/* Colophon */}
        <div className="flex flex-col gap-3 border-t border-line/70 py-6 text-[0.78rem] text-fg-muted md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <span className="font-mono uppercase tracking-[0.16em]">
              Hecho en Buenos Aires · Alojado en el edge · Pensado para durar más que la tendencia
            </span>
            <ApexCredit />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono uppercase tracking-[0.16em]">
              Versión · v.06 · {time?.slice(0, 5) || ""}
            </span>
            <a
              href="#top"
              data-cursor="link"
              className="inline-flex items-center gap-1.5 text-fg hover:text-accent"
            >
              ↑ Volver arriba
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Crédito de autoría del estudio. Backlink dofollow, visible y legible:
 * micro-tipografía mono al tono del colofón, monograma "A" en SVG inline
 * (sin recursos externos) y hover que revela el acento de la marca.
 */
function ApexCredit() {
  return (
    <span className="flex items-center gap-3 md:before:mr-1 md:before:h-3 md:before:w-px md:before:bg-line-strong/70 md:before:content-['']">
      <a
        href="https://www.theapexweb.com"
        target="_blank"
        rel="noopener nofollow"
        data-cursor="link"
        aria-label="Creado por APEX — abre theapexweb.com en una pestaña nueva"
        className="group/apex inline-flex items-center gap-1.5 font-mono uppercase tracking-[0.16em] text-fg-muted transition-colors duration-300 hover:text-fg focus-visible:text-fg focus-visible:outline-none"
      >
        <span
          aria-hidden
          className="grid h-[1.15rem] w-[1.15rem] place-items-center rounded-[5px] border border-line-strong/80 text-[0.62rem] font-semibold leading-none tracking-normal text-fg-faint transition-colors duration-300 group-hover/apex:border-accent group-hover/apex:text-accent group-focus-visible/apex:border-accent group-focus-visible/apex:text-accent"
        >
          A
        </span>
        <span>
          Creado por{" "}
          <span className="text-fg/90 transition-colors duration-300 group-hover/apex:text-accent group-focus-visible/apex:text-accent">
            APEX
          </span>
        </span>
      </a>
    </span>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="col-span-6 md:col-span-2 flex flex-col gap-3">
      <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-fg-faint">
        {title}
      </span>
      <ul className="flex flex-col gap-1.5">{children}</ul>
    </div>
  );
}

function FootLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        data-cursor="link"
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        className="inline-flex items-center gap-1 text-[0.92rem] text-fg/85 transition-colors hover:text-accent"
      >
        {children}
        {external && <span aria-hidden className="text-fg-faint">↗</span>}
      </a>
    </li>
  );
}

function Cell({ k, v, mono = false }: { k: string; v: string; mono?: boolean }) {
  return (
    <li className="flex flex-col">
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-fg-faint">
        {k}
      </span>
      <span className={`text-[0.92rem] text-fg ${mono ? "font-mono" : ""}`}>
        {v}
      </span>
    </li>
  );
}
