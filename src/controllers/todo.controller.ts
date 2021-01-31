import { Handler, Router, Request, Response } from 'express';
import { injectable, singleton } from 'tsyringe';
import { IBaseController } from '../types/controllers/basecontroller.interface';
import { TodoService } from '../services/todo.service';
import { SiteError } from '../util';

@injectable()
@singleton()
export class TodoController implements IBaseController {
  public path: string;
  public middlewareBefore: Handler[];
  public middlewareAfter: Handler[];
  public router: Router;

  constructor(public todoService: TodoService) {
    this.bindMethods();
    this.path = '/todo';
    this.middlewareAfter = [];
    this.middlewareBefore = [];
    this.router = Router();
    this.initializeRoutes();
  }

  public bindMethods(): void {
    this.testHandler = this.testHandler.bind(this);
  }

  public initializeRoutes(): void {
    this.router.get('/test', this.testHandler);
  }

  public testHandler(req: Request, res: Response): void {
    throw new SiteError(500, 'test error');
  }
}
