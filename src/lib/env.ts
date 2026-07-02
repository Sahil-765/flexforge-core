import { z } from "zod";

const envSchema = z.object({
  SUPABASE_URL: z.string().trim().url({ message: "SUPABASE_URL must be a valid URL" }),
  SUPABASE_SERVICE_ROLE_KEY: z
    .string()
    .trim()
    .min(20, { message: "SUPABASE_SERVICE_ROLE_KEY must be a valid service role key" }),
  ADMIN_EMAIL: z.string().trim().email().default("admin@muscleflex.club"),
  ADMIN_PASSWORD: z.string().trim().min(6).default("flexforge-admin-2026"),
});

export type Env = z.infer<typeof envSchema>;

export function getEnv(): Env {
  const result = envSchema.safeParse({
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  });

  if (!result.success) {
    const issues = result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
    console.error("❌ Environment configuration error:", issues);
    throw new Error(`Environment configuration error: ${issues}`);
  }

  return result.data;
}
