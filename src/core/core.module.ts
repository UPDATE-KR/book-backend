import { Module, Global } from '@nestjs/common';
import Prisma from './database/prisma';

@Global()
@Module({
    providers: [Prisma],
    exports: [Prisma]
})
export class CoreModule {}
