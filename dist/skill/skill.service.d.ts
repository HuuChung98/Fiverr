import { JwtService } from '@nestjs/jwt';
export declare class SkillService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: any;
    getSkill(token: any): Promise<string>;
}
