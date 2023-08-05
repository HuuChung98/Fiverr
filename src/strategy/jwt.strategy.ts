import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // kiểm tra token
    constructor() {
        super({
            jwtFromRequest: // nhận req từ client
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // secretOrKey: config.get("KEY"), // KEY: FLASH KHÓA BÍ MẬT 
            secretOrKey: "CHUNG"
        });
    }
    // trả về dữ liệu khi một API gọi thành công có chứa token (API khóa )
    async validate(tokenDecode: any) {
        // check quyền 
        return tokenDecode;
    }
}