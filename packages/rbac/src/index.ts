export type Role = 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';

export type Action =
	| 'org:read'
	| 'org:write'
	| 'user:read'
	| 'user:invite'
	| 'billing:manage';

const roleRank: Record<Role, number> = {
	VIEWER: 0,
	MEMBER: 1,
	ADMIN: 2,
	OWNER: 3,
};

const actionMinRole: Record<Action, Role> = {
	'org:read': 'VIEWER',
	'org:write': 'ADMIN',
	'user:read': 'MEMBER',
	'user:invite': 'ADMIN',
	'billing:manage': 'OWNER',
};

export function hasMinRole(userRole: Role, minRole: Role): boolean {
	return roleRank[userRole] >= roleRank[minRole];
}

export function can(userRole: Role, action: Action): boolean {
	return hasMinRole(userRole, actionMinRole[action]);
}

export function minRoleFor(action: Action): Role {
	return actionMinRole[action];
}