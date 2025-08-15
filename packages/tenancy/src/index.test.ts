import { describe, expect, it } from 'vitest';
import { resolveTenantId } from './index';

describe('resolveTenantId', () => {
	it('subdomain: returns default for root domain', () => {
		const id = resolveTenantId({ strategy: 'subdomain', defaultTenantId: 'public', hostname: 'acme.local' });
		expect(id).toBe('public');
	});
	it('subdomain: extracts first subdomain', () => {
		const id = resolveTenantId({ strategy: 'subdomain', defaultTenantId: 'public', hostname: 'foo.acme.local' });
		expect(id).toBe('foo');
	});
	it('path: first segment', () => {
		const id = resolveTenantId({ strategy: 'path', defaultTenantId: 'public', pathname: '/bar/dashboard' });
		expect(id).toBe('bar');
	});
	it('header: header value or default', () => {
		const id = resolveTenantId({ strategy: 'header', defaultTenantId: 'public', headerName: 'x-tenant-id', headers: { 'x-tenant-id': 'baz' } });
		expect(id).toBe('baz');
	});
});