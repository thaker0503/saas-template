import Link from 'next/link';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen">
			<aside className="w-60 border-r p-4">
				<nav className="space-y-2">
					<Link href="/app" className="block">Home</Link>
					<Link href="/app/data/users" className="block">Users</Link>
				</nav>
			</aside>
			<main className="flex-1 p-6">
				<header className="mb-6 flex items-center justify-between">
					<h1 className="text-2xl font-semibold">Dashboard</h1>
					<div className="text-sm text-gray-500">Signed in</div>
				</header>
				{children}
			</main>
		</div>
	);
}