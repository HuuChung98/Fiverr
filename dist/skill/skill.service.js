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
exports.SkillService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_constants_1 = require("../auth/auth.constants");
const client_1 = require("@prisma/client");
let SkillService = exports.SkillService = class SkillService {
    constructor(jwtService) {
        this.jwtService = jwtService;
        this.prisma = new client_1.PrismaClient();
    }
    async getSkill(token) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: auth_constants_1.jwtConstants.secret
            });
            let userList = await this.prisma.nguoiDung.findMany();
            let skillList = new Array;
            userList.map((item) => skillList.push(item?.skill));
            return skillList.sort().join(", ").toString();
        }
        catch (error) {
            return "Lỗi xác thực";
        }
    }
};
exports.SkillService = SkillService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], SkillService);
//# sourceMappingURL=skill.service.js.map