"use client";
import Link from 'next/link';
import { usePermission } from '@/lib/auth';
import { FeatureFlagClient } from '@acme/feature-flags';
import { useEffect, useState } from 'react';

const client = new FeatureFlagClient({
	defaultTenantId: 'public',
	getFlag: async (key, tenantId) => {
		try {
			const res = await fetch((process.env.NEXT_PUBLIC_API_URL || '') + `/api/flags/${key}`);
			if (!res.ok) return null;
			return res.json();
		} catch {
			return null;
		}
	},
});

export function Nav() {
	const canBilling = usePermission('billing:manage');
	const [analyticsOn, setAnalyticsOn] = useState(false);
	useEffect(() => {
		client.isEnabled('analytics.beta').then(setAnalyticsOn);
	}, []);
	return (
		<nav className="flex gap-4">
			<Link href="/">Home</Link>
			<Link href="/pricing">Pricing</Link>
			<Link href="/app">App</Link>
			{canBilling && <Link href="/app/billing">Billing</Link>}
			{analyticsOn && <Link href="/app/analytics">Analytics (beta)</Link>}
		</nav>
	);
}