import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
export declare class CommentService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    postComment(token: any, commentData: any): Promise<string>;
    getComment(token: any): Promise<({
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
    })[] | "Chưa có bình luận nào">;
    editComment(token: any, id: number, commentUpdated: any): Promise<string>;
    removeCmt(token: any, id: number): Promise<string>;
    getCommentById(token: any, MaCongViec: number): Promise<{
        binh_luan_id: number;
        congViec_id: number;
        nguoi_dung_id: number;
        ngay_binh_luan: Date;
        noi_dung: string;
        sao_binh_luan: number;
    }[] | "Chưa có bình luận cho công việc này!">;
}
