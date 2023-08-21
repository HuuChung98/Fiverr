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
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_constants_1 = require("../auth/auth.constants");
const client_1 = require("@prisma/client");
let JobService = exports.JobService = class JobService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.prisma = new client_1.PrismaClient();
    }
    async getJob(token) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            return await this.prisma.congViec.findMany();
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
    async createJob(token, payload) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            await this.prisma.congViec.create({ data: payload });
            return "Đã tạo công việc";
        }
        catch (error) {
            throw new common_1.HttpException({
                status: common_1.HttpStatus.BAD_REQUEST,
                error: "Tạo công việc không thành công",
            }, common_1.HttpStatus.BAD_REQUEST, {
                cause: error
            });
        }
    }
    async jobPage(token, paginationOptions, keyword) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let { pageIndex, pageSize } = paginationOptions;
            const skip = (pageIndex - 1) * pageSize;
            let job = await this.prisma.congViec.findMany({
                where: {
                    ten_cong_viec: keyword
                }, take: Number(pageSize), skip: skip
            });
            if (job.length == 0) {
                return `Không có công việc cần tìm`;
            }
            else {
                return job;
            }
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
    async getJobInfor(token, id) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            return await this.prisma.congViec.findFirst({
                where: {
                    congViec_id: id
                }
            });
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
    async updateJob(token, id, payload) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let checkJob = await this.prisma.congViec.findFirst({ where: { congViec_id: id } });
            if (checkJob) {
                await this.prisma.congViec.update({
                    data: payload, where: {
                        congViec_id: id
                    }
                });
                return "Cập nhật Công việc thành công";
            }
            else {
                throw new common_1.HttpException({ content: "Cập nhật không hợp lệ, kiểm tra lại thông tin cập nhật", code: 404 }, 404);
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
    async removeJob(token, id) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let checkJob = await this.prisma.congViec.findFirst({ where: { congViec_id: id } });
            if (checkJob) {
                await this.prisma.congViec.delete({ where: { congViec_id: id } });
                return "Đã xóa công việc";
            }
            else {
                return "Xóa Công việc không thành công";
            }
        }
        catch (error) {
            return "Lỗi xác thưc";
        }
    }
    async uploadImageJob(token, file, MaCongViec) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let { destination, filename } = file;
            const link = `http://localhost:8080/public/img/${filename}`;
            let getImageById = await this.prisma.congViec.findFirst({
                where: {
                    congViec_id: MaCongViec
                }
            });
            if (getImageById) {
                getImageById.hinh_anh = link;
                await this.prisma.congViec.update({
                    data: getImageById, where: {
                        congViec_id: Number(MaCongViec)
                    }
                });
                return "Tạo ảnh thành công";
            }
            else {
                throw new common_1.HttpException({ content: "Tạo ảnh không thành công", code: 404 }, 404);
            }
        }
        catch (error) {
            throw new common_1.HttpException(error.response.content, error.status);
        }
    }
    async getMenuJobType(token) {
        try {
            await this.jwtService.verifyAsync(token);
            return await this.prisma.loaiCongViec.findMany();
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
    async getDetailJobType(token, MaLoaiCongViec) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let data = await this.prisma.chiTietLoaiCongViec.findMany({
                where: {
                    loaiCongViec_id: MaLoaiCongViec
                }
            });
            if (data.length != 0) {
                return data;
            }
            else {
                return "Không có loại công việc cần hiển thị";
            }
        }
        catch (error) {
            return "Lỗi xác thực";
        }
    }
    async getJobByJobTypeId(token, MaChiTietLoai) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let payload = await this.prisma.congViec.findMany({
                include: {
                    ChiTietLoaiCongViec: true
                }, where: {
                    chiTiet_id: MaChiTietLoai
                }
            });
            return payload;
        }
        catch (error) {
            return "Lỗi xác thực";
        }
    }
    async gẹtJobDetailById(token, MaCongViec) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let payload = await this.prisma.congViec.findFirst({
                where: {
                    congViec_id: MaCongViec
                }
            });
            return payload;
        }
        catch (error) {
            return "Lỗi xác thực";
        }
    }
    async getListJobByName(token, TenCongViec) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let jobName = await this.prisma.congViec.findMany({
                where: {
                    ten_cong_viec: TenCongViec
                }
            });
            if (jobName.length != 0) {
                return jobName;
            }
            else {
                return "Không có công việc";
            }
        }
        catch (error) {
            return "Lỗi xác thực";
        }
    }
};
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JobService);
//# sourceMappingURL=job.service.js.map