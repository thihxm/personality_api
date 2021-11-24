import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterUserUniqueName1637709769654 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'name',
      new TableColumn({
        name: 'name',
        type: 'varchar',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'name',
      new TableColumn({
        name: 'name',
        type: 'varchar',
        isUnique: true,
      })
    )
  }
}
