import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
export declare class JobTypeService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createJobType(token: any, payload: any): Promise<"Loại công việc đã tồn tại" | "Đã tạo Loại công việc">;
    getJobType(token: any): Promise<"Lỗi xác thực" | {
        loaiCongViec_id: number;
        ten_loai_cong_viec: string;
        hinh_anh: string;
    }[]>;
    getJobType_Page(token: any, paginationOptions: any, keyword: any): Promise<"Lỗi xác thực" | ({
        ChiTietLoaiCongViec: {
            chiTiet_id: number;
            ten_chi_tiet: string;
            hinh_anh: string;
            loaiCongViec_id: number;
            nhom_chi_tiet_loai: string;
        }[];
    } & {
        loaiCongViec_id: number;
        ten_loai_cong_viec: string;
        hinh_anh: string;
    })[]>;
    jobTypeDetail(token: any, id: number): Promise<"Lỗi xác thực" | ({
        ChiTietLoaiCongViec: {
            chiTiet_id: number;
            ten_chi_tiet: string;
            hinh_anh: string;
            loaiCongViec_id: number;
            nhom_chi_tiet_loai: string;
        }[];
    } & {
        loaiCongViec_id: number;
        ten_loai_cong_viec: string;
        hinh_anh: string;
    })>;
    updateTypeJob(token: any, id: number, payload: any): Promise<string>;
    removeJobType(token: any, id: number): Promise<string>;
}
