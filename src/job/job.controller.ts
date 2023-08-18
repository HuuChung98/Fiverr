import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseInterceptors, UploadedFile, UseGuards, Headers, HttpException, HttpStatus } from '@nestjs/common';
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
// @ApiHeader({ name: "Token", description: "JWT token" })
@UseGuards(AuthGuard("jwt"))

@ApiTags("CongViec")
@Controller('api/cong-viec')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  // Lấy về danh sách Công Việc
  @Get()
  getJob(@Headers("token") token: string) {
    return this.jobService.getJob(token);
  }

  // Lấy menu loai công viêc 
  @Get("lay-menu-loai-cong-viec")
  getMenuJobType(@Headers("token") token: string) {
    return this.jobService.getMenuJobType(token);
  }

  // Tạo Công Việc
  @Post()
  createJob(@Headers("token") token: string ,@Body() payload: Job) {
    return this.jobService.createJob(token ,payload);
  }

  // Phân trang Công Việc
  @Get("phan-trang-tim-kiem")
  jobPage(@Headers("token") token: string, @Query('pageIndex') pageIndex: number, @Query("pageSize") pageSize: number, @Query("keyword") keyword: string) {
    const paginationOptions = { pageIndex, pageSize }
    return this.jobService.jobPage(token ,paginationOptions, keyword);
  }

  // lấy thông tin công việc theo id công việc
  @Get(":id")
  getJobInfor(@Headers("token") token: string ,@Param('id') id: number) {
    return this.jobService.getJobInfor(token ,+id)
  }

  // Chỉnh sủa lại thông tin công viêc
  @Put(':id')
  updateJob(@Headers("token") token: string ,@Param('id') id: number, @Body() payload: Job) {
    return this.jobService.updateJob(token ,+id, payload);
  }

  // Xóa công việc đã tạo
  @Delete(':id')
  removeJob(@Headers("token") token: string ,@Param('id') id: number,) {
    return this.jobService.removeJob(token ,+id);
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
  uploadImageJob(@Headers("token") token: string ,@UploadedFile() file: Express.Multer.File, @Param("MaCongViec") MaCongViec: number) {
    return this.jobService.uploadImageJob(token ,file, +MaCongViec)
  }

  // Lấy Chi tiết loại công việc theo Mã loai công viêc
  @Get('lay-chi-tiet-loai-cong-viec/:MaLoaiCongViec')
  getDetailJobType(@Headers("token") token: string, @Param("MaLoaiCongViec") MaLoaiCongViec: number) {
    return this.jobService.getDetailJobType(token ,+MaLoaiCongViec)
  }

  // Lấy Công việc theo chi tiết loại
  @Get('lay-cong-viec-theo-chi-tiet-loai/:MaChiTietLoai')
  getJobByJobTypeId(@Headers("token") token: string ,@Param("MaChiTietLoai") MaChiTietLoai: number) {
    return this.jobService.getJobByJobTypeId(token ,+MaChiTietLoai)
  }

  // Lấy công việc chi tiết theo Mã Công Việc
  @Get('lay-cong-viec-chi-tiet/:MaCongViec')
  gẹtJobDetailById(@Headers("token") token: string, @Param("MaCongViec") MaCongViec: number) {
    return this.jobService.gẹtJobDetailById(token ,+MaCongViec)
  }

  // Lấy danh sách công việc theo tên (Tên Công Việc)
  @Get('lay-danh-sach-cong-viec-theo-ten/:TenCongViec')
  getListJobByName(@Headers("token") token: string, @Param("TenCongViec") TenCongViec: string) {
    return this.jobService.getListJobByName(token, TenCongViec)
  }

}