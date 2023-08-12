import { HttpException, Injectable } from '@nestjs/common';
import { CreateJobDetailDto } from './dto/create-job-detail.dto';
import { UpdateJobDetailDto } from './dto/update-job-detail.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class JobDetailService {

  prisma = new PrismaClient();

  async createJobType(payload) {
    const jobType = await this.prisma.chiTietLoaiCongViec.create(payload);
    return jobType;
  }

  async getDetailJobType() {
    const detailJobType = await this.prisma.chiTietLoaiCongViec.findMany();
    return detailJobType;
  }

  async getJobInfo(id: number) {
    let data = await this.prisma.chiTietLoaiCongViec.findFirst({ where: { chiTiet_id: id } });
    return data;
  }

  async getTypeJobPage(paginationOptions, keyword) {
    const { pageIndex, pageSize } = paginationOptions;
    const skip = (pageIndex - 1) * pageSize;

    let data = await this.prisma.chiTietLoaiCongViec.findMany({ where: { ten_chi_tiet: keyword }, take: Number(pageSize), skip: skip });
    return data;
  }

  async updateJobType(id: number, payload) {
    const update = await this.prisma.chiTietLoaiCongViec.update({
      data: payload, where: {
        chiTiet_id: id
      }
    });

    return "Đã cập nhật công việc thành công";
  }

  async removeJobType(id: number) {
    await this.prisma.chiTietLoaiCongViec.delete({
      where: {
        chiTiet_id: id
      }
    });
    return "Đã xóa Công việc này";
  }

  async addJobDetail(createJobDetailDto: CreateJobDetailDto) {
    let data = await this.prisma.chiTietLoaiCongViec.create({ data: createJobDetailDto });
    return data
  }

  async uploadImageGroupTypeJob( file: Express.Multer.File, MaNhomLoaiCongViec: number) {
    let { destination, filename } = file;
    const link = `http://localhost:8080/public/img/${filename}`
    try {

      let getImageById = await this.prisma.loaiCongViec.findFirst({ where: { loaiCongViec_id: MaNhomLoaiCongViec } });

      if (getImageById) {
        getImageById.hinh_anh = link;

        await this.prisma.loaiCongViec.update({data: getImageById, where: {
          loaiCongViec_id: Number(MaNhomLoaiCongViec)
        }})
        return "Cập nhật hình ảnh thành công";
      }
      throw new HttpException({ content: "Cập nhật hình ảnh không thành công", code: 404 }, 404);
    } catch (error) {
      throw new HttpException(error.response.content, error.status);
    }
  }

  async updateGroupJobDetail(id: number, createJobDetailDto: CreateJobDetailDto) {
    let update = await this.prisma.chiTietLoaiCongViec.findFirst({
      where: {
        chiTiet_id: id
      }
    })

    if (update) {
      await this.prisma.chiTietLoaiCongViec.update({
        data: update, where: {
          chiTiet_id: id
        }
      })
    }
  }
}
