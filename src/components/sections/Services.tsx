import { Dumbbell, Flame, HeartPulse, Activity, Users, Zap, ArrowRight } from "lucide-react";

const SERVICES = [
  {
    icon: Dumbbell,
    title: "Strength Training",
    desc: "Compound lifts, progressive overload, real strength.",
  },
  {
    icon: Flame,
    title: "Weight Loss Programs",
    desc: "Structured fat-loss plans with measurable progress.",
  },
  {
    icon: Zap,
    title: "Muscle Building",
    desc: "Hypertrophy-focused programming for visible gains.",
  },
  {
    icon: HeartPulse,
    title: "Cardio Fitness",
    desc: "Build conditioning and endurance the right way.",
  },
  { icon: Users, title: "Personal Training", desc: "One-on-one coaching tailored to your goals." },
  {
    icon: Activity,
    title: "Functional Fitness",
    desc: "Move better, feel stronger, train for life.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl mb-16">
          <div className="reveal section-label mb-6">What We Offer</div>
          <h2 className="reveal font-display text-5xl sm:text-6xl uppercase leading-[0.95]">
            Programs built for <span className="text-metal">every level.</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="reveal group relative bg-card p-10 transition-all duration-500 hover:bg-secondary"
            >
              <div className="grid h-14 w-14 place-items-center rounded-md bg-background border border-border text-foreground transition-all duration-500 group-hover:border-silver group-hover:bg-foreground group-hover:text-background">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-display text-2xl uppercase tracking-wider">{title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{desc}</p>
              <ArrowRight className="absolute top-10 right-10 h-5 w-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
