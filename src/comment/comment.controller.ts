import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Headers, Req, HttpException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiBearerAuth, ApiHeader, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
const date: Date = new Date();
// const localizedString: string = date.toLocaleString(); // Format based on user's locale
const isoString: string = date.toISOString(); // ISO 8601 format
// const mysqlFormattedDateTime: string = isoString.replace('T', '').slice(0, 19);


class Comment {
  // const ngay_binh_luan  = mysqlFormattedDateTime
  @ApiProperty({ description: "binhLuanId", type: Number })
  binh_luan_id: number;

  @ApiProperty({ description: "maCongViec", type: Number })
  congViec_id: number;

  @ApiProperty({ description: "maNguoiBinhLuan", type: Number })
  nguoi_dung_id: number;

  @ApiProperty({ description: "ngayBinhLuan", type: isoString })
  ngay_binh_luan: string;

  @ApiProperty({ description: "noiDung", type: String })
  noi_dung: string;

  @ApiProperty({ description: "saoBinhLuan", type: Number })
  sao_binh_luan: number;
}

// @ApiBearerAuth()
// @ApiHeader({ name: "token", description: "Nhập token"})
// @UseGuards(AuthGuard("jwt"))

@ApiTags("BinhLuan")
@ApiBearerAuth() // Add this decorator
@Controller('api/binh-luan')
export class CommentController {
  constructor(private readonly commentService: CommentService, private jwtService: JwtService) { }

  // Đăng bình luận
  @Post()
  postComment(@Body() commentData: Comment) {
    return this.commentService.postComment(commentData);
  }

  // Lấy bình luận của người dùng

  @UseGuards(AuthGuard("jwt"))
  @Get()
  getComment(@Headers("token") token: string) {

    return this.commentService.getComment(token);
  }

  // Chỉnh sửa (cập nhật) thông tin bình luận
  @Put(':id')
  editComment(@Param('id') id: string, @Body() commentUpdated: Comment) {
    return this.commentService.editComment(+id, commentUpdated);
  }

  // Xóa bình luận đã đăng
  @Delete(':id')
  removeCmt(@Param('id') id: string) {
    return this.commentService.removeCmt(+id);
  }

  // Lấy bình luận theo mã công việc
  @Get('lay-binh-luan-theo-cong-viec/:MaCongViec')
  getCommentById(@Param('MaCongViec') MaCongViec: string) {
    return this.commentService.getCommentById(+MaCongViec);
  }
}
