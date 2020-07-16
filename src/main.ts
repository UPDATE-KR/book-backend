import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { ApiExceptionFilter, BadRequestExceptionFilter } from './core/filter';
import { ValidationPipe } from '@nestjs/common';
config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule
    , new FastifyAdapter()
    );
    
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ApiExceptionFilter(), new BadRequestExceptionFilter());
  app.useGlobalPipes(new ValidationPipe())
    
  await app.listen(3000);
}
bootstrap();
