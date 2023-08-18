import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseInterceptors, UploadedFile, UseGuards, Headers } from '@nestjs/common';
import { JobDetailService } from './job-detail.service';
import { CreateJobDetailDto } from './dto/create-job-detail.dto';
import { UpdateJobDetailDto } from './dto/update-job-detail.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

class JobTypeDetail {
  @ApiProperty({ description: "id", type: Number })
  chiTiet_id: number

  @ApiProperty({ description: "tenChiTiet", type: String })
  ten_chi_tiet: string
}
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@ApiTags("ChiTietLoaiCongViec")
@Controller('api/chi-tiet-loai-cong-viec')
export class JobDetailController {
  constructor(private readonly jobDetailService: JobDetailService) { }

  // Lấy chi tiết loại công việc
  @Get()
  getDetailJobType(@Headers("token") token: string) {
    return this.jobDetailService.getDetailJobType(token);
  }

  // Tạo Loại Công Viêc
  @Post()
  createJobType(@Headers("token") token: string ,@Body() payload: JobTypeDetail) {
    return this.jobDetailService.createJobType(token ,payload);
  }

  // Phân trang tìm kiếm Loại Công Việc 
  @Get("phan-trang-tim-kiem")
  getTypeJobPage(@Headers("token") token: string ,@Query("pageIndex") pageIndex: number, @Query("pageSize") pageSize: number, @Query("keyword") keyword: string) {
    const paginationOptions = { pageIndex, pageSize }
    return this.jobDetailService.getTypeJobPage(token ,paginationOptions, keyword);
  }

  // Lấy chi tiết Loại Công Việc theo Id
  @Get(':id')
  getJobInfo(@Headers("token") token: string ,@Param('id') id: string) {
    return this.jobDetailService.getJobInfo(token ,+id);
  }

  // Chỉnh sử loại công việc đã tạo theo id chi tiết loại
  @Put(':id')
  updateJobType(@Headers("token") token: string ,@Param('id') id: number, @Body() payload: JobTypeDetail) {
    return this.jobDetailService.updateJobType(token ,+id, payload);
  }

  // Xóa Loại Công Việc đã tạo theo Id
  @Delete(':id')
  removeJobType(@Headers("token") token: string ,@Param('id') id: string) {
    return this.jobDetailService.removeJobType(token ,+id);
  }

  // Thêm nhóm Chi tiết Loại
  @Post("them-nhom-chi-tiet-loai")
  addJobDetail(@Headers("token") token: string ,@Body() createJobDetailDto: CreateJobDetailDto) {
    return this.jobDetailService.addJobDetail(token ,createJobDetailDto);
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
  uploadImageGroupTypeJob(@Headers("token") token: string ,@UploadedFile() file: Express.Multer.File, @Param('MaNhomLoaiCongViec') MaNhomLoaiCongViec: number) {

    return this.jobDetailService.uploadImageGroupTypeJob(token ,file, +MaNhomLoaiCongViec);
  }

  // sua nhóm chi tiết loại
  @Put("sua-nhom-chi-tiet-loai/:id")
  updateGroupJobDetail(@Headers("token") token: string ,@Param("id") id: string, @Body() createJobDetailDto: CreateJobDetailDto) {
    return this.jobDetailService.updateGroupJobDetail(token ,+id, createJobDetailDto);
  }
}
