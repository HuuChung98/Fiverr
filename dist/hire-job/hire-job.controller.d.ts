import { HireJobService } from './hire-job.service';
import { CreateHireJobDto } from './dto/create-hire-job.dto';
export declare class HireJobController {
    private readonly hireJobService;
    constructor(hireJobService: HireJobService);
    hireJob(token: string): Promise<any>;
    createJob(token: string, createHireJobDto: CreateHireJobDto): Promise<string>;
    jobHirePage(token: string, pageSize: number, pageIndex: number, keyword: string): Promise<any>;
    getHiredJob(token: string): Promise<any>;
    jobDetail(token: string, id: string): Promise<any>;
    updateJob(token: string, id: string, createHireJobDto: CreateHireJobDto): Promise<string>;
    removeJob(token: string, id: string): Promise<string>;
    statusJob(token: string, MaThueCongViec: string): Promise<"Lỗi xác thực" | "Đã cập nhật">;
}
