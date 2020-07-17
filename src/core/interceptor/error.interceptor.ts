import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiException } from 'src/common/exception/ApiException';
import ApiErrorCode from 'src/common/exception/ApiErrorCode';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        if (
          err instanceof BadRequestException ||
          err instanceof ApiException ||
          err instanceof UnauthorizedException
        ) {
          return throwError(err);
        }

        return throwError(new ApiException(ApiErrorCode.UNKNOWN));
      }),
    );
  }
}
