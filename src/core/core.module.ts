import { Module, Global } from '@nestjs/common';
import Prisma from './database/prisma';
import { JwtStrategy } from './authentication/jwt.strategy';
import { AuthsModule } from 'src/auths/auths.module';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  providers: [Prisma, JwtStrategy],
  imports: [AuthsModule, ConfigModule],
  exports: [Prisma, JwtStrategy],
})
export class CoreModule {}
