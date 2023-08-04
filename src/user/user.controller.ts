import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, Req, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiHeader, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';

import { NguoiDung } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

class userType {
  @ApiProperty({ description: "userId", type: Number })
  nguoi_dung_id: number;

  @ApiProperty({ description: "name", type: String })
  ten_nguoi_dung: string;

  @ApiProperty({ description: "email", type: String })
  email: string;

  @ApiProperty({ description: "pass_word", type: String })
  pass_word: string;

  @ApiProperty({ description: "phone", type: String })
  phone: string;

  @ApiProperty({ description: "birth_day", type: String })
  birth_day: string;

  @ApiProperty({ description: "gender", type: String })
  gender: string;

  @ApiProperty({ description: "role", type: String })
  role: string;

  @ApiProperty({ description: "skill", type: String })
  skill: string;

  @ApiProperty({ description: "certification", type: String })
  certification: string;
}


@ApiTags("NguoiDung")
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService, private jwtService: JwtService) { }

  // @ApiBearerAuth()
  @ApiHeader({ name: "Token", description: "Bearer JWT token" })
  @UseGuards(AuthGuard("jwt")) // jwt là key mặc định
  @Get()
  getUser(@Headers("token") token) {
    console.log("Authorization", token);
    return this.userService.getUser();
  }

  @Post()
  createUser(@Body() values: userType) {
    return this.userService.createUser(values);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }

  @Get(':id')
  userPage(@Param('id') id: string) {
    return this.userService.userPage(+id);
  }

  @Get(':id')
  userInfo(@Param('id') id: string) {
    return this.userService.userInfo(+id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body) {
    return this.userService.updateUser(+id,);
  }
  @Get(':id')
  searchUser(@Param('id') id: string) {
    return this.userService.searchUser(+id);
  }

  @Post(':id')
  uploadAvatar(@Param('id') id: string) {
    return this.userService.uploadAvatar(+id);
  }

}
