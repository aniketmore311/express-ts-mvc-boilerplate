import { ConnectionOptions } from 'typeorm';
const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'testdb1',
  entities: ['src/models/entity/**/*.ts'],
  migrations: ['src/models/migration/**/*.ts'],
};
export { connectionOptions };
