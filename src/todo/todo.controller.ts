import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TypeTodoDTO } from 'src/todo/todo.dto';
import { CheckTodo, TodoMapper } from './util';

let todos: TypeTodoDTO[] = [
  {
    id: '1',
    title: 'Generate apps',
    status: 'DONE',
  },
];

@Controller('todo')
export class TodoController {
  @Get()
  getTodos(): TypeTodoDTO[] {
    return todos;
  }

  @Post()
  @CheckTodo()
  createTodo(@Body() todo: TypeTodoDTO): TypeTodoDTO[] {
    const newTodo: TypeTodoDTO = {
      id: (todos.length + 1).toString(),
      ...todo,
    };
    todos = [...todos, newTodo];
    return todos;
  }

  @Put()
  @CheckTodo()
  updateTodo(@Body() todo: TypeTodoDTO): TypeTodoDTO[] {
    todos = todos.map((cur) => {
      const id = `${todo.id}`;
      if (cur.id === id) {
        cur = { ...todo, id };
      }
      return cur;
    });
    return todos;
  }

  @Delete()
  removeTodo(@Body() body): TypeTodoDTO[] {
    const mapper = new TodoMapper();
    const { id } = mapper.removeTodo(body);
    todos = todos.filter((cur) => cur.id !== id);
    return todos;
  }
}
