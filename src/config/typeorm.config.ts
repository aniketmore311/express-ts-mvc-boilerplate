import { ConnectionOptions } from 'typeorm';
import { env } from './env.config';
export const msqlConnectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'testdb1',
  logging: false,
  synchronize: env.NODE_ENV == 'production' ? false : true,
  entities: [`${env.ROOT_DIR}/src/models/entity/**/*.ts`],
  migrations: [`${env.ROOT_DIR}/src/models/migration/**/*.ts`],
};

export const sqliteConnectionOptions: ConnectionOptions = {
  type: 'sqlite',
  database: `${env.ROOT_DIR}/database.db`,
  logging: false,
  synchronize: true,
  entities: [`${env.ROOT_DIR}/src/models/entity/**/*.ts`],
  migrations: [`${env.ROOT_DIR}/src/models/migration/**/*.ts`],
};
