import { Injectable } from '@nestjs/common';
import { Todo } from 'src/todo/todo.entity';

@Injectable()
export class TodoService {
  create(todo: Todo) {
    return Todo.insert(todo);
  }

  update(todo: Todo) {
    return Todo.update({ id: todo.id }, todo);
  }

  delete(id: string) {
    return Todo.delete(id);
  }

  findAll() {
    return Todo.find();
  }
}
