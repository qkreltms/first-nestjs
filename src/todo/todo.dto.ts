type TypeTodoStatus = 'TODO' | 'DONE' | 'IN_PROGRESS';

export class TypeTodoDTO {
  id?: string;
  title: string;
  status: TypeTodoStatus;
}
