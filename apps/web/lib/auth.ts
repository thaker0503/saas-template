"use client";
import { useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { can, type Action, type Role } from '@acme/rbac';

export function useRole(): Role {
	const { data } = useSession();
	const role = (data?.user as any)?.role as Role | undefined;
	return role ?? 'VIEWER';
}

export function usePermission(action: Action): boolean {
	const role = useRole();
	return useMemo(() => can(role, action), [role, action]);
}