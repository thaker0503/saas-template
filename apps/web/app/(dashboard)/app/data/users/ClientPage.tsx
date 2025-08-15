'use client';
import React, { useEffect, useState } from 'react';
import { AgTable } from '@/components/AgTable';
import type { ColDef } from 'ag-grid-community';

export function ClientUsers() {
	const [users, setUsers] = useState<{ id: string; name: string | null; email: string }[]>([]);
	useEffect(() => {
		(async () => {
			try {
				const dev = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/auth/dev', { method: 'POST' }).then((r) => r.json());
				const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/users', {
					headers: { Authorization: `Bearer ${dev.token}` },
				});
				setUsers(await res.json());
			} catch (e) {
				// swallow for demo
			}
		})();
	}, []);
	const cols: ColDef<typeof users[number]>[] = [
		{ field: 'id' },
		{ field: 'name' },
		{ field: 'email' },
	];
	return <AgTable rowData={users} columnDefs={cols} />;
}