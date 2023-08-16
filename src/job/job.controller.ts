import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { JobService } from './job.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';

class FileUploadDto {
  @ApiProperty({ type: "string", format: 'binary' })
  file: any;
}

class Job {
  @ApiProperty({ description: "congViec_id", type: Number })
  congViec_id: number

  @ApiProperty({ description: "tenCongViec", type: String })
  ten_cong_viec: string

  @ApiProperty({ description: "danhGia", type: Number })
  danh_gia: number

  @ApiProperty({ description: "giaTien", type: Number })
  gia_tien: number

  @ApiProperty({ description: "hinhAnh", type: String })
  hinh_anh: string

  @ApiProperty({ description: "moTa", type: String })
  mo_ta: string

  @ApiProperty({ description: "moTaNgan", type: String })
  mo_ta_ngan: string

  @ApiProperty({ description: "saoCongViec", type: Number })
  sao_cong_viec: number

  @ApiProperty({ description: "maChiTietLoaiCongViec", type: Number })
  chiTiet_id: number

  @ApiProperty({ description: "nguoiTao", type: Number })
  nguoi_dung_id: number

}

@ApiBearerAuth()
@ApiHeader({ name: "Token", description: "JWT token" })
@UseGuards(AuthGuard("jwt"))

@ApiTags("CongViec")
@Controller('api/cong-viec')
export class JobController {
  constructor(private readonly jobService: JobService) { }

  // Lấy về danh sách Công Việc
  @Get()
  getJob() {
    return this.jobService.getJob();
  }

  // Lấy menu loai công viêc 
  @Get("lay-menu-loai-cong-viec")
  getMenuJobType() {
    return this.jobService.getMenuJobType();
  }

  // Tạo Công Việc
  @Post()
  createJob(@Body() payload: Job) {
    return this.jobService.createJob(payload);
  }

  // Phân trang Công Việc
  @Get("phan-trang-tim-kiem")
  jobPage(@Query('pageIndex') pageIndex: number, @Query("pageSize") pageSize: number, @Query("keyword") keyword: string) {
    const paginationOptions = { pageIndex, pageSize }
    return this.jobService.jobPage(paginationOptions, keyword);
  }

  // lấy thông tin công việc theo id công việc
  @Get(":id")
  getJobInfor(@Param('id') id: number) {
    return this.jobService.getJobInfor(+id)
  }

  // Chỉnh sủa lại thông tin công viêc
  @Put(':id')
  updateJob(@Param('id') id: number, @Body() payload: Job) {
    return this.jobService.updateJob(+id, payload);
  }

  // Xóa công việc đã tạo
  @Delete(':id')
  removeJob(@Param('id') id: number,) {
    return this.jobService.removeJob(+id);
  }

  // Đăng hình ảnh công việc
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'file',
    type: FileUploadDto
  })
  @UseInterceptors(FileInterceptor("file",
    {
      storage: diskStorage({
        destination: process.cwd() + "public/img",
        filename: (rep, file, callback) => callback(null, new Date().getTime() + file.originalname)
      })
    }))
  @Post("upload-hinh-cong-viec/:MaCongViec")
  uploadImageJob(@UploadedFile() file: Express.Multer.File, @Param("MaCongViec") MaCongViec: number) {
    return this.jobService.uploadImageJob(file, +MaCongViec)
  }

  // Lấy Chi tiết loại công việc theo Mã loai công viêc
  @Get('lay-chi-tiet-loai-cong-viec/:MaLoaiCongViec')
  getDetailJobType(@Param("MaLoaiCongViec") MaLoaiCongViec: number) {
    return this.jobService.getDetailJobType(+MaLoaiCongViec)
  }

  // Lấy Công việc theo chi tiết loại
  @Get('lay-cong-viec-theo-chi-tiet-loai/:MaChiTietLoai')
  getJobByJobTypeId(@Param("MaChiTietLoai") MaChiTietLoai: number) {
    return this.jobService.getJobByJobTypeId(+MaChiTietLoai)
  }

  // Lấy công việc chi tiết theo Mã Công Việc
  @Get('lay-cong-viec-chi-tiet/:MaCongViec')
  gẹtJobDetailById(@Param("MaCongViec") MaCongViec: number) {
    return this.jobService.gẹtJobDetailById(+MaCongViec)
  }

  // Lấy danh sách công việc theo tên (Tên Công Việc)
  @Get('lay-danh-sach-cong-viec-theo-ten/:TenCongViec')
  getListJobByName(@Param("TenCongViec") TenCongViec: string) {
    return this.jobService.getListJobByName(TenCongViec)
  }

}