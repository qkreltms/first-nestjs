import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from 'src/todo/todo.entity';
import { TodoService } from 'src/todo/todo.service';
import { CheckTodo } from './util';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos() {
    return this.todoService.findAll();
  }

  @Post()
  @CheckTodo()
  createTodo(@Body() todo: Todo) {
    return this.todoService.create(todo);
  }

  @Put()
  @CheckTodo()
  updateTodo(@Body() todo: Todo) {
    return this.todoService.update(todo);
  }

  @Delete(':id')
  deleteTodo(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id,
  ) {
    return this.todoService.delete(id);
  }
}
