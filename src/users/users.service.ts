import { Injectable } from '@nestjs/common';
import { User } from 'src/models';

@Injectable()
export class UsersService {
  async readMyInfo(user: User) {
    return {
      user,
    };
  }
}
