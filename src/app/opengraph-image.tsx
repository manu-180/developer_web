import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Augusto Vega — Ingeniero Creativo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(80% 60% at 20% 20%, rgba(200,255,0,0.18) 0%, transparent 60%), radial-gradient(60% 80% at 90% 90%, rgba(154,183,255,0.10) 0%, transparent 60%), linear-gradient(180deg, #0a0a0b 0%, #0c0c0e 100%)",
          color: "#F5F4EE",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#A8A8AC",
          }}
        >
          <span>Augusto Vega · Portfolio · 2026</span>
          <span style={{ color: "#C8FF00" }}>• Disponible T3</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 120, lineHeight: 0.92, letterSpacing: -4, fontWeight: 500 }}>
            Ingeniero
          </div>
          <div
            style={{
              fontSize: 120,
              lineHeight: 0.92,
              letterSpacing: -4,
              fontStyle: "italic",
              color: "#C8FF00",
              fontWeight: 500,
            }}
          >
            creativo.
          </div>
          <div style={{ fontSize: 30, color: "#A8A8AC", marginTop: 16, maxWidth: 800 }}>
            Ingeniero creativo independiente que construye experiencias web inmersivas y performantes desde Buenos Aires.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#A8A8AC",
          }}
        >
          <span>augustovega.dev</span>
          <span>hello@augustovega.dev ↗</span>
        </div>
      </div>
    ),
    size
  );
}
