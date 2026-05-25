import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ClientChrome } from "@/components/providers/client-chrome";

const geistSans = Geist({
  variable: "--font-sans-pri",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-mono-pri",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
  adjustFontFallback: true,
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif-display",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["ui-serif", "Georgia", "Cambria", "Times New Roman", "serif"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://augustovega.dev"),
  title: {
    default: "Augusto Vega — Ingeniero Creativo",
    template: "%s · Augusto Vega",
  },
  description:
    "Ingeniero creativo independiente que diseña experiencias web inmersivas y performantes. Buenos Aires, trabajando en todo el mundo.",
  applicationName: "Augusto Vega",
  keywords: [
    "desarrollador creativo",
    "desarrollador web Buenos Aires",
    "Next.js",
    "Three.js",
    "WebGL",
    "ingeniero de diseño",
    "desarrollador freelance",
  ],
  authors: [{ name: "Augusto Vega" }],
  creator: "Augusto Vega",
  publisher: "Augusto Vega",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "Augusto Vega",
    title: "Augusto Vega — Ingeniero Creativo",
    description:
      "Ingeniero creativo independiente que diseña experiencias web inmersivas y performantes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Augusto Vega — Ingeniero Creativo",
    description:
      "Ingeniero creativo independiente que diseña experiencias web inmersivas y performantes.",
    creator: "@augusto_vega",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <ClientChrome>{children}</ClientChrome>
      </body>
    </html>
  );
}
