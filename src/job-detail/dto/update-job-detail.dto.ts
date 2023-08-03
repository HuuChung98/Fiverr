import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDetailDto } from './create-job-detail.dto';

export class UpdateJobDetailDto extends PartialType(CreateJobDetailDto) {}
