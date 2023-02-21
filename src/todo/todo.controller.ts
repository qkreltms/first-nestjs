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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Todo } from 'src/todo/todo.entity';
import { TodoService } from 'src/todo/todo.service';
import { CheckTodo } from './util';
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

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

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    AWS.config.update({
      region: 'ap-northeast-2',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    try {
      const upload = await new AWS.S3()
        .putObject({
          Key: `${Date.now() + file.originalname}`,
          Body: file.buffer,
          Bucket: process.env.AWS_BUCKET_NAME,
        })
        .promise();
      console.log(upload);
    } catch (error) {
      console.log(error);
    }
  }
}
