import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/auth.constants';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class HireJobService {

  constructor(private jwtService: JwtService) { }

  prisma = new PrismaClient();

  async hireJob(token) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });
      return await this.prisma.thueCongViec.findMany();
    } catch (error) {
      return "Lỗi xác thực";
    }

  }

  async createJob(token, createHireJobDto: CreateHireJobDto) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });

      await this.prisma.thueCongViec.create({ data: createHireJobDto });

      return "Đã tạo";
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Lỗi xác thực",
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }

  }



  async jobHirePage(token, pageSplit, keyword) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });
      const { pageSize, pageIndex } = pageSplit;

      const skip = (pageIndex - 1) * pageSize;

      const data = await this.prisma.congViec.findMany({ where: { ten_cong_viec: keyword }, take: Number(pageSize), skip: skip });

      return data
    } catch (error) {
      return "Lỗi xác thực";
    }

  }

  async jobDetail(token, id: number) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });
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
    } catch (error) {
      return "Lỗi xác thực"
    }
  }

  async updateJob(token, id: number, createHireJobDto: CreateHireJobDto) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
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

  async removeJob(token, id: number) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
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

  async getHiredJob(token) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });
      return await this.prisma.thueCongViec.findMany({
        include: {
          CongViec: true
        }
      });
    } catch (error) {
      return "Lỗi xác thực";
    }

  }

  async statusJob(token, MaThueCongViec: number) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });
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
    } catch (error) {
      return "Lỗi xác thực";
    }

  }
}
