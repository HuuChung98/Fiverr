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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const common_1 = require("@nestjs/common");
const job_service_1 = require("./job.service");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const passport_1 = require("@nestjs/passport");
class FileUploadDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: "string", format: 'binary' }),
    __metadata("design:type", Object)
], FileUploadDto.prototype, "file", void 0);
class Job {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "congViec_id", type: Number }),
    __metadata("design:type", Number)
], Job.prototype, "congViec_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "tenCongViec", type: String }),
    __metadata("design:type", String)
], Job.prototype, "ten_cong_viec", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "danhGia", type: Number }),
    __metadata("design:type", Number)
], Job.prototype, "danh_gia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "giaTien", type: Number }),
    __metadata("design:type", Number)
], Job.prototype, "gia_tien", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "hinhAnh", type: String }),
    __metadata("design:type", String)
], Job.prototype, "hinh_anh", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "moTa", type: String }),
    __metadata("design:type", String)
], Job.prototype, "mo_ta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "moTaNgan", type: String }),
    __metadata("design:type", String)
], Job.prototype, "mo_ta_ngan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "saoCongViec", type: Number }),
    __metadata("design:type", Number)
], Job.prototype, "sao_cong_viec", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "maChiTietLoaiCongViec", type: Number }),
    __metadata("design:type", Number)
], Job.prototype, "chiTiet_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "nguoiTao", type: Number }),
    __metadata("design:type", Number)
], Job.prototype, "nguoi_dung_id", void 0);
let JobController = exports.JobController = class JobController {
    constructor(jobService) {
        this.jobService = jobService;
    }
    getJob(token) {
        return this.jobService.getJob(token);
    }
    getMenuJobType(token) {
        return this.jobService.getMenuJobType(token);
    }
    createJob(token, payload) {
        return this.jobService.createJob(token, payload);
    }
    jobPage(token, pageIndex, pageSize, keyword) {
        const paginationOptions = { pageIndex, pageSize };
        return this.jobService.jobPage(token, paginationOptions, keyword);
    }
    getJobInfor(token, id) {
        return this.jobService.getJobInfor(token, +id);
    }
    updateJob(token, id, payload) {
        return this.jobService.updateJob(token, +id, payload);
    }
    removeJob(token, id) {
        return this.jobService.removeJob(token, +id);
    }
    uploadImageJob(token, file, MaCongViec) {
        return this.jobService.uploadImageJob(token, file, +MaCongViec);
    }
    getDetailJobType(token, MaLoaiCongViec) {
        return this.jobService.getDetailJobType(token, +MaLoaiCongViec);
    }
    getJobByJobTypeId(token, MaChiTietLoai) {
        return this.jobService.getJobByJobTypeId(token, +MaChiTietLoai);
    }
    gẹtJobDetailById(token, MaCongViec) {
        return this.jobService.gẹtJobDetailById(token, +MaCongViec);
    }
    getListJobByName(token, TenCongViec) {
        return this.jobService.getListJobByName(token, TenCongViec);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "getJob", null);
__decorate([
    (0, common_1.Get)("lay-menu-loai-cong-viec"),
    __param(0, (0, common_1.Headers)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "getMenuJobType", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Job]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "createJob", null);
__decorate([
    (0, common_1.Get)("phan-trang-tim-kiem"),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Query)('pageIndex')),
    __param(2, (0, common_1.Query)("pageSize")),
    __param(3, (0, common_1.Query)("keyword")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "jobPage", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "getJobInfor", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Job]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "updateJob", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "removeJob", null);
__decorate([
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'file',
        type: FileUploadDto
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: (0, multer_1.diskStorage)({
            destination: process.cwd() + "public/img",
            filename: (rep, file, callback) => callback(null, new Date().getTime() + file.originalname)
        })
    })),
    (0, common_1.Post)("upload-hinh-cong-viec/:MaCongViec"),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Param)("MaCongViec")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Number]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "uploadImageJob", null);
__decorate([
    (0, common_1.Get)('lay-chi-tiet-loai-cong-viec/:MaLoaiCongViec'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)("MaLoaiCongViec")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "getDetailJobType", null);
__decorate([
    (0, common_1.Get)('lay-cong-viec-theo-chi-tiet-loai/:MaChiTietLoai'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)("MaChiTietLoai")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "getJobByJobTypeId", null);
__decorate([
    (0, common_1.Get)('lay-cong-viec-chi-tiet/:MaCongViec'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)("MaCongViec")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "g\u1EB9tJobDetailById", null);
__decorate([
    (0, common_1.Get)('lay-danh-sach-cong-viec-theo-ten/:TenCongViec'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)("TenCongViec")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], JobController.prototype, "getListJobByName", null);
exports.JobController = JobController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiTags)("CongViec"),
    (0, common_1.Controller)('api/cong-viec'),
    __metadata("design:paramtypes", [job_service_1.JobService])
], JobController);
//# sourceMappingURL=job.controller.js.map