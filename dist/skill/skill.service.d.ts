import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
export declare class SkillService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getSkill(token: any): Promise<string>;
}
