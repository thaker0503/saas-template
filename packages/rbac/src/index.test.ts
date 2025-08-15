import { describe, expect, it } from 'vitest';
import { can, hasMinRole, minRoleFor } from './index';

describe('rbac', () => {
	it('role ordering', () => {
		expect(hasMinRole('OWNER', 'ADMIN')).toBe(true);
		expect(hasMinRole('VIEWER', 'MEMBER')).toBe(false);
	});
	it('actions', () => {
		expect(minRoleFor('org:write')).toBe('ADMIN');
		expect(can('MEMBER', 'org:write')).toBe(false);
		expect(can('OWNER', 'billing:manage')).toBe(true);
	});
});