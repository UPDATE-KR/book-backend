import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthsService } from './auths.service';
import { ApiException } from 'src/common/exception/ApiException';
import ApiErrorCode from 'src/common/exception/ApiErrorCode';
import { SignUpDto } from './dto/signup.dto';
import { JwtAuthGuard } from 'src/core/authentication/jwt-auth.guard';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authService: AuthsService) {}

  @Post('login')
  async doLogin(@Body() req: LoginDto) {
    return await this.authService.doLogin(req);
  }

  @Post('signup')
  async doSignUp(@Body() req: SignUpDto) {
    return await this.authService.doSignUp(req);
  }
}
