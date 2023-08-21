import { JobTypeService } from './job-type.service';
declare class JobType {
    loaiCongViec_id: number;
    ten_loai_cong_viec: string;
}
export declare class JobTypeController {
    private readonly jobTypeService;
    constructor(jobTypeService: JobTypeService);
    getJobType(token: string): Promise<any>;
    createJobType(token: string, payload: JobType): Promise<"Loại công việc đã tồn tại" | "Đã tạo Loại công việc">;
    getJobType_Page(token: string, pageIndex: number, pageSize: number, keyword: string): Promise<any>;
    jobTypeDetail(token: string, id: string): Promise<any>;
    updateTypeJob(token: string, id: string, payload: JobType): Promise<string>;
    removeJobType(token: string, id: string): Promise<string>;
}
export {};
