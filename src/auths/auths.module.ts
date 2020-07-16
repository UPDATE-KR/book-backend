import { Module } from '@nestjs/common';
import { AuthsController } from './auths.controller';
import { AuthsService } from './auths.service';
import Prisma from '../core/database/prisma';

@Module({
  controllers: [AuthsController],
  providers: [AuthsService]
})
export class AuthsModule {}
