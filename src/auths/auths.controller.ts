import { Controller, Post, Body, Res } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthsService } from './auths.service';
import Prisma from '../core/database/prisma';
import { ApiException } from 'src/common/exception/ApiException';
import ApiErrorCode from 'src/common/exception/ApiErrorCode';
import { FastifyReply } from 'fastify';
import { SignUpDto } from './dto/signup.dto';

@Controller('auths')
export class AuthsController {
    constructor (
        private readonly authService: AuthsService
        ) {}

    @Post('login')
    async doLogin(
        @Body() req: LoginDto
    ): Promise<ApiResponse> {
        const returnMap: ApiResponse = {};

        try {
            returnMap['result'] = 1;
            returnMap['data'] = await this.authService.doLogin(req);
        } catch (e) {
            returnMap['result'] = 0;
            if (e instanceof ApiException) {
                returnMap['resultCode'] = e.code;
                returnMap['resultMsg'] = e.msg;
            } else {
                returnMap['resultCode'] = e.code;
                returnMap['resultMsg'] = e.msg;
            }
        }

        return returnMap;
    }

    @Post('signup')
    async doSignUp(
        @Body() req: SignUpDto
    ): Promise<ApiResponse> {
        const returnMap: ApiResponse = {};

        try {
            returnMap['result'] = 1;
            returnMap['data'] = await this.authService.doSignUp(req);
        } catch (e) {
            console.error(e);
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
