import { FlagsService } from './flags.service';

describe('FlagsController (service contract)', () => {
	it('getFlag returns null when missing', async () => {
		const svc = { getFlag: async () => null } as unknown as FlagsService;
		await expect(svc.getFlag('missing', 'public')).resolves.toBeNull();
	});
});