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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment.service");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const date = new Date();
const isoString = date.toISOString();
class Comment {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: "binhLuanId", type: Number }),
    __metadata("design:type", Number)
], Comment.prototype, "binh_luan_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "maCongViec", type: Number }),
    __metadata("design:type", Number)
], Comment.prototype, "congViec_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "maNguoiBinhLuan", type: Number }),
    __metadata("design:type", Number)
], Comment.prototype, "nguoi_dung_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "ngayBinhLuan", type: isoString }),
    __metadata("design:type", String)
], Comment.prototype, "ngay_binh_luan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "noiDung", type: String }),
    __metadata("design:type", String)
], Comment.prototype, "noi_dung", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "saoBinhLuan", type: Number }),
    __metadata("design:type", Number)
], Comment.prototype, "sao_binh_luan", void 0);
let CommentController = exports.CommentController = class CommentController {
    constructor(commentService, jwtService) {
        this.commentService = commentService;
        this.jwtService = jwtService;
    }
    getComment(token) {
        return this.commentService.getComment(token);
    }
    postComment(token, commentData) {
        return this.commentService.postComment(token, commentData);
    }
    editComment(token, id, commentUpdated) {
        return this.commentService.editComment(token, +id, commentUpdated);
    }
    removeCmt(token, id) {
        return this.commentService.removeCmt(token, +id);
    }
    getCommentById(token, MaCongViec) {
        return this.commentService.getCommentById(token, +MaCongViec);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "getComment", null);
__decorate([
    (0, swagger_1.ApiHeader)({ name: "token", description: "nhập token tại đây" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Comment]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "postComment", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Comment]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "editComment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "removeCmt", null);
__decorate([
    (0, common_1.Get)('lay-binh-luan-theo-cong-viec/:MaCongViec'),
    __param(0, (0, common_1.Headers)("token")),
    __param(1, (0, common_1.Param)('MaCongViec')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CommentController.prototype, "getCommentById", null);
exports.CommentController = CommentController = __decorate([
    (0, swagger_1.ApiTags)("BinhLuan"),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
    (0, common_1.Controller)('api/binh-luan'),
    __metadata("design:paramtypes", [comment_service_1.CommentService, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], CommentController);
//# sourceMappingURL=comment.controller.js.map