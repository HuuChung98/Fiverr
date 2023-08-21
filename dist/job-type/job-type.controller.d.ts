import { JobTypeService } from './job-type.service';
declare class JobType {
    loaiCongViec_id: number;
    ten_loai_cong_viec: string;
}
export declare class JobTypeController {
    private readonly jobTypeService;
    constructor(jobTypeService: JobTypeService);
    getJobType(token: string): Promise<"Lỗi xác thực" | {
        loaiCongViec_id: number;
        ten_loai_cong_viec: string;
        hinh_anh: string;
    }[]>;
    createJobType(token: string, payload: JobType): Promise<"Loại công việc đã tồn tại" | "Đã tạo Loại công việc">;
    getJobType_Page(token: string, pageIndex: number, pageSize: number, keyword: string): Promise<"Lỗi xác thực" | ({
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
    jobTypeDetail(token: string, id: string): Promise<"Lỗi xác thực" | ({
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
    updateTypeJob(token: string, id: string, payload: JobType): Promise<string>;
    removeJobType(token: string, id: string): Promise<string>;
}
export {};
