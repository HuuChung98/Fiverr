/// <reference types="multer" />
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
export declare class UserService {
    private jwtService;
    constructor(jwtService: JwtService);
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    createUser(token: any, values: any): Promise<{
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
    getUser(token: any): Promise<{
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
    removeUser(token: any, id: number): Promise<"Xóa người dùng thành công" | "Xóa người dùng thất bại, kiểm tra lại ID của người dùng">;
    userInfo(token: any, id: number): Promise<{
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
    userUserPage(token: any, paginationOptions: any, keyword: any): Promise<{
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
    updateUser(token: any, id: number, userUpdate: any): Promise<{
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
    searchUserName(token: any, TenNguoiDung: string): Promise<{
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
    uploadAvatar(token: any, file: Express.Multer.File, id: number): Promise<string>;
}
