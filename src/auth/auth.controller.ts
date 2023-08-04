import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger'; 

class userType {
  @ApiProperty({description: "email", type: String})
  email: string;

  @ApiProperty({description: "password", type: String})
  pass_word: string;
}

@ApiTags("Auth")
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  login(@Body() userLogin:  userType) {
    return this.authService.login(userLogin);
  }

  @Post("/sign-up")
  register(@Body() body) {
    return this.authService.register(body);
  }
}
