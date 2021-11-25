import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterUserNullBaseAvatar1637784111779
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'baseAvatar',
      new TableColumn({
        name: 'baseAvatar',
        type: 'varchar',
        isNullable: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'name',
      new TableColumn({
        name: 'baseAvatar',
        type: 'varchar',
      })
    )
  }
}
