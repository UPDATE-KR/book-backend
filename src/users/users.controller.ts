import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiException } from 'src/common/exception/ApiException';
import ApiErrorCode from 'src/common/exception/ApiErrorCode';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/core/authentication/jwt-auth.guard';
import { FastifyRequest } from 'fastify';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async readMyInfo(@Request() { user }: FastifyRequest): Promise<ApiResponse> {
    const returnMap: ApiResponse = {};

    try {
      returnMap['result'] = 1;
      returnMap['data'] = await this.userService.readMyInfo(user);
    } catch (e) {
      returnMap['result'] = 0;
      if (e instanceof ApiException) {
        returnMap['resultCode'] = e.code;
        returnMap['resultMsg'] = e.msg;
      } else {
        returnMap['resultCode'] = ApiErrorCode.UNKNOWN.code;
        returnMap['resultMsg'] = ApiErrorCode.UNKNOWN.msg;
      }
    }

    return returnMap;
  }
}
