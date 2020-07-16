import {
  Catch,
  UnauthorizedException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import ApiErrorCode from 'src/common/exception/ApiErrorCode';
import { ServerResponse } from 'http';
import { FastifyReply } from 'fastify';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<FastifyReply<ServerResponse>>();

    res.status(400).send({
      result: 0,
      resultCode: ApiErrorCode.UNAUTHORIZED.code,
      resultMsg: ApiErrorCode.UNAUTHORIZED.msg,
    });
  }
}
