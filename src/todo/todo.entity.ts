import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { TypeTodoStatus } from 'src/todo/todo.dto';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  title: string;

  @Column('text', { nullable: true })
  description?: string;

  @Column()
  status: TypeTodoStatus;
}
