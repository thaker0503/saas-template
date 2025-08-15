import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from './config/env.module';
import { HealthController } from './health/health.controller';
import { PrismaModule } from './db/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TenancyModule } from './tenancy/tenancy.module';
import { FlagsModule } from './flags/flags.module';
import { RbacModule } from './rbac/rbac.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		EnvModule,
		PrismaModule,
		TenancyModule,
		AuthModule,
		FlagsModule,
		RbacModule,
		UsersModule,
	],
	controllers: [HealthController],
})
export class AppModule {}