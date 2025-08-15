import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { DevAuthController } from './dev.controller';
import { PrismaModule } from '../db/prisma.module';

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET || 'devjwt',
			signOptions: { expiresIn: '7d' },
		}),
		PrismaModule,
	],
	controllers: [DevAuthController],
	providers: [JwtStrategy],
	exports: [JwtModule],
})
export class AuthModule {}