import { describe, expect, it } from 'vitest';
import { loadRuntimeEnv, features } from './index';

describe('env', () => {
	it('loads defaults', () => {
		const env = loadRuntimeEnv(() => undefined);
		expect(env.MULTITENANT).toBe('on');
		expect(env.DEFAULT_TENANT_ID).toBe('public');
	});

	it('parses booleans', () => {
		const env = loadRuntimeEnv((k) => ({ BILLING_ENABLED: 'true', EMAIL_ENABLED: '0', INVITES_ENABLED: '1' }[k]!));
		expect(features.isBillingEnabled(env)).toBe(true);
		expect(features.isEmailEnabled(env)).toBe(false);
		expect(features.areInvitesEnabled(env)).toBe(true);
	});
});