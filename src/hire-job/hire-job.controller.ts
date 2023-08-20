import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, Headers, UseGuards } from '@nestjs/common';
import { HireJobService } from './hire-job.service';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { ApiBearerAuth, ApiHeader, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@ApiTags("ThueCongViec")
@Controller('api/thue-cong-viec')
export class HireJobController {
  constructor(private readonly hireJobService: HireJobService) { }

  // Trả về Công Việc đã thuê
  @Get()
  hireJob(@Headers("token") token: string) {
    return this.hireJobService.hireJob(token);
  }
  // Đăng kí Công Việc
  @Post()
  createJob(@Headers("token") token: string, @Body() createHireJobDto: CreateHireJobDto) {
    return this.hireJobService.createJob(token, createHireJobDto);
  }

  // Phân trang Công Việc đã thuê
  @Get("phan-trang-tim-kiem")
  jobHirePage(@Headers("token") token: string, @Query("pageSize") pageSize: number, @Query("pageIndex") pageIndex: number, @Query("keyword") keyword: string) {
    const pageSplit = { pageSize, pageIndex }
    return this.hireJobService.jobHirePage(token, pageSplit, keyword);
  }

  // Lấy danh sách đã thuê
  @Get("lay-danh-sach-da-thue")
  getHiredJob(@Headers("token") token: string) {
    return this.hireJobService.getHiredJob(token);
  }
  // Lấy thông tin Công Việc đã thuê
  @Get(':id')
  jobDetail(@Headers("token") token: string, @Param('id') id: string) {
    return this.hireJobService.jobDetail(token, +id);
  }

  // Chỉnh sửa trạng thái thông tin Công Việc đã thuê
  @Put(':id')
  updateJob(@Headers("token") token: string, @Param('id') id: string, @Body() createHireJobDto: CreateHireJobDto) {
    return this.hireJobService.updateJob(token ,+id, createHireJobDto);
  }

  // Xóa Công Việc đã thuê
  @Delete(':id')
  removeJob(@Headers("token") token: string, @Param('id') id: string) {
    return this.hireJobService.removeJob(token, +id);
  }

  // Cập nhật hoàn thành công việc theo Mã Công Việc
  @Post('hoan-thanh-cong-viec/:MaThueCongViec')
  statusJob(@Headers("token") token: string, @Param('MaThueCongViec') MaThueCongViec: string) {
    return this.hireJobService.statusJob(token ,+MaThueCongViec)
  }
}
