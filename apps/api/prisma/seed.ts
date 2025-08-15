import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const tenant = await prisma.tenant.upsert({
		where: { slug: 'public' },
		update: {},
		create: { slug: 'public', name: 'Public' },
	});
	const user = await prisma.user.upsert({
		where: { email: 'owner@acme.dev' },
		update: {},
		create: { email: 'owner@acme.dev', name: 'Owner' },
	});
	const org = await prisma.organization.create({ data: { name: 'Acme Org', tenantId: tenant.id } });
	await prisma.membership.create({ data: { userId: user.id, organizationId: org.id, role: 'OWNER' } });
	const plan = await prisma.plan.upsert({
		where: { key: 'pro' },
		update: {},
		create: { key: 'pro', name: 'Pro', priceCents: 2900 },
	});
	await prisma.subscription.upsert({
		where: { organizationId: org.id },
		update: {},
		create: { organizationId: org.id, planId: plan.id, active: true },
	});
	await prisma.featureFlag.upsert({
		where: { key_tenantId: { key: 'invoices.v2', tenantId: tenant.id } },
		update: { enabled: true, variant: 'on' },
		create: { key: 'invoices.v2', enabled: true, variant: 'on', tenantId: tenant.id },
	});
	await prisma.featureFlag.upsert({
		where: { key_tenantId: { key: 'analytics.beta', tenantId: tenant.id } },
		update: { enabled: false, variant: 'control' },
		create: { key: 'analytics.beta', enabled: false, variant: 'control', tenantId: tenant.id },
	});
	console.log('Seed complete');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});