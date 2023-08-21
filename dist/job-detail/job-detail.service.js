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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobDetailService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_constants_1 = require("../auth/auth.constants");
const client_1 = require("@prisma/client");
let JobDetailService = exports.JobDetailService = class JobDetailService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.prisma = new client_1.PrismaClient();
    }
    async createJobType(token, payload) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            await this.prisma.chiTietLoaiCongViec.create({ data: payload });
            return "Công việc đã được tạo";
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                error: "Lỗi xác thực",
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR, {
                cause: error
            });
        }
    }
    async getDetailJobType(token) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            const detailJobType = await this.prisma.chiTietLoaiCongViec.findMany();
            return detailJobType;
        }
        catch (error) {
            return "Lỗi xác thực";
        }
    }
    async getTypeJobPage(token, paginationOptions, keyword) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            const { pageIndex, pageSize } = paginationOptions;
            const skip = (pageIndex - 1) * pageSize;
            let data = await this.prisma.chiTietLoaiCongViec.findMany({ where: { ten_chi_tiet: keyword }, take: Number(pageSize), skip: skip });
            return data;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: "Lỗi xác thực"
            }, common_1.HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }
    async getJobInfo(token, id) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let data = await this.prisma.chiTietLoaiCongViec.findFirst({ where: { chiTiet_id: id } });
            return data;
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: "Lỗi xác thực"
            }, common_1.HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }
    async updateJobType(token, id, payload) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            await this.prisma.chiTietLoaiCongViec.update({
                data: payload, where: {
                    chiTiet_id: id
                }
            });
            return "Đã cập nhật công việc thành công";
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: "Lỗi xác thực ,Cập nhật công việc không thành công",
            }, common_1.HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }
    async removeJobType(token, id) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            await this.prisma.chiTietLoaiCongViec.delete({
                where: {
                    chiTiet_id: id
                }
            });
            return "Đã xóa công việc này";
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: "Lỗi xác thực ,Cập nhật công việc không thành công",
            }, common_1.HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }
    async addJobDetail(token, createJobDetailDto) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            await this.prisma.chiTietLoaiCongViec.create({ data: createJobDetailDto });
            return "Đã thêm vào nhóm chi tiết loại công việc";
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: "Thêm nhóm chi tiết loại Công việc không thành công",
            }, common_1.HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }
    async uploadImageGroupTypeJob(token, file, MaNhomLoaiCongViec) {
        let { destination, filename } = file;
        const link = `http://localhost:8080/public/img/${filename}`;
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let getImageById = await this.prisma.loaiCongViec.findFirst({ where: { loaiCongViec_id: MaNhomLoaiCongViec } });
            if (getImageById) {
                getImageById.hinh_anh = link;
                await this.prisma.loaiCongViec.update({
                    data: getImageById, where: {
                        loaiCongViec_id: Number(MaNhomLoaiCongViec)
                    }
                });
                return "Cập nhật hình ảnh thành công";
            }
            throw new common_1.HttpException({ content: "Cập nhật hình ảnh không thành công", code: 404 }, 404);
        }
        catch (error) {
            throw new common_1.HttpException(error.response.content, error.status);
        }
    }
    async updateGroupJobDetail(token, id, createJobDetailDto) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            await this.prisma.chiTietLoaiCongViec.update({
                data: createJobDetailDto, where: {
                    chiTiet_id: id
                }
            });
            return "Cập nhật nhóm chi tiết loại thành công";
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: "Chỉnh sửa nhóm chi tiết loại không thành công",
            }, common_1.HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }
};
exports.JobDetailService = JobDetailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], JobDetailService);
//# sourceMappingURL=job-detail.service.js.map