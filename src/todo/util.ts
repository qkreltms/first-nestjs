import 'reflect-metadata';
import { HttpException, HttpStatus } from '@nestjs/common';

export const CheckTodo = () => (target, key, descriptor) => {
  const original = descriptor.value;
  descriptor.value = ({ title, status, ...args }) => {
    if (!title) {
      throw new HttpException('title이 빈 값', HttpStatus.FORBIDDEN);
    }
    return original({ title, status: status || 'TODO', ...args });
  };

  return descriptor;
};

export class TodoMapper {
  removeTodo(body) {
    const { id } = body;
    return { id: `${id}` };
  }
}
