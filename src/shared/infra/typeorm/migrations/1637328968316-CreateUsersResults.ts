import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsersResults1637328968316 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'usersResults',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'result_id',
            type: 'uuid',
          },
          {
            name: 'isSelected',
            type: 'boolean',
            default: false,
          },
          {
            name: 'isPrivate',
            type: 'boolean',
            default: false,
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
            name: 'FK_USER_RESULT',
            referencedTableName: 'results',
            referencedColumnNames: ['id'],
            columnNames: ['result_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
          {
            name: 'FK_RESULT_USER',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('usersResults')
  }
}
