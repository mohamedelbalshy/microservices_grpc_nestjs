import { DataSource } from 'typeorm';

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: 'posts_db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'posts_db',
  synchronize: true,
  entities: ['dist/database/**/*.entity.{js,ts}'],
  logging: true,
  migrations: ['dist/database/migrations/*.js'],
});
