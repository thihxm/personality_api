import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateAnswers1637327692281 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'answers',
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
            name: 'score',
            type: 'varchar',
          },
          {
            name: 'question_id',
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
            name: 'FK_ANSWER_QUESTION',
            referencedTableName: 'questions',
            referencedColumnNames: ['id'],
            columnNames: ['question_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('answers')
  }
}
