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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_constants_1 = require("./auth.constants");
const client_1 = require("@prisma/client");
let AuthService = exports.AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.prisma = new client_1.PrismaClient();
    }
    ;
    async login(userLogin) {
        try {
            let { email, pass_word } = userLogin;
            const user = await this.prisma.nguoiDung.findFirst({ where: { email } });
            if (user?.pass_word !== pass_word) {
                throw new common_1.UnauthorizedException();
            }
            const payload = { email: user.email };
            return {
                access_token: await this.jwtService.signAsync(payload)
            };
        }
        catch (error) {
            return "Đăng nhập không thành công";
        }
    }
    async register(token, createAuthDto) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let checkUser = await this.prisma.nguoiDung.findFirst({ where: {
                    email: createAuthDto.email
                } });
            if (!checkUser) {
                await this.prisma.nguoiDung.create({ data: createAuthDto });
                return "Đã tạo tài khoản";
            }
            else {
                return "Email đã tồn tại";
            }
        }
        catch (error) {
            return "Lỗi xác thực";
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map