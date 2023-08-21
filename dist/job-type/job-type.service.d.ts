import { JwtService } from '@nestjs/jwt';
export declare class JobTypeService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: any;
    createJobType(token: any, payload: any): Promise<"Loại công việc đã tồn tại" | "Đã tạo Loại công việc">;
    getJobType(token: any): Promise<any>;
    getJobType_Page(token: any, paginationOptions: any, keyword: any): Promise<any>;
    jobTypeDetail(token: any, id: number): Promise<any>;
    updateTypeJob(token: any, id: number, payload: any): Promise<string>;
    removeJobType(token: any, id: number): Promise<string>;
}
