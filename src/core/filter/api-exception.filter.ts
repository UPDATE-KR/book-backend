import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ApiException } from '../../common/exception/ApiException';
import { FastifyReply } from 'fastify';
import { ServerResponse } from 'http';

@Catch(ApiException)
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: ApiException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<FastifyReply<ServerResponse>>();
    
    res
      .status(exception.status)
      .send({
        result: 0,
        resultCode: exception.code,
        resultMsg: exception.msg
      });
  }
}
