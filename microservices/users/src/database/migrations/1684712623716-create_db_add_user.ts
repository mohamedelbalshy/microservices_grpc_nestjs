import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDBAddUser1684712623716 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
             CREATE TABLE users(
                id uuid DEFAULT uuid_generate_v4(),
                email VARCHAR NOT NULL,
                password VARCHAR NOT NULL,
                UNIQUE(email)
            );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP DATABASE users_db;`);
  }
}
