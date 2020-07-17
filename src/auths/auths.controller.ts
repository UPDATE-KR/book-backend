import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthsService } from './auths.service';
import { SignUpDto } from './dto/signup.dto';

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
