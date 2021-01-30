import { container, injectable, InjectionToken, singleton } from 'tsyringe';
import { IBaseController } from './types/index';
import session, { MemoryStore } from 'express-session';
import { env } from './config/env.config';
import express from 'express';
import { Request, Response } from 'express';
import morgan from 'morgan';
import { logError, errorTransformer, SiteErrorHandler } from './middleware';

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
    this.initializeNotFound();
    this.initializeErrorHandler();
  }

  public initializeMiddleware(): void {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan(env.MORGAN_MODE));
    this.app.set('views', `${env.ROOT_DIR}/src/views`);
    this.app.set('view engine', 'ejs');
    this.app.use(express.static(`${env.ROOT_DIR}/src/public`));
    // setup sessions
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

  public initializeNotFound(): void {
    this.app.use('*', (req: Request, res: Response) => res.render('pages/404'));
  }

  public initializeErrorHandler(): void {
    this.app.use(logError);
    this.app.use(errorTransformer);
    this.app.use(SiteErrorHandler);
  }

  public listen(): void {
    this.app.listen(env.PORT, () => {
      console.log(`server is listening on port ${env.PORT}`);
    });
  }
}
