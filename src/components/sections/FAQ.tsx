import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Where is Muscle Flex Fitness Club located?",
    a: "We're at Shop No 22, Shivshakti Hsg Soc, SK Bole Rd, beside Sahakari Bhandar Mall, Dadar West, Mumbai 400028.",
  },
  {
    q: "Do I need prior experience to join?",
    a: "Not at all. Whether you're a complete beginner or an experienced lifter, our coaches will guide you with programming that fits your level.",
  },
  {
    q: "What are the membership options?",
    a: "We offer monthly, quarterly and annual plans. Please call or visit us for current pricing and personalised plan suggestions.",
  },
  {
    q: "Do you offer personal training?",
    a: "Yes. Certified trainers provide one-on-one sessions tailored to strength, fat-loss, muscle building and functional goals.",
  },
  {
    q: "What are your timings?",
    a: "Mon–Sat: 5:30 AM – 12:00 AM. Sunday: 7:00 AM – 12:00 PM. Holiday timings may vary — please call to confirm.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="text-center mb-14">
          <div className="reveal section-label mb-6 justify-center">FAQ</div>
          <h2 className="reveal font-display text-5xl sm:text-6xl uppercase leading-[0.95]">
            Questions, <span className="text-metal">answered.</span>
          </h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`reveal border rounded-lg overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-silver/40 bg-card" : "border-border bg-card/40"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 p-6 text-left"
                >
                  <span className="font-display text-base sm:text-lg tracking-wider uppercase">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-silver transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-500 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
