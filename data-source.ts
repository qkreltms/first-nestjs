import { TodoService } from 'src/todo/todo.service';
import { Todo } from 'src/todo/todo.entity';
import { DataSource } from 'typeorm';
const isDev = process.env.ENV === 'dev';
const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: () => {
      const appDataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) ?? 5432,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PW,
        database: process.env.DB_NAME,
        entities: [Todo],
        logging: isDev,
        synchronize: isDev,
      });
      return appDataSource.initialize();
    },
  },
  TodoService,
];

export default databaseProviders;
