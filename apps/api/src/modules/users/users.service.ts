import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async listUsers(_tenantId: string) {
		return this.prisma.user.findMany({ select: { id: true, email: true, name: true } });
	}
}