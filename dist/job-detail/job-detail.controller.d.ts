/// <reference types="multer" />
import { JobDetailService } from './job-detail.service';
import { CreateJobDetailDto } from './dto/create-job-detail.dto';
declare class JobTypeDetail {
    chiTiet_id: number;
    ten_chi_tiet: string;
}
export declare class JobDetailController {
    private readonly jobDetailService;
    constructor(jobDetailService: JobDetailService);
    getDetailJobType(token: string): Promise<"Lỗi xác thực" | {
        chiTiet_id: number;
        ten_chi_tiet: string;
        hinh_anh: string;
        loaiCongViec_id: number;
        nhom_chi_tiet_loai: string;
    }[]>;
    createJobType(token: string, payload: JobTypeDetail): Promise<string>;
    getTypeJobPage(token: string, pageIndex: number, pageSize: number, keyword: string): Promise<{
        chiTiet_id: number;
        ten_chi_tiet: string;
        hinh_anh: string;
        loaiCongViec_id: number;
        nhom_chi_tiet_loai: string;
    }[]>;
    getJobInfo(token: string, id: string): Promise<{
        chiTiet_id: number;
        ten_chi_tiet: string;
        hinh_anh: string;
        loaiCongViec_id: number;
        nhom_chi_tiet_loai: string;
    }>;
    updateJobType(token: string, id: number, payload: JobTypeDetail): Promise<string>;
    removeJobType(token: string, id: string): Promise<string>;
    addJobDetail(token: string, createJobDetailDto: CreateJobDetailDto): Promise<string>;
    uploadImageGroupTypeJob(token: string, file: Express.Multer.File, MaNhomLoaiCongViec: number): Promise<string>;
    updateGroupJobDetail(token: string, id: string, createJobDetailDto: CreateJobDetailDto): Promise<string>;
}
export {};
