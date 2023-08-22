import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { CreateAuthDto } from './dto/create-auth.dto';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    login(userLogin: any): Promise<"Đăng nhập không thành công" | {
        access_token: string;
    }>;
    register(createAuthDto: CreateAuthDto): Promise<"Đã tạo tài khoản" | "Email đã tồn tại" | "Đăng kí không thành công">;
}
