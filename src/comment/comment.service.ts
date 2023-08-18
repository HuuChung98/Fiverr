import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/auth.constants';


@Injectable()
export class CommentService {

  constructor(private jwtService: JwtService) { }

  prisma = new PrismaClient();

  async postComment(token, commentData) {

    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      await this.prisma.binhLuan.create({ data: commentData });
      return "Đã đăng bình luận";

    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Đăng bình luận không thành công",
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      })
    }
  }

  async getComment(token) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      });
      let comment = await this.prisma.binhLuan.findMany({
        include: {
          NguoiDung: true
        }
      });
      if (comment.length != 0) {
        return comment;
      } else {
        return "Chưa có bình luận nào"
      }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Lỗi xác thực"
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      })
    }
  }

  async editComment(token, id: number, commentUpdated) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      let checkCmt = await this.prisma.binhLuan.findFirst({ where: { binh_luan_id: id } });

      if (checkCmt) {
        await this.prisma.binhLuan.update({
          data: commentUpdated, where: {
            binh_luan_id: id
          }
        });
      }
      return "Bình luận đã được cập nhật";
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: "Chỉnh sửa bình luận không thành công, vui lòng kiểm tra lại thông tin chỉnh sửa",

      }, HttpStatus.BAD_REQUEST, {
        cause: error
      })
    }
  }

  async removeCmt(token, id: number) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      let cmt = await this.prisma.binhLuan.findFirst({ where: { binh_luan_id: id } });
      if (cmt) {
        await this.prisma.binhLuan.delete({ where: { binh_luan_id: id } });
      }
      return "Đã xóa bình luận";
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Lỗi xác thực"
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      })
    }

  }

  async getCommentById(token, MaCongViec: number) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
      let cmtById = await this.prisma.binhLuan.findMany({ where: { congViec_id: MaCongViec } })
      if (cmtById.length == 0) {
        return "Chưa có bình luận cho công việc này!";
      }
      return cmtById;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Lỗi xác thực"
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      })
    }

  }
}