import { injectable, singleton } from 'tsyringe';

@injectable()
@singleton()
export class TodoService {
  constructor() {
    console.log('in service con');
  }
  public getMessage(): string {
    return 'hello';
  }
}
