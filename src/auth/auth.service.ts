import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { PrismaClient } from '@prisma/client';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService
  ) {};

  prisma = new PrismaClient();

  async signUp(createAuthDto: CreateAuthDto) {
    try {
      let checkUser = await this.prisma.nguoiDung.findFirst({ where: {
        email: createAuthDto.email
      }});
      
      if(!checkUser) {
        await this.prisma.nguoiDung.create({data: createAuthDto});
        return "Đã tạo tài khoản";
      } else {
        return "Email đã tồn tại";
      }
    } catch (error) {
      return "Lổi BE"
    }
    



}

  async login( userLogin) {
    try {
      let { email, pass_word } = userLogin;
      const user = await this.prisma.nguoiDung.findFirst({where: {email}});
      if (user?.pass_word !== pass_word) {
        throw new UnauthorizedException();
      }
      const payload = { email: user.email};

      return {
        access_token : await this.jwtService.signAsync(payload)
      }
    } catch (error) {
      return "Đăng nhập không thành công";
    }
  }


}
