import { Injectable } from '@nestjs/common';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { UpdateHireJobDto } from './dto/update-hire-job.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class HireJobService {

  prisma = new PrismaClient();

  async createJob(createHireJobDto: CreateHireJobDto) {
     return await this.prisma.thueCongViec.create({ data: createHireJobDto } );
  }

  async hireJob() {
    return await this.prisma.thueCongViec.findMany();
  }

  async jobHirePage(pageSplit, keyword) {
    const {pageSize, pageIndex } = pageSplit;

    const skip = ( pageIndex - 1 ) * pageSize;

    const data = await this.prisma.thueCongViec.findMany({where: { ngay_thue: keyword }, take: pageSize, skip: skip});

    return data
  }

  async jobDetail(id: number) {
    const payload = await this.prisma.thueCongViec.findFirst({ include: 
      {
        CongViec: true
      }, where: {
        thue_cong_viec_id: id
      }  
    });

    return payload;
  }

  async updateJob(id: number, createHireJobDto: CreateHireJobDto) {
    let updateJobHire = await this.prisma.thueCongViec.update({data: createHireJobDto, where: {
      thue_cong_viec_id: id
    }})

    return "Đã cập nhật";
  }

  async removeJob(id: number) {
    return await this.prisma.thueCongViec.delete({ where: {
      thue_cong_viec_id: id
    }})
  }

  async getHiredJob() {
    return await this.prisma.thueCongViec.findMany();
  }

  async statusJob(MaThueCongViec: number) {
    const jobHired = await this.prisma.thueCongViec.findFirst({ where: {
      thue_cong_viec_id: MaThueCongViec
    }});

    if(jobHired) {
      jobHired.hoan_thanh = true;

      await this.prisma.thueCongViec.update({ data: jobHired, where: {
        thue_cong_viec_id: MaThueCongViec
      }})
    }

    return "Đã cập nhật";
  }
}
