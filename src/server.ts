import 'reflect-metadata';
import { App } from './app';
import { TodoController } from './controllers/todo.controller';
import { connectionOptions } from './config/typeorm.config';
import { createConnection } from 'typeorm';
import { IUser } from './types';

// extending the express session to hold user
declare module 'express-session' {
  interface SessionData {
    user: IUser;
  }
}

// create connection and start the app
createConnection(connectionOptions)
  /*eslint-disable @typescript-eslint/no-unused-vars */
  .then((connection) => {
    const app = new App([TodoController]);
    app.listen();
  })
  .catch((err) => console.log(err));
