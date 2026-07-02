import { Check, ArrowRight } from "lucide-react";
import cardioRoom from "@/assets/cardio-room.png";
import heroImg from "@/assets/hero.jpg";
import { SafeImage } from "@/components/ui/safe-image";

export function About() {
  return (
    <section id="about" className="relative py-28 bg-gradient-dark">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <div className="reveal relative">
          <div className="relative aspect-4/5 overflow-hidden rounded-lg">
            <SafeImage
              src={cardioRoom}
              alt="Muscle Flex cardio training zone"
              className="h-full w-full object-cover"
              loading="lazy"
              fallbackSrc={heroImg}
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/60 to-transparent" />
          </div>
          <div className="hidden md:block absolute -bottom-6 -right-6 glass rounded-lg p-6 w-64">
            <div className="font-display text-3xl text-metal">Since Day One</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Built around discipline, results and a brotherhood of lifters.
            </p>
          </div>
        </div>

        <div>
          <div className="reveal section-label mb-6">About the Club</div>
          <h2 className="reveal font-display text-5xl sm:text-6xl uppercase leading-[0.95]">
            A destination for <span className="text-metal">serious</span> training.
          </h2>
          <p className="reveal mt-6 text-lg text-muted-foreground leading-relaxed">
            Muscle Flex Fitness Club is where dedicated lifters and first-time members chase the
            same thing — real transformation. Professional coaching, disciplined programming and a
            focused atmosphere come together under one roof in the heart of Dadar.
          </p>
          <ul className="reveal mt-8 grid sm:grid-cols-2 gap-4">
            {[
              "Pro-grade strength equipment",
              "Personalised coaching",
              "Functional & cardio zones",
              "Clean changing & SAUNA ROOMS",
            ].map((f) => (
              <li key={f} className="flex items-start gap-3 text-foreground">
                <span className="mt-1 grid h-6 w-6 place-items-center rounded-full bg-foreground text-background">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm">{f}</span>
              </li>
            ))}
          </ul>
          <div className="reveal mt-10">
            <a href="#contact" className="btn-primary">
              Start Training <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
