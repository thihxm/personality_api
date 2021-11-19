import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterQuizUniqueTitle1637345775220 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'quizzes',
      'title',
      new TableColumn({
        name: 'title',
        type: 'varchar',
        isUnique: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'quizzes',
      'title',
      new TableColumn({
        name: 'title',
        type: 'varchar',
      })
    )
  }
}
