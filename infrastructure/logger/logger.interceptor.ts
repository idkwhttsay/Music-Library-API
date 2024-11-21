import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppLoggerService } from './app-logger.service';

@Injectable()
export class AppLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const { method, url, query, params, body } = request;
    const startTime = Date.now();

    this.logger.log(
      `Request Details: Method: ${method} URL: ${url} Query Params: ${JSON.stringify(
        query,
      )} Route Params: ${JSON.stringify(params)} Body: ${JSON.stringify(body)}`,
    );

    return next.handle().pipe(
      tap((data) => {
        const { statusCode } = response;
        const duration = Date.now() - startTime;

        this.logger.log(
          `Response Details: Status Code: ${statusCode} Duration: ${duration}ms Response Body: ${JSON.stringify(
            data,
          )}`,
        );
      }),
    );
  }
}
