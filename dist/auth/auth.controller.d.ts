import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
declare class userType {
    email: string;
    pass_word: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(createAuthDto: CreateAuthDto): Promise<"Đã tạo tài khoản" | "Email đã tồn tại" | "Lổi BE">;
    login(userLogin: userType): Promise<"Đăng nhập không thành công" | {
        access_token: string;
    }>;
}
export {};
