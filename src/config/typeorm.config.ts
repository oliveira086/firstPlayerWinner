import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  IS_PRODUCTION,
} from '../config/env';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_NAME,
  password: DB_PASSWORD,
  database: DB_USERNAME,
  entities: [`${__dirname}/../**/*.entity.{ts,js}`],
  synchronize: true,
  dropSchema: !IS_PRODUCTION,
};
