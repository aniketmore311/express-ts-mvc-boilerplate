import { singleton, injectable } from 'tsyringe';
import { IBaseController } from '../types';
import express, { Response, Request } from 'express';

@injectable()
@singleton()
export class HomeController implements IBaseController {
  public path = '/home';
  public middlewareBefore = [];
  public middlewareAfter = [];
  public router = express.Router();

  constructor() {
    this.bindHandlers();
    this.initializeRoutes();
  }

  public bindHandlers(): void {
    this.renderHome = this.renderHome.bind(this);
  }

  public initializeRoutes(): void {
    this.router.use(this.renderHome);
  }

  public renderHome(req: Request, res: Response): void {
    const context = {
      errorMessages: [],
      successMessages: [],
    };
    res.render('pages/home', context);
  }
}
