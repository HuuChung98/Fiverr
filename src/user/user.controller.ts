import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, Req, HttpException, HttpStatus, Query, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

class User {
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


@ApiBearerAuth()
@UseGuards(AuthGuard("jwt")) // jwt là key mặc định

@ApiTags("NguoiDung")
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService, private jwtService: JwtService) { }

  // Lấy danh sách người dùng
  @Get()
  getUser(@Headers("token") token: string) {
    return this.userService.getUser(token);
  }
  // Tạo người dùng
  @Post()
  createUser(@Headers("token") token: string, @Body() values: User) {
    return this.userService.createUser(token, values);
  }

  // Xóa người dùng
  @Delete()
  removeUser(@Headers("token") token: string, @Query('id') id: string) {
    return this.userService.removeUser(token, +id);
  }
  // Phân trang tìm kiếm
  @Get("phan-trang-tim-kiem")
  userUserPage(@Headers("token") token: string, @Query('pageIndex') pageIndex: number, @Query("pageSize") pageSize: number, @Query("keyword") keyword: string) {
    const paginationOptions = { pageIndex, pageSize }
    return this.userService.userUserPage(token, paginationOptions, keyword);
  }
  // Lấy thông tin người dùng theo userId
  @Get(':id')
  userInfo(@Headers("token") token: string, @Param('id') id: string) {
    return this.userService.userInfo(token, +id);
  }



  // Chỉnh sửa thông tin người dùng
  @Put(':id')
  updateUser(@Headers("token") token: string, @Param('id') id: string, @Body() userUpdate: User) {
    return this.userService.updateUser(token, +id, userUpdate);
  }

  // Tìm kiếm người dùng theo tên người dùng
  @Get("search/:TenNguoiDung")
  searchUserName(@Headers("token") token: string, @Param('TenNguoiDung') TenNguoiDung: string) {
    return this.userService.searchUserName(token, TenNguoiDung);
  }

  // Upload avatar (cập nhật ảnh đại diện)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'file',
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor("file",
    {
      storage: diskStorage({
        destination: process.cwd() + "/public/img",
        filename: (rep, file, callback) => callback(null, new Date().getTime() + file.originalname)

      })
    }))
  @Post('upload-avatar/:id')
  uploadAvatar(@Headers("token") token: string, @UploadedFile() file: Express.Multer.File, @Param('id') id: string) {
    return this.userService.uploadAvatar(token, file, +id);
  }
}
