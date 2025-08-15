import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { FlagsService } from './flags.service';
import { TenantGuard } from '../tenancy/tenant.guard';

@Controller('flags')
@UseGuards(TenantGuard)
export class FlagsController {
	constructor(private readonly flags: FlagsService) {}

	@Get(':key')
	async get(@Param('key') key: string, @Req() req: Request) {
		const tenantId = (req.headers['x-tenant-id'] as string) || 'public';
		return this.flags.getFlag(key, tenantId);
	}
}