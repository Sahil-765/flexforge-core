import { z } from "zod";
//#region src/lib/lead-schema.ts
var trimmedText = (minimum, maximum) => z.string().trim().min(minimum).max(maximum);
var leadFormSchema = z.object({
	full_name: trimmedText(2, 120),
	email: z.string().trim().email().max(255),
	phone: trimmedText(7, 40),
	message: z.string().trim().max(1e3).optional().or(z.literal("")),
	preferred_plan: z.string().trim().max(120).optional().or(z.literal("")),
	source: z.string().trim().max(120).optional().or(z.literal("")),
	utm_source: z.string().trim().max(120).optional().or(z.literal("")),
	utm_medium: z.string().trim().max(120).optional().or(z.literal("")),
	utm_campaign: z.string().trim().max(120).optional().or(z.literal("")),
	page_url: z.string().trim().url().max(2048),
	referrer: z.string().trim().max(2048).optional().or(z.literal("")),
	honeypot: z.string().trim().max(0).optional().or(z.literal(""))
});
//#endregion
export { leadFormSchema as t };
