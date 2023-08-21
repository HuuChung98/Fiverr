import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: any;
    login(userLogin: any): Promise<"Đăng nhập không thành công" | {
        access_token: any;
    }>;
    register(token: any, createAuthDto: CreateAuthDto): Promise<"Đã tạo tài khoản" | "Email đã tồn tại" | "Lỗi xác thực">;
}
