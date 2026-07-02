import { Star } from "lucide-react";

const TESTI = [
  {
    name: "Asavari Gamare",
    role: "Reviewed a month ago",
    quote:
      "The energy here is unmatched. The coaches push you the right way and the equipment is top-tier.",
  },
  {
    name: "Pavan Khairnar",
    role: "Local Guide · 8 reviews · 10 photos · 2 months ago",
    quote:
      "Walked in nervous, walked out hooked. The team made strength training accessible and the atmosphere is genuinely motivating.",
  },
  {
    name: "Aavishkar Kolambe",
    role: "3 reviews · 2 months ago",
    quote:
      "Hands down the most disciplined gym in Dadar. Programming is solid, equipment well-maintained. Highly recommend.",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative py-28 bg-gradient-dark">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="reveal section-label mb-6 justify-center">Voices from the Floor</div>
          <h2 className="reveal font-display text-5xl sm:text-6xl uppercase leading-[0.95]">
            What members <span className="text-metal">say.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTI.map((t) => (
            <figure key={t.name} className="reveal glass rounded-lg p-8 flex flex-col">
              <div className="flex gap-1 text-silver">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-6 text-lg leading-relaxed text-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-border">
                <div className="font-display tracking-wider uppercase">{t.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
