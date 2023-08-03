import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobDetailService } from './job-detail.service';
import { CreateJobDetailDto } from './dto/create-job-detail.dto';
import { UpdateJobDetailDto } from './dto/update-job-detail.dto';
import { ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger'; 

@ApiTags("ChiTietLoaiCongViec")
@Controller('api/chi-tiet-loai-cong-viec')
export class JobDetailController {
  constructor(private readonly jobDetailService: JobDetailService) {}

  @Post()
  create(@Body() createJobDetailDto: CreateJobDetailDto) {
    return this.jobDetailService.create(createJobDetailDto);
  }

  @Get()
  findAll() {
    return this.jobDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDetailDto: UpdateJobDetailDto) {
    return this.jobDetailService.update(+id, updateJobDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobDetailService.remove(+id);
  }
}
