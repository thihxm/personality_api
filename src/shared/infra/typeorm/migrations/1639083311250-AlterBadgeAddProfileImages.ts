import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterBadgeAddProfileImages1639083311250
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('badges', [
      new TableColumn({
        name: 'profileImage_flor',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'profileImage_diab',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'profileImage_cora',
        type: 'varchar',
        isNullable: true,
      }),
      new TableColumn({
        name: 'profileImage_estr',
        type: 'varchar',
        isNullable: true,
      }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('badges', [
      'profileImage_flor',
      'profileImage_diab',
      'profileImage_cora',
      'profileImage_estr',
    ])
  }
}
