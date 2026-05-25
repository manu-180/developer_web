import { trustedBy } from "@/lib/data";

export function TrustedMarquee() {
  const items = [...trustedBy, ...trustedBy];
  return (
    <section
      aria-label="Empresas que confían"
      className="relative border-y border-line/70 bg-bg-elev/40 py-7 md:py-9 overflow-hidden"
    >
      <div className="flex items-center gap-12 md:gap-20 marquee-track whitespace-nowrap">
        {items.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex items-center gap-3 text-fg-muted"
          >
            <Bullet />
            <span className="h-display text-[1.4rem] md:text-[1.8rem] text-fg/85 tracking-tight">
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Bullet() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path
        d="M9 0 L11 7 L18 9 L11 11 L9 18 L7 11 L0 9 L7 7 Z"
        fill="rgb(var(--accent))"
        opacity={0.9}
      />
    </svg>
  );
}
