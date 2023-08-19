import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, Headers } from '@nestjs/common';
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
@UseGuards(AuthGuard("jwt"))

// gom nhóm API trong swagger
@ApiTags("LoaiCongViec")
@Controller('api/loai-cong-viec')
export class JobTypeController {
  constructor(private readonly jobTypeService: JobTypeService) { }

  // Lấy về tất cả loại công việc
  @Get()
  getJobType(@Headers("token") token: string) {
    return this.jobTypeService.getJobType(token);
  }

  // Tạo loại công viêc
  @Post()
  createJobType(@Headers("token") token: string, @Body() payload: JobType) {
    return this.jobTypeService.createJobType(token ,payload);
  }

  // Phân trang tìm kiếm loai công việc 
  @Get("phan-trang-tim-kiem")
  getJobType_Page(@Headers("token") token: string ,@Query("pageIndex") pageIndex: number, @Query("pageSize") pageSize: number, @Query("keyword") keyword: string) {
    const paginationOptions = { pageIndex, pageSize }
    return this.jobTypeService.getJobType_Page(token ,paginationOptions, keyword);
  }

  // Lấy thông tin loại công việc theo Id công việc
  @Get(':id')
  jobTypeDetail(@Headers("token") token: string ,@Param('id') id: string) {
    return this.jobTypeService.jobTypeDetail(token ,+id);
  }

  // Chỉnh sửa lại loại công việc
  @Put(':id')
  updateTypeJob(@Headers("token") token: string, @Param('id') id: string, @Body() payload: JobType) {
    return this.jobTypeService.updateTypeJob(token, +id, payload);
  }

  // Xóa loại công việc đã tạo
  @Delete(':id')
  removeJobType(@Headers("token") token: string, @Param('id') id: string) {
    return this.jobTypeService.removeJobType(token, +id);
  }
}