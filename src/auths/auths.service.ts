import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import Prisma from '../core/database/prisma';
import { ApiException } from 'src/common/exception/ApiException';
import ApiErrorCode from 'src/common/exception/ApiErrorCode';
import { SignUpDto } from './dto/signup.dto';
import { genSaltSync, hashSync } from 'bcrypt';
import { User } from 'src/models';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthsService {
  constructor(
    private readonly prisma: Prisma,
    private readonly jwtService: JwtService,
  ) {}

  async doLogin(req: LoginDto) {
    const auth = await this.prisma.auth.findOne({
      where: {
        email: req.email,
      },
    });

    if (!auth) {
      throw new ApiException(ApiErrorCode.BAD_REQUEST);
    }

    const { id, email } = User.of(auth);
    return {
      access_token: this.jwtService.sign({
        id,
        email,
      }),
    };
  }

  async doSignUp(req: SignUpDto) {
    const exists = await this.prisma.auth.count({
      where: {
        OR: [
          {
            email: req.email,
          },
          {
            username: req.username,
          },
        ],
      },
    });

    if (exists > 0) {
      throw new ApiException(ApiErrorCode.ALREADY_EXISTS_USER);
    }

    await this.prisma.auth.create({
      data: {
        email: req.email,
        password: hashSync(req.password, genSaltSync(10)),
        username: req.username,
        nickname: req.nickname,
      },
    });

    return {
      msg: 'success',
    };
  }

  async validateUser(payload: { id: number; email: string }) {
    return User.of(
      await this.prisma.auth.findOne({
        where: {
          id: payload.id,
        },
      }),
    );
  }
}
