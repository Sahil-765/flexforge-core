import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import heroImg from "@/assets/hero.jpg";

import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Membership } from "@/components/sections/Membership";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { FloatingWhatsApp } from "@/components/sections/FloatingWhatsApp";
import { PHONE } from "@/lib/constants";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muscle Flex Fitness Club | Premium Gym in Mumbai" },
      {
        name: "description",
        content:
          "Join Muscle Flex Fitness Club for professional strength training, fitness coaching, muscle building, and a motivating workout environment in Dadar, Mumbai.",
      },
      { property: "og:title", content: "Muscle Flex Fitness Club | Premium Gym in Mumbai" },
      {
        property: "og:description",
        content:
          "Strength. Discipline. Transformation. Premium gym in Dadar, Mumbai offering strength training, personal coaching and functional fitness.",
      },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HealthClub",
          name: "Muscle Flex Fitness Club",
          image: heroImg,
          telephone: PHONE,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Shop No 22, Shivshakti Hsg Soc, SK Bole Rd",
            addressLocality: "Mumbai",
            addressRegion: "Maharashtra",
            postalCode: "400028",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  useReveal();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Membership />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
