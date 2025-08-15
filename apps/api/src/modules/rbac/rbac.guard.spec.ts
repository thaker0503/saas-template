import { RbacGuard } from './rbac.guard';

describe('RbacGuard', () => {
	it('allows when role meets min requirement', () => {
		const guard = new RbacGuard();
		const ctx: any = { switchToHttp: () => ({ getRequest: () => ({ headers: { 'x-action': 'org:write', 'x-role': 'ADMIN' } }) }) };
		expect(guard.canActivate(ctx)).toBe(true);
	});

	it('blocks when role below requirement', () => {
		const guard = new RbacGuard();
		const ctx: any = { switchToHttp: () => ({ getRequest: () => ({ headers: { 'x-action': 'billing:manage', 'x-role': 'ADMIN' } }) }) };
		expect(() => guard.canActivate(ctx)).toThrow();
	});
});