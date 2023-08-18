import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateJobDetailDto } from './dto/create-job-detail.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/auth.constants';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class JobDetailService {

  constructor(private jwtService: JwtService) { }
  prisma = new PrismaClient();

  async createJobType(token, payload) {

    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      await this.prisma.chiTietLoaiCongViec.create({ data: payload });
      return "Công việc đã được tạo";
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Lỗi xác thực",
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      })
    }

  }

  async getDetailJobType(token) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      const detailJobType = await this.prisma.chiTietLoaiCongViec.findMany();
      return detailJobType;

    } catch (error) {
      return "Lỗi xác thực"
    }

  }

  async getTypeJobPage(token, paginationOptions, keyword) {

    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      const { pageIndex, pageSize } = paginationOptions;
      const skip = (pageIndex - 1) * pageSize;

      let data = await this.prisma.chiTietLoaiCongViec.findMany({ where: { ten_chi_tiet: keyword }, take: Number(pageSize), skip: skip });
      return data;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Lỗi xác thực"
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }

  }

  async getJobInfo(token, id: number) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      let data = await this.prisma.chiTietLoaiCongViec.findFirst({ where: { chiTiet_id: id } });
      return data;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Lỗi xác thực"
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }

  }

  async updateJobType(token, id: number, payload) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      await this.prisma.chiTietLoaiCongViec.update({
        data: payload, where: {
          chiTiet_id: id
        }
      });

      return "Đã cập nhật công việc thành công";
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Lỗi xác thực ,Cập nhật công việc không thành công",
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }

  }

  async removeJobType(token, id: number) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      await this.prisma.chiTietLoaiCongViec.delete({
        where: {
          chiTiet_id: id
        }
      });
      return "Đã xóa công việc này";
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Lỗi xác thực ,Cập nhật công việc không thành công",
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }

  }

  async addJobDetail(token ,createJobDetailDto: CreateJobDetailDto) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      await this.prisma.chiTietLoaiCongViec.create({ data: createJobDetailDto });
      return "Đã thêm vào nhóm chi tiết loại công việc";
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Thêm nhóm chi tiết loại Công việc không thành công",
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }

  }

  async uploadImageGroupTypeJob(token ,file: Express.Multer.File, MaNhomLoaiCongViec: number) {
    let { destination, filename } = file;
    const link = `http://localhost:8080/public/img/${filename}`
    try {

      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })

      let getImageById = await this.prisma.loaiCongViec.findFirst({ where: { loaiCongViec_id: MaNhomLoaiCongViec } });

      if (getImageById) {

        getImageById.hinh_anh = link;

        await this.prisma.loaiCongViec.update({
          data: getImageById, where: {
            loaiCongViec_id: Number(MaNhomLoaiCongViec)
          }
        })
        return "Cập nhật hình ảnh thành công";
      }
      throw new HttpException({ content: "Cập nhật hình ảnh không thành công", code: 404 }, 404);
    } catch (error) {
      throw new HttpException(error.response.content, error.status);
    }
  }

  async updateGroupJobDetail(token ,id: number, createJobDetailDto: CreateJobDetailDto) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      await this.prisma.chiTietLoaiCongViec.update({
        data: createJobDetailDto, where: {
          chiTiet_id: id
        }
      })
      return "Cập nhật nhóm chi tiết loại thành công"

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Chỉnh sửa nhóm chi tiết loại không thành công",
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }
  }
}
