import { describe, expect, it } from 'vitest';
import { FeatureFlagClient } from './index';

describe('FeatureFlagClient', () => {
	const client = new FeatureFlagClient({
		defaultTenantId: 'public',
		getFlag: async (key) => {
			if (key === 'invoices.v2') return { key, enabled: true, variant: 'on', tenantId: 'public' };
			return null;
		},
	});

	it('isEnabled returns boolean', async () => {
		expect(await client.isEnabled('invoices.v2')).toBe(true);
		expect(await client.isEnabled('missing')).toBe(false);
	});

	it('getVariant returns variant or null', async () => {
		expect(await client.getVariant('invoices.v2')).toBe('on');
		expect(await client.getVariant('missing')).toBeNull();
	});
});