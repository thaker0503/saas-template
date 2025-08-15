import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { z } from 'zod';

const envSchema = z.object({
	API_PORT: z.string().optional(),
	DATABASE_URL: z.string().url().or(z.string().startsWith('postgresql://')),
	JWT_SECRET: z.string().min(8),
	REDIS_URL: z.string().url().or(z.string().startsWith('redis://')),
	MULTITENANT: z.enum(['on', 'off']).default('on'),
	TENANT_RESOLUTION_STRATEGY: z.enum(['subdomain', 'path', 'header']).default('subdomain'),
	DEFAULT_TENANT_ID: z.string().min(1).default('public'),
});

type Env = z.infer<typeof envSchema>;

function validateEnv(config: Record<string, unknown>): Env {
	const parsed = envSchema.safeParse(config);
	if (!parsed.success) {
		console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
		throw new Error('Invalid environment variables');
	}
	return parsed.data;
}

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true, validate: validateEnv })],
})
export class EnvModule {}