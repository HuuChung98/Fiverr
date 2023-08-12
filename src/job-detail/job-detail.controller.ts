import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { JobDetailService } from './job-detail.service';
import { CreateJobDetailDto } from './dto/create-job-detail.dto';
import { UpdateJobDetailDto } from './dto/update-job-detail.dto';
import { ApiBody, ApiConsumes, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

class JobType {
  @ApiProperty({ description: "id", type: Number })
  chiTiet_id: number

  @ApiProperty({ description: "tenChiTiet", type: Number })
  ten_chi_tiet: string
}

@ApiTags("ChiTietLoaiCongViec")
@Controller('api/chi-tiet-loai-cong-viec')
export class JobDetailController {
  constructor(private readonly jobDetailService: JobDetailService) { }

  // Tạo Loại Công Viêc
  @Post()
  createJobType(@Body() payload: JobType) {
    return this.jobDetailService.createJobType(payload);
  }

  // Lấy chi tiết loại công việc
  @Get()
  getDetailJobType() {
    return this.jobDetailService.getDetailJobType();
  }

  // Lấy chi tiết Loại Công Việc theo Id
  @Get(':id')
  getJobInfo(@Param('id') id: string) {
    return this.jobDetailService.getJobInfo(+id);
  }

  // Phân trang tìm kiếm Loại Công Việc 
  @Get("phan-trang-tim-kiem")
  getTypeJobPage(@Query("pageIndex") pageIndex: number, @Query("pageSize") pageSize: number, @Query("keyword") keyword: string) {
    const paginationOptions = { pageIndex, pageSize }
    return this.jobDetailService.getTypeJobPage(paginationOptions, keyword);
  }

  // Chỉnh sử loại công việc đã tạo theo id chi tiết loại
  @Put(':id')
  updateJobType(@Param('id') id: number, @Body() payload: JobType) {
    return this.jobDetailService.updateJobType(+id, payload);
  }

  // Xóa Loại Công Việc đã tạo theo Id
  @Delete(':id')
  removeJobType(@Param('id') id: string) {
    return this.jobDetailService.removeJobType(+id);
  }

  // Thêm nhóm Chi tiết Loại
  @Post("them-nhom-chi-tiet-loai")
  addJobDetail(@Body() createJobDetailDto: CreateJobDetailDto) {
    return this.jobDetailService.addJobDetail(createJobDetailDto);
  }

  // Upload Hình nhóm loại công việc
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'file',
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor("file",
    {
      storage: diskStorage({
        destination: process.cwd() + "/public/img",
        filename: (rep, file, callback) => callback(null, new Date().getTime() + file.originalname)

      })
    }))
  @Post('upload-hinh-nhom-loai_cong-viec/:MaNhomLoaiCongViec')
  uploadImageGroupTypeJob(@UploadedFile() file: Express.Multer.File, @Param('MaNhomLoaiCongViec') MaNhomLoaiCongViec: number) {

    return this.jobDetailService.uploadImageGroupTypeJob(file, +MaNhomLoaiCongViec);
  }


  // sua nhóm chi tiết loại
  @Put("sua-nhom-chi-tiet-loai/:id")
  updateGroupJobDetail(@Param("id") id: string, @Body() createJobDetailDto: CreateJobDetailDto) {
    return this.jobDetailService.updateGroupJobDetail(+id, createJobDetailDto);
  }
}
