"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_constants_1 = require("../auth/auth.constants");
const client_1 = require("@prisma/client");
let UserService = exports.UserService = class UserService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.prisma = new client_1.PrismaClient();
    }
    async createUser(token, values) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let { nguoi_dung_id, ten_nguoi_dung, email, pass_word, phone, birth_day, gender, role, skill, certification } = values;
            let checkUser = await this.prisma.nguoiDung.findFirst({ where: { email } });
            if (!checkUser) {
                let updateUser = {
                    nguoi_dung_id,
                    ten_nguoi_dung,
                    email,
                    pass_word,
                    phone,
                    birth_day,
                    gender,
                    role,
                    skill,
                    certification
                };
                await this.prisma.nguoiDung.create({ data: updateUser });
                return { ...updateUser, message: "Tạo người dùng thành công" };
            }
            else {
                throw new common_1.HttpException({ content: "email đã tồn tại", code: 404 }, 404);
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.response.content, error.status);
        }
    }
    async getUser(token) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let data = await this.prisma.nguoiDung.findMany();
            return data;
        }
        catch (error) {
            return "Lỗi xác thực";
        }
    }
    async removeUser(token, id) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let user = await this.prisma.nguoiDung.findFirst({ where: { nguoi_dung_id: id } });
            if (user) {
                await this.prisma.nguoiDung.delete({ where: { nguoi_dung_id: id } });
                return "Xóa người dùng thành công";
            }
            else {
                throw new common_1.HttpException({ content: "Xóa người dùng thất bại, kiểm tra lại ID của người dùng", code: 404 }, 404);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.response.content, error.status);
        }
    }
    async userInfo(token, id) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let userInfo = await this.prisma.nguoiDung.findFirst({ where: { nguoi_dung_id: id } });
            return userInfo;
        }
        catch (error) {
            return "Lỗi xác thực";
        }
    }
    async userUserPage(token, paginationOptions, keyword) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            const { pageIndex, pageSize } = paginationOptions;
            const skip = (pageIndex - 1) * pageSize;
            let user = await this.prisma.nguoiDung.findMany({ where: { role: keyword }, take: Number(pageSize), skip: skip });
            return user;
        }
        catch (error) {
            return "Lỗi xác thực";
        }
    }
    async updateUser(token, id, userUpdate) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let { nguoi_dung_id, ten_nguoi_dung, email, pass_word, phone, birth_day, gender, role, skill, certification } = userUpdate;
            let checkUser = await this.prisma.nguoiDung.findFirst({ where: { email } });
            if (!checkUser) {
                let updateUser = {
                    nguoi_dung_id,
                    ten_nguoi_dung,
                    email,
                    pass_word,
                    phone,
                    birth_day,
                    gender,
                    role,
                    skill,
                    certification
                };
                await this.prisma.nguoiDung.update({ data: updateUser, where: { nguoi_dung_id: id } });
                return { ...updateUser };
            }
            else {
                throw new common_1.HttpException({ content: "email đã tồn tại", code: 404 }, 404);
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.HttpException(error.response.content, error.status);
        }
    }
    async searchUserName(token, TenNguoiDung) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            const data = await this.prisma.nguoiDung.findFirst({ where: { ten_nguoi_dung: TenNguoiDung } });
            if (data) {
                return data;
            }
            else {
                throw new common_1.HttpException({ content: `Không có người dùng tên ${TenNguoiDung}`, code: 404 }, 404);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.response.content, error.status);
        }
    }
    async uploadAvatar(token, file, id) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let { destination, filename } = file;
            const link = `http://localhost:8080/public/img/${filename}`;
            let getUserById = await this.prisma.nguoiDung.findFirst({ where: { nguoi_dung_id: id } });
            if (getUserById) {
                getUserById.hinh_dai_dien = link;
                await this.prisma.nguoiDung.update({
                    data: getUserById, where: {
                        nguoi_dung_id: Number(id)
                    }
                });
                return "Cập nhật ảnh đại diện thành công";
            }
            throw new common_1.HttpException({ content: "Cập nhật ảnh đại diện không thành công", code: 404 }, 404);
        }
        catch (error) {
            throw new common_1.HttpException(error.response.content, error.status);
        }
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map