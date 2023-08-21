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
exports.CreateJobDetailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateJobDetailDto {
}
exports.CreateJobDetailDto = CreateJobDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "id", type: Number }),
    __metadata("design:type", Number)
], CreateJobDetailDto.prototype, "chiTiet_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "tenChiTiet", type: String }),
    __metadata("design:type", String)
], CreateJobDetailDto.prototype, "ten_chi_tiet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "loaiCongViec", type: Number }),
    __metadata("design:type", Number)
], CreateJobDetailDto.prototype, "loaiCongViec_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "nhomChiTietLoai", type: String }),
    __metadata("design:type", String)
], CreateJobDetailDto.prototype, "nhom_chi_tiet_loai", void 0);
//# sourceMappingURL=create-job-detail.dto.js.map