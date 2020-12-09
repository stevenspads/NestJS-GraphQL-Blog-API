import { Injectable } from '@nestjs/common';
import { Config, Environments } from './config';
import { configTest } from './config.test';
import { configLocal } from './config';
import { configStaging } from './config.staging';
import { configProd } from './config.prod';

@Injectable()
export class ConfigService {
  protected env: string = process.env.NODE_ENV || Environments.local;
  protected environmentSettings: Config;

  public get config(): Config {
    this.environmentSettings = this.getEnvironmentSettings();
    return this.environmentSettings;
  }

  public get isProd(): boolean {
    return this.env.includes(Environments.prod);
  }

  public get isTest(): boolean {
    return this.env.includes(Environments.test);
  }

  protected getEnvironmentSettings(): Config {
    switch (this.env) {
      case Environments.prod:
        return configProd;
      case Environments.staging:
        return configStaging;
      case Environments.test:
        return configTest;
      default:
        return configLocal;
    }
  }
}
