import 'reflect-metadata';
import { App } from './app';
import { TodoController } from './controllers/todo.controller';
import { sqliteConnectionOptions } from './config/typeorm.config';
import { createConnection } from 'typeorm';
import { IUser } from './types';

// extending the express session
declare module 'express-session' {
  interface SessionData {
    user: IUser;
  }
}

createConnection(sqliteConnectionOptions)
  /*eslint-disable @typescript-eslint/no-unused-vars */
  .then((connection) => {
    const app = new App([TodoController]);
    app.listen();
  })
  .catch((err) => console.log(err));
