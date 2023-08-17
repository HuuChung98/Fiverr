import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { UpdateHireJobDto } from './dto/update-hire-job.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class HireJobService {

  prisma = new PrismaClient();

  async hireJob() {
    return await this.prisma.thueCongViec.findMany();
  }

  async createJob(createHireJobDto: CreateHireJobDto) {

    try {
      await this.prisma.thueCongViec.create({ data: createHireJobDto });

      return "Đã tạo";
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Có lỗi xảy ra",
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }

  }



  async jobHirePage(pageSplit, keyword) {
    const { pageSize, pageIndex } = pageSplit;

    const skip = (pageIndex - 1) * pageSize;

    const data = await this.prisma.congViec.findMany({ where: { ten_cong_viec: keyword }, take: Number(pageSize), skip: skip });

    return data
  }

  async jobDetail(id: number) {
    const payload = await this.prisma.thueCongViec.findFirst({
      include:
      {
        CongViec: true
      }, where: {
        thue_cong_viec_id: id
      }
    });
    try {
      if (payload == null) {
        return "Không có công việc được thuê!"
      } else {
        return payload
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Có lỗi xảy ra',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    }
  }

  async updateJob(id: number, createHireJobDto: CreateHireJobDto) {
    try {
      await this.prisma.thueCongViec.update({
        data: createHireJobDto, where: {
          thue_cong_viec_id: id
        }
      })
      return "Đã cập nhật";
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Có lỗi xảy ra",
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }

  }

  async removeJob(id: number) {
    try {
      await this.prisma.thueCongViec.delete({
        where: {
          thue_cong_viec_id: id
        }
      })

      return "Đã xóa"
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Something wrong happen',
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }

  }

  async getHiredJob() {
    return await this.prisma.thueCongViec.findMany({
      include: {
        CongViec: true
      }
    });
  }

  async statusJob(MaThueCongViec: number) {
    const jobHired = await this.prisma.thueCongViec.findFirst({
      where: {
        thue_cong_viec_id: MaThueCongViec
      }
    });

    if (jobHired) {
      jobHired.hoan_thanh = true;

      await this.prisma.thueCongViec.update({
        data: jobHired, where: {
          thue_cong_viec_id: MaThueCongViec
        }
      })
    }
    return "Đã cập nhật";
  }
}
