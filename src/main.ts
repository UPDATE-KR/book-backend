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
import { ConfigService } from '@nestjs/config';
import { AuthsService } from './auths/auths.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: {
        origin: '*',
        preflightContinue: true,
      },
    },
  );

  app.setGlobalPrefix('api');
  app.useGlobalFilters(
    new ApiExceptionFilter(),
    new BadRequestExceptionFilter(),
    new UnauthorizedExceptionFilter(),
  );
  app.useGlobalInterceptors(
    new LogginInterceptor(app.get(ConfigService), app.get(AuthsService)),
    new TransformInterceptor(),
    new ErrorInterceptor(),
  );
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
