const STATS = [
  { label: "Modern Equipment", value: "100%" },
  { label: "Coaching", value: "Pro" },
  { label: "Programs", value: "8+" },
  { label: "Satisfaction", value: "★★★★★" },
];

export function Stats() {
  return (
    <section className="relative border-y border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s) => (
          <div key={s.label} className="reveal text-center md:text-left">
            <div className="font-display text-4xl sm:text-5xl text-metal">{s.value}</div>
            <div className="mt-2 font-display text-xs tracking-[0.3em] uppercase text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
