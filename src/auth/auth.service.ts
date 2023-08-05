import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
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
    const user = await this.prisma.nguoiDung.findFirst({where: {email}});
    if (user?.pass_word !== pass_word) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email};
    console.log("debugger");
    return {
      access_token : await this.jwtService.signAsync(payload)
    }


  }
  register(body) {
    return `This action returns a auth`;
  }

}
