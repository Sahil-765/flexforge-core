import { t as renderErrorPage } from "../server.js";
import { n as createMiddleware, t as createStart } from "./createStart-Dt05N14y.js";
import { t as leadFormSchema } from "./lead-schema-D0d44KbQ.js";
import { z } from "zod";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
//#region src/lib/env.ts
var envSchema = z.object({
	SUPABASE_URL: z.string().trim().url({ message: "SUPABASE_URL must be a valid URL" }),
	SUPABASE_SERVICE_ROLE_KEY: z.string().trim().min(20, { message: "SUPABASE_SERVICE_ROLE_KEY must be a valid service role key" }),
	ADMIN_EMAIL: z.string().trim().email().default("admin@muscleflex.club"),
	ADMIN_PASSWORD: z.string().trim().min(6).default("flexforge-admin-2026")
});
function getEnv() {
	const result = envSchema.safeParse({
		SUPABASE_URL: process.env.SUPABASE_URL,
		SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
		ADMIN_EMAIL: process.env.ADMIN_EMAIL,
		ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
	});
	if (!result.success) {
		const issues = result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
		console.error("❌ Environment configuration error:", issues);
		throw new Error(`Environment configuration error: ${issues}`);
	}
	return result.data;
}
//#endregion
//#region src/lib/supabase-server.ts
function getSupabaseServiceClient() {
	const env = getEnv();
	return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: {
		persistSession: false,
		autoRefreshToken: false
	} });
}
//#endregion
//#region src/start.ts
var CONTACT_PATH = "/api/contact";
var requestBuckets = /* @__PURE__ */ new Map();
function jsonResponse(body, init) {
	return new Response(JSON.stringify(body), {
		...init,
		headers: {
			"content-type": "application/json; charset=utf-8",
			...init?.headers ?? {}
		}
	});
}
function getClientIp(request) {
	return request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? "unknown";
}
function rateLimit(request) {
	const ip = getClientIp(request);
	const now = Date.now();
	const windowMs = 6e4;
	const maxRequests = 5;
	const current = requestBuckets.get(ip);
	if (!current || current.resetAt <= now) {
		requestBuckets.set(ip, {
			count: 1,
			resetAt: now + windowMs
		});
		return null;
	}
	if (current.count >= maxRequests) return current.resetAt - now;
	current.count += 1;
	requestBuckets.set(ip, current);
	return null;
}
function sanitizeBody(body) {
	const normalize = (value) => typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
	return {
		full_name: normalize(body.full_name),
		email: normalize(body.email).toLowerCase(),
		phone: normalize(body.phone),
		message: normalize(body.message),
		preferred_plan: normalize(body.preferred_plan),
		source: normalize(body.source) || "website-contact-form",
		utm_source: normalize(body.utm_source),
		utm_medium: normalize(body.utm_medium),
		utm_campaign: normalize(body.utm_campaign),
		page_url: normalize(body.page_url),
		referrer: normalize(body.referrer),
		honeypot: normalize(body.honeypot)
	};
}
async function triggerFutureIntegrations(lead) {
	console.log("Future extensibility hook triggered for lead:", lead.email);
}
var contactMiddleware = createMiddleware().server(async ({ request, next }) => {
	const url = new URL(request.url);
	if (request.method !== "POST" || url.pathname !== CONTACT_PATH) return next();
	const retryAfter = rateLimit(request);
	if (retryAfter != null) return jsonResponse({
		ok: false,
		error: "Too many requests. Please wait a minute and try again."
	}, {
		status: 429,
		headers: { "retry-after": String(Math.ceil(retryAfter / 1e3)) }
	});
	let payload;
	try {
		payload = await request.json();
	} catch {
		return jsonResponse({
			ok: false,
			error: "Invalid JSON body."
		}, { status: 400 });
	}
	const parsed = leadFormSchema.safeParse(payload);
	if (!parsed.success) return jsonResponse({
		ok: false,
		error: "Please correct the highlighted fields and try again.",
		fieldErrors: parsed.error.flatten().fieldErrors
	}, { status: 400 });
	const sanitized = sanitizeBody(parsed.data);
	if (sanitized.honeypot) return jsonResponse({ ok: true }, { status: 200 });
	try {
		const { error } = await getSupabaseServiceClient().from("leads").insert({
			full_name: sanitized.full_name,
			email: sanitized.email,
			phone: sanitized.phone,
			message: sanitized.message || null,
			preferred_plan: sanitized.preferred_plan || null,
			source: sanitized.source,
			utm_source: sanitized.utm_source || null,
			utm_medium: sanitized.utm_medium || null,
			utm_campaign: sanitized.utm_campaign || null,
			page_url: sanitized.page_url,
			referrer: sanitized.referrer || null,
			status: "new",
			created_at: (/* @__PURE__ */ new Date()).toISOString()
		});
		if (error) {
			console.error("Lead insert failed", error);
			return jsonResponse({
				ok: false,
				error: "We could not save your enquiry right now. Please try again shortly."
			}, { status: 500 });
		}
		triggerFutureIntegrations({
			...sanitized,
			created_at: (/* @__PURE__ */ new Date()).toISOString()
		}).catch((err) => {
			console.error("Post-submission integrations failed", err);
		});
		return jsonResponse({ ok: true }, { status: 201 });
	} catch (error) {
		console.error("Unexpected contact handler error", error);
		return jsonResponse({
			ok: false,
			error: "Something went wrong while submitting your enquiry."
		}, { status: 500 });
	}
});
function hashPassword(password) {
	const salt = crypto.randomBytes(16).toString("hex");
	return `${salt}:${crypto.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex")}`;
}
function verifyPassword(password, storedValue) {
	try {
		const [salt, originalHash] = storedValue.split(":");
		if (!salt || !originalHash) return false;
		return crypto.pbkdf2Sync(password, salt, 1e3, 64, "sha512").toString("hex") === originalHash;
	} catch {
		return false;
	}
}
var adminsSeeded = false;
async function ensureAdminsSeeded(supabase) {
	if (adminsSeeded) return;
	try {
		const { count, error } = await supabase.from("admins").select("*", {
			count: "exact",
			head: true
		});
		if (error) {
			console.error("Error checking admins count", error);
			return;
		}
		if (count === 0) {
			console.log("No admins found in database. Seeding default super admin...");
			const env = getEnv();
			const defaultEmail = env.ADMIN_EMAIL;
			const defaultPassword = env.ADMIN_PASSWORD;
			const hash = hashPassword(defaultPassword);
			const { error: insertError } = await supabase.from("admins").insert({
				email: defaultEmail.toLowerCase().trim(),
				password_hash: hash
			});
			if (insertError) console.error("Failed to seed default admin", insertError);
			else {
				console.log(`Default admin seeded successfully: ${defaultEmail}`);
				adminsSeeded = true;
			}
		} else adminsSeeded = true;
	} catch (err) {
		console.error("Catastrophic error during admin seeding check", err);
	}
}
function encryptToken(payload) {
	const secret = getEnv().SUPABASE_SERVICE_ROLE_KEY;
	const key = crypto.scryptSync(secret, "salt", 32);
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
	let encrypted = cipher.update(payload, "utf8", "hex");
	encrypted += cipher.final("hex");
	return `${iv.toString("hex")}.${encrypted}`;
}
function decryptToken(token) {
	try {
		const [ivHex, encrypted] = token.split(".");
		if (!ivHex || !encrypted) return null;
		const secret = getEnv().SUPABASE_SERVICE_ROLE_KEY;
		const key = crypto.scryptSync(secret, "salt", 32);
		const iv = Buffer.from(ivHex, "hex");
		const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
		let decrypted = decipher.update(encrypted, "hex", "utf8");
		decrypted += decipher.final("utf8");
		return decrypted;
	} catch {
		return null;
	}
}
function verifyAdminSession(request) {
	const match = (request.headers.get("cookie") || "").match(/admin_session=([^;]+)/);
	if (!match) return null;
	const decrypted = decryptToken(decodeURIComponent(match[1]));
	if (!decrypted) return null;
	try {
		const payload = JSON.parse(decrypted);
		if (payload.role === "admin" && payload.expiresAt > Date.now()) return { email: payload.email };
		return null;
	} catch {
		return null;
	}
}
var adminMiddleware = createMiddleware().server(async ({ request, next }) => {
	const url = new URL(request.url);
	if (!url.pathname.startsWith("/api/admin")) return next();
	const supabase = getSupabaseServiceClient();
	if (request.method === "POST" && url.pathname === "/api/admin/login") try {
		const body = await request.json().catch(() => ({}));
		if (!body.email || !body.password) return jsonResponse({
			ok: false,
			error: "Missing email or password"
		}, { status: 400 });
		await ensureAdminsSeeded(supabase);
		const email = body.email.toLowerCase().trim();
		const password = body.password;
		const { data: admin, error } = await supabase.from("admins").select("*").eq("email", email).maybeSingle();
		if (error) {
			console.error("Login database error", error);
			return jsonResponse({
				ok: false,
				error: "Database error during login check"
			}, { status: 500 });
		}
		if (!admin || !verifyPassword(password, admin.password_hash)) return jsonResponse({
			ok: false,
			error: "Invalid email or password"
		}, { status: 401 });
		const token = encryptToken(JSON.stringify({
			role: "admin",
			email: admin.email,
			expiresAt: Date.now() + 86400 * 1e3
		}));
		return jsonResponse({
			ok: true,
			email: admin.email
		}, {
			status: 200,
			headers: { "Set-Cookie": `admin_session=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400` }
		});
	} catch (error) {
		console.error("Login failed", error);
		return jsonResponse({
			ok: false,
			error: "An unexpected login error occurred"
		}, { status: 500 });
	}
	if (request.method === "POST" && url.pathname === "/api/admin/logout") return jsonResponse({ ok: true }, {
		status: 200,
		headers: { "Set-Cookie": `admin_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0` }
	});
	if (!verifyAdminSession(request)) return jsonResponse({
		ok: false,
		error: "Unauthorized access. Please login first."
	}, { status: 401 });
	if (request.method === "GET" && url.pathname === "/api/admin/leads") try {
		const { data: leads, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
		if (error) {
			console.error("Failed to fetch leads", error);
			return jsonResponse({
				ok: false,
				error: "Failed to fetch leads from database"
			}, { status: 500 });
		}
		return jsonResponse({
			ok: true,
			leads
		});
	} catch (error) {
		console.error("Error in leads endpoint", error);
		return jsonResponse({
			ok: false,
			error: "An unexpected database error occurred"
		}, { status: 500 });
	}
	if (request.method === "POST" && url.pathname === "/api/admin/leads/status") try {
		const body = await request.json().catch(() => ({}));
		if (!body.id || !body.status) return jsonResponse({
			ok: false,
			error: "Missing lead ID or status"
		}, { status: 400 });
		const { error } = await supabase.from("leads").update({ status: body.status }).eq("id", body.id);
		if (error) {
			console.error("Failed to update status", error);
			return jsonResponse({
				ok: false,
				error: "Failed to update lead status"
			}, { status: 500 });
		}
		return jsonResponse({ ok: true });
	} catch (error) {
		console.error("Error in update status endpoint", error);
		return jsonResponse({
			ok: false,
			error: "An unexpected status update error occurred"
		}, { status: 500 });
	}
	if (request.method === "DELETE" && url.pathname === "/api/admin/leads") try {
		const body = await request.json().catch(() => ({}));
		if (!body.id) return jsonResponse({
			ok: false,
			error: "Missing lead ID"
		}, { status: 400 });
		const { error } = await supabase.from("leads").delete().eq("id", body.id);
		if (error) {
			console.error("Failed to delete lead", error);
			return jsonResponse({
				ok: false,
				error: "Failed to delete lead"
			}, { status: 500 });
		}
		return jsonResponse({ ok: true });
	} catch (error) {
		console.error("Error in delete endpoint", error);
		return jsonResponse({
			ok: false,
			error: "An unexpected deletion error occurred"
		}, { status: 500 });
	}
	if (request.method === "GET" && url.pathname === "/api/admin/list-admins") try {
		const { data: adminsList, error } = await supabase.from("admins").select("email, created_at").order("created_at", { ascending: true });
		if (error) {
			console.error("Failed to fetch admins", error);
			return jsonResponse({
				ok: false,
				error: "Failed to fetch admins list"
			}, { status: 500 });
		}
		return jsonResponse({
			ok: true,
			admins: adminsList
		});
	} catch (error) {
		console.error("Error listing admins", error);
		return jsonResponse({
			ok: false,
			error: "An unexpected database error occurred"
		}, { status: 500 });
	}
	if (request.method === "POST" && url.pathname === "/api/admin/create-admin") try {
		const body = await request.json().catch(() => ({}));
		if (!body.email || !body.password) return jsonResponse({
			ok: false,
			error: "Missing email or password"
		}, { status: 400 });
		const newEmail = body.email.toLowerCase().trim();
		const newPassword = body.password;
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) return jsonResponse({
			ok: false,
			error: "Invalid email format"
		}, { status: 400 });
		if (newPassword.length < 6) return jsonResponse({
			ok: false,
			error: "Password must be at least 6 characters long"
		}, { status: 400 });
		const hash = hashPassword(newPassword);
		const { error } = await supabase.from("admins").insert({
			email: newEmail,
			password_hash: hash
		});
		if (error) {
			if (error.code === "23505") return jsonResponse({
				ok: false,
				error: "Email is already registered as an admin"
			}, { status: 400 });
			console.error("Failed to insert new admin", error);
			return jsonResponse({
				ok: false,
				error: "Failed to save new admin credentials"
			}, { status: 500 });
		}
		return jsonResponse({ ok: true });
	} catch (error) {
		console.error("Error creating admin", error);
		return jsonResponse({
			ok: false,
			error: "An unexpected admin creation error occurred"
		}, { status: 500 });
	}
	return jsonResponse({
		ok: false,
		error: "Not Found"
	}, { status: 404 });
});
var errorMiddleware = createMiddleware().server(async ({ next }) => {
	try {
		return await next();
	} catch (error) {
		if (error != null && typeof error === "object" && "statusCode" in error) throw error;
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
});
var startInstance = createStart(() => ({ requestMiddleware: [
	adminMiddleware,
	contactMiddleware,
	errorMiddleware
] }));
//#endregion
export { startInstance };
