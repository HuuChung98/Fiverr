import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateJobDetailDto } from './dto/create-job-detail.dto';
import { UpdateJobDetailDto } from './dto/update-job-detail.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class JobDetailService {

  prisma = new PrismaClient();

  async createJobType(payload) {
    // await this.prisma.chiTietLoaiCongViec.create({ data: payload});
    // return "Công việc đã được tạo";
    try {
      await this.prisma.chiTietLoaiCongViec.create({ data: payload });
      return "Công việc đã được tạo";
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Tạo công việc không thành công, vui lòng kiểm tra lại quá trình tạo công việc",
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }

  }

  async getDetailJobType() {
    const detailJobType = await this.prisma.chiTietLoaiCongViec.findMany();
    return detailJobType;
  }

  async getTypeJobPage(paginationOptions, keyword) {
    const { pageIndex, pageSize } = paginationOptions;
    const skip = (pageIndex - 1) * pageSize;

    let data = await this.prisma.chiTietLoaiCongViec.findMany({ where: { ten_chi_tiet: keyword }, take: Number(pageSize), skip: skip });
    return data;
  }

  async getJobInfo(id: number) {
    let data = await this.prisma.chiTietLoaiCongViec.findFirst({ where: { chiTiet_id: id } });
    return data;
  }

  async updateJobType(id: number, payload) {
    try {
      const update = await this.prisma.chiTietLoaiCongViec.update({
        data: payload, where: {
          chiTiet_id: id
        }
      });

      return "Đã cập nhật công việc thành công";
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Cập nhật công việc không thành công",
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }

  }

  async removeJobType(id: number) {
    await this.prisma.chiTietLoaiCongViec.delete({
      where: {
        chiTiet_id: id
      }
    });
    return "Đã xóa công việc này";
  }

  async addJobDetail(createJobDetailDto: CreateJobDetailDto) {
    try {
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

  async uploadImageGroupTypeJob(file: Express.Multer.File, MaNhomLoaiCongViec: number) {
    let { destination, filename } = file;
    const link = `http://localhost:8080/public/img/${filename}`
    try {

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

  async updateGroupJobDetail(id: number, createJobDetailDto: CreateJobDetailDto) {
    try {
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
