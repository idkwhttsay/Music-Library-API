import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { IConfiguration } from '../configurations/configuration.interface';
import { Environment } from '../configurations/environment';

export class Swagger {
  constructor(
    private readonly _app: INestApplication,
    private readonly _config: ConfigService<IConfiguration>,
    private readonly _environment: Environment,
  ) {}

  public async setup(): Promise<void> {
    const swaggerOptions = new DocumentBuilder()
      .setTitle('Home Music Library')
      .addTag('Music Library', 'Music')
      .build();

    const document = SwaggerModule.createDocument(this._app, swaggerOptions);

    SwaggerModule.setup(this._config.get('SWAGGER_PATH'), this._app, document);
  }
}
