import { useState, type FormEvent } from "react";
import { Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { leadFormSchema } from "@/lib/lead-schema";
import { PHONE, PHONE_DISPLAY, ADDRESS, CONTACT_ENDPOINT } from "@/lib/constants";

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

export function Contact() {
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

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Record<string, string[] | undefined>;
      } | null;

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
      toast.error(
        error instanceof Error ? error.message : "Something went wrong. Please try again.",
      );
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
            Drop by the club or send a message — we'll get back the same day with membership details
            and a tour.
          </p>

          <div className="reveal mt-10 space-y-5">
            <a href={`tel:${PHONE}`} className="flex items-start gap-4 group">
              <span className="grid h-11 w-11 place-items-center rounded-md border border-border bg-card group-hover:border-silver transition-colors">
                <Phone className="h-4 w-4" />
              </span>
              <div>
                <div className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground">
                  Phone
                </div>
                <div className="mt-1 text-foreground">{PHONE_DISPLAY}</div>
              </div>
            </a>
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-md border border-border bg-card">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <div className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground">
                  Address
                </div>
                <div className="mt-1 text-foreground max-w-sm">{ADDRESS}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-md border border-border bg-card">
                <Clock className="h-4 w-4" />
              </span>
              <div>
                <div className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground">
                  Hours
                </div>
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
          <p className="mt-2 text-sm text-muted-foreground">
            We’ll respond with membership details and next steps.
          </p>

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
              <label
                htmlFor="preferred_plan"
                className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground"
              >
                Preferred Plan
              </label>
              <select
                id="preferred_plan"
                name="preferred_plan"
                value={formState.preferred_plan}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, preferred_plan: event.target.value }))
                }
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
              <label
                htmlFor="message"
                className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground"
              >
                Your Message
              </label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                value={formState.message}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, message: event.target.value }))
                }
                className="mt-2 resize-none bg-background/60"
                placeholder="I’d like to know about membership plans..."
              />
              {errors.message ? (
                <p className="mt-2 text-sm text-red-400">{errors.message}</p>
              ) : null}
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary mt-8 w-full disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Enquiry"} <ArrowRight className="h-4 w-4" />
          </button>
          {errors.form ? (
            <p className="mt-4 text-sm text-red-400 text-center">{errors.form}</p>
          ) : null}
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
      <label
        htmlFor={name}
        className="font-display text-xs tracking-[0.3em] uppercase text-muted-foreground"
      >
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
