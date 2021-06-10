import { config } from 'dotenv';
import * as path from 'path';
import { toBool } from './utils/util.function';

config({
  path: path.join(
    process.cwd(),
    `${process.env.NODE_ENV || 'development'}.env`,
  ),
});

export const ENV_DEVELOPMENT = 'development';
export const ENV_PRODUCTION = 'production';
export const ENV_STAGING = 'deployment';
export const ENV_QA = 'qa';

export const ENV: any = {
  port: process.env.PORT,
  env: process.env.NODE_ENV || ENV_DEVELOPMENT,
  isProduction: process.env.NODE_ENV === ENV_PRODUCTION,
  isStaging: process.env.NODE_ENV === ENV_STAGING,
  isTest: process.env.NODE_ENV === ENV_QA,
  isDevelopment: process.env.NODE_ENV === ENV_DEVELOPMENT,

  APP_NAME: process.env.APP_NAME,
  API_PREFIX: process.env.API_PREFIX,
  API_TITLE: process.env.API_TITLE,
  API_DESC: process.env.API_DESC,
  API_VERSION: process.env.API_VERSION,

  postGreDB: {
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: +process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,

    synchronize: process.env.TYPEORM_SYNCHRONIZE,
    logging: process.env.TYPEORM_LOGGING,
    autoLoadEntities: process.env.TYPEROM_AUTOLOAD_ENTITIES,
  },
};

export const ormConfig: any = {
  type: ENV.postGreDB.type,
  host: ENV.postGreDB.host,
  port: ENV.postGreDB.port,
  username: ENV.postGreDB.username,
  password: ENV.postGreDB.password,
  database: ENV.postGreDB.database,

  synchronize: toBool(ENV.postGreDB.synchronize),
  logging: toBool(ENV.postGreDB.logging),
  autoLoadEntities: toBool(ENV.postGreDB.autoLoadEntities),
};
