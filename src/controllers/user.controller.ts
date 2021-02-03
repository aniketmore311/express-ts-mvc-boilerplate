import { singleton, injectable } from 'tsyringe';
import { IBaseController } from '../types';
import express, { Request, Response } from 'express';
import { catchAsync } from '../utils/error.util';
import { UserService } from '../services/user.service';

@injectable()
@singleton()
export class UserController implements IBaseController {
  public path = '/user';
  public middlewareBefore = [];
  public middlewareAfter = [];
  public router = express.Router();

  constructor(public userService: UserService) {
    this.bindHandlers();
    this.initializeRoutes();
  }

  public bindHandlers(): void {
    this.renderRegister = this.renderRegister.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  public initializeRoutes(): void {
    this.router.get('/register', this.renderRegister);
    this.router.get('/login', this.renderLogin);
    this.router.post('/register', catchAsync(this.handleRegister));
    this.router.post('/login', this.handleLogin);
    this.router.post('/logout', this.handleLogout);
  }

  public renderRegister(req: Request, res: Response): void {
    const context = {
      errorMessages: [],
      successMessages: [],
    };
    res.render('pages/register', context);
  }

  public async handleRegister(req: Request, res: Response): Promise<void> {
    const { firstname, lastname, email, password } = req.body;
    const newUser = await this.userService.createUser(
      firstname,
      lastname,
      email,
      password
    );
    console.log('new user: %o', newUser);
    req.flash('successMessages', ['registration successful']);
    res.redirect('/user/login');
  }

  public renderLogin(req: Request, res: Response) {
    const context = {
      errorMessages: [],
      successMessages: req.flash('successMessages'),
    };
    res.render('pages/login', context);
  }

  public handleLogin(req: Request, res: Response) {}

  public handleLogout(req: Request, res: Response) {}
}
