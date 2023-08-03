import { Module } from '@nestjs/common';
import { JobTypeService } from './job-type.service';
import { JobTypeController } from './job-type.controller';

@Module({
  controllers: [JobTypeController],
  providers: [JobTypeService]
})
export class JobTypeModule {}
