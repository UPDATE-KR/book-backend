import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import Prisma from '../core/database/prisma';
import { ApiException } from 'src/common/exception/ApiException';
import ApiErrorCode from 'src/common/exception/ApiErrorCode';
import { SignUpDto } from './dto/signup.dto';
import { validate } from 'class-validator';

@Injectable()
export class AuthsService {
    constructor(
        private readonly prisma: Prisma
    ) {}

    async doLogin(req: LoginDto) {
        const user = await this.prisma.auth.findOne({
            where: {
                email: req.email
            }
        })

        if (!user) {
            throw new ApiException(ApiErrorCode.BAD_REQUEST);
        }

        return user;
    }

    async doSignUp(req: SignUpDto) {
        const errors = await validate(req);
        if (errors.length > 0) {
            throw new ApiException(ApiErrorCode.INVALID_REQUEST);
        }

        const exists = await this.prisma.auth.count({
            where: {
                OR: [
                    {
                        email: req.email
                    },
                    {
                        username: req.username
                    }
                ]
            }
        });
        if (exists > 0) {
            throw new ApiException(ApiErrorCode.ALREADY_EXISTS_USER);
        }
    }

}
