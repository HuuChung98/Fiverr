import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/auth.constants';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SkillService {
  constructor(private jwtService: JwtService){}

  prisma = new PrismaClient();

  async getSkill(token) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      let userList = await this.prisma.nguoiDung.findMany();

      let skillList = new Array;
      userList.map((item) => skillList.push(item?.skill))
      return skillList.sort().join(", ").toString();
    } catch (error) {
      return "Lỗi xác thực";
    }

  }
}
