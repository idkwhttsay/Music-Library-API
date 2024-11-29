import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfiguration } from './configuration.interface';

@Injectable()
export class Environment {
  constructor(private readonly _configuration: ConfigService<IConfiguration>) {}

  public environment(): string {
    return this._configuration.get('NODE_ENV');
  }

  public isDevelopment(): boolean {
    return this._configuration.get('NODE_ENV') === 'Development';
  }

  public isStaging(): boolean {
    return this._configuration.get('NODE_ENV') === 'Staging';
  }

  public isProduction(): boolean {
    return this._configuration.get('NODE_ENV') === 'Production';
  }
}
