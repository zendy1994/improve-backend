import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import { TableNames } from '../../utils/constants/table-names.constant';

export class BacklistedTokenMigration1706111376600 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TableNames.BLACKLISTED_TOKEN,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'token',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      TableNames.BLACKLISTED_TOKEN,
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: TableNames.USER,
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(TableNames.BLACKLISTED_TOKEN);
    const userIdForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1
    );

    await queryRunner.dropForeignKeys(TableNames.BLACKLISTED_TOKEN, [userIdForeignKey]);
    await queryRunner.dropTable(TableNames.BLACKLISTED_TOKEN);
  }
}
