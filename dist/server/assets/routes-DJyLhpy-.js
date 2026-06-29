import { n as PHONE, t as hero_default } from "./hero-D9pJB7sj.js";
import { t as useReveal } from "./use-reveal-BE9TtH02.js";
import { t as leadFormSchema } from "./lead-schema-D0d44KbQ.js";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Activity, ArrowRight, Check, ChevronDown, Clock, Dumbbell, Facebook, Flame, HeartPulse, Instagram, Mail, MapPin, Menu, MessageCircle, Phone, Star, Users, X, Zap } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/components/ui/input.tsx
var Input = React.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ jsx("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
//#endregion
//#region src/components/ui/textarea.tsx
var Textarea = React.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ jsx("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
//#endregion
//#region src/assets/logo.png
var logo_default = "/assets/logo-VbnyfW-G.png";
//#endregion
//#region src/assets/cardio-room.png
var cardio_room_default = "/assets/cardio-room-D0t66TfA.png";
//#endregion
//#region src/assets/equipment.png
var equipment_default = "/assets/equipment-Bq6U9win.png";
//#endregion
//#region src/assets/changing-room.png
var changing_room_default = "/assets/changing-room-DheWl1Pj.png";
//#endregion
//#region src/assets/washroom.png
var washroom_default = "/assets/washroom-Dugc8Pa4.png";
//#endregion
//#region src/assets/gallery-barbell.jpg
var gallery_barbell_default = "/assets/gallery-barbell-CGki0sYb.jpg";
//#endregion
//#region src/assets/gallery-dumbbells.jpg
var gallery_dumbbells_default = "/assets/gallery-dumbbells-DCUW-Td4.jpg";
//#endregion
//#region src/assets/gallery-ropes.jpg
var gallery_ropes_default = "/assets/gallery-ropes-BRVbkhUm.jpg";
//#endregion
//#region src/routes/index.tsx?tsr-split=component
var PHONE_DISPLAY = "+91 93265 10792";
var WHATSAPP = "https://wa.me/919326510792";
var CONTACT_ENDPOINT = "/api/contact";
var ADDRESS = "Ground Floor, Shivshakti Hsg Soc, Shop No 22, SK Bole Rd, beside Sahakari Bhandar Mall, Mumbai, Maharashtra 400028";
var LOGO_FALLBACK_SRC = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
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
var NAV = [
	{
		id: "home",
		label: "Home"
	},
	{
		id: "about",
		label: "About"
	},
	{
		id: "membership",
		label: "Membership"
	},
	{
		id: "services",
		label: "Services"
	},
	{
		id: "gallery",
		label: "Gallery"
	},
	{
		id: "testimonials",
		label: "Testimonials"
	},
	{
		id: "faq",
		label: "FAQ"
	},
	{
		id: "contact",
		label: "Contact"
	}
];
var contactPlanOptions = [
	{
		label: "Monthly",
		value: "monthly"
	},
	{
		label: "Quarterly",
		value: "quarterly"
	},
	{
		label: "Annual",
		value: "annual"
	},
	{
		label: "Not sure yet",
		value: "unsure"
	}
];
function getInitialContactState() {
	return {
		full_name: "",
		email: "",
		phone: "",
		message: "",
		preferred_plan: ""
	};
}
function getAnalyticsContext() {
	if (typeof window === "undefined") return {
		page_url: "",
		referrer: "",
		utm_source: "",
		utm_medium: "",
		utm_campaign: ""
	};
	const params = new URLSearchParams(window.location.search);
	return {
		page_url: window.location.href,
		referrer: document.referrer,
		utm_source: params.get("utm_source") ?? "",
		utm_medium: params.get("utm_medium") ?? "",
		utm_campaign: params.get("utm_campaign") ?? ""
	};
}
function mapFieldErrors(errors) {
	const mapped = {};
	for (const issue of errors) {
		const field = issue.path[0];
		if (typeof field === "string" && field in getInitialContactState()) mapped[field] = issue.message;
	}
	return mapped;
}
function SafeImage({ src, fallbackSrc, alt, ...props }) {
	const [currentSrc, setCurrentSrc] = useState(src);
	useEffect(() => {
		setCurrentSrc(src);
	}, [src]);
	return /* @__PURE__ */ jsx("img", {
		...props,
		src: currentSrc,
		alt,
		onError: () => setCurrentSrc(fallbackSrc)
	});
}
function HomePage() {
	useReveal();
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-background text-foreground overflow-x-hidden",
		children: [
			/* @__PURE__ */ jsx(Nav, {}),
			/* @__PURE__ */ jsx(Hero, {}),
			/* @__PURE__ */ jsx(Stats, {}),
			/* @__PURE__ */ jsx(About, {}),
			/* @__PURE__ */ jsx(Services, {}),
			/* @__PURE__ */ jsx(Membership, {}),
			/* @__PURE__ */ jsx(Gallery, {}),
			/* @__PURE__ */ jsx(Testimonials, {}),
			/* @__PURE__ */ jsx(FAQ, {}),
			/* @__PURE__ */ jsx(Contact, {}),
			/* @__PURE__ */ jsx(Footer, {}),
			/* @__PURE__ */ jsx(FloatingWhatsApp, {})
		]
	});
}
function Nav() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	useEffect(() => {
		const on = () => setScrolled(window.scrollY > 24);
		on();
		window.addEventListener("scroll", on);
		return () => window.removeEventListener("scroll", on);
	}, []);
	return /* @__PURE__ */ jsxs("header", {
		className: `fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3 bg-background/85 backdrop-blur-lg border-b border-border" : "py-5 bg-transparent"}`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between gap-6",
			children: [
				/* @__PURE__ */ jsxs("a", {
					href: "#home",
					className: "flex items-center gap-3 shrink-0",
					children: [/* @__PURE__ */ jsx("img", {
						src: logo_default,
						alt: "Muscle Flex Fitness Club",
						className: "h-11 w-11 rounded-full ring-1 ring-silver/30",
						width: 44,
						height: 44
					}), /* @__PURE__ */ jsxs("div", {
						className: "hidden sm:block leading-tight",
						children: [/* @__PURE__ */ jsx("div", {
							className: "font-display text-lg tracking-[0.18em] text-foreground",
							children: "MUSCLE FLEX"
						}), /* @__PURE__ */ jsx("div", {
							className: "font-display text-[10px] tracking-[0.4em] text-muted-foreground",
							children: "FITNESS CLUB"
						})]
					})]
				}),
				/* @__PURE__ */ jsx("nav", {
					className: "hidden lg:flex items-center gap-8",
					children: NAV.map((n) => /* @__PURE__ */ jsxs("a", {
						href: `#${n.id}`,
						className: "font-display text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 relative group",
						children: [n.label, /* @__PURE__ */ jsx("span", { className: "absolute left-0 -bottom-1 h-px w-0 bg-linear-to-r from-transparent via-foreground to-transparent group-hover:w-full transition-all duration-300" })]
					}, n.id))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ jsx(Link, {
							to: "/admin",
							className: "hidden md:inline-flex btn-outline py-2.5! px-5! text-xs!",
							children: "Admin"
						}),
						/* @__PURE__ */ jsxs("a", {
							href: `tel:${PHONE}`,
							className: "hidden md:inline-flex btn-outline py-2.5! px-5! text-xs!",
							children: [/* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }), " Call"]
						}),
						/* @__PURE__ */ jsx("button", {
							onClick: () => setOpen((v) => !v),
							className: "lg:hidden p-2 rounded-md border border-border text-foreground",
							"aria-label": "Toggle menu",
							children: open ? /* @__PURE__ */ jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" })
						})
					]
				})
			]
		}), /* @__PURE__ */ jsx("div", {
			className: `lg:hidden overflow-hidden transition-all duration-500 ${open ? "max-h-150 opacity-100" : "max-h-0 opacity-0"}`,
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-5 mt-4 glass rounded-xl p-6 flex flex-col gap-4",
				children: [
					NAV.map((n) => /* @__PURE__ */ jsx("a", {
						href: `#${n.id}`,
						onClick: () => setOpen(false),
						className: "font-display text-base tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground",
						children: n.label
					}, n.id)),
					/* @__PURE__ */ jsxs("a", {
						href: `tel:${PHONE}`,
						className: "btn-primary mt-2",
						children: [/* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }), " Call Now"]
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/admin",
						onClick: () => setOpen(false),
						className: "btn-outline mt-2 text-center justify-center",
						children: "Admin Portal"
					})
				]
			})
		})]
	});
}
function Hero() {
	return /* @__PURE__ */ jsxs("section", {
		id: "home",
		className: "relative min-h-screen flex items-center pt-28",
		children: [
			/* @__PURE__ */ jsx(SafeImage, {
				src: hero_default,
				alt: "Athlete training with barbell in dark gym",
				className: "absolute inset-0 h-full w-full object-cover",
				fallbackSrc: hero_default,
				width: 1920,
				height: 1280
			}),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-hero" }),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_left,oklch(0.13_0_0/0.4),transparent_60%)]" }),
			/* @__PURE__ */ jsx("div", {
				className: "relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-20 w-full",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-3xl",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "reveal section-label mb-8",
							children: "Est. Mumbai · Dadar West"
						}),
						/* @__PURE__ */ jsxs("h1", {
							className: "reveal font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.92] uppercase",
							children: [
								"Build Strength.",
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("span", {
									className: "text-metal",
									children: "Build Confidence."
								})
							]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "reveal mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed",
							children: [
								"Train with dedication at ",
								/* @__PURE__ */ jsx("span", {
									className: "text-foreground",
									children: "Muscle Flex Fitness Club"
								}),
								" — a premium strength & conditioning space built for serious results."
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "reveal mt-10 flex flex-wrap gap-4",
							children: [/* @__PURE__ */ jsxs("a", {
								href: "#contact",
								className: "btn-primary",
								children: ["Join Today ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
							}), /* @__PURE__ */ jsxs("a", {
								href: `tel:${PHONE}`,
								className: "btn-outline",
								children: [/* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }), " Call Now"]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("a", {
				href: "#about",
				className: "absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-muted-foreground hover:text-foreground transition-colors",
				"aria-label": "Scroll down",
				children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-6 w-6 animate-bounce" })
			})
		]
	});
}
var STATS = [
	{
		label: "Modern Equipment",
		value: "100%"
	},
	{
		label: "Coaching",
		value: "Pro"
	},
	{
		label: "Programs",
		value: "8+"
	},
	{
		label: "Satisfaction",
		value: "★★★★★"
	}
];
function Stats() {
	return /* @__PURE__ */ jsx("section", {
		className: "relative border-y border-border bg-secondary/30",
		children: /* @__PURE__ */ jsx("div", {
			className: "mx-auto max-w-7xl px-5 sm:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8",
			children: STATS.map((s) => /* @__PURE__ */ jsxs("div", {
				className: "reveal text-center md:text-left",
				children: [/* @__PURE__ */ jsx("div", {
					className: "font-display text-4xl sm:text-5xl text-metal",
					children: s.value
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-2 font-display text-xs tracking-[0.3em] uppercase text-muted-foreground",
					children: s.label
				})]
			}, s.label))
		})
	});
}
function About() {
	return /* @__PURE__ */ jsx("section", {
		id: "about",
		className: "relative py-28 bg-gradient-dark",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "reveal relative",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative aspect-4/5 overflow-hidden rounded-lg",
					children: [/* @__PURE__ */ jsx(SafeImage, {
						src: cardio_room_default,
						alt: "Muscle Flex cardio training zone",
						className: "h-full w-full object-cover",
						loading: "lazy",
						fallbackSrc: hero_default
					}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-linear-to-t from-background/60 to-transparent" })]
				}), /* @__PURE__ */ jsxs("div", {
					className: "hidden md:block absolute -bottom-6 -right-6 glass rounded-lg p-6 w-64",
					children: [/* @__PURE__ */ jsx("div", {
						className: "font-display text-3xl text-metal",
						children: "Since Day One"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Built around discipline, results and a brotherhood of lifters."
					})]
				})]
			}), /* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("div", {
					className: "reveal section-label mb-6",
					children: "About the Club"
				}),
				/* @__PURE__ */ jsxs("h2", {
					className: "reveal font-display text-5xl sm:text-6xl uppercase leading-[0.95]",
					children: [
						"A destination for ",
						/* @__PURE__ */ jsx("span", {
							className: "text-metal",
							children: "serious"
						}),
						" training."
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "reveal mt-6 text-lg text-muted-foreground leading-relaxed",
					children: "Muscle Flex Fitness Club is where dedicated lifters and first-time members chase the same thing — real transformation. Professional coaching, disciplined programming and a focused atmosphere come together under one roof in the heart of Dadar."
				}),
				/* @__PURE__ */ jsx("ul", {
					className: "reveal mt-8 grid sm:grid-cols-2 gap-4",
					children: [
						"Pro-grade strength equipment",
						"Personalised coaching",
						"Functional & cardio zones",
						"Clean changing & SAUNA ROOMS"
					].map((f) => /* @__PURE__ */ jsxs("li", {
						className: "flex items-start gap-3 text-foreground",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mt-1 grid h-6 w-6 place-items-center rounded-full bg-foreground text-background",
							children: /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5" })
						}), /* @__PURE__ */ jsx("span", {
							className: "text-sm",
							children: f
						})]
					}, f))
				}),
				/* @__PURE__ */ jsx("div", {
					className: "reveal mt-10",
					children: /* @__PURE__ */ jsxs("a", {
						href: "#contact",
						className: "btn-primary",
						children: ["Start Training ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
					})
				})
			] })]
		})
	});
}
var SERVICES = [
	{
		icon: Dumbbell,
		title: "Strength Training",
		desc: "Compound lifts, progressive overload, real strength."
	},
	{
		icon: Flame,
		title: "Weight Loss Programs",
		desc: "Structured fat-loss plans with measurable progress."
	},
	{
		icon: Zap,
		title: "Muscle Building",
		desc: "Hypertrophy-focused programming for visible gains."
	},
	{
		icon: HeartPulse,
		title: "Cardio Fitness",
		desc: "Build conditioning and endurance the right way."
	},
	{
		icon: Users,
		title: "Personal Training",
		desc: "One-on-one coaching tailored to your goals."
	},
	{
		icon: Activity,
		title: "Functional Fitness",
		desc: "Move better, feel stronger, train for life."
	}
];
function Services() {
	return /* @__PURE__ */ jsx("section", {
		id: "services",
		className: "py-28",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-5 sm:px-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "max-w-2xl mb-16",
				children: [/* @__PURE__ */ jsx("div", {
					className: "reveal section-label mb-6",
					children: "What We Offer"
				}), /* @__PURE__ */ jsxs("h2", {
					className: "reveal font-display text-5xl sm:text-6xl uppercase leading-[0.95]",
					children: ["Programs built for ", /* @__PURE__ */ jsx("span", {
						className: "text-metal",
						children: "every level."
					})]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden",
				children: SERVICES.map(({ icon: Icon, title, desc }) => /* @__PURE__ */ jsxs("div", {
					className: "reveal group relative bg-card p-10 transition-all duration-500 hover:bg-secondary",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "grid h-14 w-14 place-items-center rounded-md bg-background border border-border text-foreground transition-all duration-500 group-hover:border-silver group-hover:bg-foreground group-hover:text-background",
							children: /* @__PURE__ */ jsx(Icon, {
								className: "h-6 w-6",
								strokeWidth: 1.5
							})
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "mt-6 font-display text-2xl uppercase tracking-wider",
							children: title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-3 text-sm text-muted-foreground leading-relaxed",
							children: desc
						}),
						/* @__PURE__ */ jsx(ArrowRight, { className: "absolute top-10 right-10 h-5 w-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" })
					]
				}, title))
			})]
		})
	});
}
var PLANS = [
	{
		name: "Monthly",
		tag: "Flexible start",
		features: [
			"Full gym access",
			"Locker facility",
			"Open during all hours",
			"Cardio + strength zones"
		]
	},
	{
		name: "Quarterly",
		tag: "Most popular",
		featured: true,
		features: [
			"Everything in Monthly",
			"Free fitness assessment",
			"Diet guidance",
			"Discounted PT sessions"
		]
	},
	{
		name: "Annual",
		tag: "Best value",
		features: [
			"Everything in Quarterly",
			"Priority coaching slots",
			"Personalised programming",
			"Body recomp tracking"
		]
	}
];
function Membership() {
	return /* @__PURE__ */ jsx("section", {
		id: "membership",
		className: "relative py-28 bg-secondary/20 border-y border-border",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-5 sm:px-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center max-w-2xl mx-auto mb-16",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "reveal section-label mb-6 justify-center",
						children: "Membership"
					}),
					/* @__PURE__ */ jsxs("h2", {
						className: "reveal font-display text-5xl sm:text-6xl uppercase leading-[0.95]",
						children: ["Choose your ", /* @__PURE__ */ jsx("span", {
							className: "text-metal",
							children: "commitment."
						})]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "reveal mt-5 text-muted-foreground",
						children: "Contact us for current pricing — we tailor plans to your goals and schedule."
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid md:grid-cols-3 gap-6",
				children: PLANS.map((p) => /* @__PURE__ */ jsxs("div", {
					className: `reveal relative rounded-lg p-8 transition-all duration-500 ${p.featured ? "bg-foreground text-background scale-100 md:scale-105 shadow-card" : "bg-card border border-border hover:border-silver/40"}`,
					children: [
						p.featured && /* @__PURE__ */ jsx("div", {
							className: "absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-background text-foreground font-display text-[10px] tracking-[0.3em] uppercase rounded-full border border-silver/40",
							children: p.tag
						}),
						/* @__PURE__ */ jsx("div", {
							className: `font-display text-xs tracking-[0.3em] uppercase ${p.featured ? "text-background/60" : "text-muted-foreground"}`,
							children: p.tag
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-2 font-display text-4xl uppercase",
							children: p.name
						}),
						/* @__PURE__ */ jsx("div", {
							className: `mt-6 font-display text-3xl ${p.featured ? "" : "text-metal"}`,
							children: "Enquire"
						}),
						/* @__PURE__ */ jsx("ul", {
							className: "mt-8 space-y-3",
							children: p.features.map((f) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-start gap-3 text-sm",
								children: [/* @__PURE__ */ jsx(Check, { className: `h-4 w-4 mt-0.5 shrink-0 ${p.featured ? "text-background" : "text-silver"}` }), /* @__PURE__ */ jsx("span", {
									className: p.featured ? "text-background/90" : "text-muted-foreground",
									children: f
								})]
							}, f))
						}),
						/* @__PURE__ */ jsx("a", {
							href: "#contact",
							className: `mt-10 block text-center font-display text-sm tracking-[0.25em] uppercase py-3 rounded-md transition-all duration-300 ${p.featured ? "bg-background text-foreground hover:bg-secondary" : "border border-silver/40 text-foreground hover:bg-foreground hover:text-background"}`,
							children: "Contact Us"
						})
					]
				}, p.name))
			})]
		})
	});
}
function Gallery() {
	return /* @__PURE__ */ jsx("section", {
		id: "gallery",
		className: "py-28",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-5 sm:px-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "reveal section-label mb-6",
					children: "Inside the Club"
				}), /* @__PURE__ */ jsxs("h2", {
					className: "reveal font-display text-5xl sm:text-6xl uppercase leading-[0.95]",
					children: ["Step ", /* @__PURE__ */ jsx("span", {
						className: "text-metal",
						children: "inside."
					})]
				})] }), /* @__PURE__ */ jsx("p", {
					className: "reveal max-w-md text-muted-foreground",
					children: "A look at our equipment, training floors and member facilities."
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 md:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-3",
				children: [
					{
						src: equipment_default,
						alt: "Strength training equipment",
						cls: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto"
					},
					{
						src: cardio_room_default,
						alt: "Cardio training room",
						cls: "aspect-square"
					},
					{
						src: gallery_barbell_default,
						alt: "Chalked grip on barbell",
						cls: "aspect-square"
					},
					{
						src: gallery_dumbbells_default,
						alt: "Dumbbell rack",
						cls: "aspect-square md:col-span-2"
					},
					{
						src: gallery_ropes_default,
						alt: "Battle rope training",
						cls: "aspect-square"
					},
					{
						src: changing_room_default,
						alt: "Changing room area",
						cls: "aspect-square"
					},
					{
						src: washroom_default,
						alt: "SAUNA ROOM",
						cls: "aspect-square"
					}
				].map((t, i) => /* @__PURE__ */ jsxs("div", {
					className: `reveal relative overflow-hidden rounded-lg group ${t.cls}`,
					children: [
						/* @__PURE__ */ jsx(SafeImage, {
							src: t.src,
							alt: t.alt,
							loading: "lazy",
							className: "h-full w-full object-cover transition-transform duration-1200 ease-out group-hover:scale-110",
							fallbackSrc: hero_default
						}),
						/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" }),
						/* @__PURE__ */ jsx("div", {
							className: "absolute inset-x-0 bottom-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500",
							children: /* @__PURE__ */ jsx("div", {
								className: "font-display text-xs tracking-[0.3em] uppercase text-silver",
								children: t.alt
							})
						})
					]
				}, i))
			})]
		})
	});
}
var TESTI = [
	{
		name: "Rohan M.",
		role: "Member · 2 yrs",
		quote: "The energy here is unmatched. The coaches push you the right way and the equipment is top-tier. Lost 12 kg in 6 months."
	},
	{
		name: "Priya S.",
		role: "Member · 1 yr",
		quote: "Walked in nervous, walked out hooked. The team made strength training accessible and the atmosphere is genuinely motivating."
	},
	{
		name: "Aakash R.",
		role: "Member · 3 yrs",
		quote: "Hands down the most disciplined gym in Dadar. Programming is solid, equipment well-maintained. Highly recommend."
	}
];
function Testimonials() {
	return /* @__PURE__ */ jsx("section", {
		id: "testimonials",
		className: "relative py-28 bg-gradient-dark",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-5 sm:px-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center max-w-2xl mx-auto mb-16",
				children: [/* @__PURE__ */ jsx("div", {
					className: "reveal section-label mb-6 justify-center",
					children: "Voices from the Floor"
				}), /* @__PURE__ */ jsxs("h2", {
					className: "reveal font-display text-5xl sm:text-6xl uppercase leading-[0.95]",
					children: ["What members ", /* @__PURE__ */ jsx("span", {
						className: "text-metal",
						children: "say."
					})]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid md:grid-cols-3 gap-6",
				children: TESTI.map((t) => /* @__PURE__ */ jsxs("figure", {
					className: "reveal glass rounded-lg p-8 flex flex-col",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "flex gap-1 text-silver",
							children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-current" }, i))
						}),
						/* @__PURE__ */ jsxs("blockquote", {
							className: "mt-6 text-lg leading-relaxed text-foreground",
							children: [
								"“",
								t.quote,
								"”"
							]
						}),
						/* @__PURE__ */ jsxs("figcaption", {
							className: "mt-8 pt-6 border-t border-border",
							children: [/* @__PURE__ */ jsx("div", {
								className: "font-display tracking-wider uppercase",
								children: t.name
							}), /* @__PURE__ */ jsx("div", {
								className: "text-xs text-muted-foreground mt-1",
								children: t.role
							})]
						})
					]
				}, t.name))
			})]
		})
	});
}
var FAQS = [
	{
		q: "Where is Muscle Flex Fitness Club located?",
		a: "We're at Shop No 22, Shivshakti Hsg Soc, SK Bole Rd, beside Sahakari Bhandar Mall, Dadar West, Mumbai 400028."
	},
	{
		q: "Do I need prior experience to join?",
		a: "Not at all. Whether you're a complete beginner or an experienced lifter, our coaches will guide you with programming that fits your level."
	},
	{
		q: "What are the membership options?",
		a: "We offer monthly, quarterly and annual plans. Please call or visit us for current pricing and personalised plan suggestions."
	},
	{
		q: "Do you offer personal training?",
		a: "Yes. Certified trainers provide one-on-one sessions tailored to strength, fat-loss, muscle building and functional goals."
	},
	{
		q: "What are your timings?",
		a: "Mon–Sat: 6:00 AM – 10:00 PM. Sunday: 7:00 AM – 12:00 PM. Holiday timings may vary — please call to confirm."
	}
];
function FAQ() {
	const [open, setOpen] = useState(0);
	return /* @__PURE__ */ jsx("section", {
		id: "faq",
		className: "py-28",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-4xl px-5 sm:px-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center mb-14",
				children: [/* @__PURE__ */ jsx("div", {
					className: "reveal section-label mb-6 justify-center",
					children: "FAQ"
				}), /* @__PURE__ */ jsxs("h2", {
					className: "reveal font-display text-5xl sm:text-6xl uppercase leading-[0.95]",
					children: ["Questions, ", /* @__PURE__ */ jsx("span", {
						className: "text-metal",
						children: "answered."
					})]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "space-y-3",
				children: FAQS.map((f, i) => {
					const isOpen = open === i;
					return /* @__PURE__ */ jsxs("div", {
						className: `reveal border rounded-lg overflow-hidden transition-all duration-300 ${isOpen ? "border-silver/40 bg-card" : "border-border bg-card/40"}`,
						children: [/* @__PURE__ */ jsxs("button", {
							onClick: () => setOpen(isOpen ? null : i),
							className: "w-full flex items-center justify-between gap-6 p-6 text-left",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-display text-base sm:text-lg tracking-wider uppercase",
								children: f.q
							}), /* @__PURE__ */ jsx(ChevronDown, { className: `h-5 w-5 shrink-0 text-silver transition-transform duration-300 ${isOpen ? "rotate-180" : ""}` })]
						}), /* @__PURE__ */ jsx("div", {
							className: `grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`,
							children: /* @__PURE__ */ jsx("div", {
								className: "overflow-hidden",
								children: /* @__PURE__ */ jsx("p", {
									className: "px-6 pb-6 text-muted-foreground leading-relaxed",
									children: f.a
								})
							})
						})]
					}, i);
				})
			})]
		})
	});
}
function Contact() {
	const [formState, setFormState] = useState(getInitialContactState());
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [honeypot, setHoneypot] = useState("");
	const submitForm = async (event) => {
		event.preventDefault();
		setErrors({});
		const analytics = getAnalyticsContext();
		const parsed = leadFormSchema.safeParse({
			...formState,
			source: "website-contact-form",
			...analytics,
			honeypot
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
					honeypot
				})
			});
			const result = await response.json().catch(() => null);
			if (!response.ok) {
				if (response.status === 400 && result?.fieldErrors) {
					const mappedErrors = {};
					for (const [field, messages] of Object.entries(result.fieldErrors)) if (field in getInitialContactState() && messages?.[0]) mappedErrors[field] = messages[0];
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
	return /* @__PURE__ */ jsx("section", {
		id: "contact",
		className: "relative py-28 bg-secondary/20 border-t border-border",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				/* @__PURE__ */ jsx("div", {
					className: "reveal section-label mb-6",
					children: "Get in Touch"
				}),
				/* @__PURE__ */ jsxs("h2", {
					className: "reveal font-display text-5xl sm:text-6xl uppercase leading-[0.95]",
					children: [
						"Visit us. ",
						/* @__PURE__ */ jsx("br", {}),
						/* @__PURE__ */ jsx("span", {
							className: "text-metal",
							children: "Train with us."
						})
					]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "reveal mt-6 text-muted-foreground max-w-md",
					children: "Drop by the club or send a message — we'll get back the same day with membership details and a tour."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "reveal mt-10 space-y-5",
					children: [
						/* @__PURE__ */ jsxs("a", {
							href: `tel:${PHONE}`,
							className: "flex items-start gap-4 group",
							children: [/* @__PURE__ */ jsx("span", {
								className: "grid h-11 w-11 place-items-center rounded-md border border-border bg-card group-hover:border-silver transition-colors",
								children: /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "font-display text-xs tracking-[0.3em] uppercase text-muted-foreground",
								children: "Phone"
							}), /* @__PURE__ */ jsx("div", {
								className: "mt-1 text-foreground",
								children: PHONE_DISPLAY
							})] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ jsx("span", {
								className: "grid h-11 w-11 place-items-center rounded-md border border-border bg-card",
								children: /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "font-display text-xs tracking-[0.3em] uppercase text-muted-foreground",
								children: "Address"
							}), /* @__PURE__ */ jsx("div", {
								className: "mt-1 text-foreground max-w-sm",
								children: ADDRESS
							})] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ jsx("span", {
								className: "grid h-11 w-11 place-items-center rounded-md border border-border bg-card",
								children: /* @__PURE__ */ jsx(Clock, { className: "h-4 w-4" })
							}), /* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("div", {
									className: "font-display text-xs tracking-[0.3em] uppercase text-muted-foreground",
									children: "Hours"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-1 text-foreground",
									children: "Mon–Sat 6:00 AM – 10:00 PM"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "text-muted-foreground text-sm",
									children: "Sun 7:00 AM – 12:00 PM"
								})
							] })]
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "reveal mt-10 rounded-lg overflow-hidden border border-border",
					children: /* @__PURE__ */ jsx("iframe", {
						title: "Muscle Flex Fitness Club location",
						src: "https://www.google.com/maps?q=Sahakari+Bhandar+Mall+SK+Bole+Rd+Dadar+West+Mumbai&output=embed",
						width: "100%",
						height: "260",
						loading: "lazy",
						referrerPolicy: "no-referrer-when-downgrade",
						className: "block w-full"
					})
				})
			] }), /* @__PURE__ */ jsxs("form", {
				onSubmit: submitForm,
				className: "reveal glass rounded-lg p-8 sm:p-10 self-start",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "font-display text-2xl uppercase tracking-wider",
						children: "Send a Message"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "We’ll respond with membership details and next steps."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-8 space-y-5",
						children: [
							/* @__PURE__ */ jsx(Field, {
								name: "full_name",
								label: "Full Name",
								value: formState.full_name,
								onChange: (value) => setFormState((current) => ({
									...current,
									full_name: value
								})),
								required: true,
								error: errors.full_name,
								autoComplete: "name"
							}),
							/* @__PURE__ */ jsx(Field, {
								name: "email",
								label: "Email",
								type: "email",
								value: formState.email,
								onChange: (value) => setFormState((current) => ({
									...current,
									email: value
								})),
								required: true,
								error: errors.email,
								autoComplete: "email"
							}),
							/* @__PURE__ */ jsx(Field, {
								name: "phone",
								label: "Phone Number",
								type: "tel",
								value: formState.phone,
								onChange: (value) => setFormState((current) => ({
									...current,
									phone: value
								})),
								required: true,
								error: errors.phone,
								autoComplete: "tel"
							}),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
								htmlFor: "preferred_plan",
								className: "font-display text-xs tracking-[0.3em] uppercase text-muted-foreground",
								children: "Preferred Plan"
							}), /* @__PURE__ */ jsxs("select", {
								id: "preferred_plan",
								name: "preferred_plan",
								value: formState.preferred_plan,
								onChange: (event) => setFormState((current) => ({
									...current,
									preferred_plan: event.target.value
								})),
								className: "mt-2 w-full bg-background/60 border border-border rounded-md px-4 py-3 text-foreground focus:outline-none focus:border-silver transition-colors",
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									children: "Select a plan"
								}), contactPlanOptions.map((plan) => /* @__PURE__ */ jsx("option", {
									value: plan.value,
									children: plan.label
								}, plan.value))]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("label", {
									htmlFor: "message",
									className: "font-display text-xs tracking-[0.3em] uppercase text-muted-foreground",
									children: "Your Message"
								}),
								/* @__PURE__ */ jsx(Textarea, {
									id: "message",
									name: "message",
									rows: 4,
									value: formState.message,
									onChange: (event) => setFormState((current) => ({
										...current,
										message: event.target.value
									})),
									className: "mt-2 resize-none bg-background/60",
									placeholder: "I’d like to know about membership plans..."
								}),
								errors.message ? /* @__PURE__ */ jsx("p", {
									className: "mt-2 text-sm text-red-400",
									children: errors.message
								}) : null
							] }),
							/* @__PURE__ */ jsx("input", {
								type: "text",
								name: "website",
								value: honeypot,
								onChange: (event) => setHoneypot(event.target.value),
								tabIndex: -1,
								autoComplete: "off",
								"aria-hidden": "true",
								className: "absolute left-[-9999px] h-px w-px opacity-0"
							})
						]
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "submit",
						disabled: isSubmitting,
						className: "btn-primary mt-8 w-full disabled:opacity-60",
						children: [
							isSubmitting ? "Sending..." : "Send Enquiry",
							" ",
							/* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
						]
					}),
					errors.form ? /* @__PURE__ */ jsx("p", {
						className: "mt-4 text-sm text-red-400 text-center",
						children: errors.form
					}) : null
				]
			})]
		})
	});
}
function Field({ name, label, type = "text", required, value, onChange, error, autoComplete }) {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("label", {
			htmlFor: name,
			className: "font-display text-xs tracking-[0.3em] uppercase text-muted-foreground",
			children: label
		}),
		/* @__PURE__ */ jsx(Input, {
			id: name,
			name,
			type,
			required,
			value,
			onChange: (event) => onChange(event.target.value),
			autoComplete,
			className: "mt-2 bg-background/60"
		}),
		error ? /* @__PURE__ */ jsx("p", {
			className: "mt-2 text-sm text-red-400",
			children: error
		}) : null
	] });
}
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "bg-[oklch(0.08_0_0)] border-t border-border pt-20 pb-8",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-5 sm:px-8 grid md:grid-cols-4 gap-12",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "md:col-span-1",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ jsx(SafeImage, {
							src: logo_default,
							alt: "",
							className: "h-12 w-12 rounded-full ring-1 ring-silver/30",
							fallbackSrc: LOGO_FALLBACK_SRC
						}), /* @__PURE__ */ jsxs("div", {
							className: "leading-tight",
							children: [/* @__PURE__ */ jsx("div", {
								className: "font-display tracking-[0.18em]",
								children: "MUSCLE FLEX"
							}), /* @__PURE__ */ jsx("div", {
								className: "font-display text-[10px] tracking-[0.4em] text-muted-foreground",
								children: "FITNESS CLUB"
							})]
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-5 text-sm text-muted-foreground leading-relaxed",
						children: "Strength. Discipline. Transformation. — Built in Dadar, Mumbai."
					})]
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "font-display text-xs tracking-[0.3em] uppercase text-silver",
					children: "Quick Links"
				}), /* @__PURE__ */ jsx("ul", {
					className: "mt-5 space-y-3 text-sm",
					children: NAV.slice(0, 5).map((n) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
						href: `#${n.id}`,
						className: "text-muted-foreground hover:text-foreground transition-colors",
						children: n.label
					}) }, n.id))
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
					className: "font-display text-xs tracking-[0.3em] uppercase text-silver",
					children: "Contact"
				}), /* @__PURE__ */ jsxs("ul", {
					className: "mt-5 space-y-3 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ jsxs("li", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ jsx(Phone, { className: "h-4 w-4 mt-0.5 shrink-0" }),
								" ",
								PHONE_DISPLAY
							]
						}),
						/* @__PURE__ */ jsxs("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4 mt-0.5 shrink-0" }), " SK Bole Rd, Dadar West, Mumbai 400028"]
						}),
						/* @__PURE__ */ jsxs("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ jsx(Mail, { className: "h-4 w-4 mt-0.5 shrink-0" }), " info@muscleflex.club"]
						})
					]
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("div", {
						className: "font-display text-xs tracking-[0.3em] uppercase text-silver",
						children: "Hours"
					}),
					/* @__PURE__ */ jsxs("ul", {
						className: "mt-5 space-y-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ jsx("li", { children: "Mon–Sat · 6:00 AM – 10:00 PM" }), /* @__PURE__ */ jsx("li", { children: "Sunday · 7:00 AM – 12:00 PM" })]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 flex gap-3",
						children: [
							{
								Icon: Instagram,
								href: "#"
							},
							{
								Icon: Facebook,
								href: "#"
							},
							{
								Icon: MessageCircle,
								href: WHATSAPP
							}
						].map(({ Icon, href }, i) => /* @__PURE__ */ jsx("a", {
							href,
							target: "_blank",
							rel: "noreferrer",
							className: "grid h-10 w-10 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-silver transition-all",
							children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" })
						}, i))
					})
				] })
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-7xl px-5 sm:px-8 mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground",
			children: [/* @__PURE__ */ jsxs("div", { children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" Muscle Flex Fitness Club. All rights reserved."
			] }), /* @__PURE__ */ jsx("div", {
				className: "font-display tracking-[0.3em] uppercase",
				children: "Strength · Discipline · Transformation"
			})]
		})]
	});
}
function FloatingWhatsApp() {
	return /* @__PURE__ */ jsxs("a", {
		href: WHATSAPP,
		target: "_blank",
		rel: "noreferrer",
		"aria-label": "Chat on WhatsApp",
		className: "fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-foreground text-background shadow-2xl hover:scale-110 transition-transform duration-300",
		children: [/* @__PURE__ */ jsx(MessageCircle, { className: "h-6 w-6" }), /* @__PURE__ */ jsx("span", { className: "absolute inset-0 rounded-full animate-ping bg-foreground/30" })]
	});
}
//#endregion
export { HomePage as component };
