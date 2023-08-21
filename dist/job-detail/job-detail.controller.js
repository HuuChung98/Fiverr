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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobDetailController = void 0;
const common_1 = require("@nestjs/common");
const job_detail_service_1 = require("./job-detail.service");
const create_job_detail_dto_1 = require("./dto/create-job-detail.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const passport_1 = require("@nestjs/passport");
class FileUploadDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], FileUploadDto.prototype, "file", void 0);
class JobTypeDetail {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "id", type: Number }),
    __metadata("design:type", Number)
], JobTypeDetail.prototype, "chiTiet_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "tenChiTiet", type: String }),
    __metadata("design:type", String)
], JobTypeDetail.prototype, "ten_chi_tiet", void 0);
let JobDetailController = exports.JobDetailController = class JobDetailController {
    constructor(jobDetailService) {
        this.jobDetailService = jobDetailService;
    }
    getDetailJobType(token) {
        return this.jobDetailService.getDetailJobType(token);
    }
    createJobType(token, payload) {
        return this.jobDetailService.createJobType(token, payload);
    }
    getTypeJobPage(token, pageIndex, pageSize, keyword) {
        const paginationOptions = { pageIndex, pageSize };
        return this.jobDetailService.getTypeJobPage(token, paginationOptions, keyword);
    }
    getJobInfo(token, id) {
        return this.jobDetailService.getJobInfo(token, +id);
    }
    updateJobType(token, id, payload) {
        return this.jobDetailService.updateJobType(token, +id, payload);
    }
    removeJobType(token, id) {
        return this.jobDetailService.removeJobType(token, +id);
    }
    addJobDetail(token, createJobDetailDto) {
        return this.jobDetailService.addJobDetail(token, createJobDetailDto);
    }
    uploadImageGroupTypeJob(token, file, MaNhomLoaiCongViec) {
        return this.jobDetailService.uploadImageGroupTypeJob(token, file, +MaNhomLoaiCongViec);
    }
    updateGroupJobDetail(token, id, createJobDetailDto) {
        return this.jobDetailService.updateGroupJobDetail(token, +id, createJobDetailDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobDetailController.prototype, "getDetailJobType", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, JobTypeDetail]),
    __metadata("design:returntype", void 0)
], JobDetailController.prototype, "createJobType", null);
__decorate([
    (0, common_1.Get)("phan-trang-tim-kiem"),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Query)("pageIndex")),
    __param(2, (0, common_1.Query)("pageSize")),
    __param(3, (0, common_1.Query)("keyword")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String]),
    __metadata("design:returntype", void 0)
], JobDetailController.prototype, "getTypeJobPage", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], JobDetailController.prototype, "getJobInfo", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, JobTypeDetail]),
    __metadata("design:returntype", void 0)
], JobDetailController.prototype, "updateJobType", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], JobDetailController.prototype, "removeJobType", null);
__decorate([
    (0, common_1.Post)("them-nhom-chi-tiet-loai"),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_job_detail_dto_1.CreateJobDetailDto]),
    __metadata("design:returntype", void 0)
], JobDetailController.prototype, "addJobDetail", null);
__decorate([
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'file',
        type: FileUploadDto,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: (0, multer_1.diskStorage)({
            destination: process.cwd() + "/public/img",
            filename: (rep, file, callback) => callback(null, new Date().getTime() + file.originalname)
        })
    })),
    (0, common_1.Post)('upload-hinh-nhom-loai_cong-viec/:MaNhomLoaiCongViec'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Param)('MaNhomLoaiCongViec')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof Express !== "undefined" && (_a = Express.Multer) !== void 0 && _a.File) === "function" ? _b : Object, Number]),
    __metadata("design:returntype", void 0)
], JobDetailController.prototype, "uploadImageGroupTypeJob", null);
__decorate([
    (0, common_1.Put)("sua-nhom-chi-tiet-loai/:id"),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)("id")),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_job_detail_dto_1.CreateJobDetailDto]),
    __metadata("design:returntype", void 0)
], JobDetailController.prototype, "updateGroupJobDetail", null);
exports.JobDetailController = JobDetailController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiTags)("ChiTietLoaiCongViec"),
    (0, common_1.Controller)('api/chi-tiet-loai-cong-viec'),
    __metadata("design:paramtypes", [job_detail_service_1.JobDetailService])
], JobDetailController);
//# sourceMappingURL=job-detail.controller.js.map