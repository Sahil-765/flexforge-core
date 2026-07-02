//#region src/assets/hero.jpg
var hero_default = "/assets/hero-D9yoAEVw.jpg";
//#endregion
//#region src/lib/constants.ts
var PHONE = "+919326510792";
var PHONE_DISPLAY = "+91 93265 10792";
var WHATSAPP = "https://wa.me/919326510792";
var CONTACT_ENDPOINT = "/api/contact";
var ADDRESS = "Ground Floor, Shivshakti Hsg Soc, Shop No 22, SK Bole Rd, beside Sahakari Bhandar Mall, Mumbai, Maharashtra 400028";
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
//#endregion
export { PHONE as a, hero_default as c, NAV as i, CONTACT_ENDPOINT as n, PHONE_DISPLAY as o, LOGO_FALLBACK_SRC as r, WHATSAPP as s, ADDRESS as t };
