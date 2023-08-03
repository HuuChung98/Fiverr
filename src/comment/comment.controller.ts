import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';


@ApiTags("BinhLuan")
@Controller('api/binh-luan')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  postComment(@Body() body) {
    return this.commentService.postComment(body);
  }

  @Get()
  getComment() {
    return this.commentService.getComment();
  }

  @Put(':id')
  editComment(@Param('id') id: string) {
    return this.commentService.editComment(+id);
  }

  @Get(':id')
  getCommentById(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.getCommentById(+id, updateCommentDto);
  }

  @Delete(':id')
  removeCmt(@Param('id') id: string) {
    return this.commentService.removeCmt(+id);
  }
}
