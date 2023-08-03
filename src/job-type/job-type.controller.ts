import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobTypeService } from './job-type.service';
import { CreateJobTypeDto } from './dto/create-job-type.dto';
import { UpdateJobTypeDto } from './dto/update-job-type.dto';

@Controller('job-type')
export class JobTypeController {
  constructor(private readonly jobTypeService: JobTypeService) {}

  @Post()
  create(@Body() createJobTypeDto: CreateJobTypeDto) {
    return this.jobTypeService.create(createJobTypeDto);
  }

  @Get()
  findAll() {
    return this.jobTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobTypeDto: UpdateJobTypeDto) {
    return this.jobTypeService.update(+id, updateJobTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobTypeService.remove(+id);
  }
}
