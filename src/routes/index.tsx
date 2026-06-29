import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ComponentPropsWithoutRef, type FormEvent } from "react";
import {
  Dumbbell, Flame, HeartPulse, Activity, Users, Zap, Star, Menu, X,
  Phone, MapPin, Mail, Clock, Instagram, Facebook, MessageCircle, ChevronDown,
  Check, ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useReveal } from "@/hooks/use-reveal";
import { leadFormSchema } from "@/lib/lead-schema";
import logo from "@/assets/logo.png";
import heroImg from "@/assets/hero.jpg";
import cardioRoom from "@/assets/cardio-room.png";
import equipment from "@/assets/equipment.png";
import changingRoom from "@/assets/changing-room.png";
import washroom from "@/assets/washroom.png";
import barbell from "@/assets/gallery-barbell.jpg";
import dumbbells from "@/assets/gallery-dumbbells.jpg";
import ropes from "@/assets/gallery-ropes.jpg";

const PHONE = "+919326510792";
const PHONE_DISPLAY = "+91 93265 10792";
const WHATSAPP = "https://wa.me/919326510792";
const CONTACT_ENDPOINT = "/api/contact";
const ADDRESS =
  "Ground Floor, Shivshakti Hsg Soc, Shop No 22, SK Bole Rd, beside Sahakari Bhandar Mall, Mumbai, Maharashtra 400028";
