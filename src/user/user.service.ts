import { Body, HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';

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
      let checkUser = await this.prisma.nguoiDung.findFirst({ where: { email} });

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

        await this.prisma.nguoiDung.create({data: updateUser});

        return {...updateUser, message: "Tạo người dùng thành công"};
      } else {
        throw new HttpException({ content: "email đã tồn tại", code: 404}, 404);
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
    return data;
  }

  removeUser(id: number) {
    return "Delete user"
  }

  async userPage(id: number) {
    return `Phan trang nguoi dung`;
  }

  userInfo(id: number) {
    return `tra ve thong tin nguoi dung`;
  }

  updateUser(id: number) {
    return `Cap nhat thong tin nguoi dung`;
  }

  searchUser(id: number) {
    return "Tra ve ten nguoi dung";
  }

  uploadAvatar(id: number) {
    return "Cap nhat anh nguoi dung";
  }
}
