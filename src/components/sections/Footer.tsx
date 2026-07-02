import { Phone, MapPin, Mail, Instagram, Facebook, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import { SafeImage } from "@/components/ui/safe-image";
import { PHONE_DISPLAY, WHATSAPP, NAV, LOGO_FALLBACK_SRC } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[oklch(0.08_0_0)] border-t border-border pt-20 pb-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3">
            <SafeImage
              src={logo}
              alt=""
              className="h-12 w-12 rounded-full ring-1 ring-silver/30"
              fallbackSrc={LOGO_FALLBACK_SRC}
            />
            <div className="leading-tight">
              <div className="font-display tracking-[0.18em]">MUSCLE FLEX</div>
              <div className="font-display text-[10px] tracking-[0.4em] text-muted-foreground">
                FITNESS CLUB
              </div>
            </div>
          </div>
          <p className="mt-5 text-sm text-muted-foreground leading-relaxed">
            Strength. Discipline. Transformation. — Built in Dadar, Mumbai.
          </p>
        </div>

        <div>
          <div className="font-display text-xs tracking-[0.3em] uppercase text-silver">
            Quick Links
          </div>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV.slice(0, 5).map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-display text-xs tracking-[0.3em] uppercase text-silver">Contact</div>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2 text-foreground">
              <Phone className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" /> {PHONE_DISPLAY}
            </li>
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" /> SK Bole Rd, Dadar West, Mumbai 400028
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 mt-0.5 shrink-0" /> info@muscleflex.club
            </li>
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
        <div className="font-display tracking-[0.3em] uppercase">
          Strength · Discipline · Transformation
        </div>
      </div>
    </footer>
  );
}
