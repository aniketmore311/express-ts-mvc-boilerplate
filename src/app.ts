import { container, injectable, InjectionToken, singleton } from 'tsyringe';
import { IBaseController } from './types/BaseController.interface';
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
    this.app.use(morgan('dev'));
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
    this.app.listen(3000, () => {
      console.log('server is listening on port 3000');
    });
  }
}
