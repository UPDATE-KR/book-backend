import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import Prisma from '../core/database/prisma';
import { ApiException } from 'src/common/exception/ApiException';
import ApiErrorCode from 'src/common/exception/ApiErrorCode';
import { SignUpDto } from './dto/signup.dto';
import { genSaltSync, hashSync } from 'bcrypt';
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
      throw new ApiException(ApiErrorCode.USER_NOT_FOUND);
    }

    const { id } = await this.prisma.user.findOne({
      select: {
        id: true,
      },
      where: {
        id: auth.id,
      },
    });
    return {
      access_token: this.jwtService.sign({
        id,
        email: auth.email,
      }),
    };
  }

  async doSignUp(req: SignUpDto) {
    const exists = await this.prisma.user.count({
      where: {
        OR: [
          {
            auth: {
              email: req.email,
            },
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

    await this.prisma.user.create({
      data: {
        email: req.email,
        username: req.username,
        nickname: req.nickname,
        auth: {
          create: {
            email: req.email,
            password: hashSync(req.password, genSaltSync(10)),
          },
        },
      },
    });

    return {
      msg: 'ok',
    };
  }

  async validateUser(payload: { id: number; email: string }) {
    return await this.prisma.user.findOne({
      where: {
        id: payload.id,
      },
    });
  }
}
