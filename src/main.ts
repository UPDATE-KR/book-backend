import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import {
  ApiExceptionFilter,
  BadRequestExceptionFilter,
  UnauthorizedExceptionFilter,
} from './core/filter';
import { ValidationPipe } from '@nestjs/common';
import { LogginInterceptor } from './core/interceptor/logging.interceptor';
import { TransformInterceptor } from './core/interceptor/transform.interceptor';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('api');
  app.useGlobalFilters(
    new ApiExceptionFilter(),
    new BadRequestExceptionFilter(),
    new UnauthorizedExceptionFilter(),
  );
  app.useGlobalInterceptors(
    new LogginInterceptor(),
    new TransformInterceptor(),
    new ErrorInterceptor(),
  );
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
