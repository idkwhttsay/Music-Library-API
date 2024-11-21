import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppLoggerService } from './app-logger.service';

@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: AppLoggerService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const errorResponse = exception.getResponse();
      this.logger.error(
        `HTTP Exception: ${status} - ${JSON.stringify(errorResponse)}`,
      );

      response.status(status).json(errorResponse);
    } else {
      this.logger.error(`Unexpected Error: ${exception}`);

      response.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }
  }
}
