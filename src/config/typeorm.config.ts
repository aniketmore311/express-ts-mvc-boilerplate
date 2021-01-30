import { ConnectionOptions } from 'typeorm';
const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'testdb1',
  logging: false,
  synchronize: true,
  entities: ['src/models/entity/**/*.ts'],
  migrations: ['src/models/migration/**/*.ts'],
};
export { connectionOptions };
