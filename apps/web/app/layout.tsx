import './globals.css';
import React from 'react';
import { Nav } from '@/components/Nav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="min-h-screen bg-white text-gray-900 antialiased dark:bg-zinc-950 dark:text-zinc-50">
				<header className="border-b p-4"><Nav /></header>
				{children}
			</body>
		</html>
	);
}