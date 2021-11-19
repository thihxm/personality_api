import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateQuizzes1637327077385 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'quizzes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'subtitle',
            type: 'varchar',
          },
          {
            name: 'about',
            type: 'varchar',
          },
          {
            name: 'color',
            type: 'varchar',
          },
          {
            name: 'estimatedTimeInMinutes',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('quizzes')
  }
}
