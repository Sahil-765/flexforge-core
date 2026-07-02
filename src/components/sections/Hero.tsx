import { Phone, ArrowRight, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { PHONE } from "@/lib/constants";
import { SafeImage } from "@/components/ui/safe-image";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28">
      <SafeImage
        src={heroImg}
        alt="Athlete training with barbell in dark gym"
        className="absolute inset-0 h-full w-full object-cover"
        fallbackSrc={heroImg}
        width={1920}
        height={1280}
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,oklch(0.13_0_0/0.4),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-20 w-full">
        <div className="max-w-3xl">
          <div className="reveal section-label mb-8">Est. Mumbai · Dadar West</div>
          <h1 className="reveal font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.92] uppercase">
            Build Strength.
            <br />
            <span className="text-metal">Build Confidence.</span>
          </h1>
          <p className="reveal mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
            Train with dedication at{" "}
            <span className="text-foreground">Muscle Flex Fitness Club</span> — a premium strength &
            conditioning space built for serious results.
          </p>
          <div className="reveal mt-10 flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary">
              Join Today <ArrowRight className="h-4 w-4" />
            </a>
            <a href={`tel:${PHONE}`} className="btn-outline">
              <Phone className="h-4 w-4" /> Call Now
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  );
}
