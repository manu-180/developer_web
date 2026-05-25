/* ===========================================================
   CONTENIDO DEL SITIO — Augusto Vega / Ingeniero Creativo
   Datos de portfolio ficticios pero coherentes para showcase.
   =========================================================== */

export const site = {
  name: "Augusto Vega",
  role: "Ingeniero Creativo",
  location: "Buenos Aires, AR",
  tz: "America/Argentina/Buenos_Aires",
  tagline: "Diseñando interfaces que cobran vida.",
  description:
    "Ingeniero creativo independiente que construye experiencias web inmersivas y performantes para marcas y productos ambiciosos.",
  email: "hello@augustovega.dev",
  calendly: "https://cal.com/augustovega/intro",
  social: [
    { label: "Github", href: "https://github.com/augustovega", short: "GH" },
    { label: "X", href: "https://x.com/augusto_vega", short: "X" },
    { label: "Read.cv", href: "https://read.cv/augustovega", short: "CV" },
    { label: "Dribbble", href: "https://dribbble.com/augustovega", short: "DB" },
    { label: "LinkedIn", href: "https://linkedin.com/in/augustovega", short: "IN" },
  ],
  nav: [
    { label: "Inicio", href: "#index", num: "01" },
    { label: "Proyectos", href: "#work", num: "02" },
    { label: "Capacidades", href: "#capabilities", num: "03" },
    { label: "Proceso", href: "#process", num: "04" },
    { label: "Contacto", href: "#contact", num: "05" },
  ],
} as const;

export const manifesto = {
  eyebrow: "Manifiesto · 002",
  body: [
    "Construyo el tipo de sitios web que hacen que la gente se detenga —",
    "los que se sienten menos como documentos y más como instrumentos.",
    "Cada píxel se gana su lugar. Cada transición tiene una razón.",
    "El rendimiento no es una limitación; es una característica que se siente.",
  ],
  signature: "— A.V.",
  facts: [
    { k: "Basado en", v: "Buenos Aires" },
    { k: "Trabajando desde", v: "2017" },
    { k: "Zona horaria", v: "GMT-3" },
    { k: "Disponibilidad", v: "T3 · 2026" },
    { k: "Idiomas", v: "ES / EN" },
    { k: "Pronombres", v: "él" },
  ],
} as const;

export const work = [
  {
    n: "01",
    name: "Atlas Maritime",
    client: "Logística marítima, NLD",
    year: "2026",
    role: "Ingeniero líder · WebGL",
    blurb:
      "Un panel de operaciones impulsado por un globo terráqueo que rastrea más de 14.000 buques en tiempo real. Shaders GLSL personalizados, clustering en GPU, primera interacción por debajo de 90ms.",
    tags: ["WebGL", "React", "Tiempo real", "Mapbox-GL"],
    accent: "#7BFFB5",
  },
  {
    n: "02",
    name: "Maison Lune",
    client: "Fragancia de lujo, FR",
    year: "2026",
    role: "Diseño + Desarrollo",
    blurb:
      "Una experiencia de e-commerce centrada en lo olfativo donde cada aroma tiene su propio poema de scroll y paisaje sonoro ambiental. Awwwards SOTD.",
    tags: ["Next.js", "GSAP", "Editorial"],
    accent: "#FFB778",
  },
  {
    n: "03",
    name: "Substrate OS",
    client: "Herramientas para desarrolladores, US",
    year: "2025",
    role: "Diseñadora fundadora · ingeniero",
    blurb:
      "Un IDE basado en canvas para flujos de trabajo con IA. Escribí el motor de renderizado, la paleta de comandos y publiqué el sitio de documentación. Hoy lo usan 18k devs.",
    tags: ["Canvas", "DX", "TypeScript"],
    accent: "#C8FF00",
  },
  {
    n: "04",
    name: "Sundial Capital",
    client: "Fondo de inversión privado",
    year: "2025",
    role: "Sitio de marca + UI de producto",
    blurb:
      "Una plataforma confidencial para socios limitados con informes editoriales renderizados como MDX con visualizaciones de datos WebGL a medida.",
    tags: ["MDX", "Viz de datos", "Auth"],
    accent: "#9AB7FF",
  },
  {
    n: "05",
    name: "Bivouac",
    client: "Productos outdoor, AR",
    year: "2024",
    role: "Dirección creativa · Desarrollo",
    blurb:
      "Un sitio narrativo que te lleva desde el nivel del mar en la Patagonia hasta una cumbre ventosa. Construido con React Three Fiber y terreno procedural.",
    tags: ["R3F", "Procedural", "Narrativa"],
    accent: "#FF5A3C",
  },
  {
    n: "06",
    name: "Nocturne Records",
    client: "Sello independiente, JP",
    year: "2024",
    role: "Identidad + sitio interactivo",
    blurb:
      "El lanzamiento de un álbum como sitio web. Shaders reactivos al audio en tiempo real, revelaciones de letras coreografiadas y un flujo de pedido de casetes.",
    tags: ["WebAudio", "Shader", "Editorial"],
    accent: "#E07BFF",
  },
] as const;

