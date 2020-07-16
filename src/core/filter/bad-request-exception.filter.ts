import { Catch, ExceptionFilter, ArgumentsHost, BadRequestException } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { FastifyReply } from "fastify";
import { ServerResponse } from "http";
import ApiErrorCode from "src/common/exception/ApiErrorCode";

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {

    catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<FastifyReply<ServerResponse>>();

    res
      .status(400)
      .send({
        result: 0,
        resultCode: ApiErrorCode.BAD_REQUEST.code,
        resultMsg: exception.getResponse()['message'][0] || ApiErrorCode.BAD_REQUEST.msg
      });
    }

}