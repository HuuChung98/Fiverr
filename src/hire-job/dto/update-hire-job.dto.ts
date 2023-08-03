import { PartialType } from '@nestjs/mapped-types';
import { CreateHireJobDto } from './create-hire-job.dto';

export class UpdateHireJobDto extends PartialType(CreateHireJobDto) {}
