import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
// import { JwtStrategy } from 'src/strategy/jwt.strategy';

// import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: "CHUNG",
      signOptions: { expiresIn: "30m"}
    })],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
