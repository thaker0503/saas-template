export type TenantResolutionStrategy = 'subdomain' | 'path' | 'header';

export interface TenantResolutionOptions {
	strategy: TenantResolutionStrategy;
	defaultTenantId: string;
	headerName?: string;
	hostname?: string;
	pathname?: string;
	headers?: Record<string, string | undefined>;
}

export function resolveTenantId(options: TenantResolutionOptions): string {
	const { strategy, defaultTenantId } = options;
	if (strategy === 'header') {
		const header = (options.headerName ?? 'x-tenant-id').toLowerCase();
		const value = options.headers?.[header];
		return (value && value.trim()) || defaultTenantId;
	}
	if (strategy === 'path') {
		const path = options.pathname || '/';
		const [, first] = path.split('/');
		return first || defaultTenantId;
	}
	// subdomain
	const host = options.hostname || 'localhost';
	const parts = host.split('.');
	if (parts.length < 3) return defaultTenantId;
	const [sub] = parts;
	return sub || defaultTenantId;
}