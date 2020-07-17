import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { FastifyRequest } from 'fastify';
import http from 'http';

@Injectable()
export class LogginInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const { req } = request;
    const IP = request.ip;
    const URL = req.url;
    const METHOD = req.method;

    Logger.log(`<-- ${METHOD} ${URL} ${IP}`);

    const now = Date.now();
    return next
      .handle()
      .pipe(
        finalize(() =>
          Logger.log(`--> ${METHOD} ${URL} ${IP} ${Date.now() - now}ms`),
        ),
      );
  }
}
