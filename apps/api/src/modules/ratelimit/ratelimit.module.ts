import { Module, Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RateLimitGuard implements CanActivate {
	private redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest<Request & { ip: string }>();
		const key = `rl:${req.ip}`;
		const count = await this.redis.incr(key);
		if (count === 1) await this.redis.expire(key, 60);
		return count <= 120;
	}
}

@Module({ providers: [RateLimitGuard], exports: [RateLimitGuard] })
export class RateLimitModule {}