import { BadRequestException, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../db/prisma.service';

@Controller('auth/dev')
export class DevAuthController {
	constructor(private readonly jwt: JwtService, private readonly prisma: PrismaService) {}

	@Post()
	async issueToken() {
		if (process.env.NODE_ENV === 'production') throw new BadRequestException('Not available');
		const user = await this.prisma.user.findUnique({ where: { email: 'owner@acme.dev' } });
		if (!user) throw new BadRequestException('Seed user missing');
		// find org and role
		const membership = await this.prisma.membership.findFirst({ where: { userId: user.id }, include: { organization: { include: { tenant: true } } } });
		const payload = {
			sub: user.id,
			email: user.email,
			orgId: membership?.organizationId ?? null,
			role: membership?.role ?? 'OWNER',
			tenantId: membership?.organization.tenantId ?? null,
		};
		const token = await this.jwt.signAsync(payload);
		return { token };
	}
}