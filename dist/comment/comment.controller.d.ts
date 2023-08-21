import { CommentService } from './comment.service';
import { JwtService } from '@nestjs/jwt';
declare class Comment {
    binh_luan_id: number;
    congViec_id: number;
    nguoi_dung_id: number;
    ngay_binh_luan: string;
    noi_dung: string;
    sao_binh_luan: number;
}
export declare class CommentController {
    private readonly commentService;
    private jwtService;
    constructor(commentService: CommentService, jwtService: JwtService);
    getComment(token: string): Promise<any>;
    postComment(token: string, commentData: Comment): Promise<string>;
    editComment(token: string, id: string, commentUpdated: Comment): Promise<string>;
    removeCmt(token: string, id: string): Promise<string>;
    getCommentById(token: string, MaCongViec: string): Promise<any>;
}
export {};
