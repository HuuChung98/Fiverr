import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("NguoiDung")
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getUser() {
    return this.userService.getUser();
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
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
