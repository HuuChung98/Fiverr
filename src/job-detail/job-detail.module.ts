import { Module } from '@nestjs/common';
import { JobDetailService } from './job-detail.service';
import { JobDetailController } from './job-detail.controller';

@Module({
  controllers: [JobDetailController],
  providers: [JobDetailService]
})
export class JobDetailModule {}
