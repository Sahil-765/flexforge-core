import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Monthly",
    tag: "Flexible start",
    features: [
      "Full gym access",
      "Locker facility",
      "Open during all hours",
      "Cardio + strength zones",
    ],
  },
  {
    name: "Quarterly",
    tag: "Most popular",
    featured: true,
    features: [
      "Everything in Monthly",
      "Free fitness assessment",
      "Diet guidance",
      "Discounted PT sessions",
    ],
  },
  {
    name: "Annual",
    tag: "Best value",
    features: [
      "Everything in Quarterly",
      "Priority coaching slots",
      "Personalised programming",
      "Body recomp tracking",
    ],
  },
];

export function Membership() {
  return (
    <section id="membership" className="relative py-28 bg-secondary/20 border-y border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="reveal section-label mb-6 justify-center">Membership</div>
          <h2 className="reveal font-display text-5xl sm:text-6xl uppercase leading-[0.95]">
            Choose your <span className="text-metal">commitment.</span>
          </h2>
          <p className="reveal mt-5 text-muted-foreground">
            Contact us for current pricing — we tailor plans to your goals and schedule.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((p) => (
            <div
              key={p.name}
              className={`reveal relative rounded-lg p-8 transition-all duration-500 ${
                p.featured
                  ? "bg-foreground text-background scale-100 md:scale-105 shadow-card"
                  : "bg-card border border-border hover:border-silver/40"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-background text-foreground font-display text-[10px] tracking-[0.3em] uppercase rounded-full border border-silver/40">
                  {p.tag}
                </div>
              )}
              <div
                className={`font-display text-xs tracking-[0.3em] uppercase ${
                  p.featured ? "text-background/60" : "text-muted-foreground"
                }`}
              >
                {p.tag}
              </div>
              <div className="mt-2 font-display text-4xl uppercase">{p.name}</div>
              <div className={`mt-6 font-display text-3xl ${p.featured ? "" : "text-metal"}`}>
                Enquire
              </div>
              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check
                      className={`h-4 w-4 mt-0.5 shrink-0 ${
                        p.featured ? "text-background" : "text-silver"
                      }`}
                    />
                    <span className={p.featured ? "text-background/90" : "text-muted-foreground"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-10 block text-center font-display text-sm tracking-[0.25em] uppercase py-3 rounded-md transition-all duration-300 ${
                  p.featured
                    ? "bg-background text-foreground hover:bg-secondary"
                    : "border border-silver/40 text-foreground hover:bg-foreground hover:text-background"
                }`}
              >
                Contact Us
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
