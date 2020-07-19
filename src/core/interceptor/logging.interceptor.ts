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
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthsService } from 'src/auths/auths.service';

@Injectable()
export class LogginInterceptor implements NestInterceptor {
  private logger: Logger;
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthsService,
  ) {
    this.logger = new Logger('request', false);
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const { req } = request;
    const IP = request.ip;
    const URL = req.url;
    const METHOD = req.method;

    this.logger.log(`<-- ${METHOD} ${URL} ${IP}`);
    if (this.configService.get<boolean>('logging.full')) {
      const BODY = request.body || {};
      const QUERY = request.query || {};
      const HEADERS = request.headers || [];
      this.logger.debug(
        `BODY: ${JSON.stringify(BODY)}, QUERY: ${JSON.stringify(QUERY)}`,
        'request.deep',
      );

      if (request.user) {
        this.logger.debug(
          `Requested by (${request.user.id}/${request.user.email}/${request.user.username})`,
          'request.deep',
        );
      }
    }

    const now = Date.now();
    return next
      .handle()
      .pipe(
        finalize(() =>
          this.logger.log(`--> ${METHOD} ${URL} ${IP} ${Date.now() - now}ms`),
        ),
      );
  }
}
