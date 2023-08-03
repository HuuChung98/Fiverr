import { Module } from '@nestjs/common';
import { HireJobService } from './hire-job.service';
import { HireJobController } from './hire-job.controller';

@Module({
  controllers: [HireJobController],
  providers: [HireJobService]
})
export class HireJobModule {}
