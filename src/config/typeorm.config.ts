import { ConnectionOptions } from 'typeorm';
const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'testdb1',
};
export { connectionOptions };
