import { HireJobService } from './hire-job.service';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
export declare class HireJobController {
    private readonly hireJobService;
    constructor(hireJobService: HireJobService);
    hireJob(token: string): Promise<"Lỗi xác thực" | {
        thue_cong_viec_id: number;
        ngay_thue: Date;
        hoan_thanh: boolean;
        congViec_id: number;
        nguoi_dung_id: number;
    }[]>;
    createJob(token: string, createHireJobDto: CreateHireJobDto): Promise<string>;
    jobHirePage(token: string, pageSize: number, pageIndex: number, keyword: string): Promise<"Lỗi xác thực" | {
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
    getHiredJob(token: string): Promise<"Lỗi xác thực" | ({
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
    jobDetail(token: string, id: string): Promise<"Lỗi xác thực" | "Không có công việc được thuê!" | ({
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
    })>;
    updateJob(token: string, id: string, createHireJobDto: CreateHireJobDto): Promise<string>;
    removeJob(token: string, id: string): Promise<string>;
    statusJob(token: string, MaThueCongViec: string): Promise<"Lỗi xác thực" | "Đã cập nhật">;
}
