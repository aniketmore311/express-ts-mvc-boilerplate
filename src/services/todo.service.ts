import { injectable, singleton } from 'tsyringe';

@injectable()
@singleton()
export class TodoService {
  public getMessage(): string {
    return 'hello';
  }
}
