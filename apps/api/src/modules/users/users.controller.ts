import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { TenantGuard } from '../tenancy/tenant.guard';

@Controller('users')
@UseGuards(AuthGuard('jwt'), TenantGuard)
export class UsersController {
	constructor(private readonly users: UsersService) {}

	@Get()
	async list(@Req() req: Request) {
		const tenantId = (req.headers['x-tenant-id'] as string) || 'public';
		return this.users.listUsers(tenantId);
	}
}