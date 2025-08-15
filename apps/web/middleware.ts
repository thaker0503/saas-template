import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { loadRuntimeEnv } from '@acme/env';
import { resolveTenantId } from '@acme/tenancy';

export function middleware(req: NextRequest) {
	const env = loadRuntimeEnv();
	if (env.MULTITENANT === 'off') return NextResponse.next();
	const url = new URL(req.url);
	const tenantId = resolveTenantId({
		strategy: env.TENANT_RESOLUTION_STRATEGY,
		defaultTenantId: env.DEFAULT_TENANT_ID,
		hostname: url.hostname,
		pathname: url.pathname,
		headers: (() => { const h: Record<string, string> = {}; req.headers.forEach((v, k) => { h[k] = v; }); return h; })(),
	});
	const res = NextResponse.next();
	res.headers.set('x-tenant-id', tenantId);
	return res;
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};