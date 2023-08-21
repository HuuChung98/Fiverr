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
exports.JobTypeService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const jwt_1 = require("@nestjs/jwt");
const auth_constants_1 = require("../auth/auth.constants");
let JobTypeService = exports.JobTypeService = class JobTypeService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.prisma = new client_1.PrismaClient();
    }
    async createJobType(token, payload) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let { ten_loai_cong_viec } = payload;
            let jobType = await this.prisma.loaiCongViec.findFirst({ where: { ten_loai_cong_viec } });
            if (jobType) {
                return "Loại công việc đã tồn tại";
            }
            else {
                await this.prisma.loaiCongViec.create({ data: payload });
                return "Đã tạo Loại công việc";
            }
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: "Tạo loại công việc không thành công",
            }, common_1.HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }
    async getJobType(token) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            return await this.prisma.loaiCongViec.findMany();
        }
        catch (error) {
            return "Lỗi xác thực";
        }
    }
    async getJobType_Page(token, paginationOptions, keyword) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            const { pageIndex, pageSize } = paginationOptions;
            const skip = (pageIndex - 1) * pageSize;
            let jobType = await this.prisma.loaiCongViec.findMany({
                include: {
                    ChiTietLoaiCongViec: true
                }, where: { ten_loai_cong_viec: keyword, }, take: Number(pageSize), skip: skip
            });
            return jobType;
        }
        catch (error) {
            return "Lỗi xác thực";
        }
    }
    async jobTypeDetail(token, id) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let jobTypeDetail = await this.prisma.loaiCongViec.findFirst({
                include: {
                    ChiTietLoaiCongViec: true
                }, where: {
                    loaiCongViec_id: id
                }
            });
            return jobTypeDetail;
        }
        catch (error) {
            return "Lỗi xác thực";
        }
    }
    async updateTypeJob(token, id, payload) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            await this.prisma.loaiCongViec.update({
                data: payload, where: {
                    loaiCongViec_id: id
                }
            });
            return "Cập nhật loại công việc thành công";
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
    async removeJobType(token, id) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let removeJobType = await this.prisma.loaiCongViec.findFirst({
                where: {
                    loaiCongViec_id: id
                }
            });
            if (removeJobType) {
                await this.prisma.loaiCongViec.delete({
                    where: {
                        loaiCongViec_id: id
                    }
                });
                return `Đã xóa loại Công Việc ${removeJobType.ten_loai_cong_viec}`;
            }
        }
        catch (error) {
            return "Lỗi xác thực";
        }
    }
};
exports.JobTypeService = JobTypeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], JobTypeService);
//# sourceMappingURL=job-type.service.js.map