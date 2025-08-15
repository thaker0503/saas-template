import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../db/prisma.module';
import { TenantGuard } from '../tenancy/tenant.guard';

@Module({
	imports: [PrismaModule],
	controllers: [UsersController],
	providers: [UsersService, TenantGuard],
})
export class UsersModule {}