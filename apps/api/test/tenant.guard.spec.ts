import { TenantGuard } from '../src/modules/tenancy/tenant.guard';

describe('TenantGuard', () => {
	it('forces default when MULTITENANT=off', () => {
		process.env.MULTITENANT = 'off';
		const guard = new TenantGuard();
		const ctx: any = {
			switchToHttp: () => ({ getRequest: () => ({ headers: {}, hostname: 'foo.local', path: '/' }) }),
		};
		expect(guard.canActivate(ctx)).toBe(true);
	});
});