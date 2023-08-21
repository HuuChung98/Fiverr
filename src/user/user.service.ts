import { Body, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/auth.constants';
import { PrismaClient, NguoiDung } from '@prisma/client';


@Injectable()
export class UserService {

  constructor(private jwtService: JwtService) { }

  prisma = new PrismaClient();

  async createUser(token, values) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
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

  async getUser(token) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });
      let data = await this.prisma.nguoiDung.findMany();
      return data;
    } catch (error) {
      return "Lỗi xác thực";
    }

  }

  async removeUser(token, id: number) {

      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      let userRemove = await this.prisma.nguoiDung.findFirst({ where: { nguoi_dung_id: id } })
      if (userRemove) {
        await this.prisma.nguoiDung.delete({ where: { nguoi_dung_id: id } })
        return "Xóa người dùng thành công";
      } else {
        return "Xóa người dùng thất bại, kiểm tra lại ID của người dùng";
      }

  }

  async userInfo(token, id: number) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      let userInfo = await this.prisma.nguoiDung.findFirst({ where: { nguoi_dung_id: id } });
      return userInfo;
    } catch (error) {
      return "Lỗi xác thực"
    }
  }

  async userUserPage(token, paginationOptions, keyword) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });
      const { pageIndex, pageSize } = paginationOptions;
      const skip = (pageIndex - 1) * pageSize;

      let user = await this.prisma.nguoiDung.findMany({ where: { role: keyword }, take: Number(pageSize), skip: skip });
      return user;
    } catch (error) {
      return "Lỗi xác thực";
    }

  }

  async updateUser(token, id: number, userUpdate) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
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

        await this.prisma.nguoiDung.update({ data: updateUser, where: { nguoi_dung_id: id } });

        return { ...updateUser };
      } else {
        throw new HttpException({ content: "email đã tồn tại", code: 404 }, 404);
        // return "Tạo thất bại"
      }

    } catch (error) {
      throw new HttpException(error.response.content, error.status);
      // return "Lỗi BE"
    }
  }
  async searchUserName(token, TenNguoiDung: string) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      const data = await this.prisma.nguoiDung.findFirst({ where: { ten_nguoi_dung: TenNguoiDung } });
      if (data) {
        return data;
      } else {
        throw new HttpException({ content: `Không có người dùng tên ${TenNguoiDung}`, code: 404 }, 404);
      }
    } catch (error) {
      throw new HttpException(error.response.content, error.status);
    }
  }

  async uploadAvatar(token, file: Express.Multer.File, id: number) {

    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      let { destination, filename } = file;
      const link = `http://localhost:8080/public/img/${filename}`

      let getUserById = await this.prisma.nguoiDung.findFirst({ where: { nguoi_dung_id: id } });

      if (getUserById) {
        getUserById.hinh_dai_dien = link;

        await this.prisma.nguoiDung.update({
          data: getUserById, where: {
            nguoi_dung_id: Number(id)
          }
        })
        return "Cập nhật ảnh đại diện thành công";
      }
      throw new HttpException({ content: "Cập nhật ảnh đại diện không thành công", code: 404 }, 404);
    } catch (error) {
      throw new HttpException(error.response.content, error.status);
    }
  }

}
// DATABASE_URL="mysql://root:1234@localhost:3306/db_fiverr?schema=public"