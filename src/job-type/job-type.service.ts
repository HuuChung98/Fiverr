import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/auth.constants';

@Injectable()
export class JobTypeService {

  constructor(private jwtService: JwtService) { }

  prisma = new PrismaClient();

  async createJobType(token, payload) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
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

  async getJobType(token) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });
      return await this.prisma.loaiCongViec.findMany();
    } catch (error) {
      return "Lỗi xác thực";
    }
  }

  async getJobType_Page(token, paginationOptions, keyword) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });
      const { pageIndex, pageSize } = paginationOptions;
      const skip = (pageIndex - 1) * pageSize;

      let jobType = await this.prisma.loaiCongViec.findMany({
        include: {
          ChiTietLoaiCongViec: true
        }, where: { ten_loai_cong_viec: keyword, }, take: Number(pageSize), skip: skip
      });

      return jobType;
    } catch (error) {
      return "Lỗi xác thực"
    }

  }

  async jobTypeDetail(token, id: number) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });
      let jobTypeDetail = await this.prisma.loaiCongViec.findFirst({
        include: {
          ChiTietLoaiCongViec: true
        }, where: {
          loaiCongViec_id: id
        }
      })
      return jobTypeDetail;
    } catch (error) {
      return "Lỗi xác thực";
    }

  }

  async updateTypeJob(token ,id: number, payload) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      await this.prisma.loaiCongViec.update({
        data: payload, where: {
          loaiCongViec_id: id
        }
      });
      return "Cập nhật loại công việc thành công"
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Lỗi xác thực"
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }

  }

  async removeJobType(token, id: number) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });
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
    } catch (error) {
      return "Lỗi xác thực";
    }

  }
}
