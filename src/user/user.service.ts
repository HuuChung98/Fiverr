import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaClient, NguoiDung } from '@prisma/client';

@Injectable()
export class UserService {

  prisma = new PrismaClient();

  create(createUserDto: CreateUserDto) {

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
