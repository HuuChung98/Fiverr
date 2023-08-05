import { Body, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaClient, NguoiDung } from '@prisma/client';


@Injectable()
export class UserService {

  prisma = new PrismaClient();

  async createUser(values) {
    console.log(values);
    let {
      nguoi_dung_id,
      ten_nguoi_dung,
      email,
      pass_word,
      phone,
      birth_day,
      gender,
      role,
      skill,
      certification
    } = values;
    try {
      let checkUser = await this.prisma.nguoiDung.findFirst({ where: { email } });

      if (!checkUser) {

        let updateUser = {
          nguoi_dung_id,
          ten_nguoi_dung,
          email,
          pass_word,
          phone,
          birth_day,
          gender,
          role,
          skill,
          certification
        };

        await this.prisma.nguoiDung.create({ data: updateUser });

        return { ...updateUser, message: "Tạo người dùng thành công" };
      } else {
        throw new HttpException({ content: "email đã tồn tại", code: 404 }, 404);
        // return "Tạo thất bại"
      }

    } catch (error) {
      console.log(error);
      throw new HttpException(error.response.content, error.status);
      // return "Lỗi BE"
    }
  }

  async getUser() {
    let data = await this.prisma.nguoiDung.findMany();
    return data

  }

  async removeUser(id: number) {
    let user = await this.prisma.nguoiDung.findFirst({ where: { nguoi_dung_id: id } })
    try {
      if (user) {
        await this.prisma.nguoiDung.delete({ where: { nguoi_dung_id: id } })
        return "Xóa người dùng thành công";
      } else {
        throw new HttpException({ content: "Xóa người dùng thất bại, kiểm tra lại ID của người dùng", code: 404 }, 404);
      }
    } catch (error) {
      throw new HttpException(error.response.content, error.status);
    }
  }

  async userInfo(id: number) {
    try {
      let userInfo = await this.prisma.nguoiDung.findFirst({ where: { nguoi_dung_id: id } });
      return userInfo;
    } catch (error) {
      return "Lỗi BE"
    }
  }

  async userUserPage(paginationOptions, keyword) {
    const { pageIndex, pageSize } = paginationOptions;
    const skip = (pageIndex - 1) * pageSize;

    let user = await this.prisma.nguoiDung.findMany({ where: { role: keyword }, take: Number(pageSize), skip: skip });
    return user;
  }

  async updateUser(id:number, userUpdate) {
    console.log(userUpdate);
    let {
      nguoi_dung_id,
      ten_nguoi_dung,
      email,
      pass_word,
      phone,
      birth_day,
      gender,
      role,
      skill,
      certification
    } = userUpdate;
    try {
      let checkUser = await this.prisma.nguoiDung.findFirst({ where: { email } });

      if (!checkUser) {

        let updateUser = {
          nguoi_dung_id,
          ten_nguoi_dung,
          email,
          pass_word,
          phone,
          birth_day,
          gender,
          role,
          skill,
          certification
        };
         
        await this.prisma.nguoiDung.update({data: updateUser, where: {nguoi_dung_id: id}});
      
        return { ...updateUser };
      } else {
        throw new HttpException({ content: "email đã tồn tại", code: 404 }, 404);
        // return "Tạo thất bại"
      }

    } catch (error) {
      console.log(error);
      throw new HttpException(error.response.content, error.status);
      // return "Lỗi BE"
    }
  }
  async searchUserName(userName) {
    const data = await this.prisma.nguoiDung.findMany({where: {ten_nguoi_dung: userName}});
    return data;
  }

  uploadAvatar(file, id: number) {
    return "Cap nhat anh nguoi dung";
  }
}
