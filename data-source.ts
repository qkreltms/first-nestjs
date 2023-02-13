import { TodoService } from 'src/todo/todo.service';
import { Todo } from 'src/todo/todo.entity';
import { DataSource } from 'typeorm';

const isDev = true;
const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: () => {
      // TODO: 권한 관리
      // env 파일에서 값 받기
      // entity pattern으로 변경하기
      const appDataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'jackpark',
        password: '',
        database: 'mydb',
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
