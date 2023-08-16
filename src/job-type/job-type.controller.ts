import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { JobTypeService } from './job-type.service';
import { ApiBearerAuth, ApiHeader, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

class JobType {
  @ApiProperty({ description: "loaiCongViec_id", type: Number })
  loaiCongViec_id: number;

  @ApiProperty({ description: "tenLoaiCongViec", type: String })
  ten_loai_cong_viec: string;
}

@ApiBearerAuth()
@ApiHeader({ name: "Token", description: "JWT Token"})
@UseGuards(AuthGuard("jwt"))

// gom nhóm API trong swagger
@ApiTags("LoaiCongViec")
@Controller('api/loai-cong-viec')
export class JobTypeController {
  constructor(private readonly jobTypeService: JobTypeService) { }

  // Lấy về tất cả loại công việc
  @Get()
  getJobType() {
    return this.jobTypeService.getJobType();
  }

  // Tạo loại công viêc
  @Post()
  createJobType(@Body() payload: JobType) {
    return this.jobTypeService.createJobType(payload);
  }

  // Phân trang tìm kiếm loai công việc 
  @Get("phan-trang-tim-kiem")
  getJobType_Page(@Query("pageIndex") pageIndex: number, @Query("pageSize") pageSize: number, @Query("keyword") keyword: string) {
    const paginationOptions = { pageIndex, pageSize }
    return this.jobTypeService.getJobType_Page(paginationOptions, keyword);
  }

  // Lấy thông tin loại công việc theo Id công việc
  @Get(':id')
  jobTypeDetail(@Param('id') id: string) {
    return this.jobTypeService.jobTypeDetail(+id);
  }

  // Chỉnh sửa lại loại công việc
  @Put(':id')
  updateTypeJob(@Param('id') id: string, @Body() payload: JobType) {
    return this.jobTypeService.updateTypeJob(+id, payload);
  }

  // Xóa loại công việc đã tạo
  @Delete(':id')
  removeJobType(@Param('id') id: string) {
    return this.jobTypeService.removeJobType(+id);
  }
}