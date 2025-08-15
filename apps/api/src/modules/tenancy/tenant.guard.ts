import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { resolveTenantId } from '@acme/tenancy';

@Injectable()
export class TenantGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const req = context.switchToHttp().getRequest<Request>();
		const multi = process.env.MULTITENANT ?? 'on';
		if (multi === 'off') {
			req.headers['x-tenant-id'] = process.env.DEFAULT_TENANT_ID || 'public';
			return true;
		}
		const strategy = (process.env.TENANT_RESOLUTION_STRATEGY || 'subdomain') as any;
		const tenantId = resolveTenantId({
			strategy,
			defaultTenantId: process.env.DEFAULT_TENANT_ID || 'public',
			headers: Object.fromEntries(Object.entries(req.headers).map(([k, v]) => [k.toLowerCase(), Array.isArray(v) ? v[0] : (v as string | undefined)])),
			hostname: req.hostname,
			pathname: req.path,
		});
		req.headers['x-tenant-id'] = tenantId;
		return true;
	}
}