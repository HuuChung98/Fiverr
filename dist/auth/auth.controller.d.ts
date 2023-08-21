import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
declare class userType {
    email: string;
    pass_word: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(userLogin: userType): Promise<"Đăng nhập không thành công" | {
        access_token: string;
    }>;
    register(token: string, createAuthDto: CreateAuthDto): Promise<"Lỗi xác thực" | "Đã tạo tài khoản" | "Email đã tồn tại">;
}
export {};
