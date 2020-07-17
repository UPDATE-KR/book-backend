import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  async readMyInfo(user: User) {
    return {
      user,
    };
  }
}
