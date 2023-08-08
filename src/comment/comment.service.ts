import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaClient } from '@prisma/client';
import { abort } from 'process';


@Injectable()
export class CommentService {

  prisma = new PrismaClient();

  async postComment(commentData) {

      await this.prisma.binhLuan.create({data: commentData});
      return "Đã đăng bình luận";
   
  }

  async getComment() {
    let comment = await this.prisma.binhLuan.findMany({include: {
      NguoiDung: true
    }});
    return comment;
  }

  async editComment(id: number, commentUpdated) {
    let checkCmt = await this.prisma.binhLuan.findFirst({ where: {binh_luan_id: id}});

    if (checkCmt) {
      await this.prisma.binhLuan.update({ data: commentUpdated, where: {
        binh_luan_id: id
      }});
    }
    return "Bình luận đã được cập nhật";
  }


  async removeCmt(id: number) {
    let cmt = await this.prisma.binhLuan.findFirst({ where: {binh_luan_id: id}});
    if(cmt) {
      await this.prisma.binhLuan.delete({where: {binh_luan_id: id}});
    }
    return "Đã xóa bình luận";
  }

  async getCommentById(MaCongViec: number) {
    let cmtById = await this.prisma.binhLuan.findMany({ where: {congViec_id: MaCongViec}})
    if(cmtById.length == 0) {
      return "Chưa có bình luận cho công việc này!";
    } 
    return cmtById;
  }
}
