import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import * as path from 'path';
import { CONFIG_OPTIONS } from './constante';
import { ConfigOptions } from './interface/config-options.interface';
import { EnvConfig } from './interface/envconfig.interface';

@Injectable()
export class ConfigService {
  private envConfig: EnvConfig;

  constructor(@Inject(CONFIG_OPTIONS) options: ConfigOptions) {
    const fileName = process.env.NODE_ENV ? process.env.NODE_ENV : '.env';
    const filePath = path.resolve(__dirname, '../..', options.folder, fileName);
    console.log(filePath);

    const envFile = readFileSync(filePath, 'utf8');
    this.envConfig = dotenv.parse(envFile);
  }

  get(key: string, defaultValue?: any): any {
    return this.envConfig[key] !== undefined
      ? this.envConfig[key]
      : defaultValue;
  }
}
