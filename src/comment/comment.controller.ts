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

@ApiTags("BinhLuan")
@ApiBearerAuth() // Add this decorator
@UseGuards(AuthGuard("jwt"))
@Controller('api/binh-luan')
export class CommentController {
  constructor(private readonly commentService: CommentService, private jwtService: JwtService) { }

  // Lấy bình luận của người dùng
  @Get()
  getComment(@Headers("token") token: string) {

    return this.commentService.getComment(token);
  }

  // Đăng bình luận
  @ApiHeader({ name: "token", description: "nhập token tại đây" })
  @Post()
  postComment(@Headers("token") token: string, @Body() commentData: Comment) {
    return this.commentService.postComment(token, commentData);
  }

  // Chỉnh sửa (cập nhật) thông tin bình luận
  @Put(':id')
  editComment(@Headers("token") token: string, @Param('id') id: string, @Body() commentUpdated: Comment) {
    return this.commentService.editComment(token, +id, commentUpdated);
  }

  // Xóa bình luận đã đăng
  @Delete(':id')
  removeCmt(@Headers("token") token: string, @Param('id') id: string) {
    return this.commentService.removeCmt(token, +id);
  }

  // Lấy bình luận theo mã công việc
  @Get('lay-binh-luan-theo-cong-viec/:MaCongViec')
  getCommentById(@Headers("token") token: string, @Param('MaCongViec') MaCongViec: string) {
    return this.commentService.getCommentById(token, +MaCongViec);
  }
}
