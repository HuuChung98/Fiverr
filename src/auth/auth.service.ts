import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService
  ) { };

  prisma = new PrismaClient();

  async login(userLogin) {
    // return `This action returns all auth`;
    let { email, pass_word } = userLogin;
    try {
      let checkUser = await this.prisma.nguoiDung.findFirst({ where: { email } });

      if (checkUser) {
        if (pass_word == checkUser.pass_word) {
          let accessToken = await this.jwtService.signAsync({ data: "data" }, { secret: "CHUNG", expiresIn: "30m" });

          return { ...checkUser, accessToken };
        } else {
          // return "Toai khoan hoac mat khau khong dung"
          throw new HttpException({ content: "Tài khoản hoặc mật khẩu không đúng" }, 404);
        }
      } else {
        // return "Email chưa được đăng kí hoặc không đúng định dạng"
        throw new HttpException({ content: "Email chưa được đăng kí hoặc không đúng định dạng", code: 404 }, 404);
      }
    } catch (error) {
      throw new HttpException(error.response.content, error.status);
    }

  }
  register(body) {
    return `This action returns a auth`;
  }

}
