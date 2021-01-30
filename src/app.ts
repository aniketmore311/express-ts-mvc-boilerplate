import { container, injectable, InjectionToken, singleton } from 'tsyringe';
import { IBaseController, IUser } from './types/index';
import session, { MemoryStore } from 'express-session';
import { env } from './config/env.config';
import express from 'express';
import morgan from 'morgan';

@injectable()
@singleton()
export class App {
  public app: express.Application;
  public controllerTokens: InjectionToken<IBaseController>[];

  constructor(controllerTokens: InjectionToken<IBaseController>[]) {
    this.controllerTokens = controllerTokens;
    this.app = express();
    this.initializeMiddleware();
    this.initializeControllers();
  }

  public initializeMiddleware(): void {
    this.app.use(morgan(env.MORGAN_MODE));
    this.app.use(
      session({
        cookie: {
          maxAge: 1 * 24 * 60 * 60 * 1000,
        },
        // usinng memory store here use redis or something in production
        store: new MemoryStore(),
        secret: env.SESS_KEY,
        resave: false,
        name: 'sid',
        saveUninitialized: false,
      })
    );
  }

  public initializeControllers(): void {
    this.controllerTokens.forEach((token) => {
      const controllerInstance: IBaseController = container.resolve(token);
      this.app.use(
        controllerInstance.path,
        ...controllerInstance.middlewareBefore,
        controllerInstance.router,
        ...controllerInstance.middlewareAfter
      );
    });
  }

  public listen(): void {
    this.app.listen(env.PORT, () => {
      console.log(`server is listening on port ${env.PORT}`);
    });
  }
}
