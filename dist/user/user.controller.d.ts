/// <reference types="multer" />
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
declare class User {
    nguoi_dung_id: number;
    ten_nguoi_dung: string;
    email: string;
    pass_word: string;
    phone: string;
    birth_day: string;
    gender: string;
    role: string;
    skill: string;
    certification: string;
}
export declare class UserController {
    private readonly userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    getUser(token: string): Promise<{
        nguoi_dung_id: number;
        ten_nguoi_dung: string;
        email: string;
        pass_word: string;
        phone: string;
        birth_day: string;
        gender: string;
        role: string;
        skill: string;
        certification: string;
        hinh_dai_dien: string;
    }[] | "Lỗi xác thực">;
    createUser(token: string, values: User): Promise<{
        message: string;
        nguoi_dung_id: any;
        ten_nguoi_dung: any;
        email: any;
        pass_word: any;
        phone: any;
        birth_day: any;
        gender: any;
        role: any;
        skill: any;
        certification: any;
    }>;
    removeUser(token: string, id: string): Promise<"Lỗi xác thực" | "Xóa người dùng thành công" | "Xóa người dùng thất bại, kiểm tra lại ID của người dùng">;
    userUserPage(token: string, pageIndex: number, pageSize: number, keyword: string): Promise<{
        nguoi_dung_id: number;
        ten_nguoi_dung: string;
        email: string;
        pass_word: string;
        phone: string;
        birth_day: string;
        gender: string;
        role: string;
        skill: string;
        certification: string;
        hinh_dai_dien: string;
    }[] | "Lỗi xác thực">;
    userInfo(token: string, id: string): Promise<{
        nguoi_dung_id: number;
        ten_nguoi_dung: string;
        email: string;
        pass_word: string;
        phone: string;
        birth_day: string;
        gender: string;
        role: string;
        skill: string;
        certification: string;
        hinh_dai_dien: string;
    } | "Lỗi xác thực">;
    updateUser(token: string, id: string, userUpdate: User): Promise<{
        nguoi_dung_id: any;
        ten_nguoi_dung: any;
        email: any;
        pass_word: any;
        phone: any;
        birth_day: any;
        gender: any;
        role: any;
        skill: any;
        certification: any;
    }>;
    searchUserName(token: string, TenNguoiDung: string): Promise<{
        nguoi_dung_id: number;
        ten_nguoi_dung: string;
        email: string;
        pass_word: string;
        phone: string;
        birth_day: string;
        gender: string;
        role: string;
        skill: string;
        certification: string;
        hinh_dai_dien: string;
    }>;
    uploadAvatar(token: string, file: Express.Multer.File, id: string): Promise<string>;
}
export {};