const LOGO_FALLBACK_SRC =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" role="img" aria-label="Muscle Flex logo">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#f4efe5" />
          <stop offset="100%" stop-color="#8d8478" />
        </linearGradient>
      </defs>
      <rect width="96" height="96" rx="48" fill="#141414" />
      <circle cx="48" cy="48" r="39" fill="none" stroke="url(#g)" stroke-width="4" />
      <path d="M26 62V34h8l14 18 14-18h8v28h-8V47L48 64 34 47v15z" fill="url(#g)" />
    </svg>
  `);

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

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "membership", label: "Membership" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

type SafeImageProps = ComponentPropsWithoutRef<"img"> & {
  fallbackSrc: string;
};

const contactPlanOptions = [
  { label: "Monthly", value: "monthly" },
  { label: "Quarterly", value: "quarterly" },
  { label: "Annual", value: "annual" },
  { label: "Not sure yet", value: "unsure" },
];

type ContactFormState = {
  full_name: string;
  email: string;
  phone: string;
  message: string;
  preferred_plan: string;
};

type ContactErrors = Partial<Record<keyof ContactFormState | "form", string>>;

function getInitialContactState(): ContactFormState {
  return {
    full_name: "",
    email: "",
    phone: "",
    message: "",
    preferred_plan: "",
  };
}

function getAnalyticsContext() {
  if (typeof window === "undefined") {
    return {
      page_url: "",
      referrer: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
    };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    page_url: window.location.href,
    referrer: document.referrer,
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
  };
}

function mapFieldErrors(errors: z.ZodIssue[]) {
  const mapped: ContactErrors = {};

  for (const issue of errors) {
    const field = issue.path[0];
    if (typeof field === "string" && field in getInitialContactState()) {
      mapped[field as keyof ContactFormState] = issue.message;
    }
  }

  return mapped;
}

function SafeImage({ src, fallbackSrc, alt, ...props }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return <img {...props} src={currentSrc} alt={alt} onError={() => setCurrentSrc(fallbackSrc)} />;
}

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

/* ------------------------------ NAV ------------------------------ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled
          ? "py-3 bg-background/85 backdrop-blur-lg border-b border-border"
          : "py-5 bg-transparent"
        }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between gap-6">
        <a href="#home" className="flex items-center gap-3 shrink-0">
          <img
            src={logo}
            alt="Muscle Flex Fitness Club"
            className="h-11 w-11 rounded-full ring-1 ring-silver/30"
            width={44}
            height={44}
          />
          <div className="hidden sm:block leading-tight">
            <div className="font-display text-lg tracking-[0.18em] text-foreground">MUSCLE FLEX</div>
            <div className="font-display text-[10px] tracking-[0.4em] text-muted-foreground">FITNESS CLUB</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="font-display text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
            >
              {n.label}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-linear-to-r from-transparent via-foreground to-transparent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/admin" className="hidden md:inline-flex btn-outline py-2.5! px-5! text-xs!">
            Admin
          </Link>
          <a href={`tel:${PHONE}`} className="hidden md:inline-flex btn-outline py-2.5! px-5! text-xs!">
            <Phone className="h-4 w-4" /> Call
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 rounded-md border border-border text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${open ? "max-h-150 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="mx-5 mt-4 glass rounded-xl p-6 flex flex-col gap-4">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              onClick={() => setOpen(false)}
              className="font-display text-base tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
          <a href={`tel:${PHONE}`} className="btn-primary mt-2">
            <Phone className="h-4 w-4" /> Call Now
          </a>
          <Link to="/admin" onClick={() => setOpen(false)} className="btn-outline mt-2 text-center justify-center">
            Admin Portal
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------ HERO ------------------------------ */
function Hero() {
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
            Train with dedication at <span className="text-foreground">Muscle Flex Fitness Club</span> — a premium
            strength & conditioning space built for serious results.
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

/* ------------------------------ STATS ------------------------------ */
const STATS = [
  { label: "Modern Equipment", value: "100%" },
  { label: "Coaching", value: "Pro" },
  { label: "Programs", value: "8+" },
  { label: "Satisfaction", value: "★★★★★" },
];
function Stats() {
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

/* ------------------------------ ABOUT ------------------------------ */
function About() {
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
            Muscle Flex Fitness Club is where dedicated lifters and first-time members chase the same thing —
            real transformation. Professional coaching, disciplined programming and a focused atmosphere come
            together under one roof in the heart of Dadar.
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
            <a href="#contact" className="btn-primary">Start Training <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ SERVICES ------------------------------ */
const SERVICES = [
  { icon: Dumbbell, title: "Strength Training", desc: "Compound lifts, progressive overload, real strength." },
  { icon: Flame, title: "Weight Loss Programs", desc: "Structured fat-loss plans with measurable progress." },
  { icon: Zap, title: "Muscle Building", desc: "Hypertrophy-focused programming for visible gains." },
  { icon: HeartPulse, title: "Cardio Fitness", desc: "Build conditioning and endurance the right way." },
  { icon: Users, title: "Personal Training", desc: "One-on-one coaching tailored to your goals." },
  { icon: Activity, title: "Functional Fitness", desc: "Move better, feel stronger, train for life." },
];
function Services() {
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

/* ------------------------------ MEMBERSHIP ------------------------------ */
const PLANS = [
  {
    name: "Monthly",
    tag: "Flexible start",
    features: ["Full gym access", "Locker facility", "Open during all hours", "Cardio + strength zones"],
  },
  {
    name: "Quarterly",
    tag: "Most popular",
    featured: true,
    features: ["Everything in Monthly", "Free fitness assessment", "Diet guidance", "Discounted PT sessions"],
  },
  {
    name: "Annual",
    tag: "Best value",
    features: ["Everything in Quarterly", "Priority coaching slots", "Personalised programming", "Body recomp tracking"],
  },
];
function Membership() {
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
              className={`reveal relative rounded-lg p-8 transition-all duration-500 ${p.featured
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
                className={`font-display text-xs tracking-[0.3em] uppercase ${p.featured ? "text-background/60" : "text-muted-foreground"
                  }`}
              >
                {p.tag}
              </div>
              <div className="mt-2 font-display text-4xl uppercase">{p.name}</div>
              <div
                className={`mt-6 font-display text-3xl ${p.featured ? "" : "text-metal"}`}
              >
                Enquire
              </div>
              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${p.featured ? "text-background" : "text-silver"}`} />
                    <span className={p.featured ? "text-background/90" : "text-muted-foreground"}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-10 block text-center font-display text-sm tracking-[0.25em] uppercase py-3 rounded-md transition-all duration-300 ${p.featured
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

/* ------------------------------ GALLERY ------------------------------ */
function Gallery() {
  const tiles = [
    { src: equipment, alt: "Strength training equipment", cls: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" },
    { src: cardioRoom, alt: "Cardio training room", cls: "aspect-square" },
    { src: barbell, alt: "Chalked grip on barbell", cls: "aspect-square" },
    { src: dumbbells, alt: "Dumbbell rack", cls: "aspect-square md:col-span-2" },
    { src: ropes, alt: "Battle rope training", cls: "aspect-square" },
    { src: changingRoom, alt: "Changing room area", cls: "aspect-square" },
    { src: washroom, alt: "SAUNA ROOM", cls: "aspect-square" },
  ];
  return (
    <section id="gallery" className="py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="reveal section-label mb-6">Inside the Club</div>
            <h2 className="reveal font-display text-5xl sm:text-6xl uppercase leading-[0.95]">
              Step <span className="text-metal">inside.</span>
            </h2>
          </div>
          <p className="reveal max-w-md text-muted-foreground">
            A look at our equipment, training floors and member facilities.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-3">
          {tiles.map((t, i) => (
            <div
              key={i}
              className={`reveal relative overflow-hidden rounded-lg group ${t.cls}`}
            >
              <SafeImage
                src={t.src}
                alt={t.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-1200 ease-out group-hover:scale-110"
                fallbackSrc={heroImg}
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="font-display text-xs tracking-[0.3em] uppercase text-silver">{t.alt}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ TESTIMONIALS ------------------------------ */
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
function Testimonials() {
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

/* ------------------------------ FAQ ------------------------------ */
const FAQS = [
  { q: "Where is Muscle Flex Fitness Club located?", a: "We're at Shop No 22, Shivshakti Hsg Soc, SK Bole Rd, beside Sahakari Bhandar Mall, Dadar West, Mumbai 400028." },
  { q: "Do I need prior experience to join?", a: "Not at all. Whether you're a complete beginner or an experienced lifter, our coaches will guide you with programming that fits your level." },
  { q: "What are the membership options?", a: "We offer monthly, quarterly and annual plans. Please call or visit us for current pricing and personalised plan suggestions." },
  { q: "Do you offer personal training?", a: "Yes. Certified trainers provide one-on-one sessions tailored to strength, fat-loss, muscle building and functional goals." },
  { q: "What are your timings?", a: "Mon–Sat: 5:30 AM – 12:00 AM. Sunday: 7:00 AM – 12:00 PM. Holiday timings may vary — please call to confirm." },
];
function FAQ() {
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
                className={`reveal border rounded-lg overflow-hidden transition-all duration-300 ${isOpen ? "border-silver/40 bg-card" : "border-border bg-card/40"
                  }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-6 p-6 text-left"
                >
                  <span className="font-display text-base sm:text-lg tracking-wider uppercase">{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-silver transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
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

/* ------------------------------ CONTACT ------------------------------ */
function Contact() {
  const [formState, setFormState] = useState<ContactFormState>(getInitialContactState());
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    const analytics = getAnalyticsContext();
    const parsed = leadFormSchema.safeParse({
      ...formState,
      source: "website-contact-form",
      ...analytics,
      honeypot,
    });

    if (!parsed.success) {
      setErrors(mapFieldErrors(parsed.error.issues));
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          source: "website-contact-form",
          ...analytics,
          honeypot,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; fieldErrors?: Record<string, string[] | undefined> }
        | null;

      if (!response.ok) {
        if (response.status === 400 && result?.fieldErrors) {
          const mappedErrors: ContactErrors = {};
          for (const [field, messages] of Object.entries(result.fieldErrors)) {
            if (field in getInitialContactState() && messages?.[0]) {
              mappedErrors[field as keyof ContactFormState] = messages[0];
            }
          }
          setErrors(mappedErrors);
        }
        throw new Error(result?.error ?? "Unable to submit your enquiry right now.");
      }

      toast.success("Thanks. Your enquiry has been sent.");
      setFormState(getInitialContactState());
      setHoneypot("");
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 bg-secondary/20 border-t border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12">
        <div>
          <div className="reveal section-label mb-6">Get in Touch</div>
          <h2 className="reveal font-display text-5xl sm:text-6xl uppercase leading-[0.95]">
            Visit us. <br />
            <span className="text-metal">Train with us.</span>
          </h2>
          <p className="reveal mt-6 text-muted-foreground max-w-md">
            Drop by the club or send a message — we'll get back the same day with membership details and a tour.
          </p>

          <div className="reveal mt-10 space-y-5">
            <a href={`tel:${PHONE}`} className="flex items-start gap-4 group">
              <span className="grid h-11 w-11 place-items-center rounded-md border border-border bg-card group-hover:border-silver transition-colors">
                <Phone className="h-4 w-4" />
              </span>
              <div>
                <div className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground">Phone</div>
                <div className="mt-1 text-foreground">{PHONE_DISPLAY}</div>
              </div>
            </a>
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-md border border-border bg-card">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <div className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground">Address</div>
                <div className="mt-1 text-foreground max-w-sm">{ADDRESS}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-md border border-border bg-card">
                <Clock className="h-4 w-4" />
              </span>
              <div>
                <div className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground">Hours</div>
                <div className="mt-1 text-foreground">Mon–Sat 5:30 AM – 12:00 AM</div>
                <div className="text-muted-foreground text-sm">Sun 7:00 AM – 12:00 PM</div>
              </div>
            </div>
          </div>

          <div className="reveal mt-10 rounded-lg overflow-hidden border border-border">
            <iframe
              title="Muscle Flex Fitness Club location"
              src="https://www.google.com/maps?q=Sahakari+Bhandar+Mall+SK+Bole+Rd+Dadar+West+Mumbai&output=embed"
              width="100%"
              height="260"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </div>
        </div>

        <form onSubmit={submitForm} className="reveal glass rounded-lg p-8 sm:p-10 self-start">
          <div className="font-display text-2xl uppercase tracking-wider">Send a Message</div>
          <p className="mt-2 text-sm text-muted-foreground">We’ll respond with membership details and next steps.</p>

          <div className="mt-8 space-y-5">
            <Field
              name="full_name"
              label="Full Name"
              value={formState.full_name}
              onChange={(value) => setFormState((current) => ({ ...current, full_name: value }))}
              required
              error={errors.full_name}
              autoComplete="name"
            />
            <Field
              name="email"
              label="Email"
              type="email"
              value={formState.email}
              onChange={(value) => setFormState((current) => ({ ...current, email: value }))}
              required
              error={errors.email}
              autoComplete="email"
            />
            <Field
              name="phone"
              label="Phone Number"
              type="tel"
              value={formState.phone}
              onChange={(value) => setFormState((current) => ({ ...current, phone: value }))}
              required
              error={errors.phone}
              autoComplete="tel"
            />
            <div>
              <label htmlFor="preferred_plan" className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground">
                Preferred Plan
              </label>
              <select
                id="preferred_plan"
                name="preferred_plan"
                value={formState.preferred_plan}
                onChange={(event) => setFormState((current) => ({ ...current, preferred_plan: event.target.value }))}
                className="mt-2 w-full bg-background/60 border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-silver transition-colors"
              >
                <option value="">Select a plan</option>
                {contactPlanOptions.map((plan) => (
                  <option key={plan.value} value={plan.value}>
                    {plan.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground">
                Your Message
              </label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                value={formState.message}
                onChange={(event) => setFormState((current) => ({ ...current, message: event.target.value }))}
                className="mt-2 resize-none bg-background/60"
                placeholder="I’d like to know about membership plans..."
              />
              {errors.message ? <p className="mt-2 text-sm text-red-400">{errors.message}</p> : null}
            </div>
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-px w-px opacity-0"
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary mt-8 w-full disabled:opacity-60">
            {isSubmitting ? "Sending..." : "Send Enquiry"} <ArrowRight className="h-4 w-4" />
          </button>
          {errors.form ? <p className="mt-4 text-sm text-red-400 text-center">{errors.form}</p> : null}
        </form>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  value,
  onChange,
  error,
  autoComplete,
}: {
  name: keyof ContactFormState;
  label: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground">
        {label}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        className="mt-2 bg-background/60"
      />
      {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : null}
    </div>
  );
}

/* ------------------------------ FOOTER ------------------------------ */
function Footer() {
  return (
    <footer className="bg-[oklch(0.08_0_0)] border-t border-border pt-20 pb-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <SafeImage src={logo} alt="" className="h-12 w-12 rounded-full ring-1 ring-silver/30" fallbackSrc={LOGO_FALLBACK_SRC} />
            <div className="leading-tight">
              <div className="font-display tracking-[0.18em]">MUSCLE FLEX</div>
              <div className="font-display text-[10px] tracking-[0.4em] text-muted-foreground">FITNESS CLUB</div>
            </div>
          </div>
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
            Strength. Discipline. Transformation. — Built in Dadar, Mumbai.
          </p>
        </div>

        <div>
          <div className="font-display text-xs tracking-[0.3em] uppercase text-silver">Quick Links</div>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV.slice(0, 5).map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-display text-xs tracking-[0.3em] uppercase text-silver">Contact</div>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0" /> {PHONE_DISPLAY}</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /> SK Bole Rd, Dadar West, Mumbai 400028</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0" /> info@muscleflex.club</li>
          </ul>
        </div>

        <div>
          <div className="font-display text-xs tracking-[0.3em] uppercase text-silver">Hours</div>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li>Mon–Sat · 5:30 AM – 12:00 AM</li>
            <li>Sunday · 7:00 AM – 12:00 PM</li>
          </ul>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Instagram, href: "#" },
              { Icon: Facebook, href: "#" },
              { Icon: MessageCircle, href: WHATSAPP },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-silver transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Muscle Flex Fitness Club. All rights reserved.</div>
        <div className="font-display tracking-[0.3em] uppercase">Strength · Discipline · Transformation</div>
      </div>
    </footer>
  );
}

/* ------------------------------ WHATSAPP FAB ------------------------------ */
function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-foreground text-background shadow-2xl hover:scale-110 transition-transform duration-300"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 rounded-full animate-ping bg-foreground/30" />
    </a>
  );
}
