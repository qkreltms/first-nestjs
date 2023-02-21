import { Module } from '@nestjs/common';
import databaseProviders from 'data-source';
import { TodoController } from 'src/todo/todo.controller';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [...databaseProviders],
})
export class AppModule {}
