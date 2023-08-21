import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
export declare class HireJobService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    hireJob(token: any): Promise<"Lỗi xác thực" | {
        thue_cong_viec_id: number;
        ngay_thue: Date;
        hoan_thanh: boolean;
        congViec_id: number;
        nguoi_dung_id: number;
    }[]>;
    createJob(token: any, createHireJobDto: CreateHireJobDto): Promise<string>;
    jobHirePage(token: any, pageSplit: any, keyword: any): Promise<"Lỗi xác thực" | {
        congViec_id: number;
        ten_cong_viec: string;
        danh_gia: number;
        gia_tien: number;
        hinh_anh: string;
        mo_ta: string;
        mo_ta_ngan: string;
        sao_cong_viec: number;
        chiTiet_id: number;
        nguoi_dung_id: number;
    }[]>;
    jobDetail(token: any, id: number): Promise<"Lỗi xác thực" | ({
        CongViec: {
            congViec_id: number;
            ten_cong_viec: string;
            danh_gia: number;
            gia_tien: number;
            hinh_anh: string;
            mo_ta: string;
            mo_ta_ngan: string;
            sao_cong_viec: number;
            chiTiet_id: number;
            nguoi_dung_id: number;
        };
    } & {
        thue_cong_viec_id: number;
        ngay_thue: Date;
        hoan_thanh: boolean;
        congViec_id: number;
        nguoi_dung_id: number;
    }) | "Không có công việc được thuê!">;
    updateJob(token: any, id: number, createHireJobDto: CreateHireJobDto): Promise<string>;
    removeJob(token: any, id: number): Promise<string>;
    getHiredJob(token: any): Promise<"Lỗi xác thực" | ({
        CongViec: {
            congViec_id: number;
            ten_cong_viec: string;
            danh_gia: number;
            gia_tien: number;
            hinh_anh: string;
            mo_ta: string;
            mo_ta_ngan: string;
            sao_cong_viec: number;
            chiTiet_id: number;
            nguoi_dung_id: number;
        };
    } & {
        thue_cong_viec_id: number;
        ngay_thue: Date;
        hoan_thanh: boolean;
        congViec_id: number;
        nguoi_dung_id: number;
    })[]>;
    statusJob(token: any, MaThueCongViec: number): Promise<"Lỗi xác thực" | "Đã cập nhật">;
}
