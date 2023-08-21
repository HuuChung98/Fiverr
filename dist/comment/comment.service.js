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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const jwt_1 = require("@nestjs/jwt");
const auth_constants_1 = require("../auth/auth.constants");
let CommentService = exports.CommentService = class CommentService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.prisma = new client_1.PrismaClient();
    }
    async postComment(token, commentData) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            await this.prisma.binhLuan.create({ data: commentData });
            return "Đã đăng bình luận";
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Đăng bình luận không thành công",
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            });
        }
    }
    async getComment(token) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let comment = await this.prisma.binhLuan.findMany({
                include: {
                    NguoiDung: true
                }
            });
            if (comment.length != 0) {
                return comment;
            }
            else {
                return "Chưa có bình luận nào";
            }
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Lỗi xác thực"
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            });
        }
    }
    async editComment(token, id, commentUpdated) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let checkCmt = await this.prisma.binhLuan.findFirst({ where: { binh_luan_id: id } });
            if (checkCmt) {
                await this.prisma.binhLuan.update({
                    data: commentUpdated, where: {
                        binh_luan_id: id
                    }
                });
            }
            return "Bình luận đã được cập nhật";
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: "Chỉnh sửa bình luận không thành công, vui lòng kiểm tra lại thông tin chỉnh sửa",
            }, common_1.HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }
    async removeCmt(token, id) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let cmt = await this.prisma.binhLuan.findFirst({ where: { binh_luan_id: id } });
            if (cmt) {
                await this.prisma.binhLuan.delete({ where: { binh_luan_id: id } });
            }
            return "Đã xóa bình luận";
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Lỗi xác thực"
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            });
        }
    }
    async getCommentById(token, MaCongViec) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let cmtById = await this.prisma.binhLuan.findMany({ where: { congViec_id: MaCongViec } });
            if (cmtById.length == 0) {
                return "Chưa có bình luận cho công việc này!";
            }
            return cmtById;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Lỗi xác thực"
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            });
        }
    }
};
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], CommentService);
//# sourceMappingURL=comment.service.js.map