export const capabilities = [
  {
    title: "Front-end creativo",
    body:
      "React, Next.js, TypeScript. Sistemas de componentes hechos a mano y coreografías de movimiento que aguantan años, no sprints.",
    tag: "01 · DESARROLLO",
  },
  {
    title: "WebGL / Three.js",
    body:
      "Shaders GLSL personalizados, React Three Fiber, pipelines de post-procesado. Gráficos en tiempo real que corren a 120fps en laptops de gama media.",
    tag: "02 · GRÁFICOS",
  },
  {
    title: "Ingeniería de diseño",
    body:
      "Cierro la brecha entre Figma y producción — tokens de diseño, infraestructura de theming, primitives headless, specs de motion que sobreviven a la revisión.",
    tag: "03 · DISEÑO",
  },
  {
    title: "Rendimiento",
    body:
      "Lighthouse 100 no es un objetivo de vanidad — es el piso. Edge rendering, hidratación parcial, pipelines de imágenes y todo lo aburrido.",
    tag: "04 · PERF",
  },
  {
    title: "Backend que llega a producción",
    body:
      "Postgres, Supabase, Edge functions, websockets. La infraestructura justa para hacer que el front-end se sienta ingrávido.",
    tag: "05 · BACKEND",
  },
  {
    title: "Dirección y estrategia",
    body:
      "Entro temprano — cuando no hay más que un deck y una corazonada — y me quedo lo suficiente para sacar la cosa al aire dos veces.",
    tag: "06 · DIRECCIÓN",
  },
] as const;

export const stats = [
  { num: 47, suffix: "", label: "Proyectos entregados" },
  { num: 12, suffix: "", label: "Awwwards" },
  { num: 9, suffix: "a", label: "En el oficio" },
  { num: 23, suffix: "", label: "Países alcanzados" },
] as const;

export const process = [
  {
    n: "01",
    title: "Resumen y alineación",
    body:
      "Una reunión inicial corta y densa. Acordamos qué es el sitio — y, lo más importante, qué no es. Te vas con un resumen de una página.",
    dur: "Semana 0",
  },
  {
    n: "02",
    title: "Concepto y dirección",
    body:
      "Tres direcciones creativas, después una. Elegimos el camino juntos, después cierro la tipografía, paleta, lenguaje de motion y la grilla.",
    dur: "Semana 1–2",
  },
  {
    n: "03",
    title: "Desarrollo e iteración",
    body:
      "Listo para producción desde el primer push. La URL de staging se actualiza diariamente. Revisiones asíncronas por Loom. Sin escenarios ocultos de Figma que no puedas tocar.",
    dur: "Semana 2–6",
  },
  {
    n: "04",
    title: "Lanzamiento y extensión",
    body:
      "Día de lanzamiento, analytics, Lighthouse, retro post-lanzamiento. Dos semanas de pulido gratis incluidas. Después seguimos o nos despedimos.",
    dur: "Semana 6+",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Augusto nos construyó un sitio que parecía costar el doble del presupuesto y se entregó en la mitad del tiempo. Los detalles de motion son obsesivos, en el mejor sentido.",
    name: "Marisa Renaud",
    role: "Fundadora, Maison Lune",
  },
  {
    quote:
      "Trabajamos con tres estudios en cinco años. Augusto es el único que dejó el código mejor de lo que lo encontró.",
    name: "Itamar Stern",
    role: "Jefe de Ingeniería, Substrate",
  },
  {
    quote:
      "Piensa como diseñador, programa como ingeniero senior y maneja el proyecto como un productor. Contratalo antes de que lo haga otro.",
    name: "Naomi Castell",
    role: "Directora Creativa, Field & Form",
  },
  {
    quote:
      "Nuestro sitio pasó de ser un folleto a un producto. Conversión arriba 38%, tiempo en página arriba 2,4x. El trabajo de Augusto se paga solo.",
    name: "Diego Aubert",
    role: "CMO, Atlas Maritime",
  },
  {
    quote:
      "Una combinación rara de gusto, contención y profundidad técnica. Lo volvimos a contratar para nuestros dos siguientes productos.",
    name: "Hiroko Watanabe",
    role: "Socia, Nocturne",
  },
  {
    quote:
      "Le mandé un Figma a las 20 horas. Subió un prototipo funcional antes de medianoche. Ocho meses después sigue siendo el módulo más limpio de nuestro código.",
    name: "Theo Mendoza",
    role: "CTO, Sundial Capital",
  },
] as const;

export const trustedBy = [
  "Atlas Maritime",
  "Maison Lune",
  "Substrate",
  "Sundial Capital",
  "Bivouac",
  "Nocturne",
  "Field & Form",
  "Helios Studio",
  "Polar Type",
  "Northpoint",
  "Cabal & Co.",
  "Vesta",
] as const;

export type WorkItem = (typeof work)[number];
export type Capability = (typeof capabilities)[number];
export type ProcessStep = (typeof process)[number];
export type Testimonial = (typeof testimonials)[number];
