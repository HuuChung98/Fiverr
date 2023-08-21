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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
class FileUploadDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], FileUploadDto.prototype, "file", void 0);
class User {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "userId", type: Number }),
    __metadata("design:type", Number)
], User.prototype, "nguoi_dung_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "name", type: String }),
    __metadata("design:type", String)
], User.prototype, "ten_nguoi_dung", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "email", type: String }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "pass_word", type: String }),
    __metadata("design:type", String)
], User.prototype, "pass_word", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "phone", type: String }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "birth_day", type: String }),
    __metadata("design:type", String)
], User.prototype, "birth_day", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "gender", type: String }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "role", type: String }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "skill", type: String }),
    __metadata("design:type", String)
], User.prototype, "skill", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "certification", type: String }),
    __metadata("design:type", String)
], User.prototype, "certification", void 0);
let UserController = exports.UserController = class UserController {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    getUser(token) {
        return this.userService.getUser(token);
    }
    userUserPage(token, pageIndex, pageSize, keyword) {
        const paginationOptions = { pageIndex, pageSize };
        return this.userService.userUserPage(token, paginationOptions, keyword);
    }
    userInfo(token, id) {
        return this.userService.userInfo(token, +id);
    }
    createUser(token, values) {
        return this.userService.createUser(token, values);
    }
    removeUser(token, id) {
        return this.userService.removeUser(token, +id);
    }
    updateUser(token, id, userUpdate) {
        return this.userService.updateUser(token, +id, userUpdate);
    }
    searchUserName(token, TenNguoiDung) {
        return this.userService.searchUserName(token, TenNguoiDung);
    }
    uploadAvatar(token, file, id) {
        return this.userService.uploadAvatar(token, file, +id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)("phan-trang-tim-kiem"),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Query)('pageIndex')),
    __param(2, (0, common_1.Query)("pageSize")),
    __param(3, (0, common_1.Query)("keyword")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "userUserPage", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "userInfo", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, User]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, User]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)("search/:TenNguoiDung"),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('TenNguoiDung')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "searchUserName", null);
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
    (0, common_1.Post)('upload-avatar/:id'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "uploadAvatar", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, swagger_1.ApiTags)("NguoiDung"),
    (0, common_1.Controller)('api/users'),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService])
], UserController);
//# sourceMappingURL=user.controller.js.map