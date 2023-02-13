import 'reflect-metadata';
import { HttpException, HttpStatus } from '@nestjs/common';

export const CheckTodo = () => (target, key, descriptor) => {
  const original = descriptor.value;
  descriptor.value = new Proxy(original, {
    apply: function (target, thisArg, args) {
      if (!args[0]['title']) {
        throw new HttpException('title이 빈 값', HttpStatus.FORBIDDEN);
      }
      if (!args[0]['status']) {
        args[0]['status'] = 'TODO';
      }

      const result = target.apply(thisArg, args);
      return result;
    },
  });
};
export class TodoMapper {
  removeTodo(body) {
    const { id } = body;
    return { id: `${id}` };
  }
}
