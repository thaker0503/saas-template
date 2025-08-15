import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { minRoleFor } from '@acme/rbac';

@Injectable()
export class RbacGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const req = context.switchToHttp().getRequest<Request>();
		const action = (req.headers['x-action'] as string) || '';
		if (!action) return true; // no required action
		const role = ((req.headers['x-role'] as string) || 'VIEWER').toUpperCase() as any;
		const minRole = minRoleFor(action as any);
		const order: any = { VIEWER: 0, MEMBER: 1, ADMIN: 2, OWNER: 3 };
		if (order[role] >= order[minRole]) return true;
		throw new UnauthorizedException('Insufficient role');
	}
}