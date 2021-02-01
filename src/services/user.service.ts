import { injectable, singleton } from 'tsyringe';
import { IUserService } from '../types';
@injectable()
@singleton()
export class UserService implements IUserService {
  constructor() {}
}
