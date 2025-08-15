import { Module } from '@nestjs/common';
import { FlagsController } from './flags.controller';
import { FlagsService } from './flags.service';
import { PrismaModule } from '../db/prisma.module';

@Module({
	imports: [PrismaModule],
	controllers: [FlagsController],
	providers: [FlagsService],
})
export class FlagsModule {}