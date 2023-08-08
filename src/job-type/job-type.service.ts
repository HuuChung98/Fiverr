import { Injectable } from '@nestjs/common';
import { CreateJobTypeDto } from './dto/create-job-type.dto';
import { UpdateJobTypeDto } from './dto/update-job-type.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class JobTypeService {

  prisma = new PrismaClient();

  async createJobType(body) {
    let {ten_loai_cong_viec} = body;
    let jobType = await this.prisma.loaiCongViec.findMany({ where: { ten_loai_cong_viec}});
    
    if(jobType.length == 0) {
      return "Loại công việc đã tồn tại"
    }
    return await this.prisma.loaiCongViec.create({ data: body});
     
  }

  async getJobType() {
    let jobType = await this.prisma.loaiCongViec.findMany();
    return jobType
  }


  async getJobType_Page(paginationOptions, keyword) {
    const { pageIndex, pageSize } = paginationOptions;
    const skip = (pageIndex - 1) * pageSize;

    let jobType = await this.prisma.loaiCongViec.findMany({ where: { ten_loai_cong_viec: keyword}, take: Number(pageSize), skip: skip});

    return jobType;
  }

  async jobTypeDetail(id: number) {
    let jobTypeDetail = await this.prisma.loaiCongViec.findFirst({where: {
      loaiCongViec_id: id
    }}) 
    return jobTypeDetail;
  }

  async updateTypeJob(id: number, payload) {
    let checkLoaiCongViec  = await this.prisma.loaiCongViec.findFirst({where: {
      loaiCongViec_id: id
    }});

    if(checkLoaiCongViec) {
      await this.prisma.loaiCongViec.update(payload)
    }

    return checkLoaiCongViec;
  }


  async removeJobType(id: number) {
    let removeJobType = await this.prisma.loaiCongViec.findFirst({ where: {
      loaiCongViec_id: id
    }});
    if(removeJobType) {
      await this.prisma.loaiCongViec.delete({ where: {
        loaiCongViec_id: id
      }});
      return `Đã xóa ${removeJobType.ten_loai_cong_viec}`;
    }
  }
}
