import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateResult1637328142585 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'results',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'code',
            type: 'varchar',
          },
          {
            name: 'about',
            type: 'varchar',
          },
          {
            name: 'label',
            type: 'varchar',
          },
          {
            name: 'badge_id',
            type: 'uuid',
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
            name: 'FK_RESULT_BADGE',
            referencedTableName: 'badges',
            referencedColumnNames: ['id'],
            columnNames: ['badge_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FK_RESULT_QUIZ',
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
    await queryRunner.dropTable('results')
  }
}
