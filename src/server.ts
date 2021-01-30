import 'reflect-metadata';
import { App } from './app';
import { TodoController } from './controllers/todo.controller';
import { sqliteConnectionOptions } from './config/typeorm.config';
import { createConnection } from 'typeorm';

createConnection(sqliteConnectionOptions)
  /*eslint-disable @typescript-eslint/no-unused-vars */
  .then((connection) => {
    const app = new App([TodoController]);
    app.listen();
  })
  .catch((err) => console.log(err));
