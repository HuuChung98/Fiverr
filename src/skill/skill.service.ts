import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { NguoiDung, PrismaClient } from '@prisma/client';

@Injectable()
export class SkillService {

  prisma = new PrismaClient();

  async getSkill() {
    let userList = await this.prisma.nguoiDung.findMany();

    let skillList = new Array;
    userList.map((item) => skillList.push(item?.skill))
    return skillList.sort().join(", ").toString();
  }
}
