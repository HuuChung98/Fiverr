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
exports.CreateAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateAuthDto {
}
exports.CreateAuthDto = CreateAuthDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "userId", type: Number }),
    __metadata("design:type", Number)
], CreateAuthDto.prototype, "nguoi_dung_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "name", type: String }),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "ten_nguoi_dung", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "hinhDaiDien", type: String }),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "hinh_dai_dien", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "email", type: String }),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "password", type: String }),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "pass_word", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "phone", type: String }),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "birthday", type: String }),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "birth_day", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "gender", type: String }),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "role", type: String }),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "skill", type: String }),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "skill", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "certification", type: String }),
    __metadata("design:type", String)
], CreateAuthDto.prototype, "certification", void 0);
//# sourceMappingURL=create-auth.dto.js.map