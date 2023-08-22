import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/auth.constants';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class JobService {

  constructor(private jwtService: JwtService) { }
  prisma = new PrismaClient();

  async getJob(token) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      return await this.prisma.congViec.findMany();

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Lỗi xác thực"
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      })
    }

  }

  async createJob(token, payload) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      await this.prisma.congViec.create({ data: payload });
      return "Đã tạo công việc";
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Tạo công việc không thành công",
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }
  }

  async jobPage(token, paginationOptions, keyword) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      let { pageIndex, pageSize } = paginationOptions;
      const skip = (pageIndex - 1) * pageSize;

      let job = await this.prisma.congViec.findMany({
        where: {
          ten_cong_viec: keyword
        }, take: Number(pageSize), skip: skip
      });
      if (job.length == 0) {
        return `Không có công việc cần tìm`;
      } else {
        return job;
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Lỗi xác thực",
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }
  }

  async getJobInfor(token, id: number) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      return await this.prisma.congViec.findFirst({
        where: {
          congViec_id: id
        }
      })
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Lỗi xác thực",
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }
  }

  async updateJob(token, id: number, payload) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      let checkJob = await this.prisma.congViec.findFirst({ where: { congViec_id: id } });

      if (checkJob) {
        await this.prisma.congViec.update({
          data: payload, where: {
            congViec_id: id
          }
        });
        return "Cập nhật Công việc thành công"
      } else {
        // return "Cập nhật không hợp lệ, kiểm tra lại thông tin cập nhật";
        throw new HttpException({ content: "Cập nhật không hợp lệ, kiểm tra lại thông tin cập nhật", code: 404 }, 404)
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Lỗi xác thực"
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      })
    }
  }

  async removeJob(token, id: number) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      let checkJob = await this.prisma.congViec.findFirst({ where: { congViec_id: id } })

      // Kiểm tra công việc này là của người dùng nào tạo
      if (checkJob) {
        await this.prisma.congViec.delete({ where: { congViec_id: id } });
        return "Đã xóa công việc"
      } else {
        return "Xóa Công việc không thành công"
      }
    } catch (error) {
      return "Lỗi xác thưc"
    }

  }

  async uploadImageJob(token, file: Express.Multer.File, MaCongViec: number) {

    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })

      let { destination, filename } = file;
      const link = `https://fiverr.memorytera.com/public/img/${filename}`
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
        throw new HttpException({ content: "Tạo ảnh không thành công", code: 404 }, 404)
      }
    } catch (error) {
      throw new HttpException(error.response.content, error.status);
    }
  }

  async getMenuJobType(token) {
    try {
      await this.jwtService.verifyAsync(token)
      return await this.prisma.loaiCongViec.findMany();
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Lỗi xác thực"
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      })
    }

  }

  async getDetailJobType(token, MaLoaiCongViec: number) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      let data = await this.prisma.chiTietLoaiCongViec.findMany({
        where: {
          loaiCongViec_id: MaLoaiCongViec
        }
      });
      if(data.length != 0) {
        return data;
      } else {
        return "Không có loại công việc cần hiển thị"
      }

    } catch (error) {
      return "Lỗi xác thực"
    }

  }

  async getJobByJobTypeId(token, MaChiTietLoai: number) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      let payload = await this.prisma.congViec.findMany({
        include: {
          ChiTietLoaiCongViec: true
        }, where: {
          chiTiet_id: MaChiTietLoai
        }
      });
      return payload;
    } catch (error) {
      return "Lỗi xác thực"
    }

  }

  async gẹtJobDetailById(token, MaCongViec: number) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      let payload = await this.prisma.congViec.findFirst({
        where: {
          congViec_id: MaCongViec
        }
      })
      return payload;
    } catch (error) {
      return "Lỗi xác thực"
    }

  }

  async getListJobByName(token, TenCongViec) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      let jobName = await this.prisma.congViec.findMany({
        where: {
          ten_cong_viec: TenCongViec
        }
      })
      if (jobName.length != 0) {
        return jobName;
      } else {
        return "Không có công việc"
      }
    } catch (error) {
      return "Lỗi xác thực"
    }
  }
}