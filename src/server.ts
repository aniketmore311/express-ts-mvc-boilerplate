import 'reflect-metadata';
import { App } from './app';
import { TodoController } from './controllers/todo.controller';

const app = new App([TodoController]);
app.listen();
