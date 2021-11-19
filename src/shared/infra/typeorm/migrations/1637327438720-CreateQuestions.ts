import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateQuestions1637327438720 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'questions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'label',
            type: 'varchar',
          },
          {
            name: 'quiz_id',
            type: 'uuid',
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
        foreignKeys: [
          {
            name: 'FK_QUESTION_QUIZ',
            referencedTableName: 'quizzes',
            referencedColumnNames: ['id'],
            columnNames: ['quiz_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('questions')
  }
}
