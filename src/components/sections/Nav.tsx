import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { NAV, PHONE } from "@/lib/constants";

export function Nav() {
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
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
            <div className="font-display text-lg tracking-[0.18em] text-foreground">
              MUSCLE FLEX
            </div>
            <div className="font-display text-[10px] tracking-[0.4em] text-muted-foreground">
              FITNESS CLUB
            </div>
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
          <a
            href={`tel:${PHONE}`}
            className="hidden md:inline-flex btn-outline py-2.5! px-5! text-xs!"
          >
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
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          open ? "max-h-150 opacity-100" : "max-h-0 opacity-0"
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
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="btn-outline mt-2 text-center justify-center"
          >
            Admin Portal
          </Link>
        </div>
      </div>
    </header>
  );
}
