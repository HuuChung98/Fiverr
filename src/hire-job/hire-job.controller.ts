import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { HireJobService } from './hire-job.service';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { ApiBearerAuth, ApiHeader, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiHeader({ name: "Token", description: "JWT token"})

@ApiTags("ThueCongViec")
@Controller('api/thue-cong-viec')
export class HireJobController {
  constructor(private readonly hireJobService: HireJobService) { }

  // Trả về Công Việc đã thuê
  @Get()
  hireJob() {
    return this.hireJobService.hireJob();
  }
  // Đăng kí Công Việc
  @Post()
  createJob(@Body() createHireJobDto: CreateHireJobDto) {
    return this.hireJobService.createJob(createHireJobDto);
  }

  // Phân trang Công Việc đã thuê
  @Get("phan-trang-tim-kiem")
  jobHirePage(@Query("pageSize") pageSize: number, @Query("pageIndex") pageIndex: number, @Query("keyword") keyword: string) {
    const pageSplit = { pageSize, pageIndex }
    return this.hireJobService.jobHirePage(pageSplit, keyword);
  }

  // Lấy danh sách đã thuê
  @Get("lay-danh-sach-da-thue")
  getHiredJob() {
    return this.hireJobService.getHiredJob();
  }
  // Lấy thông tin Công Việc đã thuê
  @Get(':id')
  jobDetail(@Param('id') id: string) {
    return this.hireJobService.jobDetail(+id);
  }

  // Chỉnh sửa trạng thái thông tin Công Việc đã thuê
  @Put(':id')
  updateJob(@Param('id') id: string, @Body() createHireJobDto: CreateHireJobDto) {
    return this.hireJobService.updateJob(+id, createHireJobDto);
  }

  // Xóa Công Việc đã thuê
  @Delete(':id')
  removeJob(@Param('id') id: string) {
    return this.hireJobService.removeJob(+id);
  }

  // Cập nhật hoàn thành công việc theo Mã Công Việc
  @Post('hoan-thanh-cong-viec/:MaThueCongViec')
  statusJob(@Param('MaThueCongViec') MaThueCongViec: string) {
    return this.hireJobService.statusJob(+MaThueCongViec)
  }
}
