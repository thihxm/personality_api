import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterResultAddColor1638992485969 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'results',
      new TableColumn({
        name: 'color',
        type: 'varchar',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('results', 'color')
  }
}
