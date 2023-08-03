import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {

  login(body) {
    return `This action returns all auth`;
  }

  register(body) {
    return `This action returns a auth`;
  }

}
