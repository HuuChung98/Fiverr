import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HireJobService } from './hire-job.service';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { UpdateHireJobDto } from './dto/update-hire-job.dto';

@Controller('api/thue-cong-viec')
export class HireJobController {
  constructor(private readonly hireJobService: HireJobService) {}

  @Post()
  createJob(@Body() createHireJobDto: CreateHireJobDto) {
    return this.hireJobService.createJob(createHireJobDto);
  }

  @Get()
  hireJob() {
    return this.hireJobService.hireJob();
  }

  @Get()
  jobPage() {
    return this.hireJobService.jobPage();
  }

  @Get(':id')
  jobDetail(@Param('id') id: string) {
    return this.hireJobService.jobDetail(+id);
  }

  @Patch(':id')
  updateJob(@Param('id') id: string, @Body() body) {
    return this.hireJobService.updateJob(+id);
  }

  @Delete(':id')
  removeJob(@Param('id') id: string) {
    return this.hireJobService.removeJob(+id);
  }

  @Get()
  getHiredJob() {
    return this.hireJobService.getHiredJob();
  }
  @Post('job_id')
  statusJob(@Param('job_id') job_id: string) {
    return this.hireJobService.statusJob(+job_id)
  }
}
