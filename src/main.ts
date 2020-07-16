import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { CustomExceptionFilter } from './custom-exception.filter';
config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule
    , new FastifyAdapter()
    );
    
  app.useGlobalFilters(new CustomExceptionFilter());
    
  await app.listen(3000);
}
bootstrap();
