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
    getComment(token: string): Promise<"Chưa có bình luận nào" | ({
        NguoiDung: {
            nguoi_dung_id: number;
            ten_nguoi_dung: string;
            email: string;
            pass_word: string;
            phone: string;
            birth_day: string;
            gender: string;
            role: string;
            skill: string;
            certification: string;
            hinh_dai_dien: string;
        };
    } & {
        binh_luan_id: number;
        congViec_id: number;
        nguoi_dung_id: number;
        ngay_binh_luan: Date;
        noi_dung: string;
        sao_binh_luan: number;
    })[]>;
    postComment(token: string, commentData: Comment): Promise<string>;
    editComment(token: string, id: string, commentUpdated: Comment): Promise<string>;
    removeCmt(token: string, id: string): Promise<string>;
    getCommentById(token: string, MaCongViec: string): Promise<{
        binh_luan_id: number;
        congViec_id: number;
        nguoi_dung_id: number;
        ngay_binh_luan: Date;
        noi_dung: string;
        sao_binh_luan: number;
    }[] | "Chưa có bình luận cho công việc này!">;
}
export {};
