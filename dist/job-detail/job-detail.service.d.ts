/// <reference types="multer" />
import { CreateJobDetailDto } from './dto/create-job-detail.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
export declare class JobDetailService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createJobType(token: any, payload: any): Promise<string>;
    getDetailJobType(token: any): Promise<"Lỗi xác thực" | {
        chiTiet_id: number;
        ten_chi_tiet: string;
        hinh_anh: string;
        loaiCongViec_id: number;
        nhom_chi_tiet_loai: string;
    }[]>;
    getTypeJobPage(token: any, paginationOptions: any, keyword: any): Promise<{
        chiTiet_id: number;
        ten_chi_tiet: string;
        hinh_anh: string;
        loaiCongViec_id: number;
        nhom_chi_tiet_loai: string;
    }[]>;
    getJobInfo(token: any, id: number): Promise<{
        chiTiet_id: number;
        ten_chi_tiet: string;
        hinh_anh: string;
        loaiCongViec_id: number;
        nhom_chi_tiet_loai: string;
    }>;
    updateJobType(token: any, id: number, payload: any): Promise<string>;
    removeJobType(token: any, id: number): Promise<string>;
    addJobDetail(token: any, createJobDetailDto: CreateJobDetailDto): Promise<string>;
    uploadImageGroupTypeJob(token: any, file: Express.Multer.File, MaNhomLoaiCongViec: number): Promise<string>;
    updateGroupJobDetail(token: any, id: number, createJobDetailDto: CreateJobDetailDto): Promise<string>;
}
