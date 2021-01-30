import { injectable, singleton } from 'tsyringe';

@injectable()
@singleton()
export class TodoService {
  constructor() {}
  public getMessage(): string {
    return 'hello';
  }
}
