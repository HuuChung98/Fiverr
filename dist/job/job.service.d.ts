/// <reference types="multer" />
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
export declare class JobService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getJob(token: any): Promise<{
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
    createJob(token: any, payload: any): Promise<string>;
    jobPage(token: any, paginationOptions: any, keyword: any): Promise<{
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
    }[] | "Không có công việc cần tìm">;
    getJobInfor(token: any, id: number): Promise<{
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
    }>;
    updateJob(token: any, id: number, payload: any): Promise<string>;
    removeJob(token: any, id: number): Promise<"Đã xóa công việc" | "Xóa Công việc không thành công" | "Lỗi xác thưc">;
    uploadImageJob(token: any, file: Express.Multer.File, MaCongViec: number): Promise<string>;
    getMenuJobType(token: any): Promise<{
        loaiCongViec_id: number;
        ten_loai_cong_viec: string;
        hinh_anh: string;
    }[]>;
    getDetailJobType(token: any, MaLoaiCongViec: number): Promise<"Lỗi xác thực" | {
        chiTiet_id: number;
        ten_chi_tiet: string;
        hinh_anh: string;
        loaiCongViec_id: number;
        nhom_chi_tiet_loai: string;
    }[] | "Không có loại công việc cần hiển thị">;
    getJobByJobTypeId(token: any, MaChiTietLoai: number): Promise<"Lỗi xác thực" | ({
        ChiTietLoaiCongViec: {
            chiTiet_id: number;
            ten_chi_tiet: string;
            hinh_anh: string;
            loaiCongViec_id: number;
            nhom_chi_tiet_loai: string;
        };
    } & {
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
    })[]>;
    gẹtJobDetailById(token: any, MaCongViec: number): Promise<"Lỗi xác thực" | {
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
    }>;
    getListJobByName(token: any, TenCongViec: any): Promise<"Lỗi xác thực" | {
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
    }[] | "Không có công việc">;
}
