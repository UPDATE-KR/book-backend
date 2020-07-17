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
  async readMyInfo(@Request() { user }: FastifyRequest) {
    return await this.userService.readMyInfo(user);
  }
}
