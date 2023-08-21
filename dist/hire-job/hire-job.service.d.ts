import { CreateHireJobDto } from './dto/create-hire-job.dto';
import { JwtService } from '@nestjs/jwt';
export declare class HireJobService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: any;
    hireJob(token: any): Promise<any>;
    createJob(token: any, createHireJobDto: CreateHireJobDto): Promise<string>;
    jobHirePage(token: any, pageSplit: any, keyword: any): Promise<any>;
    jobDetail(token: any, id: number): Promise<any>;
    updateJob(token: any, id: number, createHireJobDto: CreateHireJobDto): Promise<string>;
    removeJob(token: any, id: number): Promise<string>;
    getHiredJob(token: any): Promise<any>;
    statusJob(token: any, MaThueCongViec: number): Promise<"Lỗi xác thực" | "Đã cập nhật">;
}
