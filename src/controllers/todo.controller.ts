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
    this.homeHandler = this.homeHandler.bind(this);
  }

  public initializeRoutes(): void {
    this.router.get('/test', this.testHandler);
    this.router.get('/home', this.homeHandler);
  }

  public testHandler(req: Request, res: Response): void {
    req.flash('errorMessages', 'test flash message');
    res.redirect('/todo/home');
  }

  public homeHandler(req: Request, res: Response): void {
    const context = {
      errorMessages: req.flash('errorMessages'),
    };
    res.render('pages/home', context);
  }
}
