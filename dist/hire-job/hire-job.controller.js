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
exports.HireJobController = void 0;
const common_1 = require("@nestjs/common");
const hire_job_service_1 = require("./hire-job.service");
const create_hire_job_dto_1 = require("./dto/create-hire-job.dto");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let HireJobController = exports.HireJobController = class HireJobController {
    constructor(hireJobService) {
        this.hireJobService = hireJobService;
    }
    hireJob(token) {
        return this.hireJobService.hireJob(token);
    }
    createJob(token, createHireJobDto) {
        return this.hireJobService.createJob(token, createHireJobDto);
    }
    jobHirePage(token, pageSize, pageIndex, keyword) {
        const pageSplit = { pageSize, pageIndex };
        return this.hireJobService.jobHirePage(token, pageSplit, keyword);
    }
    getHiredJob(token) {
        return this.hireJobService.getHiredJob(token);
    }
    jobDetail(token, id) {
        return this.hireJobService.jobDetail(token, +id);
    }
    updateJob(token, id, createHireJobDto) {
        return this.hireJobService.updateJob(token, +id, createHireJobDto);
    }
    removeJob(token, id) {
        return this.hireJobService.removeJob(token, +id);
    }
    statusJob(token, MaThueCongViec) {
        return this.hireJobService.statusJob(token, +MaThueCongViec);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HireJobController.prototype, "hireJob", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_hire_job_dto_1.CreateHireJobDto]),
    __metadata("design:returntype", void 0)
], HireJobController.prototype, "createJob", null);
__decorate([
    (0, common_1.Get)("phan-trang-tim-kiem"),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Query)("pageSize")),
    __param(2, (0, common_1.Query)("pageIndex")),
    __param(3, (0, common_1.Query)("keyword")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String]),
    __metadata("design:returntype", void 0)
], HireJobController.prototype, "jobHirePage", null);
__decorate([
    (0, common_1.Get)("lay-danh-sach-da-thue"),
    __param(0, (0, common_1.Headers)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HireJobController.prototype, "getHiredJob", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], HireJobController.prototype, "jobDetail", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_hire_job_dto_1.CreateHireJobDto]),
    __metadata("design:returntype", void 0)
], HireJobController.prototype, "updateJob", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], HireJobController.prototype, "removeJob", null);
__decorate([
    (0, common_1.Post)('hoan-thanh-cong-viec/:MaThueCongViec'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('MaThueCongViec')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], HireJobController.prototype, "statusJob", null);
exports.HireJobController = HireJobController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiTags)("ThueCongViec"),
    (0, common_1.Controller)('api/thue-cong-viec'),
    __metadata("design:paramtypes", [hire_job_service_1.HireJobService])
], HireJobController);
//# sourceMappingURL=hire-job.controller.js.map