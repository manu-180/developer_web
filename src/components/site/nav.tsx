"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function update() {
      try {
        const t = new Date().toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: site.tz,
        });
        setTime(t);
      } catch {
        setTime("--:--");
      }
    }
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[80] transition-all duration-500",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className="mx-auto max-w-[1480px] px-5 md:px-10">
          <div
            className={cn(
              "flex items-center justify-between rounded-full border transition-all duration-500",
              scrolled
                ? "border-line-strong/60 bg-bg/70 backdrop-blur-xl px-3 py-2 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.6)]"
                : "border-transparent bg-transparent px-1 py-1"
            )}
          >
            <a
              href="#top"
              className="group flex items-center gap-3 pl-2 pr-4 py-1.5"
              aria-label="Inicio"
              data-cursor="link"
            >
              <span className="relative grid h-7 w-7 place-items-center overflow-hidden rounded-full bg-fg text-bg">
                <span className="absolute inset-0 grid place-items-center transition-transform duration-500 group-hover:-translate-y-full">
                  <Logo />
                </span>
                <span className="absolute inset-0 grid translate-y-full place-items-center bg-accent text-accent-ink transition-transform duration-500 group-hover:translate-y-0">
                  <Logo />
                </span>
              </span>
              <span className="hidden sm:flex items-baseline gap-1.5 text-[0.92rem] tracking-tight">
                <span className="font-medium">Augusto Vega</span>
                <span className="text-fg-faint">— Ingeniero Creativo</span>
              </span>
            </a>

            <nav className="hidden md:flex items-center gap-1">
              {site.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  data-cursor="link"
                  className="group relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.86rem] text-fg-muted transition-colors hover:text-fg"
                >
                  <span className="font-mono text-[0.6rem] text-fg-faint group-hover:text-accent transition-colors">
                    {item.num}
                  </span>
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 text-[0.74rem] text-fg-muted">
                <span className="relative grid place-items-center">
                  <span className="absolute inline-block h-2 w-2 rounded-full bg-accent opacity-70 animate-ping" />
                  <span className="relative inline-block h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="font-mono uppercase tracking-wider">
                  BA · {time || "--:--"}
                </span>
              </div>
              <a
                href="#contact"
                data-cursor="link"
                className="btn-pill btn-pill--solid h-10 px-4 text-[0.86rem]"
              >
                Iniciar un proyecto
                <ArrowRight />
              </a>
              <button
                type="button"
                aria-label="Abrir menú"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                data-cursor="link"
                className="md:hidden relative grid h-10 w-10 place-items-center rounded-full border border-line-strong/60 text-fg"
              >
                <span
                  className={cn(
                    "absolute h-px w-4 bg-current transition-all duration-300",
                    open ? "rotate-45" : "-translate-y-1"
                  )}
                />
                <span
                  className={cn(
                    "absolute h-px w-4 bg-current transition-all duration-300",
                    open ? "-rotate-45" : "translate-y-1"
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[78] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-bg"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            />
            <div className="relative flex h-full flex-col px-6 pt-24 pb-10">
              <ul className="flex flex-1 flex-col gap-2">
                {site.nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.5 }}
                  >
                    <a
                      onClick={() => setOpen(false)}
                      href={item.href}
                      className="group flex items-baseline justify-between border-b border-line/70 py-4"
                    >
                      <span className="h-display text-5xl">{item.label}</span>
                      <span className="font-mono text-xs text-fg-faint group-hover:text-accent">
                        {item.num}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 border-t border-line/70 pt-6 text-sm text-fg-muted">
                <span className="font-mono uppercase tracking-wider text-[0.7rem]">
                  hello@augustovega.dev
                </span>
                <div className="flex gap-4">
                  {site.social.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="text-fg hover:text-accent"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Logo() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden>
      <path
        d="M2 14 L8 2 L14 14 M4.5 10 L11.5 10"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <path
        d="M3 7 H11 M7 3 L11 7 L7 11"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
