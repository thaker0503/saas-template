import { z } from 'zod';

function booleanFromEnv(defaultValue: boolean) {
	return z.preprocess((v) => {
		if (typeof v === 'boolean') return v;
		if (typeof v === 'string') {
			const s = v.trim().toLowerCase();
			if (['1', 'true', 'yes', 'y', 'on'].includes(s)) return true;
			if (['0', 'false', 'no', 'n', 'off'].includes(s)) return false;
			return defaultValue;
		}
		if (v == null) return defaultValue;
		return defaultValue;
	}, z.boolean());
}

export const runtimeEnvSchema = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
	MULTITENANT: z.enum(['on', 'off']).default('on'),
	TENANT_RESOLUTION_STRATEGY: z.enum(['subdomain', 'path', 'header']).default('subdomain'),
	DEFAULT_TENANT_ID: z.string().min(1).default('public'),

	BILLING_ENABLED: booleanFromEnv(false),
	EMAIL_ENABLED: booleanFromEnv(false),
	INVITES_ENABLED: booleanFromEnv(true),
	ANALYTICS_WRITE_KEY: z.string().optional().default(''),

	NEXT_PUBLIC_APP_URL: z.string().url().optional(),
	NEXT_PUBLIC_API_URL: z.string().url().optional(),
});

export type RuntimeEnv = z.infer<typeof runtimeEnvSchema>;

export function loadRuntimeEnv(getEnv: (key: string) => string | undefined = (k) => process.env[k]) {
	const raw: Record<string, string | undefined> = {
		NODE_ENV: getEnv('NODE_ENV'),
		MULTITENANT: getEnv('MULTITENANT'),
		TENANT_RESOLUTION_STRATEGY: getEnv('TENANT_RESOLUTION_STRATEGY'),
		DEFAULT_TENANT_ID: getEnv('DEFAULT_TENANT_ID'),
		BILLING_ENABLED: getEnv('BILLING_ENABLED'),
		EMAIL_ENABLED: getEnv('EMAIL_ENABLED'),
		INVITES_ENABLED: getEnv('INVITES_ENABLED'),
		ANALYTICS_WRITE_KEY: getEnv('ANALYTICS_WRITE_KEY'),
		NEXT_PUBLIC_APP_URL: getEnv('NEXT_PUBLIC_APP_URL'),
		NEXT_PUBLIC_API_URL: getEnv('NEXT_PUBLIC_API_URL'),
	};
	return runtimeEnvSchema.parse(raw);
}

export const features = {
	isBillingEnabled: (env: RuntimeEnv) => !!env.BILLING_ENABLED,
	isEmailEnabled: (env: RuntimeEnv) => !!env.EMAIL_ENABLED,
	areInvitesEnabled: (env: RuntimeEnv) => !!env.INVITES_ENABLED,
	analyticsWriteKey: (env: RuntimeEnv) => env.ANALYTICS_WRITE_KEY,
};