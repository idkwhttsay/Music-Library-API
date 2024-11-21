import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfiguration } from '../infrastructure/configurations/configuration.interface';
import { Environment } from '../infrastructure/configurations/environment';
import { Swagger } from '../infrastructure/documentation/swagger';
import { AppLoggingInterceptor } from '../infrastructure/logger/logger.interceptor';
import { AppLoggerService } from '../infrastructure/logger/app-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<IConfiguration>>(ConfigService);
  const environment = app.get<Environment>(Environment);
  const PORT: number = configService.get<number>('PORT') | 4000;

  if (!environment.isProduction()) {
    const swagger = new Swagger(app, configService, environment);
    await swagger.setup();
  }

  app.useGlobalInterceptors(
    new AppLoggingInterceptor(app.get(AppLoggerService)),
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(PORT).then(() => {
    console.log(`app is listening on http://localhost:${PORT}`);
  });
}

bootstrap();
