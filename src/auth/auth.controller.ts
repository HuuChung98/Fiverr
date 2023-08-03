import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger'; 

@ApiTags("Auth")
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  login(@Body() body) {
    return this.authService.login(body);
  }

  @Post("/sign-up")
  register(@Body() body) {
    return this.authService.register(body);
  }
}
