import { HttpException, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { PrismaClient } from '@prisma/client';
import { asyncScheduler } from 'rxjs';

@Injectable()
export class JobService {

  prisma = new PrismaClient();

  async createJob(payload) {
    await this.prisma.congViec.create({ data: payload });
    return "Công Việc đã được tạo";
  }

  async getJob() {
    return await this.prisma.congViec.findMany();
  }

  async jobPage(paginationOptions, keyword) {
    let { pageIndex, pageSize } = paginationOptions;
    const skip = (pageIndex - 1) * pageSize;

    let job = await this.prisma.congViec.findMany({
      where: {
        mo_ta_ngan: keyword
      }, take: Number(pageSize), skip: skip
    });
    if (job.length == 0) {
      return `Không có công việc cần tìm`;
    } else {
      return job;
    }

  }

  async getJobInfor(id: number) {
    let jobInfo = await this.prisma.congViec.findFirst({
      where: {
        congViec_id: id
      }
    })
    if(jobInfo) {
      return jobInfo;
    } else {
      return "Lỗi BE";
    }
    
  }

  async updateJob(id: number, payload) {
    let checkJob = await this.prisma.congViec.findFirst({ where: { congViec_id: id } });

    if (checkJob) {
      return this.prisma.congViec.update({
        data: payload, where: {
          congViec_id: id
        }
      });
    } else {
      return "Cập nhật không hợp lệ, kiểm tra lại thông tin cập nhật";
    }

  }

  async removeJob(id: number) {
    let checkJob = await this.prisma.congViec.findFirst({ where: { congViec_id: id } })

    // Kiểm tra công việc này là của người dùng nào tạo
    if (checkJob) {
      await this.prisma.congViec.delete({ where: { congViec_id: id } });
      return "Đã xóa công việc"
    } else {
      return "Xóa Công việc không thành công"
    }

  }

  async uploadImageJob(file: Express.Multer.File, MaCongViec: number) {
    let { destination, filename } = file;
    const link = `http://localhost:8080/public/img/${filename}`

    try {

      let getImageById = await this.prisma.congViec.findFirst({
        where: {
          congViec_id: MaCongViec
        }
      });

      if (getImageById) {
        getImageById.hinh_anh = link;

        await this.prisma.congViec.update({
          data: getImageById, where: {
            congViec_id: Number(MaCongViec)
          }
        });
        return "Tạo ảnh thành công";

      } else {
        throw new HttpException({ content: "Tạo ảnh không thành công", code: 404}, 404)
      }
    } catch (error) {
        throw new HttpException(error.response.content, error.status);
    }
  }

  async getMenuJobType() {
    return await this.prisma.congViec.findMany({include: {
      ChiTietLoaiCongViec: true
    }});
    // return menuJobType;
  }

  async getDetailJobType(MaLoaiCongViec: number) {
    let data = await this.prisma.loaiCongViec.findMany({ where: {
      loaiCongViec_id: MaLoaiCongViec
    }});
    return data;
  }

  async getJobByJobTypeId(MaChiTietLoai: number) {
    let payload = await this.prisma.congViec.findMany({ include: {
      ChiTietLoaiCongViec: true
    }, where: {
      chiTiet_id: MaChiTietLoai
    }});

    return payload;
  }

  async gẹtJobDetailById(MaCongViec: number) {
    let payload = await this.prisma.congViec.findFirst({ where: {
      congViec_id: MaCongViec
    }})
    return payload;
  }

  async getListJobByName(TenCongViec) {
    let jobName = await this.prisma.congViec.findMany({ where: {
      ten_cong_viec: TenCongViec
    }})

    return jobName;
  }
}