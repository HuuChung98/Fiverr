import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobTypeService } from './job-type.service';
import { CreateJobTypeDto } from './dto/create-job-type.dto';
import { UpdateJobTypeDto } from './dto/update-job-type.dto';
import { ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("LoaiCongViec") // gom nhóm API trong swagger
@Controller('api/loai-cong-viec')
export class JobTypeController {
  constructor(private readonly jobTypeService: JobTypeService) {}

  @Post()
  createJobType(@Body() createJobTypeDto: CreateJobTypeDto) {
    return this.jobTypeService.createJobType(createJobTypeDto);
  }

  @Get()
  getJobType() {
    return this.jobTypeService.getJobType();
  }

  @Get()
  getJobType_Page() {
    return this.jobTypeService.getJobType_Page();
  }

  @Get(':id')
  jobTypeDetail(@Param('id') id: string) {
    return this.jobTypeService.jobTypeDetail(+id);
  }

  @Patch(':id')
  updateTypeJob(@Param('id') id: string) {
    return this.jobTypeService.updateTypeJob(+id);
  }

  @Delete(':id')
  removeJobType(@Param('id') id: string) {
    return this.jobTypeService.removeJobType(+id);
  }
}
