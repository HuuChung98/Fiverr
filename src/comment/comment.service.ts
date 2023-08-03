import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  postComment(body) {
    return 'This action adds a new comment';
  }

  getComment() {
    return `This action returns all comment`;
  }

  editComment(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  removeCmt(id: number) {
    return `This action removes a #${id} comment`;
  }

  getCommentById(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }
}
