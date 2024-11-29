import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfiguration } from '../infrastructure/configurations/configuration.interface';
import { Environment } from '../infrastructure/configurations/environment';
import { Swagger } from '../infrastructure/documentation/swagger';
import { AppLoggerInterceptor } from '../infrastructure/logger/logger.interceptor';
import { AppLoggerService } from '../infrastructure/logger/app-logger.service';
import { AppExceptionsFilter } from '../infrastructure/logger/app-logger.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<IConfiguration>>(ConfigService);
  const environment = app.get<Environment>(Environment);
  const PORT: number = configService.get<number>('PORT') | 4000;
  const loggerService = app.get(AppLoggerService);

  if (!environment.isProduction()) {
    const swagger = new Swagger(app, configService, environment);
    await swagger.setup();
  }

  app.useGlobalInterceptors(new AppLoggerInterceptor(loggerService));
  app.useGlobalFilters(new AppExceptionsFilter(loggerService));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  process.on('uncaughtException', (err) => {
    loggerService.error(`Uncaught Exception: ${err.message}`, err.stack);
  });

  process.on('unhandledRejection', (reason, promise) => {
    loggerService.error(`Unhandled Rejection: ${reason} - Promise: ${promise}`);
  });

  await app.listen(PORT).then(() => {
    loggerService.log(`App is listening on http://localhost:${PORT}`);
  });
}

bootstrap();
