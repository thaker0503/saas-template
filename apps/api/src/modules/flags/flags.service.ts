import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';

@Injectable()
export class FlagsService {
	constructor(private readonly prisma: PrismaService) {}

	async getFlag(key: string, tenantId: string) {
		return this.prisma.featureFlag.findUnique({ where: { key_tenantId: { key, tenantId } } });
	}
}