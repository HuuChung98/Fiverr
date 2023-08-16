import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class JobTypeService {

  prisma = new PrismaClient();

  async createJobType(payload) {
    try {
      let { ten_loai_cong_viec } = payload;
      let jobType = await this.prisma.loaiCongViec.findFirst({ where: { ten_loai_cong_viec } });

      if (jobType) {
        return "Loại công việc đã tồn tại";
      } else {
        await this.prisma.loaiCongViec.create({ data: payload });
        return "Đã tạo Loại công việc"
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Tạo loại công việc không thành công",
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }
  }

  async getJobType() {
    return await this.prisma.loaiCongViec.findMany();
  }

  async getJobType_Page(paginationOptions, keyword) {
    const { pageIndex, pageSize } = paginationOptions;
    const skip = (pageIndex - 1) * pageSize;

    let jobType = await this.prisma.loaiCongViec.findMany({
      include: {
        ChiTietLoaiCongViec: true
      }, where: { ten_loai_cong_viec: keyword, }, take: Number(pageSize), skip: skip
    });

    return jobType;
  }

  async jobTypeDetail(id: number) {
    let jobTypeDetail = await this.prisma.loaiCongViec.findFirst({
      include: {
        ChiTietLoaiCongViec: true
      }, where: {
        loaiCongViec_id: id
      }
    })
    return jobTypeDetail;
  }

  async updateTypeJob(id: number, payload) {
    try {
      await this.prisma.loaiCongViec.update({
        data: payload, where: {
          loaiCongViec_id: id
        }
      });
      return "Cập nhật loại công việc thành công"
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Cập nhật loại công việc KHÔNG THÀNH CÔNG"
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }

  }

  async removeJobType(id: number) {
    let removeJobType = await this.prisma.loaiCongViec.findFirst({
      where: {
        loaiCongViec_id: id
      }
    });
    if (removeJobType) {
      await this.prisma.loaiCongViec.delete({
        where: {
          loaiCongViec_id: id
        }
      });
      return `Đã xóa loại Công Việc ${removeJobType.ten_loai_cong_viec}`;
    }
  }
}
