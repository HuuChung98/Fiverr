/// <reference types="multer" />
import { JobService } from './job.service';
declare class Job {
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
}
export declare class JobController {
    private readonly jobService;
    constructor(jobService: JobService);
    getJob(token: string): Promise<{
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
    getMenuJobType(token: string): Promise<{
        loaiCongViec_id: number;
        ten_loai_cong_viec: string;
        hinh_anh: string;
    }[]>;
    createJob(token: string, payload: Job): Promise<string>;
    jobPage(token: string, pageIndex: number, pageSize: number, keyword: string): Promise<{
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
    getJobInfor(token: string, id: number): Promise<{
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
    updateJob(token: string, id: number, payload: Job): Promise<string>;
    removeJob(token: string, id: number): Promise<"Đã xóa công việc" | "Xóa Công việc không thành công" | "Lỗi xác thưc">;
    uploadImageJob(token: string, file: Express.Multer.File, MaCongViec: number): Promise<string>;
    getDetailJobType(token: string, MaLoaiCongViec: number): Promise<"Lỗi xác thực" | {
        chiTiet_id: number;
        ten_chi_tiet: string;
        hinh_anh: string;
        loaiCongViec_id: number;
        nhom_chi_tiet_loai: string;
    }[] | "Không có loại công việc cần hiển thị">;
    getJobByJobTypeId(token: string, MaChiTietLoai: number): Promise<"Lỗi xác thực" | ({
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
    gẹtJobDetailById(token: string, MaCongViec: number): Promise<"Lỗi xác thực" | {
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
    getListJobByName(token: string, TenCongViec: string): Promise<"Lỗi xác thực" | {
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
export {};
