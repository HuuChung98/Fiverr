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
exports.JobTypeController = void 0;
const common_1 = require("@nestjs/common");
const job_type_service_1 = require("./job-type.service");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
class JobType {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "loaiCongViec_id", type: Number }),
    __metadata("design:type", Number)
], JobType.prototype, "loaiCongViec_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "tenLoaiCongViec", type: String }),
    __metadata("design:type", String)
], JobType.prototype, "ten_loai_cong_viec", void 0);
let JobTypeController = exports.JobTypeController = class JobTypeController {
    constructor(jobTypeService) {
        this.jobTypeService = jobTypeService;
    }
    getJobType(token) {
        return this.jobTypeService.getJobType(token);
    }
    createJobType(token, payload) {
        return this.jobTypeService.createJobType(token, payload);
    }
    getJobType_Page(token, pageIndex, pageSize, keyword) {
        const paginationOptions = { pageIndex, pageSize };
        return this.jobTypeService.getJobType_Page(token, paginationOptions, keyword);
    }
    jobTypeDetail(token, id) {
        return this.jobTypeService.jobTypeDetail(token, +id);
    }
    updateTypeJob(token, id, payload) {
        return this.jobTypeService.updateTypeJob(token, +id, payload);
    }
    removeJobType(token, id) {
        return this.jobTypeService.removeJobType(token, +id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobTypeController.prototype, "getJobType", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, JobType]),
    __metadata("design:returntype", void 0)
], JobTypeController.prototype, "createJobType", null);
__decorate([
    (0, common_1.Get)("phan-trang-tim-kiem"),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Query)("pageIndex")),
    __param(2, (0, common_1.Query)("pageSize")),
    __param(3, (0, common_1.Query)("keyword")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String]),
    __metadata("design:returntype", void 0)
], JobTypeController.prototype, "getJobType_Page", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], JobTypeController.prototype, "jobTypeDetail", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, JobType]),
    __metadata("design:returntype", void 0)
], JobTypeController.prototype, "updateTypeJob", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], JobTypeController.prototype, "removeJobType", null);
exports.JobTypeController = JobTypeController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiTags)("LoaiCongViec"),
    (0, common_1.Controller)('api/loai-cong-viec'),
    __metadata("design:paramtypes", [job_type_service_1.JobTypeService])
], JobTypeController);
//# sourceMappingURL=job-type.controller.js.map