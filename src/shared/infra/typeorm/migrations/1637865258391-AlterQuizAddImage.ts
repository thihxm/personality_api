import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterQuizAddImage1637865258391 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'quizzes',
      new TableColumn({
        name: 'image',
        type: 'varchar',
        isNullable: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('quizzes', 'image')
  }
}
