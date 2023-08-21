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
exports.HireJobService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_constants_1 = require("../auth/auth.constants");
const client_1 = require("@prisma/client");
let HireJobService = exports.HireJobService = class HireJobService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.prisma = new client_1.PrismaClient();
    }
    async hireJob(token) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            return await this.prisma.thueCongViec.findMany();
        }
        catch (error) {
            return "Lỗi xác thực";
        }
    }
    async createJob(token, createHireJobDto) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            await this.prisma.thueCongViec.create({ data: createHireJobDto });
            return "Đã tạo";
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: "Lỗi xác thực",
            }, common_1.HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }
    async jobHirePage(token, pageSplit, keyword) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            const { pageSize, pageIndex } = pageSplit;
            const skip = (pageIndex - 1) * pageSize;
            const data = await this.prisma.congViec.findMany({ where: { ten_cong_viec: keyword }, take: Number(pageSize), skip: skip });
            return data;
        }
        catch (error) {
            return "Lỗi xác thực";
        }
    }
    async jobDetail(token, id) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            const payload = await this.prisma.thueCongViec.findFirst({
                include: {
                    CongViec: true
                }, where: {
                    thue_cong_viec_id: id
                }
            });
            try {
                if (payload == null) {
                    return "Không có công việc được thuê!";
                }
                else {
                    return payload;
                }
            }
            catch (error) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.BAD_REQUEST,
                    error: 'Có lỗi xảy ra',
                }, common_1.HttpStatus.BAD_REQUEST, {
                    cause: error
                });
            }
        }
        catch (error) {
            return "Lỗi xác thực";
        }
    }
    async updateJob(token, id, createHireJobDto) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            await this.prisma.thueCongViec.update({
                data: createHireJobDto, where: {
                    thue_cong_viec_id: id
                }
            });
            return "Đã cập nhật";
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: "Có lỗi xảy ra",
            }, common_1.HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }
    async removeJob(token, id) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            await this.prisma.thueCongViec.delete({
                where: {
                    thue_cong_viec_id: id
                }
            });
            return "Đã xóa";
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.FORBIDDEN,
                error: 'Something wrong happen',
            }, common_1.HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
    async getHiredJob(token) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            return await this.prisma.thueCongViec.findMany({
                include: {
                    CongViec: true
                }
            });
        }
        catch (error) {
            return "Lỗi xác thực";
        }
    }
    async statusJob(token, MaThueCongViec) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            const jobHired = await this.prisma.thueCongViec.findFirst({
                where: {
                    thue_cong_viec_id: MaThueCongViec
                }
            });
            if (jobHired) {
                jobHired.hoan_thanh = true;
                await this.prisma.thueCongViec.update({
                    data: jobHired, where: {
                        thue_cong_viec_id: MaThueCongViec
                    }
                });
            }
            return "Đã cập nhật";
        }
        catch (error) {
            return "Lỗi xác thực";
        }
    }
};
exports.HireJobService = HireJobService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], HireJobService);
//# sourceMappingURL=hire-job.service.js.map