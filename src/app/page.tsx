import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { TrustedMarquee } from "@/components/site/trusted-marquee";
import { Manifesto } from "@/components/site/manifesto";
import { WorkGallery } from "@/components/site/work-gallery";
import { CapabilitiesGrid } from "@/components/site/capabilities";
import { StatsProcess } from "@/components/site/stats-process";
import { Testimonials } from "@/components/site/testimonials";
import { CTA } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative flex flex-col bg-bg text-fg">
        <Hero />
        <TrustedMarquee />
        <Manifesto />
        <WorkGallery />
        <CapabilitiesGrid />
        <StatsProcess />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
