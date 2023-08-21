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
exports.CreateHireJobDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const date = new Date();
const isoString = date.toISOString();
class CreateHireJobDto {
}
exports.CreateHireJobDto = CreateHireJobDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "id", type: Number }),
    __metadata("design:type", Number)
], CreateHireJobDto.prototype, "thue_cong_viec_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "maCongViec", type: Number }),
    __metadata("design:type", Number)
], CreateHireJobDto.prototype, "congViec_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "maNguoiThue", type: Number }),
    __metadata("design:type", Number)
], CreateHireJobDto.prototype, "nguoi_dung_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "ngayThue", type: isoString }),
    __metadata("design:type", String)
], CreateHireJobDto.prototype, "ngay_thue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "hoanThanh", type: Boolean }),
    __metadata("design:type", Boolean)
], CreateHireJobDto.prototype, "hoan_thanh", void 0);
//# sourceMappingURL=create-hire-job.dto.js.map